import { React } from 'react';
import { Link } from 'react-router-dom';

export default function() {
	return (
		<footer className="footer">
			<Link className="small" to="/about">
				made with love <img height="15px" width="15px" src="/photos/info_icon.png" />
			</Link>
		</footer>
	);
}
