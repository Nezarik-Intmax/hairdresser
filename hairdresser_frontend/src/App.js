import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ClientView from './pages/ClientView/ClientView';
import MasterView from './pages/MasterView/MasterView';
import api from './services/api';
import './App.css';
import './styles/normalize.scss';
import './styles/standart.scss';
import './styles/_normalize_theme.scss';


function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					const response = await api.get('user/');
					setIsAuthenticated(true);
					setUser(response.data);
				}
			} catch (error) {
				console.error('Auth verification failed:', error);
				localStorage.removeItem('token');
			} finally {
				setLoading(false);
			}
		};

		verifyAuth();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		setUser(null);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Router>
			<div className="App">
				<Header
					isAuthenticated={isAuthenticated}
					user={user}
					onLogout={handleLogout}
				/>

				<Routes>
					<Route path="/" element={
						isAuthenticated && user?.is_master ? (
							<MasterView />
						) : (
							<ClientView />
						)
					} />
					<Route path="/master" element={
						isAuthenticated && user?.is_master ? (
							<MasterView />
						) : (
							<Navigate to="/" />
						)
					} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Header
					isAuthenticated={isAuthenticated}
					user={user}
					onLogout={handleLogout}
				/>
			</div>
		</Router>
	);
}

export default App;