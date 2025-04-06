from locust import HttpUser, task, between
import random

class HairdresserUser(HttpUser):
    wait_time = between(1, 3)  # Время ожидания между запросами
    
    # API endpoints
    API_PREFIX = "/api"
    CLIENTS_URL = f"{API_PREFIX}/clients/"
    APPOINTMENTS_URL = f"{API_PREFIX}/appointments/"
    SERVICES_URL = f"{API_PREFIX}/services/"
    MASTERS_URL = f"{API_PREFIX}/masters/"
    
    def on_start(self):
        self.headers = {
            "Content-Type": "application/json",
        }
    
    @task(3)
    def view_services(self):
        self.client.get(self.SERVICES_URL, headers=self.headers)
    
    @task(2)
    def view_masters(self):
        self.client.get(self.MASTERS_URL, headers=self.headers)
    
    @task(1)
    def create_appointment(self):
        services = self.client.get(self.SERVICES_URL, headers=self.headers).json()
        masters = self.client.get(self.MASTERS_URL, headers=self.headers).json()
        if services and masters:
            service_id = random.choice(services['results'])["id"]
            master_id = random.choice(masters['results'])["id"]
            
            appointment_data = {
                "service_id": service_id,
                "master_id": master_id,
                "datetime": "2025-03-31T21:31:00",
                "client_id": 1,
                "status": 'pending'
            }
            print(appointment_data)
            a = self.client.post(
                self.APPOINTMENTS_URL,
                json=appointment_data,
                headers=self.headers
            )
            print(a)
    
    @task(4)
    def view_appointments(self):
        self.client.get(self.APPOINTMENTS_URL, headers=self.headers)