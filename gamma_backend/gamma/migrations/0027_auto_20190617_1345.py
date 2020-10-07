# Generated by Django 2.2.1 on 2019-06-17 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gamma', '0026_volunteer_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='opportunity',
            name='image',
            field=models.ImageField(default='default.png', upload_to=''),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='testimonial',
            field=models.CharField(default='', max_length=500),
            preserve_default=False,
        ),
    ]
