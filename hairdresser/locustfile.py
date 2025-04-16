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

	@task(2)
	def create_client(self):
		client_data = {
			"name": ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(5, 20))),
			"phone": ''.join(random.choices('0123456789', k=11)),
		}
		client_data = json.dumps(client_data)
		with self.client.post(self.CLIENTS_URL,
							  catch_response=True,
							  name=self.CLIENTS_URL, data=client_data,
							  headers=self.headers) as response:
			if response.status_code == 201:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

	@task(1)
	def create_master(self):
		with open('master.png', 'rb') as image_file:
			photo_base64 = base64.b64encode(image_file.read()).decode('utf-8')
		master_data = {
			"name": ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(5, 20))),
			"specialization": ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(5, 20))),
			"photo": f"data:image/png;base64,{photo_base64}",
		}
		master_data = json.dumps(master_data)
		with self.client.post(self.MASTERS_URL,
							  catch_response=True,
							  name=self.MASTERS_URL, 
								data=master_data,
							  headers=self.headers) as response:
			if response.status_code == 201:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

	@task(1)
	def create_service(self):
		service_data = {
			"name": ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(5, 20))),
			"price": str(random.randint(100, 1000)),
			"duration": str(random.randint(1, 3)),
		}
		service_data = json.dumps(service_data)
		print(service_data)
		with self.client.post(self.SERVICES_URL,
							  catch_response=True,
							  name=self.SERVICES_URL, 
							  data=service_data,
							  headers=self.headers) as response:
			if response.status_code == 201:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code} {response.text}')

	@task(2)
	def create_appointment(self):
		with self.client.get(self.SERVICES_URL, headers=self.headers, catch_response=True) as response:
			services = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		with self.client.get(self.MASTERS_URL, headers=self.headers, catch_response=True) as response:
			masters = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		with self.client.get(self.CLIENTS_URL, headers=self.headers, catch_response=True) as response:
			clients = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		if services and masters and clients:
			service_id = random.choice(services)["id"]
			master_id = random.choice(masters)["id"]
			client_id = random.choice(clients)["id"]
			status = random.choice(STATUSES)

			appointment_data = {
				"service": service_id,
				"master": master_id,
				"client": client_id,
				"datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
				"status": status
			}
			appointment_data = json.dumps(appointment_data)
			with self.client.post(
					self.APPOINTMENTS_URL,
					data=appointment_data,
					headers=self.headers,
					catch_response=True,
					name=self.APPOINTMENTS_URL
			) as response:
				if response.status_code == 201:
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
	
	@task(1)
	def delete_client_by_phone(self):
		with self.client.get(self.CLIENTS_URL, headers=self.headers, catch_response=True) as response:
			clients = response.json()
			if response.status_code == 200:
				response.success()
			else:
				response.failure(f'Status code is {response.status_code}')

		if clients:
			client_phone = random.choice(clients)["phone"]
			with self.client.delete(f"{self.CLIENTS_URL}/{client_phone}",
								catch_response=True,
								name=self.CLIENTS_URL) as response:
				# Если получаем код HTTP-код 200, то оцениваем запрос как "успешный"
				if response.status_code == 200:
					response.success()
				# Иначе обозначаем как "отказ"
				else:
					response.failure(f'Status code is {response.status_code}')

