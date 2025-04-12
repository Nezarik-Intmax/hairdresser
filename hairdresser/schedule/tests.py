from django.test import TestCase
from .services.repository_service import *

class TestScheduleService(TestCase):
    """ Все тестовые методы в классе TestCase (по соглашению)
        должны начинаться с префикса test_* """

    def setUp(self):
        """ Наследуемый метод setUp определяет инструкции,
            которые должны быть выполнены ПЕРЕД тестированием """
        # создаем тестовые записи
        client_id = create_client('Test_name', '+79999999999', '2025-04-13 00:00:00')
        service_id = create_service('Test_service', "Description", 1000, 1)
        master_id = create_master('Test_master', 'Test_specialization', '/media/placeholder.png')
        create_appointment(client_id, service_id, master_id, '2025-04-13 00:00:00', 'pending')

    def test_get_appointment(self):
        """ Тест функции поиска записи Weather по наименованию населённого пункта """
        appointment = get_appointment_by_client_name(client_name='Test_name')
        for row in appointment:
            print(row)
            self.assertIsNotNone(row)  # запись должна существовать
            # self.assertTrue(row.city_id == 1)  # идентификатор city_id == 1 (т.е. город UFA в таблице city)
            # self.assertTrue(row.city.name == 'UFA')  # проверка связи по FK

    # def test_delete_weather(self):
    #     """ Тест функции удаления записи Weather по наименованию населённого пункта """
    #     delete_weather_by_city_name(city_name='UFA')
    #     result = get_weather_by_city_id(city_id=1)  # ищем запись по идентификатору города UFA
    #     self.assertIsNone(result)  # запись не должна существовать

    def tearDown(self):
        """ Наследуемый метод tearDown определяет инструкции,
            которые должны быть выполнены ПОСЛЕ тестирования """
        pass

