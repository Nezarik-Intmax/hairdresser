// import React, { useState, useEffect } from 'react';
import ScheduleSlot from './ScheduleSlot';
import './Schedule.scss';

const ScheduleDay = ({ day, workHours, isSlotBooked, getAppointmentAtSlot, onSlotClick, isMasterView, position, selected_slot  }) => {
	const isSameSlot = (slot, day, hour) => {
		if(slot == null) return false
		return slot[0] != null && slot[0].isSame(day.hour(hour), 'hour');
	};
	
	// const [appointments, setAppointments] = useState([]);
	const getSlots1 = () => {
		let duration = 0;
		const slots1 = [];
		for (let i = 0; i < workHours.end - workHours.start; i++) {
			let appointment = getAppointmentAtSlot(day, workHours.start + i)
			if (duration === 0) {
				duration = appointment ? appointment.service.duration - 1 : 0;
				let is_selected = isSameSlot(selected_slot, day, workHours.start + i);
				if(is_selected) {
					duration = selected_slot && selected_slot[1] - 1;
				}
				slots1.push(
					<ScheduleSlot
						key={i}
						day={day}
						hour={workHours.start + i}
						isBooked={isSlotBooked(day, workHours.start + i)}
						appointment={appointment ? appointment : {service: {duration: 0}}}
						duration={appointment ? appointment.service.duration : duration+1}
						onSlotClick={onSlotClick}
						isMasterView={isMasterView}
						is_selected={is_selected}
					/>
				);
			} else {
				duration--;
			}
		}
		return slots1;
	};
	const slots = getSlots1();
	// const [slots, setSlots] = useState(<>{getSlots1()}</>);


	// setAppointments(Array.from({ length: workHours.end - workHours.start }, (_, j) => getAppointmentAtSlot(day, workHours.start + j)));
	return (
		<div className="schedule__day" style={{ "--block-position": position + "px" }}>
			<div className="schedule__date_wrap">
				<div className="schedule__date_bg"></div>
				<div className="schedule__date">
					<span>{day.format('DD.MM')}</span>
				</div>
			</div>
			<ul className="schedule__slots">
				{slots.map((item, index) => (
					item
				))}
			</ul>
		</div>
	);
};

export default ScheduleDay;
