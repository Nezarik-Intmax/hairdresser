import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './ServiceSelect.css';

const ServiceSelect = ({ services, selectedService, onChange }) => {
	return (
		<FormControl fullWidth>
			<InputLabel id="service-select-label">Услуга</InputLabel>
			<Select
				labelId="service-select-label"
				value={selectedService?.id || ''}
				onChange={(e) => onChange(services.find(s => s.id === e.target.value))}
				label="Услуга"
			>
				{services.map((service) => (
					<MenuItem key={service.id} value={service.id}>
						{service.name} ({service.price} руб.)
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ServiceSelect;