import Bubbles from './components/bubbles'
import song from './media/bgm.mp3'
import React from 'react';
import './App.css';

export default function App() {
	return (
		<div>
			<audio src={song} autoplay={{}} /*loop={{}}*/>
				{' '}
				<p>If you are reading this, it is because your browser does not support the audio element</p>{' '}
			</audio>
			<Bubbles/>
		</div>
	);
}
