import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ScheduleDay from './ScheduleDay';
import './Schedule.scss';

const Schedule = ({ schedule, onSlotClick, isMasterView }) => {
	const daysToShow = 10;
	const workHours = { start: 10, end: 18 };
	// const [days, setDays] = useState([]);
	const [offset, setOffset] = useState(0);

	const generateDays = () => {
		return Array.from({ length: daysToShow }, (_, i) => dayjs().add(i, 'day'));
	};


	const isSlotBooked = (day, hour) => {
		return schedule.some(appointment => {
			const appointmentTime = dayjs(appointment.datetime);
			return (
				appointmentTime.isSame(day, 'day') &&
				appointmentTime.hour() === hour &&
				appointment.status !== 'cancelled'
			);
		});
	};

	const getAppointmentAtSlot = (day, hour) => {
		return schedule.find(appointment => {
			const appointmentTime = dayjs(appointment.datetime);
			return (
				appointmentTime.isSame(day, 'day') &&
				appointmentTime.hour() === hour
			);
		});
	};

	useEffect(() => {
		const schedule_dom = document.querySelector('.schedule');
		schedule_dom.addEventListener("scroll", (e) => {
			setOffset(e.target.scrollLeft);
		})
	}, []);

	return (
		<div className="schedule__wrap">
			<div className="schedule__line"></div>
			<div className="schedule">
				{generateDays().map((day, i) => (
					<ScheduleDay
						key={i}
						day={day}
						workHours={workHours}
						isSlotBooked={isSlotBooked}
						getAppointmentAtSlot={getAppointmentAtSlot}
						onSlotClick={onSlotClick}
						isMasterView={isMasterView}
						position={i * 174 - offset} />
				))}
			</div>
		</div>
	);
};

export default Schedule;