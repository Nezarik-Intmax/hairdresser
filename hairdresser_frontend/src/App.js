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
	const [user, setUser] = useState(false);

	const login = async () => {
		setUser(3)
		window.location.href = `/master/3`;
	}

	return (
		<Router>
			<div className="App">
				<Header
					isAuthenticated={isAuthenticated}
					user={user}
					login={login}
				/>

				<Routes>
					<Route path="/" element={
						user ? (
							<MasterView />
						) : (
							<ClientView />
						)
					} />
					<Route path={`/master/3`} element={<MasterView />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Header
					isAuthenticated={isAuthenticated}
					user={user}
					onLogout={login}
				/>
			</div>
		</Router>
	);
}

export default App;