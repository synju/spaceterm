import React, {useEffect} from 'react';
import './facilities.css';

const Facilities = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Facilities
		</div>
	);
};

export default Facilities;
