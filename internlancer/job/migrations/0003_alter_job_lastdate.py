# Generated by Django 4.0.4 on 2022-05-28 17:00

from django.db import migrations, models
import job.models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_candidatesapplied'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='lastDate',
            field=models.DateTimeField(default=job.models.Getdatetime),
        ),
    ]
