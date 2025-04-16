import React from 'react';
import './Button.scss';

const Buttons = ({ children, styleName = "" }) => {
	return (
		<div className={`btn__wrap ${styleName}`}>
			{children}
		</div>
	);
};

export default Buttons;
