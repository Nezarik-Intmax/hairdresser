# from django.shortcuts import render

# # Create your views here.
# from django.http import HttpResponse


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

from rest_framework import viewsets
from .models import Client, Service, Master, Appointment
from .serializers import (
    ClientSerializer, 
    ServiceSerializer, 
    MasterSerializer, 
    AppointmentSerializer
)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class MasterViewSet(viewsets.ModelViewSet):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Фильтрация по клиенту
        client_id = self.request.query_params.get('client_id')
        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)
        # Фильтрация по мастеру
        master_id = self.request.query_params.get('master_id')
        if master_id is not None:
            queryset = queryset.filter(master_id=master_id)
        # Фильтрация по статусу
        status = self.request.query_params.get('status')
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset