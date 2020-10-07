import os
import logging
import json
from datetime import datetime
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

from django.db import models
from rest_framework import generics
from django.shortcuts import get_object_or_404
from gamma.models import Volunteer, Opportunity, Skill, Charity, Signup
from gamma.serializers import VolunteerSerializer, OpportunitySerializer, SkillSerializer, CharitySerializer, SignupSerializer
from django.views.generic import View
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.core import serializers
from scipy.stats import norm
from django.forms.models import model_to_dict

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def serialize(obj):
    data = serializers.serialize('json', [ obj, ])
    struct = json.loads(data)
    return json.dumps(struct[0])

def volunteer_signups(request):
    params = json.loads(request.body)
    id = params.get('id')
    signups = Signup.objects.filter(volunteer=id)
    res = []
    for signup in signups:
        if (signup.opportunity is None):
            continue
        res.append({"opp" : serialize(signup.opportunity), "accepted" : signup.accepted})
    return JsonResponse(res, safe=False)

def charity_signups(request):
    params = json.loads(request.body)
    charity_id = params.get('id')
    signups = Signup.objects.filter(opportunity__charity__id=charity_id)
    data = {}
    for signup in signups:
        if (signup.opportunity.pk not in data):
            data[signup.opportunity.pk] = []
        data[signup.opportunity.pk].append({"vol" : signup.volunteer, "accepted" : signup.accepted, "id" : signup.id })

    opportunities = Opportunity.objects.filter(charity=charity_id)
    for opportunity in opportunities:
        if (not opportunity.pk in data):
            data[opportunity.pk] = []

    response = []
    for opportunity_id, volunteers in data.items():
        opportunity = Opportunity.objects.get(pk=opportunity_id)
        opportunity_ser = serialize(opportunity)
        volunteers_ser = [{"volunteer" : serialize(volunteer["vol"]),
                           "score" : calculate_score(volunteer["vol"], opportunity),
                           "accepted" : volunteer["accepted"],
                           "signup_id" : volunteer["id"]} for volunteer in volunteers]
        volunteers_ser.sort(key=sortScore, reverse=True)

        response.append({"opportunity" : opportunity_ser, "volunteers" : list(map(lambda elem : json.dumps(elem), volunteers_ser))})

    return JsonResponse(response, safe=False)

def filter_skillbox(opps, skills):
    filter = [skill for skill, bool in skills.items() if bool]
    res = []
    for opp in opps:
        opp_skill = opp.skills
        for skill, value in model_to_dict(opp_skill).items():
            if (value > 0 and skill in filter):
                res.append(opp)
                break
    return res

def get_skill_incremenet(base, skill, total):
    return base * (skill/total)

def verify(request):
    params = json.loads(request.body)
    volunteer = Volunteer.objects.get(id=params['volunteer'])
    opportunity = Opportunity.objects.get(id=params['opportunity'])
    duration = opportunity.duration
    base = 100
    total = 20

    volunteer.experiences.communication += duration * get_skill_incremenet(base, opportunity.skills.communication, total)
    volunteer.experiences.technical += duration * get_skill_incremenet(base, opportunity.skills.technical, total)
    volunteer.experiences.finance += duration * get_skill_incremenet(base, opportunity.skills.finance, total)
    volunteer.experiences.marketing += duration * get_skill_incremenet(base, opportunity.skills.marketing, total)
    volunteer.experiences.medical += duration * get_skill_incremenet(base, opportunity.skills.medical, total)
    volunteer.experiences.teamwork += duration * get_skill_incremenet(base, opportunity.skills.teamwork, total)
    volunteer.experiences.problem_solving += duration * get_skill_incremenet(base, opportunity.skills.problem_solving, total)
    volunteer.experiences.creativity += duration * get_skill_incremenet(base, opportunity.skills.creativity, total)
    volunteer.experiences.craftmanship += duration * get_skill_incremenet(base, opportunity.skills.craftmanship, total)

    volunteer.experiences.save()
    return HttpResponse('', status=200)

def filter_keywords(opps, word):
    word = word.lower()
    return list(filter(lambda opp: word in opp.title.lower() or word in opp.description.lower(), opps))

def filter_date(opp_date, start, end):
    format = '%Y-%m-%d'

    if (not opp_date):
        return False

    try:
        opportunity_date = datetime.strptime(opp_date, format)
    except:
        return False

    start_date = datetime.strptime(start, format)
    end_date = datetime.strptime(end, format)
    return start_date <= opportunity_date  and opportunity_date <= end_date

def filter_location(opps, location, distance):
    res = []
    geolocator = Nominatim(user_agent="Evolvunteer")
    geo_loc = geolocator.geocode(location)

    if(geo_loc is None):
        return res

    location_geodesic = (geo_loc.latitude, geo_loc.longitude)
    for opp in opps:
        if (not opp.address):
            continue
        opp_location = geolocator.geocode(opp.address)

        if (opp_location is None):
            continue

        opp_geodesic = (opp_location.latitude, opp_location.longitude)

        if (geodesic(location_geodesic, opp_geodesic).miles <= distance):
            res.append(opp)
    return res

def get_search_results(request):
    opps = Opportunity.objects.all()
    params = json.loads(request.body)

    if (params['keyword']):
        opps = filter_keywords(opps, params["keyword"])

    if (params['skills']):
        opps = filter_skillbox(opps, params['skills'])

    if (params['start_date']):
        start = params["start_date"]
        end = params["end_date"]
        opps = list(filter(lambda opp : filter_date(opp.date, start, end), opps))

    if (params['location']):
        opps = filter_location(opps, params["location"], 100)

    volunteer = Volunteer.objects.get(id=params["id"])
    res = [{"opportunity" : serialize(obj), "score" : calculate_score(volunteer, obj)} for obj in opps]
    res.sort(key=sortScore, reverse=True)
    return JsonResponse(list(map(lambda elem: json.dumps(elem), res)), safe=False)

def sortScore(opp):
    return opp["score"]

def calculate_score(volunteer, opportunity):
    sum = 0
    res = 0
    base = 20
    vol_skills = model_to_dict(volunteer.skills)
    vol_learnings = model_to_dict(volunteer.learnings)
    op_skills = model_to_dict(opportunity.skills)
    for k, v in vol_skills.items():
        sum += get_skill_score(v, op_skills[k], 2)
        res += (vol_learnings[k] / base) * (op_skills[k] / base)

    average_optimality_score = sum / len(vol_skills)

    return average_optimality_score

def get_skill_score(actual, expected, delta):
    maximum = expected-delta if expected-delta > 0 else 0
    return norm.pdf(actual, maximum, 4)/norm.pdf(maximum, maximum, 4)

class ListVolunteers(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class CharityList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

class SignupList(generics.ListCreateAPIView):
    queryset = Signup.objects.all()
    serializer_class = SignupSerializer

class DetailSignup(generics.RetrieveUpdateDestroyAPIView):
    queryset = Signup.objects.all()
    serializer_class = SignupSerializer

class DetailCharity(generics.RetrieveUpdateDestroyAPIView):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

class ListOpportunities(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class SearchOpportunities(generics.ListCreateAPIView):
    serializer_class = OpportunitySerializer

    @property
    def get_queryset(self):
        return Opportunity.objects.filter(title__regex=r"([a-zA-z ])*%s([a-zA-z ])*" % self.kwargs['title'])


class DetailVolunteer(generics.RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class ListSkill(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class DetailSkill(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class DetailOpportunities(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class FrontendAppView(View):

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        try:

            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.

                Possibly the path %s is incorrect.
                """ % path,
                status=501,
            )
