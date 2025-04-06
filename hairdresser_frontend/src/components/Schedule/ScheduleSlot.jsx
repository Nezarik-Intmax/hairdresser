import React from 'react';
import { Button } from '@mui/material';
import './Schedule.scss';

const ScheduleSlot = ({ day, hour, isBooked, appointment, onSlotClick, isMasterView }) => {
	const handleClick = () => {
		if (isBooked) {
			onSlotClick(appointment);
		} else {
			onSlotClick(day.hour(hour));
		}
	};

	return (
		<li
			className={`schedule__slot ${isBooked ? 'schedule__slot--booked' : 'schedule__slot--available'} schedule__slot--duration-${parseInt(appointment.service.duration)}`}
			onClick={handleClick}
			data-disabled={isBooked && !isMasterView}>
			{isMasterView ? (
				<div className="appointment-info" data-duration={appointment.service.duration}>
					<div>{appointment.service.name}</div>
					{isMasterView && <div>{appointment.client_name}</div>}
				</div>
			) : (
				isBooked ? (
					`Занято`
				) : (
					`${hour}:00`
				)
			)}

		</li>
	);
};

export default ScheduleSlot;