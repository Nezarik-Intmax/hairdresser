import React from 'react';
import { TextField } from '@mui/material';
import './ContactForm.css';

const ContactForm = ({ contactInfo, setContactInfo }) => {
	const handleChange = (e) => {
		setContactInfo({
			...contactInfo,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<TextField
				fullWidth
				label="Ваше имя"
				name="name"
				value={contactInfo.name}
				onChange={handleChange}
			/>
			<TextField
				fullWidth
				label="Телефон"
				name="phone"
				value={contactInfo.phone}
				onChange={handleChange}
				inputProps={{ pattern: "[+]{0,1}[0-9]{10,15}" }}
			/>
		</>
	);
};

export default ContactForm;