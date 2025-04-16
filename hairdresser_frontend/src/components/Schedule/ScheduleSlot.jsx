import React from 'react';
import './Schedule.scss';

const ScheduleSlot = ({ day, hour, isBooked, appointment, duration, onSlotClick, isMasterView, is_selected }) => {
	// const [is_selected, setIsSelected] = React.useState(false);
	const handleClick = () => {
		if (isBooked) {
			// onSlotClick(appointment);
		} else {
			// setIsSelected(true);
			onSlotClick(day.hour(hour));
		}
	};

	return (
		<li
			key={hour}
			className={
				`schedule__slot 
				schedule__slot--duration-${parseInt(duration)} 
				${isBooked ? 'schedule__slot--booked' : 'schedule__slot--available'} 
				${is_selected ? 'schedule__slot--selected' : ''}`}
			onClick={handleClick}
			data-disabled={isBooked && !isMasterView}>
			{isMasterView ? (
				isBooked ? (
					<div className="schedule__slot_info" data-duration={appointment.service.duration}>
						<div>{appointment.service.name}</div>
						<div>{appointment.client.name}</div>
					</div>
				) : (
					`${hour}:00`
				)
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