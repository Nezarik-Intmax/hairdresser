import React from 'react';
import './Title.scss';

const Title = ({ h = "h2", children }) => {
	return (
		<>
			{h === "h1" && <h1 className='title'>{children}</h1>}
			{h === "h2" && <h2 className='title'>{children}</h2>}
			{h === "h3" && <h3 className='title'>{children}</h3>}
			{h === "h4" && <h4 className='title'>{children}</h4>}
			{h === "h5" && <h5 className='title'>{children}</h5>}
			{h === "h6" && <h6 className='title'>{children}</h6>}
		</>
	);
};

export default Title;