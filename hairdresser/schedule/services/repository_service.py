from typing import Optional, Iterable, List
from django.db.models import QuerySet
# Импортируем модели DAO
from ..models import Client, Service, Master, Appointment

"""

    Данный модуль является промежуточным слоем приложения, который отделяет операции 
    для работы с моделями DAO от основной бизнес-логики приложения. Создание данного 
    слоя позволяет унифицировать функции работы с источником данных, и, например, если 
    в приложении нужно будет использовать другой framework для работы с БД, вы можете 
    создать новый модуль (repository_service_newframework.py) и реализовать в нем функции 
    с аналогичными названиями (get_weather_by_city_id, и т.д.). Новый модуль можно будет
    просто импортировать в модуль с основной бизнес-логикой, практически не меняя при этом
    остальной код.
    Также отделение функций работы с БД можно сделать через отдельный абстрактный класс и 
    использовать порождающий паттерн для переключения между необходимыми реализацииями.

"""

""" Работа с клиентами """
def get_clinet_by_id(client_id: int) -> Optional[Client]:
	""" Выборка одной записи о клиенте по идентификатору (PrimaryKey) """
	return Client.objects.filter(id=client_id).first()

def get_client_by_phone(phone: str) -> Optional[Client]:
	""" Выборка одной записи о клиенте по номеру телефона """
	return Client.objects.filter(phone=phone).first()

def get_client_by_name(name: str) -> Iterable[Client]:
	""" Выборка всех записей о клиентах по имени """
	return Client.objects.filter(name=name).all()


def create_client(name: str, phone: str, registration_date: str) -> int:
	""" Создание нового объекта Client и добавление записи о клиенте """
	existing_client = Client.objects.filter(phone=phone).first()
	if not existing_client:
		client = Client.objects.create(name=name, phone=phone, registration_date=registration_date)
		client.save()
	return client.id

def delete_client_by_id(client_id: int) -> None:
	""" Удаление записи о клиенте по идентификатору (PrimaryKey) """
	get_clinet_by_id(client_id).delete()


""" Работа с услугами """
def get_service_by_id(service_id: int) -> Optional[Service]:
	""" Выборка одной записи о услуге по идентификатору (PrimaryKey) """
	return Service.objects.filter(id=service_id).first()

def get_service_by_name(service_name: str) -> Iterable[Service]:	
	""" Выборка всех записей о услугах по имени """
	return Service.objects.filter(name=service_name).all()

def create_service(name: str, description: str, price: int, duration: int) -> int:
	""" Создание нового объекта Service и добавление записи о услуге """
	service = Service.objects.create(name=name, description=description, price=price, duration=duration)
	service.save()
	return service.id

def delete_service_by_id(service_id: int) -> None:
	""" Удаление записи о услуге по идентификатору (PrimaryKey) """
	get_service_by_id(service_id).delete()

""" Работа с мастерами """
def get_master_by_id(master_id: int) -> Optional[Master]:
	""" Выборка одной записи о мастере по идентификатору (PrimaryKey) """
	return Master.objects.filter(id=master_id).first()

def get_master_by_name(master_name: str) -> Iterable[Master]:
	""" Выборка всех записей о мастерах по имени """
	return Master.objects.filter(name=master_name).all()

def create_master(name: str, specialization: str, photo: str) -> int:
	""" Создание нового объекта Master и добавление записи о мастере """
	master = Master.objects.create(name=name, specialization=specialization, photo=photo)
	master.save()
	return master.id

def delete_master_by_id(master_id: int) -> None:
	""" Удаление записи о мастере по идентификатору (PrimaryKey) """
	get_master_by_id(master_id).delete()

""" Записи на приём """
def get_appointment_by_id(appointment_id: int) -> Optional[Appointment]:
	""" Выборка одной записи о приёме по идентификатору (PrimaryKey) """
	return Appointment.objects.filter(id=appointment_id).first()

def get_appointment_by_master_id(master_id: int) -> Iterable[Appointment]:
	""" Выборка всех записей о приёмах по идентификатору мастера """
	return Appointment.objects.filter(master_id=master_id).all()

def get_appointment_by_client_id(client_id: int) -> Iterable[Appointment]:
	""" Выборка всех записей о приёмах по идентификатору клиента """
	return Appointment.objects.filter(client_id=client_id).all()

def get_appointment_by_client_name(client_name: str) -> Iterable[Appointment]:
	""" Выборка всех записей о приёмах по имени клиента """
	return Appointment.objects.filter(client__name=client_name).all()

def get_appointment_by_datetime(datetime: str) -> Iterable[Appointment]:
	""" Выборка всех записей о приёмах по дате """
	return Appointment.objects.filter(datetime=datetime).all()

def create_appointment(client_id: int, service_id: int, master_id: int, datetime: str, status: str) -> None:
	""" Создание нового объекта Appointment и добавление записи о приёме """
	appointment = Appointment.objects.create(client_id=client_id, service_id=service_id, master_id=master_id, datetime=datetime, status=status)
	appointment.save()

def delete_appointment_by_id(appointment_id: int) -> None:
	""" Удаление записи о приёме по идентификатору (PrimaryKey) """
	get_appointment_by_id(appointment_id).delete()