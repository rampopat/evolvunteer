# Generated by Django 2.2.1 on 2019-06-16 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0025_opportunity_duration'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='image',
            field=models.ImageField(default='default.png', upload_to=''),
        ),
    ]