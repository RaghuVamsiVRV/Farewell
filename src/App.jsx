<<<<<<< HEAD
import song from "./media/bgm.mp3";
import React, {Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store=ConfigureStore();

class App extends Component {
	render(){
		return (
			<Provider store={store}>
				<BrowserRouter>
				<audio src={song} autoplay={{}} /*loop={{}}*/>
						{' '}
						<p>If you are reading this, it is because your browser does not support the audio element</p>{' '}
				</audio>
					<div>
						<Main/>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
=======
import song from './media/bgm.mp3';
import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import Header from './components/Header';

export default function App() {
	return (
		<BrowserRouter>
			<audio src={song} autoPlay={{}} /*loop={{}}*/>
				{' '}
				<p>If you are reading this, it is because your browser does not support the audio element</p>{' '}
			</audio>
			<div>
				<Main />
			</div>
		</BrowserRouter>
	);
>>>>>>> ce7b77fc66ba8729d522097a29e375ffbc3d259b
}

export default App;	