import React, {useEffect} from 'react';
import './empire.css';

const Empire = () => {
	useEffect(() => {
		// Mounted
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Empire
		</div>
	);
};

export default Empire;
