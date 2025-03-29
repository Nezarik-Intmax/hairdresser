from django.contrib import admin

# Register your models here.
from .models import Client, Master, Service, Appointment

admin.site.register(Client)
admin.site.register(Master)
admin.site.register(Service)
admin.site.register(Appointment)
