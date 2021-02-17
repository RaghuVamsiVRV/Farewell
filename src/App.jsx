import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import REACTGA from 'react-ga';

REACTGA.initialize(process.env.REACT_APP_GA);
REACTGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
	render() {
		return (
				<BrowserRouter>
					<div>
						<Main />
					</div>
				</BrowserRouter>
		);
	}
}

export default App;
