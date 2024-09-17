import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "../general/home";
import Login from "../general/login";
import Register from "../general/register";
import Game from "../game/game";

const Content = () => {
	return (
		<div className="content-container">
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/home" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/game" element={<Game/>}/>
			</Routes>
		</div>
	);
};

export default Content;
