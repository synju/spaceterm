import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import '../css/reset.css';
import '../css/app.css';
import Header from "./pages/structure/header";
import Footer from "./pages/structure/footer";
import Content from "./pages/structure/content";

function App() {
	return (
		<Router>
			<div className="app-container">
				<Header/>
				<Content/>
				<Footer/>
			</div>
		</Router>
	);
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
