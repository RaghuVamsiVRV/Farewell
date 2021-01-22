import React from 'react';
import ProfilePage from '../screens/profilePage';
import {Switch, Route, Redirect} from 'react-router-dom';
import Bubbles from './bubbles';
import Header from "./Header";
import Signup from "./signup";

const Main = () => (
  <div> 
    <Header/>
    <Switch>
    <Route path = "/bubbles" component={Bubbles} />
    <Route path = "/profilePage" component={ProfilePage}/>
    <Route path = "/signup" component={Signup}/>
    <Redirect to="/bubbles"/>
    </Switch>
  </div>
)

export default Main;