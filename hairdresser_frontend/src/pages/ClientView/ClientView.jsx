import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
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
					api.get('masters/'),
					api.get('services/'),
				]);
				setMasters(Array.isArray(mastersRes.data['results']) ? mastersRes.data['results'] : []);
				setServices(Array.isArray(servicesRes.data['results']) ? servicesRes.data['results'] : []);
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
					let schedule_tmp = [];
					let page = 1;
					while(1){
						const response = await api.get(`appointments/?master_id=${selectedMaster.id}&page=${page}`);
						schedule_tmp = [...schedule_tmp, ...response.data.results];
						if (response.data.next === null) {
							setSchedule(schedule_tmp);
							break;
						}else{
							page++;
						}
					}
				} catch (error) {
					console.error('Ошибка загрузки расписания:', error);
				}
			};

			fetchSchedule();
		}
	}, [selectedMaster]);
	const fetchSchedule = async () => {
		if (!selectedMaster) return;
		try {
			let schedule_tmp = [];
			let page = 1;
			while(1){
				const response = await api.get(`appointments/?master_id=${selectedMaster.id}&page=${page}`);
				schedule_tmp = [...schedule_tmp, ...response.data.results];
				if (response.data.next === null) {
					setSchedule(schedule_tmp);
					break;
				}else{
					page++;
				}
			}
		} catch (error) {
			console.error('Ошибка загрузки расписания:', error);
		}
	};
	const onSlotClick = async (timeSlot) => {
		setSlot(timeSlot);
	}
	const handleBookAppointment = async () => {
		if (!selectedMaster || !selectedService || !contactInfo.name || !contactInfo.phone) {
			// alert('Пожалуйста, заполните все поля');
			setMessage((<div className="message message--error">Пожалуйста, заполните все поля</div>));
			return;
		}

		try {
			try {
				let client_id = 0;
				const is_client_exist = await api.get(`clients/?phone=${encodeURIComponent(contactInfo.phone)}`);
				if (is_client_exist.data.count > 0) {
					client_id = is_client_exist.data.results[0].id;
					// alert('Клиент уже зарегистрирован');
				} else {
					client_id = await api.post('clients/', {
						name: contactInfo.name,
						phone: contactInfo.phone,
					});
					client_id = client_id.data.id
					// alert('Клиент успешно зарегистрирован');
				}
				const timeSlot_date = dayjs(slot).set('minute', 0).set('second', 0).toDate();
				await api.post('appointments/', {
					master_id: selectedMaster.id,
					service_id: selectedService.id,
					datetime: timeSlot_date.toISOString(),
					client_id: client_id,
					status: 'pending',
				});
				await fetchSchedule();
				setMessage((<div className="message message--success">Запись успешно создана!</div>));
				// alert('Запись успешно создана!');
			} catch (error) {
				console.error('Ошибка создания клиента:', error);
				setMessage((<div className="message message--error">Ошибка при создании клиента</div>));
				// alert('Ошибка при создании клиента');
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