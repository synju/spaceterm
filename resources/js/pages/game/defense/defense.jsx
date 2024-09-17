import React, {useEffect} from 'react';
import './defense.css';

const Defense = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Defense
		</div>
	);
};

export default Defense;
