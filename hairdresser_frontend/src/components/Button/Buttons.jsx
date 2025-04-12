import React from 'react';
import './Button.scss';

const Buttons = ({ children, style = "" }) => {
	return (
		<div className={`btn__wrap ${style}`}>
			{children}
		</div>
	);
};

export default Buttons;
