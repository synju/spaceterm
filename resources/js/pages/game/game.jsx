import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import useStore from '../../store';
import * as Utility from '../../utility';
import Empire from './empire/empire';
import Map from './map/map';
import Planet from './planet/planet';
import Facilities from './facilities/facilities';
import Research from './research/research';
import Defense from './defense/defense';
import Ships from './ships/ships';
import Fleets from './fleets/fleets';
import './game.css';
import $ from "jquery";

const Game = () => {
	const navigate = useNavigate();
	const currentPage = useStore(state => state.currentPage);  // Subscribe to currentPage state
	const setCurrentPage = useStore(state => state.setCurrentPage); // Extract setCurrentPage (allowing you to use it inside onClick)
	const user = useStore(state => state.user); // Extract user
	const currentPlanet = useStore(state => state.currentPlanet); // Extract currentPlanet
	const setCurrentPlanet = useStore(state => state.setCurrentPlanet); // Extract setCurrentPlanet Function
	const setUserPlanets = useStore(state => state.setUserPlanets); // Extract setCurrentPlanet Function
	const userPlanets = useStore(state => state.userPlanets); // Extract userPlanets

	useEffect(() => {
		// Mounted
		setCurrentPage('Empire');
		if(user === null) {
			navigate('/home');
		}

		// Start the interval
		setInterval(async () => {
			await updatePlanets();
			await updateResources();
		}, 1000);

		return () => {
			// Unmounted
		};
	}, [user, navigate, setCurrentPage]); // Runs on Mount and when any of the dependencies change.

	// Update Functions
	const updatePlanets = async() => {
		try {
			let data = {user_id:user.id};
			let response = await axios.post('http://127.0.0.1:8000/api/get_user_planets', data);
			let planets = response.data;
			setUserPlanets(planets);
		}
		catch(error) {
			console.log(error);
		}
	};
	const updateResources = async() => {
		try {
			let data = {user_id:user.id};
			let response = await axios.post('http://127.0.0.1:8000/api/get_user_planets', data);
			let planets = response.data;
			setUserPlanets(planets);
		}
		catch(error) {
			console.log(error);
		}
	};

	const renderPageContent = () => {
		if(user !== null) {
			switch(currentPage) {
				case 'Empire':
					return <Empire/>;
				case 'Research':
					return <Research/>;
				case 'Map':
					return <Map/>;
				case 'Planet':
					return <Planet/>;
				case 'Facilities':
					return <Facilities/>;
				case 'Defense':
					return <Defense/>;
				case 'Ships':
					return <Ships/>;
				case 'Fleets':
					return <Fleets/>;

				default:
					return <Empire/>;
			}
		}
	};

	return (
		<>
			{(user !== null) ? <>
				{/* Game Container */}
				<div className="game-container">
					{/* Game Header: Resources */}
					<div className="game-header" style={{padding:'5px 0 5px 0'}}>
						{/* Ore */}
						<div className="resource-icon">
							<img src="images/resources/ore-compressed.png" alt="ore-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">{Utility.formatThousands(10000)}</span>
						</div>

						{/* Carbonite */}
						<div className="resource-icon">
							<img src="images/resources/carbonite-compressed.png" alt="carbonite-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">{Utility.formatThousands(10000)}</span>
						</div>

						{/* Sludge */}
						<div className="resource-icon">
							<img src="images/resources/sludge-compressed.png" alt="sludge-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">{Utility.formatThousands(10000)}</span>
						</div>

						{/* Gas */}
						<div className="resource-icon">
							<img src="images/resources/gas-compressed.png" alt="gas-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">{Utility.formatThousands(10000)}</span>
						</div>

						{/* Energy */}
						<div className="resource-icon">
							<img src="images/resources/energy-compressed.png" alt="energy-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">{Utility.formatThousands(10000)}</span>
						</div>

						{/* Zeni */}
						<div className="resource-icon">
							<img src="images/resources/zeni-compressed.png" alt="zeni-resource-image" className="resource-icon-image"/>
							<span className="resource-icon-text">Ƶ{Utility.formatThousands(8482)}</span>
						</div>
					</div>

					{/* Game Content */}
					<div className="game-content">
						{/* Left: Game Nav */}
						<div className="game-left">
							{/* Empire */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Empire');
							}}>Empire</button>

							{/* Research */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Research');
							}}>Research</button>

							{/* Map */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Map');
							}}>Map</button>

							{/* Planet */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Planet');
							}}>Planet</button>

							{/* Facilities */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Facilities');
							}}>Facilities</button>

							{/* Defense */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Defense');
							}}>Defense</button>

							{/* Ships */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Ships');
							}}>Ships</button>

							{/* Fleets */}
							<button className="game-left-nav-button" onClick={() => {
								setCurrentPage('Fleets');
							}}>Fleets</button>
						</div>

						{/* Center: Content */}
						<div className="game-center">
							{renderPageContent()}
						</div>

						{/* Right: Planets */}
						<div className="game-right">
							{
								userPlanets['planets'].map((planet) => (
									<div key={planet.id} className="planet-item">
										<img src={`images/planets/${planet.image}.png`} alt="planet-image" className="planet-image"/>
										<span>{planet.name && planet.name !== "" ? planet.name : "Unnamed"}</span>
										<span>[{Utility.replaceCommasWithColons(planet.location)}]</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</> : ''}
		</>
	);
};

export default Game;
