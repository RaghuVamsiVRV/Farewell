import About from '../screens/about';
import React, { Component } from 'react';
import ProfilePage from '../screens/profilePage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Bubbles from './bubbles';
import Header from './Header';
import Signup from './signup';
import { packSiblings } from 'd3';
import Footer from './Footer';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const Profile = ({ match }) => {
			return <ProfilePage id={match.params.Id} />;
		};
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/bubbles" component={Bubbles} />
					<Route path="/signup" component={Signup} />
					<Route path="/about" component={About} />
					<Route path="/:Id" component={Profile} />
					<Redirect to="/bubbles" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(Main);
