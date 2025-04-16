from locust import HttpUser, task, tag, between
from datetime import datetime
import random
import json
import base64

STATUSES = ["pending", "confirmed", "completed", "cancelled"]


class HairdresserUser(HttpUser):
	# время ожидания пользователя перед выполнением новой task
	wait_time = between(1.0, 5.0)

	# API endpoints
	API_PREFIX = "/api"
	CLIENTS_URL = f"{API_PREFIX}/clients"
	APPOINTMENTS_URL = f"{API_PREFIX}/appointments"
	SERVICES_URL = f"{API_PREFIX}/services"
	MASTERS_URL = f"{API_PREFIX}/masters"

	def on_start(self):
		self.client.get("/swagger/")
		self.headers = {
			"Content-Type": "application/json",
		}

	@task(2)
	def view_clients(self):
		with self.client.get(self.CLIENTS_URL,
							 catch_response=True,
							 name=self.CLIENTS_URL) as response:
			# Если получаем код HTTP-код 200, то оцениваем запрос как "успешный"
			if response.status_code == 200:
				response.success()
			# Иначе обозначаем как "отказ"
			else:
				response.failure(f'Status code is {response.status_code}')


	@task(5)
	def view_services(self):
		with self.client.get(self.SERVICES_URL,
							 catch_response=True,
							 name=self.SERVICES_URL) as response:
			# Если получаем код HTTP-код 200, то оцениваем запрос как "успешный"
			if response.status_code == 200:
				response.success()
			# Иначе обозначаем как "отказ"
			else:
				response.failure(f'Status code is {response.status_code}')

	@task(5)
	def view_masters(self):
		with self.client.get(self.MASTERS_URL,
							 catch_response=True,
							 name=self.MASTERS_URL) as response:
			# Если получаем код HTTP-код 200, то оцениваем запрос как "успешный"
			if response.status_code == 200:
				response.success()
			# Иначе обозначаем как "отказ"
			else:
				response.failure(f'Status code is {response.status_code}')

	@task(5)
	def view_appointments(self):
		with self.client.get(self.APPOINTMENTS_URL,
							 catch_response=True,
							 name=self.APPOINTMENTS_URL) as response:
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

	
	@task(1)
	def update_client(self):
		with self.client.get(self.CLIENTS_URL, headers=self.headers, catch_response=True) as response:
			clients = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		if clients:
			client_id = random.choice(clients)["id"]
			client_data = {
				"id": client_id,
				"name": ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(5, 20))),
				"phone": ''.join(random.choices('0123456789', k=11)),
			}
			client_data = json.dumps(client_data)
			with self.client.put(
					f"{self.CLIENTS_URL}",
					data=client_data,
					headers=self.headers,
					catch_response=True,
					name=f"{self.CLIENTS_URL}"
			) as response:
				if response.status_code == 200:
					response.success()
				else:
					response.failure(f'Status code is {response.status_code}')


	@task(2)
	def view_client_by_phone(self):
		with self.client.get(self.CLIENTS_URL, headers=self.headers, catch_response=True) as response:
			clients = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		if clients:
			client_phone = random.choice(clients)["phone"]
			with self.client.get(f"{self.CLIENTS_URL}/{client_phone}",
								catch_response=True,
								name=self.CLIENTS_URL) as response:
				# Если получаем код HTTP-код 200, то оцениваем запрос как "успешный"
				if response.status_code == 200:
					response.success()
				# Иначе обозначаем как "отказ"
				else:
					response.failure(f'Status code is {response.status_code}')