import React, {useEffect} from 'react';
import './research.css';

const Research = () => {
	useEffect(() => {
		// Mounted
		return () => {
			//Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Research
		</div>
	);
};

export default Research;
