import React, {useEffect} from 'react';
import './fleets.css';

const Fleets = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Fleets
		</div>
	);
};

export default Fleets;
