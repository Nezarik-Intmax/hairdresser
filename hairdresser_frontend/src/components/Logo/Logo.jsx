import React from 'react';
import './Logo.scss';

const Logo = () => {
	return (
		<a href="/" className="logo__wrap">
			<img src="/logo.png" alt="Логотип" className="logo" />
			<div className="logo__text">Парикмахерская</div>
		</a>
	);
};

export default Logo;

