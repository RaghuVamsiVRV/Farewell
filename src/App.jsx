import song from './media/bgm.mp3';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import REACTGA from 'react-ga';

REACTGA.initialize(process.env.REACT_APP_GA);
REACTGA.pageview(window.location.pathname + window.location.search);

const store = ConfigureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Main />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
