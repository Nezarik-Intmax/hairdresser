import React, { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import Logo from '../Logo/Logo';
import Buttons from '../Button/Buttons';
import Button from '../Button/Button';
import './Header.scss';

const Header = ({ isAuthenticated, user, login }) => {
	// const [authModalOpen, setAuthModalOpen] = useState(false);

	const handleLoginClick = () => {
	};

	const handleRegisterClick = () => {
	};


	return (
		<header className="header">
			<div className="container">
				<Logo />
				{isAuthenticated ? (
					<Buttons children={[
						<Button key="logout" text="Выход" onClick={login} />
					]} />
				) : (
					<Buttons children={[
						// <Button key="register" text="Регистрация" onClick={handleRegisterClick} />,
						// <Button key="login" text="Войти" onClick={handleLoginClick} />
						<Button key="login" text="Вход для сотрудников" onClick={login} />
					]} />
				)}
			</div>

			{/* <AuthModal
				open={authModalOpen}
				onClose={() => setAuthModalOpen(false)}
				type={authType}
			/> */}
		</header >
	);
};

export default Header;