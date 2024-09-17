import React, {useEffect} from 'react';
import useStore from "../../store";
import '../general/home.css';

const Home = () => {

	useEffect(() => {
		// Mounted
		console.log(useStore.getState().user);
		return () => {
			// Unmounted
		};
	}, []); // Empty dependency array ensures this runs only once, like componentDidMount

	return (
		<>
			<div className="home-container">
				{/* Form */}
				<div style={{
					background:'rgba(0, 0, 0, 0.7)',
					padding:'10px',
					width:'50%',
				}}>
					<span style={{fontSize:'12px',}}>
						SpaceTerm is an Online Space Royale.
						<br/><br/>
						Players  can harvest and spend resources to construct buildings and ships and perform research, then colonize other planets and form alliances with or attack other players.
						<br/><br/>
						Ultimately the aim of the game is up to the player, either universal conquest, corporate espionage, manufacturing, mining, trade or discovery.
						<br/><br/>
						Additionally the game is meant to be designed in such a way that it could theoretically be played on any device with internet access providing the correct API Calls are utilized.
					</span>
				</div>
			</div>
		</>
	);
};

export default Home;
