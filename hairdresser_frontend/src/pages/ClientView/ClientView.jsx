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
					const response = await api.get(`appointments/?master_id=${selectedMaster.id}`);
					setSchedule(Array.isArray(response.data['results']) ? response.data['results'] : []);
				} catch (error) {
					console.error('Ошибка загрузки расписания:', error);
				}
			};

			fetchSchedule();
		}
	}, [selectedMaster]);

	const handleBookAppointment = async (timeSlot) => {
		if (!selectedMaster || !selectedService || !contactInfo.name || !contactInfo.phone) {
			alert('Пожалуйста, заполните все поля');
			return;
		}

		try {
			await api.post('appointments/', {
				master: selectedMaster.id,
				service: selectedService.id,
				datetime: timeSlot.toISOString(),
				client_name: contactInfo.name,
				client_phone: contactInfo.phone,
			});
			alert('Запись успешно создана!');
		} catch (error) {
			console.error('Ошибка создания записи:', error);
			alert('Ошибка при создании записи');
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
						onSlotClick={handleBookAppointment}
						isMasterView={false}
					/>
				)}

			</div>
		</div>
	);
};

export default ClientView;