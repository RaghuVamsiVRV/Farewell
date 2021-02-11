import React, { Component } from 'react';
import { Nav, Navbar, NavbarToggler, Collapse, NavItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Errors } from 'react-redux-form';
var store=require('store');


class Header extends Component {

    constructor(props)    
    {
        super(props);
        var isLoggedIn=store.get('loginStatus');
        this.state={
            isNavOpen: false,
            isModalOpen: false,
            user:{},
            loginStatus:isLoggedIn?isLoggedIn.loginStatus:{user:"", message:"logged out"}
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogin(event){
        this.toggleModal();
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept":"application/json"},
            credentials:'include',
            body: JSON.stringify({email:this.username.value, password:this.password.value})
        };
        fetch('http://localhost:4000/login', requestOptions)
            .then(response =>{ if(!response.ok){throw "Either email or password is incorrect"} return response.json()})
            .then(data => {this.setState({loginStatus: data});store.set('loginStatus', {loginStatus:data});
            fetch(`http://localhost:4000/users/${this.state.loginStatus.user}`)
            .then(response => response.json())
            .then(data=>{this.setState({user: data});store.set('userName',{userName:this.state.user.name});store.set('userID', {userID:this.state.loginStatus.user})})})
            .catch( err => {
                alert(err)
            })    

        event.preventDefault();
        
    }
    handleLogout(){
        fetch('http://localhost:4000/logout')
            .then(response => response.json())
            .then(data => {alert(data.message);Cookies.remove('jwt'); this.setState({loginStatus:{}}); store.clearAll();})
            
    }


    render(){
        function Signup({loginStatus}){
            if(loginStatus.message==="logged in"){
                return(<div/>)
            }
            else{
                return(
                    <NavLink className="nav-link" to='/signup'>
                        <span className="fa fa-sign-in fa-lg"> Signup</span>
                    </NavLink>
                )                
            }
        }
        function Profile({loginStatus}){
            var userID=store.get('userID');
            if(loginStatus.message==="logged in"){                
                return(
                <NavLink className="nav-link" to={`/${userID?userID.userID:''}`}>Profile</NavLink>
                )
            }
            else {
                return(
                    <div/>
                )
            }
        }
        function Auth({toggleModal, handleLogout, loginStatus}){
        if(loginStatus.message==="logged in"){
            return(
                <div>
                    <Button outline onClick={handleLogout}>
                          <span className="fa fa-sign-in fa-lg"> Logout</span>
                      </Button>
                </div>  
            );
        }
        else{
            return(
                  <div>
                      <Button outline onClick={toggleModal}>
                            <span className="fa fa-sign-in fa-lg"> Login</span>
                        </Button>
                  </div>  
            );
        }
        }
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to='/'><span className="fa fa-home fa-lg"> Home</span></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <Profile loginStatus={this.state.loginStatus}/>
                                    </NavItem>
                                    <NavItem>
                                        <Signup loginStatus={this.state.loginStatus}/>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Auth toggleModal={this.toggleModal} handleLogout={this.handleLogout} loginStatus={this.state.loginStatus}/>
                        </NavItem>                                                
                        </Nav>
                    </div>
                </Navbar>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Webmail</Label>
                                <Input type="text" id="username" name="username" innerRef={(input)=>this.username=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input)=>this.password=input}/>
                            </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}
export default Header;