from rest_framework import serializers
from .models import Client, Service, Master, Appointment

class ClientSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=False)
	name = serializers.CharField()
	phone = serializers.CharField()
	registration_date = serializers.DateTimeField(read_only=True)

class ServiceSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=False)
	name = serializers.CharField(max_length=100)
	price = serializers.DecimalField(max_digits=8, decimal_places=2)
	duration = serializers.DecimalField(max_digits=8, decimal_places=2, default=1)
	description = serializers.CharField(max_length=1000, required=False)

class MasterSerializer(serializers.Serializer):
	id = serializers.IntegerField(required=False)
	name = serializers.CharField(max_length=100)
	specialization = serializers.CharField(max_length=100)
	photo = serializers.CharField()
	# photo = serializers.ImageField(allow_null=True, use_url=True)
	# photo = serializers.ImageField()
	# photo = serializers.ImageField(upload_to='masters/')

class AppointmentSerializer(serializers.Serializer):
	# client = serializers.PrimaryKeyRelatedField(read_only=True)
	# service = serializers.PrimaryKeyRelatedField(read_only=True)
	# master = serializers.PrimaryKeyRelatedField(read_only=True)

	client = serializers.IntegerField()
	service = serializers.IntegerField()
	master = serializers.IntegerField()
	datetime = serializers.DateTimeField()
	status = serializers.CharField(max_length=20)
	# client = ClientSerializer(read_only=True)
	# service = ServiceSerializer(read_only=True)
	# master = MasterSerializer(read_only=True)
	# client_id = serializers.PrimaryKeyRelatedField(
	#     queryset=Client.objects.all(), source='client', write_only=True
	# )
	# service_id = serializers.PrimaryKeyRelatedField(
	#     queryset=Service.objects.all(), source='service', write_only=True
	# )
	# master_id = serializers.PrimaryKeyRelatedField(
	#     queryset=Master.objects.all(), source='master', write_only=True
	# )

class AppointmentSerializerV2(serializers.Serializer):
	client = serializers.PrimaryKeyRelatedField(read_only=True)
	service = serializers.PrimaryKeyRelatedField(read_only=True)
	master = serializers.PrimaryKeyRelatedField(read_only=True)
	datetime = serializers.DateTimeField()
	status = serializers.CharField(max_length=20)