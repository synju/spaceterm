import React, {useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery'
import * as Utility from '../../utility.js';
import '../general/register.css';

const handleRegistration = async() => {
	if($('#email_address').val() !== "" && $('#password').val() !== "" && $('#password').val() === $('#confirm_password').val()) {
		// Axios POST request
		let data = {
			username:$('#username').val(),
			email_address:$('#email_address').val(),
			password:$('#password').val(),
		};

		try {
			const response = await axios.post('http://127.0.0.1:8000/api/create_user', data);
			if(response['data']['success'] === true) {
				showNotification("Success");

				// Clear inputs
				$('#username').val("");
				$('#email_address').val("");
				$('#password').val("");
				$('#confirm_password').val("");
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

const Register = () => {
	return (
		<div className="register-container">
			{/* Form */}
			<div style={{
				background:'rgba(0, 0, 0, 0.7)',
				padding:'10px',
				width:'25%',
			}}>
				{/* Username */}
				<div style={{marginBottom:'10px',}}>
					<div style={{textAlign:'left'}}>
						<label style={{fontSize:'12px'}} htmlFor="username">Username</label>
					</div>
					<div>
						<input style={{
							padding:'5px 5px',
							fontSize:'12px',
							background:'#1d384c',
							border:'1px solid #365d7b',
							outline:'none',
							boxShadow:'none',
							color:'#73c2ff',
							width:'100%',
						}} type="text" id="username"/>
					</div>
				</div>

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

				{/* Confirm Password */}
				<div style={{marginBottom:'10px',}}>
					<div style={{textAlign:'left'}}>
						<label style={{fontSize:'12px'}} htmlFor="confirm_password">Confirm Password</label>
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
						}} type="password" id="confirm_password"/>
					</div>
				</div>

				{/* Register Button */}
				<button style={{
					width:'100%',
					padding:'10px 10px',
					background:'#0a1824',
					color:'#73c2ff',
					border:'1px solid #365d7b',
					cursor:'pointer',
					fontSize:'12px',
				}} onClick={handleRegistration}>Register</button>

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

export default Register;
