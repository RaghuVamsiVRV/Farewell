import React, { Component } from 'react';
import generalStyles from '../App.css';

class About extends Component {
	render() {
		return (
			<div align="center">
				<h3 class={generalStyles.generic}>
					We <br /> would have made <br /> this site <br /> prettier, but <br /> none of us have any <br />{' '}
					asthetic sense <br /> but <br /> all we really wanted <br /> to say is <br /> goodbye!!! <br /> and
					also that <br /> we love you!! <br /> and <br /> we most certainly hope <br /> that we'll get the
					chance to <br /> host a real farewell for y'all<br /> this year!
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
						<a className="creator" href={'https://github.com/ryaswant5'}>
							Yashwanth Rachamallu
						</a>
					</li>
					<li>
						<a className="creator" href={'https://github.com/RaghuVamsiVRV'}>
							Raghu Vamsi
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default About;
