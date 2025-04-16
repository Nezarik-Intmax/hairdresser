from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.renderers import JSONRenderer
from datetime import datetime
from rest_framework import status
from .serializers import (
	ClientSerializer, 
	ServiceSerializer, 
	MasterSerializer, 
	AppointmentSerializer,
	AppointmentSerializerV2
)
from .services.repository_service import *

class GetAllClients(GenericAPIView):
	serializer_class = ClientSerializer
	renderer_classes = [JSONRenderer]  

	def get(self, request, *args, **kwargs):
		""" Получение всех клиентов """
		response = get_all_clients()
		response = self.serializer_class(response, many=True).data
		return Response(data=response)
	
	def post(self, request, *args, **kwargs) -> Response:
		""" Добавление нового клиента """
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			registration_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
			response = create_client(serializer.data['name'], serializer.data['phone'], registration_date)
			return Response(data=response, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def put(self, request, *args, **kwargs) -> Response:
		""" Обновление клиента по идентификатору """
		serializer = ClientSerializer(data=request.data)
		if serializer.is_valid():
			response = update_client_by_id(serializer.data['id'], serializer.data['name'], serializer.data['phone'])
			return Response(data=response, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, *args, **kwargs) -> Response:
		""" Удаление клиента по идентификатору """
		serializer = ClientSerializer(data=request.data)
		if serializer.is_valid():
			response = delete_client_by_id(serializer.data['id'])
			return Response(data=response, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetDeleteByPhoneClient(GenericAPIView):
	serializer_class = ClientSerializer
	renderer_classes = [JSONRenderer]
	
	def get(self, request, phone: str) -> Response:
		""" Поиск клиента по номеру телефона """
		response = get_client_by_phone(phone)
		response = self.serializer_class(response).data
		return Response(data=response)
	
	def delete(self, request, phone: str) -> Response:
		""" Удаление клиента по номеру телефона """
		delete_client_by_phone(phone)
		return Response(status=status.HTTP_200_OK)


class GetAllServices(GenericAPIView):
	serializer_class = ServiceSerializer
	renderer_classes = [JSONRenderer]

	def get(self, request, *args, **kwargs):
		""" Получение всех услуг """
		response = get_all_services()
		response = self.serializer_class(response, many=True).data
		return Response(data=response)
	
	def post(self, request, *args, **kwargs) -> Response:
		""" Добавление новой услуги """
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			response = create_service(serializer.data['name'], serializer.data['price'], serializer.data['duration'])
			return Response(data=response, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, *args, **kwargs) -> Response:
		""" Удаление услуги по идентификатору """
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			delete_service_by_id(serializer.data['id'])
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAllMasters(GenericAPIView):
	serializer_class = MasterSerializer
	renderer_classes = [JSONRenderer]

	def get(self, request, *args, **kwargs):
		""" Получение всех мастеров """
		response = get_all_masters()
		response = self.serializer_class(response, many=True).data
		return Response(data=response)
	
	def post(self, request, *args, **kwargs) -> Response:
		""" Добавление нового мастера """
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			response = create_master(serializer.data['name'], serializer.data['specialization'], serializer.data['photo'])
			return Response(data=response, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, id: int) -> Response:
		""" Удаление мастера по идентификатору """
		delete_master_by_id(id)
		return Response(status=status.HTTP_204_NO_CONTENT)

class GetAllAppointments(GenericAPIView):
	serializer_class = AppointmentSerializer
	serializer_class2 = AppointmentSerializerV2
	renderer_classes = [JSONRenderer]

	def get(self, request, *args, **kwargs):
		""" Получение всех записей """
		response = get_all_appointments()
		response = self.serializer_class2(response, many=True).data
		return Response(data=response)
	
	
	def post(self, request, *args, **kwargs) -> Response:
		""" Добавление новой записи """
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			create_appointment(serializer.data['client'], serializer.data['service'], serializer.data['master'], serializer.data['datetime'], serializer.data['status'])
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, id: int) -> Response:
		""" Удаление записи по идентификатору """
		delete_appointment_by_id(id)
		return Response(status=status.HTTP_204_NO_CONTENT)

class GetDeleteByMasterAppointments(GenericAPIView):
	serializer_class = AppointmentSerializer
	renderer_classes = [JSONRenderer]
	def get(self, request, master_id: int, *args, **kwargs):
		""" Получение всех записей по идентификатору мастера """
		appointments = get_appointment_by_master_id(master_id)
		serializer = self.serializer_class(appointments, many=True)
		return Response(data=serializer.data, status=status.HTTP_200_OK)
	# def delete(self, request, id: int) -> Response:
	# 	""" Delete appointment by id """
	# 	delete_appointment_by_id(id)
	# 	return Response(status=status.HTTP_204_NO_CONTENT)