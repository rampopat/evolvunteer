# Generated by Django 2.2.1 on 2019-06-13 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0010_auto_20190613_1558'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='volunteer',
            name='experiences',
        ),
    ]