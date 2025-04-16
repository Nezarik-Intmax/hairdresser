import React, { useState, useEffect } from 'react';
import MasterSelect from '../../components/MasterSelect/MasterSelect';
import ServiceSelect from '../../components/ServiceSelect/ServiceSelect';
import ContactForm from '../../components/ContactForm/ContactForm';
import Schedule from '../../components/Schedule/Schedule';
import Title from '../../components/Title/Title';
import api from '../../services/api';
import dayjs from 'dayjs';
import './ClientView.scss';

const ClientView = () => {
	const [selectedMaster, setSelectedMaster] = useState(null);
	const [selectedService, setSelectedService] = useState(null);
	const [masters, setMasters] = useState([]);
	const [services, setServices] = useState([]);
	const [schedule, setSchedule] = useState([]);
	const [contactInfo, setContactInfo] = useState({
		name: '',
		phone: '',
	});
	const [message, setMessage] = useState();
	const [slot, setSlot] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [mastersRes, servicesRes] = await Promise.all([
					api.get('masters'),
					api.get('services'),
				]);
				setMasters(Array.isArray(mastersRes.data) ? mastersRes.data : []);
				setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
			} catch (error) {
				console.error('Ошибка загрузки данных:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (selectedMaster) {
			const fetchSchedule = async () => {
				try {
					const response = await api.get(`appointments/${selectedMaster.id}`);
					setSchedule(response.data);
				} catch (error) {
					setMessage((<div className="message message--error">Ошибка загрузки расписания</div>));
					console.error('Ошибка загрузки расписания:', error);
				}
			};

			fetchSchedule();
		}
	}, [selectedMaster]);
	const fetchSchedule = async () => {
		if (!selectedMaster) return;
		try {
			const response = await api.get(`appointments/${selectedMaster.id}`);
			setSchedule(response.data);
		} catch (error) {
			setMessage((<div className="message message--error">Ошибка загрузки расписания</div>));
			console.error('Ошибка загрузки расписания:', error);
		}
	};
	const onSlotClick = async (timeSlot) => {
		setSlot([timeSlot, selectedService ? selectedService.duration : 1]);
	}
	const handleBookAppointment = async () => {
		if (!selectedMaster || !selectedService || !contactInfo.name || !contactInfo.phone) {
			// alert('Пожалуйста, заполните все поля');
			setMessage((<div className="message message--error">Пожалуйста, заполните все поля</div>));
			return;
		}

		try {
			let client_id = 0;
			try {
				const is_client_exist = await api.get(`clients/${encodeURIComponent(contactInfo.phone)}`);
				if (is_client_exist.data.id > 0) {
					client_id = is_client_exist.data.id;
					console.log('Клиент уже зарегистрирован');
					// alert('Клиент уже зарегистрирован');
				} else {
					client_id = await api.post('clients', {
						name: contactInfo.name,
						phone: contactInfo.phone,
					});
					client_id = client_id.data
					console.log('Клиент успешно зарегистрирован');
					// alert('Клиент успешно зарегистрирован');
				}
			} catch (error) {
				console.error('Ошибка создания клиента:', error);
				setMessage((<div className="message message--error">Ошибка при создании клиента</div>));
				// alert('Ошибка при создании клиента');
			} finally {
				console.log(client_id);
				if (client_id) {
					const timeSlot_date = dayjs(slot[0]).set('minute', 0).set('second', 0).toDate();
					await api.post('appointments', {
						master: selectedMaster.id,
						service: selectedService.id,
						client: client_id,
						datetime: timeSlot_date.toISOString(),
						status: 'pending',
					});
					await fetchSchedule();
					setMessage((<div className="message message--success">Запись успешно создана!</div>));
					// alert('Запись успешно создана!');
				}
			}
		} catch (error) {
			console.error('Ошибка создания записи:', error);
			setMessage((<div className="message message--error">Ошибка при создании записи</div>));
			// alert('Ошибка при создании записи');
		}
	};

	return (
		<div className="main">
			<div className="container">
				<Title h="h1">Запись на приём</Title>
				<div className="filter">
					<MasterSelect masters={masters} selectedMaster={selectedMaster} onChange={setSelectedMaster} />
					<ServiceSelect services={services} selectedService={selectedService} onChange={setSelectedService} />
					<ContactForm contactInfo={contactInfo} setContactInfo={setContactInfo} />
				</div>
				{selectedMaster && (
					<Schedule
						schedule={schedule}
						onSlotClick={onSlotClick}
						isMasterView={false}
						handleBookAppointment={handleBookAppointment}
						selected_slot={slot}
					/>
				)}
				<div className="message__box">
					
					{message}
				</div>

			</div>
		</div>
	);
};

export default ClientView;