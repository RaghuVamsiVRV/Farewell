import React, { Component } from 'react';
import ProfilePage from '../screens/profilePage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Bubbles from './bubbles';
import Header from './Header';
import Signup from './signup';
import { addComment } from '../redux/ActionCreators';
import { batch, connect } from 'react-redux';
import { packSiblings } from 'd3';

const mapStateToProps = (state) => {
	return {
    comments: state.comments,
    users: state.users
	};
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (id, from, to, comment) => dispatch(addComment(id, from, to, comment)),
  addUser: (id, _id, name, email, password, batch, college, __v) => dispatch(id, _id, name, email, password, batch, college, __v)
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

  

  render(){
    const Profile = ({match}) =>{
      console.log("HI");
      return(
      // <ProfilePage />
      <ProfilePage comments={this.props.comments} addComment={this.props.addComment} id={match.params.Id}/>
      );
    };
    return(
      <div> 
        <Header/>
        <Switch>
        <Route path = "/bubbles" component={Bubbles} />
        <Route path = "/signup" component={Signup}/>
        <Route path='/:Id' component={Profile}/>
        <Redirect to="/bubbles"/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
