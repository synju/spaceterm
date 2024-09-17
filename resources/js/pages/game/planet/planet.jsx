import React, {useEffect} from 'react';
import axios from 'axios';
import './planet.css';

const Planet = () => {
	useEffect(() => {
		// Axios POST request
		let data = {
			message:'Hello, world!'
		};

		const fetchData = async() => {
			try {
				//const response = await axios.post('http://127.0.0.1:8000/api/exampleRequest', data);
				//console.log('Response:', response.data);
			}
			catch(error) {
				console.error('Error making request:', error);
			}
		};
		//fetchData();

		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<div>
			Planet
		</div>
	);
}

export default Planet;
