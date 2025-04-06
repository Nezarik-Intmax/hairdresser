import React, { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import Logo from '../Logo/Logo';
import Buttons from '../Button/Buttons';
import Button from '../Button/Button';
import './Header.scss';

const Header = ({ isAuthenticated, user, onLogout }) => {
	const [authModalOpen, setAuthModalOpen] = useState(false);
	const [authType, setAuthType] = useState('login');

	const handleLoginClick = () => {
		setAuthType('login');
		setAuthModalOpen(true);
	};

	const handleRegisterClick = () => {
		setAuthType('register');
		setAuthModalOpen(true);
	};


	return (
		<header className="header">
			<div className="container">
				<Logo />
				{isAuthenticated ? (
					<Buttons children={[
						<Button key="logout" text="Выход" onClick={onLogout} />
					]} />
				) : (
					<Buttons children={[
						<Button key="register" text="Регистрация" onClick={handleRegisterClick} />,
						<Button key="login" text="Войти" onClick={handleLoginClick} />
					]} />
				)}
			</div>

			<AuthModal
				open={authModalOpen}
				onClose={() => setAuthModalOpen(false)}
				type={authType}
			/>
		</header >
	);
};

export default Header;