from django.contrib import admin

from .models import Volunteer, Opportunity, Skill, RootUser, Charity, Signup

admin.site.register(Volunteer)
admin.site.register(Opportunity)
admin.site.register(Skill)
admin.site.register(RootUser)
admin.site.register(Charity)
admin.site.register(Signup)
