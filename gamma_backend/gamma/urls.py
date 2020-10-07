from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('volunteers/', views.ListVolunteers.as_view()),
    path('volunteers/<int:pk>/', views.DetailVolunteer.as_view()),
    path('opportunities/<int:pk>/', views.DetailOpportunities.as_view()),
    path('opportunities/', views.ListOpportunities.as_view()),
    path('skills/', views.ListSkill.as_view()),
    path('skills/<int:pk>', views.DetailSkill.as_view()),
    path('search/', views.get_search_results),
    path('volunteer_signups/', views.volunteer_signups),
    path('charity_signups/', views.charity_signups),
    path('current_user/', views.current_user),
    path('verify/', views.verify),
    path('users/',views.UserList.as_view()),
    path('charities/',views.CharityList.as_view()),
    path('charities/<int:pk>/', views.DetailCharity.as_view()),
    path('signups/', views.SignupList.as_view()),
    path('signups/<int:pk>/', views.DetailSignup.as_view())
]
