import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import useStore from "../../store";

const Header = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("Clearing User");
		useStore.getState().setUser(null);
		useStore.getState().setUserPlanets(null);
		useStore.getState().setCurrentPlanet(null);
		navigate('/home');
	};

	return (
		<div className="header-container">
			<ul className="header-nav-links">
				<li><Link to="/home">Home</Link></li>
				{(useStore.getState().user !== null) && <li><Link to="/game">Game</Link></li>}
				{(useStore.getState().user === null) && <li><Link to="/login">Login</Link></li>}
				{(useStore.getState().user !== null) && <li onClick={handleLogout} style={{cursor:'pointer',}}>Logout</li>}
			</ul>
		</div>
	);
};

export default Header;
