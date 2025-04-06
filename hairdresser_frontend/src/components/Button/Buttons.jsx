import React from 'react';
import './Button.scss';

const Buttons = ({ children }) => {
	return (
		<div className="btn__wrap">
			{children}
		</div>
	);
};

export default Buttons;
