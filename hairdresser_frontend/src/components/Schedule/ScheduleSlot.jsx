import React from 'react';
import './Schedule.scss';

const ScheduleSlot = ({ day, hour, isBooked, appointment, onSlotClick, isMasterView }) => {
	const [is_selected, setIsSelected] = React.useState(false);
	const handleClick = () => {
		if (isBooked) {
			onSlotClick(appointment);
		} else {
			// setIsSelected(true);
			onSlotClick(day.hour(hour));
		}
	};

	return (
		<li
			className={`schedule__slot ${isBooked ? 'schedule__slot--booked' : 'schedule__slot--available'} schedule__slot--duration-${parseInt(appointment.service.duration)} ${is_selected ? 'schedule__slot--selected' : ''}`}
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