# Generated by Django 2.2.1 on 2019-06-14 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0017_charity_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='charity',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images '),
        ),
    ]
