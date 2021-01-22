import song from './media/bgm.mp3';
import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import Header from './components/Header';
import './web.config';

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
}
