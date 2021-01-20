import React, {Component} from 'react';
import pic from '../media/photos/teja.png';

class ProfilePage extends Component {
  render() {
    return(
    <div className="container">
      <div className="container-banner">
        <img src={pic} alt="Avatar" height="200" width="170"></img>
        <h2> Teja </h2>
      </div>
      <section id="skillheader" className="flex-project-container">
        <div><img src={pic} width="100" height="100" alt=""/></div>
        <div><img src={pic} width="100" height="100" alt=""/></div>
        <div><img src={pic} width="100" height="100" alt=""/></div>  
        <div><img src={pic} width="100" height="100" alt=""/></div> 
      </section>
    </div>
    )
  }
}

export default ProfilePage;
