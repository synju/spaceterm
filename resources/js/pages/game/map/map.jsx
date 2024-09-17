import React, {useEffect} from 'react';
import './map.css';

const Map = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Map
		</div>
	);
};

export default Map;
