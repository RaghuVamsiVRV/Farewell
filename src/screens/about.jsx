import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
	render() {
		return (
			<div align="center">
				<h3>
					It's all been such a terrible waste really! <br />All of us in our Freshman and Sophomore years
					financed the previous farewell ceremonies in the hopes that in our junior year, we would get the
					chance to attend a fancy ceremony at a discounted price
				</h3>
				<h3>
					But all that apart <br /> we do really miss you <br /> the parting was abrupt <br /> and <br />we
					never got the chance to say <br />goodbye
				</h3>
				<ul className="list">
					<li>
						<a className="creator" href={'https://www.naths.in'}>
							naren
						</a>
					</li>
					<li>
						<a className="creator" href={'https://github.com/vsaisujeeth'}>
							Vinnakota Sai Sujeeth
						</a>
					</li>
					<li>
						<a className="creator" href={'https://github.com/RaghuVamsiVRV'}>
							Raghu Vamsi Veerapaneni VRVKCKVL
						</a>
					</li>
					<li>
						<a className="creator" href={'https://github.com/ryaswant5'}>
							Yashwanth Rachamallu
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default About;
