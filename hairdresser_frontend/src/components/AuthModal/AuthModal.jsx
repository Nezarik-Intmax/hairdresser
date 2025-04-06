import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import api from '../../services/api';
import './AuthModal.css';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const AuthModal = ({ open, onClose, type }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		email: type === 'register' ? '' : undefined,
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const endpoint = type === 'login' ? 'token/' : 'register/';
			const response = await api.post(endpoint, formData);

			if (type === 'login') {
				localStorage.setItem('token', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
			}

			onClose();
			window.location.reload();
		} catch (err) {
			setError(err.response?.data?.detail || 'Ошибка авторизации');
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<Typography variant="h6" component="h2">
					{type === 'login' ? 'Вход' : 'Регистрация'}
				</Typography>
				{error && <Typography color="error">{error}</Typography>}
				<form onSubmit={handleSubmit}>
					{type === 'register' && (
						<TextField
							margin="normal"
							fullWidth
							label="Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					)}
					<TextField
						margin="normal"
						fullWidth
						label="Имя пользователя"
						name="username"
						value={formData.username}
						onChange={handleChange}
					/>
					<TextField
						margin="normal"
						fullWidth
						label="Пароль"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{type === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

export default AuthModal;