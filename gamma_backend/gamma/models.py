from django.db import models
from django.contrib.auth.models import AbstractUser

class RootUser(AbstractUser):
    volunteer = models.ForeignKey(
        'Volunteer',
        related_name="volunteer",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    charity = models.ForeignKey(
        'Charity',
        related_name="charity",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%d" % self.id

class Signup(models.Model):
    accepted = models.BooleanField()
    cover_letter = models.CharField(
        max_length=200,
        null=True,
        blank=True)

    volunteer = models.ForeignKey(
        'Volunteer',
        related_name="signup_volunteer",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )

    opportunity = models.ForeignKey(
        'Opportunity',
        related_name="signup_opportunity",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )

    def __str__(self):
        return "%d" % self.id

class Volunteer(models.Model):
    image = models.ImageField(default='default.png')
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    dob = models.CharField(max_length=200)
    home = models.CharField(max_length=200)
    bio = models.CharField(max_length=500)
    skills = models.ForeignKey(
        'Skill',
        related_name="volunteer_skills",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    learnings = models.ForeignKey(
        'Skill',
        related_name="volunteer_learnings",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    experiences = models.ForeignKey(
        'Skill',
        related_name="volunteer_experiences",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

class Charity(models.Model):
    name = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    mission = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Opportunity(models.Model):
    image = models.ImageField(default='default.png')
    testimonial = models.CharField(max_length=500)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    address = models.CharField(max_length=30, default=None)
    date = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    duration = models.IntegerField(default=1)

    skills = models.ForeignKey(
        'Skill',
        on_delete=models.CASCADE,
        default=0
    )

    charity = models.ForeignKey(
        'Charity',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title

class Skill(models.Model):
    communication = models.IntegerField(default=0)
    technical = models.IntegerField(default=0)
    finance = models.IntegerField(default=0)
    marketing = models.IntegerField(default=0)
    medical = models.IntegerField(default=0)
    teamwork = models.IntegerField(default=0)
    problem_solving = models.IntegerField(default=0)
    creativity = models.IntegerField(default=0)
    craftmanship = models.IntegerField(default=0)

    def __str__(self):
        return "Skill id: %d" % self.id
