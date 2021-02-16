import { React } from 'react';
import { Link } from 'react-router-dom';

export default function() {
	return (
		<div className="footer">
			<footer >
				<Link className="small" to="/about">
					<img height="20px" width="20px" margin="16px" src="/photos/info_icon.png" />
				</Link>
			</footer>
		</div>
	);
}
