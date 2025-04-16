import React, { useState, useEffect } from 'react';
import MasterSelect from '../../components/MasterSelect/MasterSelect';
import ServiceSelect from '../../components/ServiceSelect/ServiceSelect';
import ContactForm from '../../components/ContactForm/ContactForm';
import Schedule from '../../components/Schedule/Schedule';
import Title from '../../components/Title/Title';
import api from '../../services/api';
import dayjs from 'dayjs';
import './MasterView.scss';

const MasterView = () => {
	const [selectedMaster, setSelectedMaster] = useState({"id":3});
	const [schedule, setSchedule] = useState([]);
	const [message, setMessage] = useState();
	const [slot, setSlot] = useState(null);

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
	const onSlotClick = (slot) => {}
	const handleBookAppointment = () => {}

	return (
		<div className="main">
			<div className="container">
				<Title h="h1">Мое расписание</Title>
				<Schedule
					schedule={schedule}
					onSlotClick={onSlotClick}
					isMasterView={true}
					handleBookAppointment={handleBookAppointment}
					selected_slot={slot}
				/>
				<div className="message__box">
					{message}
				</div>

			</div>
		</div>
	);
};

export default MasterView;