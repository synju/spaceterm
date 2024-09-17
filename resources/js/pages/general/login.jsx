import React from 'react';
import useStore from "../../store";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery'
import * as Utility from '../../utility.js';
import '../general/login.css';


const Login = () => {
	const navigate = useNavigate();

	const handleRegisterClick = () => {
		navigate('/register');
	};

	const handleLogin = async() => {
		if($('#email_address').val() !== "" && $('#password').val() !== "") {
			// Axios POST request
			let data = {
				email_address:$('#email_address').val(),
				password:$('#password').val(),
			};

			try {
				const response = await axios.post('http://127.0.0.1:8000/api/auth_user', data);
				if(response['data']['success'] === true) {
					useStore.getState().setUser(response['data']['user']);
					data.user_id = response['data']['user']['id'];
					let planetsResponse = await axios.post('http://127.0.0.1:8000/api/get_user_planets', data);
					if(planetsResponse['data']['success'] === true) {
						useStore.getState().setUserPlanets(planetsResponse['data']['planets']);
						useStore.getState().setCurrentPlanet(planetsResponse['data']['planets'][0]);
						navigate('/game');
						showNotification("Success - Redirecting to Game");

						// Clear inputs
						$('#email_address').val("");
						$('#password').val("");}
					else {
						showNotification(Utility.capitalizeFirstLetter(response['data']['error']));
					}
				}
				else {
					showNotification(Utility.capitalizeFirstLetter(response['data']['error']));
				}
			}
			catch(error) {
				showNotification(error.message);
			}
		}
		else {
			showNotification("Complete form correctly.");
		}
	};

	const showNotification = (message) => {
		let notification = $('#notification');
		notification.show();
		notification.html(message);
	}

	return (
		<div className="login-container">
			{/* Form */}
			<div style={{
				background:'rgba(0, 0, 0, 0.7)',
				padding:'10px',
				width:'25%',
			}}>
				{/* Email Address */}
				<div style={{marginBottom:'10px',}}>
					<div style={{textAlign:'left'}}>
						<label style={{fontSize:'12px'}} htmlFor="email_address">Email Address</label>
					</div>
					<div>
						<input style={{
							width:'100%',
							padding:'5px 5px',
							fontSize:'12px',
							background:'#1d384c',
							border:'1px solid #365d7b',
							outline:'none',
							boxShadow:'none',
							color:'#73c2ff',
						}} type="text" id="email_address"/>
					</div>
				</div>

				{/* Password */}
				<div style={{marginBottom:'10px',}}>
					<div style={{textAlign:'left'}}>
						<label style={{fontSize:'12px'}} htmlFor="password">Password</label>
					</div>
					<div>
						<input style={{
							width:'100%',
							padding:'5px 5px',
							fontSize:'12px',
							background:'#1d384c',
							border:'1px solid #365d7b',
							outline:'none',
							boxShadow:'none',
							color:'#73c2ff',
						}} type="password" id="password"/>
					</div>
				</div>

				{/* Login Button */}
				<button style={{
					width:'100%',
					padding:'10px 10px',
					background:'#0a1824',
					color:'#73c2ff',
					border:'1px solid #365d7b',
					cursor:'pointer',
					fontSize:'12px',
					marginBottom:'10px',
				}} onClick={handleLogin}>Login</button>

				{/* Register Button */}
				<button style={{
					width:'100%',
					padding:'10px 10px',
					background:'#0a1824',
					color:'#73c2ff',
					border:'1px solid #365d7b',
					cursor:'pointer',
					fontSize:'12px',
				}} onClick={handleRegisterClick}>Register</button>

				{/* Notification Area */}
				<div style={{
					width:'100%',
					padding:'10px 10px',
					background:'rgba(0,0,0,0.25)',
					color:'#fff',
					border:'1px solid #365d7b',
					fontSize:'12px',
					marginTop:'10px',
					display:'none',
				}} id="notification"/>
			</div>
		</div>
	);
};

export default Login;
