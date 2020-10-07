from rest_framework import serializers
from gamma.models import Volunteer, Opportunity, Skill, RootUser, Charity, Signup
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = RootUser
        fields = ('username','volunteer', 'charity',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = RootUser
        fields = ('token', 'username', 'password', 'volunteer', 'charity')

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'surname',
            'dob',
            'home',
            'skills',
            'learnings',
            'experiences',
            'bio',
            'image'

        )
        model = Volunteer

class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'number',
            'mission',
        )
        model = Charity

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'title',
            'description',
            'address',
            'date',
            'address',
            'skills',
            'charity',
            'duration',
            'image',
            'testimonial'
        )
        model = Opportunity

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'volunteer',
            'opportunity',
            'accepted',
            'cover_letter'
        )
        model = Signup

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'communication',
            'technical',
            'finance',
            'marketing',
            'medical',
            'teamwork',
            'problem_solving',
            'creativity',
            'craftmanship'
        )
        model = Skill
