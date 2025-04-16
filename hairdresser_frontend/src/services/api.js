import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8000/api/', // Адрес вашего Django-сервера
	headers: {
		'Content-Type': 'application/json',
	},
});


export default api;