import React, { Component } from 'react';
import ProfilePage from '../screens/profilePage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Bubbles from './bubbles';
import Header from './Header';
import Signup from './signup';
import { addComment } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		comments: state.comments
	};
};

const mapDispatchToProps = (dispatch) => ({
	addComment: (id, from, to, comment) => dispatch(addComment(id, from, to, comment))
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route path="/bubbles" component={Bubbles} />
					<Route exact path="/profilePage" component={() => <ProfilePage comments={this.props.comments} />} />
					<Route path="/signup" component={Signup} />
					<Redirect to="/bubbles" />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
