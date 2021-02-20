import About from '../screens/about';
import React, { Component } from 'react';
import ProfilePage from '../screens/profilePage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Bubbles from './bubbles';
import Header from './Header';
import Signup from './signup';

import  editUser from "./editUser";
import Footer from './Footer';

class Main extends Component {

	render() {
		const Profile = ({ match }) => {
			return <ProfilePage id={match.params.Id} />;
		};
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/home" component={Bubbles} />
					<Route path="/signup" component={Signup} />
					<Route path="/about" component={About} />
					<Route path="/editUser" component={editUser}/>
					<Route exact path="/:Id" component={Profile} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(Main);
