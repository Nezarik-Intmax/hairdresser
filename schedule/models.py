from django.db import models

class Client(models.Model):
	name = models.CharField(max_length=100)
	phone = models.CharField(max_length=20)
	email = models.EmailField(blank=True)
	registration_date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

class Service(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	price = models.DecimalField(max_digits=8, decimal_places=2)
	duration = models.DurationField()

	def __str__(self):
		return self.name + " - $" + str(self.price)

class Master(models.Model):
	name = models.CharField(max_length=100)
	specialization = models.CharField(max_length=100)
	photo = models.ImageField(upload_to='masters/')

	def __str__(self):
		return f"{self.name} - {self.specialization}"

class Appointment(models.Model):
	client = models.ForeignKey(Client, on_delete=models.CASCADE)
	service = models.ForeignKey(Service, on_delete=models.CASCADE)
	master = models.ForeignKey(Master, on_delete=models.CASCADE)
	datetime = models.DateTimeField()
	status = models.CharField(max_length=20, choices=[
		('pending', 'Ожидает'),
		('confirmed', 'Подтвержден'),
		('completed', 'Завершен'),
		('cancelled', 'Отменен')
	])
	def __str__(self):
		return f"{self.client.name} - {self.service.name} at {self.datetime}"