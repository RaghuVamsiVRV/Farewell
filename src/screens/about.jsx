import React, { Component } from 'react';
import generalStyles from '../App.css';

class About extends Component {
	render() {
		return (
			<div className="fill-window" align="center">
				<h3 style={{margin: "15%" ,marginBottom: "0px" , color: 'white'}} class={generalStyles.generic}>
					We would have made this site  prettier, but  none of us have any
					asthetic sense  but  all we really wanted  to say is  goodbye!!!  and
					also that  we love you!!  and  we most certainly hope  that we'll get the
					chance to  host a real farewell for y'all this year!
				</h3>

				<div>
					
					<div>
					<a className="creator" href={'https://www.naths.in'}>
						Naren {' '}
					</a>
					</div>
				
					<div>
					<a className="creator" href={'https://github.com/vsaisujeeth'}>
						Vinnakota Sai Sujeeth {' '}
					</a>
					</div>
				
					<div>
					<a className="creator" href={'https://github.com/ryaswant5'}>
						Yashwanth Rachamallu {' '}
					</a>
					</div>
				
					<div>
					<a className="creator" href={'https://github.com/RaghuVamsiVRV'}>
						Raghu Vamsi
					</a>
					</div>
					
				</div>
			</div>
		);
	}
}

export default About;
