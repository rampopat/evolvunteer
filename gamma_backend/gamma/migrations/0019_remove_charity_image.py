# Generated by Django 2.2.1 on 2019-06-14 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0018_auto_20190614_0039'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='charity',
            name='image',
        ),
    ]
