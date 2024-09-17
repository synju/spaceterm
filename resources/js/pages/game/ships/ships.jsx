import React, {useEffect} from 'react';
import './ships.css';

const Ships = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Ships
		</div>
	);
};

export default Ships;
