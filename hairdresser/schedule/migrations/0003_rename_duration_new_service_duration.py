# Generated by Django 5.1.7 on 2025-03-30 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_remove_service_duration_service_duration_new'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='duration_new',
            new_name='duration',
        ),
    ]
