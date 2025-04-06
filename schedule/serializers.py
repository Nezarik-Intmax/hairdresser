from rest_framework import serializers
from .models import Client, Service, Master, Appointment

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'phone', 'email', 'registration_date']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'duration']

class MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = ['id', 'name', 'specialization', 'photo']

class AppointmentSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    master = MasterSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source='client', write_only=True
    )
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), source='service', write_only=True
    )
    master_id = serializers.PrimaryKeyRelatedField(
        queryset=Master.objects.all(), source='master', write_only=True
    )
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'client', 'service', 'master', 
            'client_id', 'service_id', 'master_id',
            'datetime', 'status'
        ]