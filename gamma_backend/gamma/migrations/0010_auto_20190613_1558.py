# Generated by Django 2.2.1 on 2019-06-13 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0009_auto_20190613_1555'),
    ]

    operations = [
        migrations.AlterField(
            model_name='volunteer',
            name='experiences',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='volunteer_experiences', to='gamma.Skill'),
        ),
    ]
