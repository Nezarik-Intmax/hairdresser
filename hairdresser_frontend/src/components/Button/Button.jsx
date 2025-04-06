import React from 'react';

const Button = ({ url, text, btn_type="", onClick }) => {
	return (
		<a href={url} className={`btn ${btn_type}`} onClick={onClick}>
			{text}
		</a>
	);
};

export default Button;
