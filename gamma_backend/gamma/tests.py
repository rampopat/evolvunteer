from django.test import TestCase
from gamma.models import Volunteer


class VolunteerModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Volunteer.objects.create(name='Michal')
        Volunteer.objects.create(name='Zoltan')

    def test_name_content(self):
        volunteer = Volunteer.objects.get(pk=1)
        expected_name = f'{volunteer.name}'
        self.assertEquals(expected_name, 'Michal')
