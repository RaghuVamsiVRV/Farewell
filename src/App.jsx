import song from "./media/bgm.mp3";
import React from 'react';
import './App.css';
<<<<<<< HEAD
import ProfilePage from './screens/profilePage';

export default function App() {
	return (
		<div>
			<audio src={song} autoplay={{}} /*loop={{}}*/>
				{' '}
				<p>If you are reading this, it is because your browser does not support the audio element</p>{' '}
			</audio>
			<Bubbles/>
			<ProfilePage />
		</div>
=======
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import Header from "./components/Header";

export default function App() {
	return (
		<BrowserRouter>
		<audio src={song} autoplay={{}} /*loop={{}}*/>
                {' '}
                <p>If you are reading this, it is because your browser does not support the audio element</p>{' '}
        </audio>
			<div>
				<Main/>
			</div>
		</BrowserRouter>
>>>>>>> 9dcea4e1d2fd251463224a9b92303c2e6705ac03
	);
}
