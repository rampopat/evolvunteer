# Generated by Django 2.2.1 on 2019-06-13 14:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0003_signup_accepted'),
    ]

    operations = [
        migrations.AddField(
            model_name='volunteer',
            name='experiences',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='volunteer_experiences', to='gamma.Skill'),
        ),
    ]
