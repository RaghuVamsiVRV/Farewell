import React from 'react';
import ProfilePage from '../screens/profilePage';
import {Switch, Route} from 'react-router-dom';

const Main = () => (
  <Switch>
    <Route path = "/profilePage" component={ProfilePage} />
  </Switch>
)

export default Main;