# Generated by Django 5.1.7 on 2025-03-30 15:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0007_service_duration_new_alter_service_duration'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='duration',
        ),
    ]
