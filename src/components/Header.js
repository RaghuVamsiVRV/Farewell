import React, { Component, useState } from 'react';
import {
	Nav,
	Navbar,
	NavbarToggler,
	Collapse,
	NavItem,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from 'reactstrap';
var store = require('store');

export const AlertCustom = (props) => {
	if (props.text !== '') {
		return (
			<div>
				<Alert color="danger">{props.text}</Alert>
			</div>
		);
	} else {
		return <div />;
	}
};
class Header extends Component {


    constructor(props)    
    {
        super(props);
        var isLoggedIn=store.get('loginStatus');
        this.state={
            isNavOpen: false,
            isModalOpen: false,
            user:{},
            passErr:"",
            emailErr:"",
            loginStatus:isLoggedIn?isLoggedIn.loginStatus:{user:"", message:"logged out"}
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        var field = event.target.id
        if(field==="password")
            this.setState({passErr:""})
        else if(field==="email")
            this.setState({emailErr:""})
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            passErr:"",
            emailErr:""
            
        });
    }
    handleLogin(event){
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept":"application/json"},
            credentials:'include',
            body: JSON.stringify({email:this.username.value, password:this.password.value})
        };
        fetch('http://localhost:4000/login', requestOptions)
            .then(response =>{ if(!response.ok){throw response} return response.json()})
            .then(data => {this.setState({loginStatus: data});store.set('loginStatus', {loginStatus:data});
            fetch(`http://localhost:4000/users/${this.state.loginStatus.user}`)
            .then(response => response.json())
            .then(data=>{this.setState({user: data});store.set('userName',{userName:this.state.user.name});store.set('userID', {userID:this.state.loginStatus.user})});this.toggleModal();this.setState({errors:""})})
            .catch(err =>{
                err.text().then(errMsg=>
                    {
                        var error=JSON.parse(errMsg);
                        this.setState({emailErr: error.errors.email, passErr: error.errors.password})
                    })
            })
        event.preventDefault();
        
    }
    handleLogout(){
        fetch('http://localhost:4000/logout')
            .then(response => response.json())
            .then(data => {alert(data.message);Cookies.remove('jwt'); this.setState({loginStatus:{}}); store.clearAll();})
            
    }

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}
	handleLogin(event) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ email: this.username.value, password: this.password.value })
		};
		fetch('http://localhost:4000/login', requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw 'Either email or password is incorrect';
				}
				return response.json();
			})
			.then((data) => {
				this.setState({ loginStatus: data });
				store.set('loginStatus', { loginStatus: data });
				fetch(`http://localhost:4000/users/${this.state.loginStatus.user}`)
					.then((response) => response.json())
					.then((data) => {
						this.setState({ user: data });
						store.set('userName', { userName: this.state.user.name });
						store.set('userID', { userID: this.state.loginStatus.user });
					});
				this.toggleModal();
				this.setState({ errors: '' });
			})
			.catch((err) => {
				this.setState({ errors: err });
			});
		event.preventDefault();
	}
	handleLogout() {
		fetch('http://localhost:4000/logout').then((response) => response.json()).then((data) => {
			alert(data.message);
			Cookies.remove('jwt');
			this.setState({ loginStatus: {} });
			store.clearAll();
		});
	}

	render() {
		function Signup({ loginStatus }) {
			if (loginStatus.message === 'logged in') {
				return <div />;
			} else {
				return (
					<NavLink className="nav-link" to="/signup">
						<span className="fa fa-sign-in fa-lg"> Signup</span>
					</NavLink>
				);
			}
		}
		function Profile({ loginStatus }) {
			var userID = store.get('userID');
			console.log(loginStatus);
			if (loginStatus.message === 'logged in') {
				return (
					<NavLink className="nav-link" to={`/${userID ? userID.userID : loginStatus.user}`}>
						Profile
					</NavLink>
				);
			} else {
				return <div />;
			}
		}
		function Auth({ toggleModal, handleLogout, loginStatus }) {
			if (loginStatus.message === 'logged in') {
				return (
					<div>
						<Button outline onClick={handleLogout}>
							<span className="fa fa-sign-in fa-lg"> Logout</span>
						</Button>
					</div>
				);
			} else {
				return (
					<div>
						<Button outline onClick={toggleModal}>
							<span className="fa fa-sign-in fa-lg"> Login</span>
						</Button>
					</div>
				);
			}
		}
		return (
			<React.Fragment>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<a className="title" href="/">
									Al-Vida
								</a>
								<NavItem>
									{/* <NavLink className="nav-link" to="/">
										<span className="fa fa-home fa-lg"> Home</span>
									</NavLink> */}
								</NavItem>
								<NavItem>
									<Profile loginStatus={this.state.loginStatus} />
								</NavItem>
								<NavItem>
									<Signup loginStatus={this.state.loginStatus} />
								</NavItem>
							</Nav>
						</Collapse>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<Auth
									toggleModal={this.toggleModal}
									handleLogout={this.handleLogout}
									loginStatus={this.state.loginStatus}
								/>
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
                                <Input onChange={this.handleChange} type="text" id="username" name="username" innerRef={(input)=>this.username=input}/>
                            </FormGroup>
                            <FormGroup>
                                <AlertCustom text={this.state.emailErr}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={this.handleChange} type="password" id="password" name="password" innerRef={(input)=>this.password=input}/>
                            </FormGroup>
                            <FormGroup>
                                <AlertCustom text={this.state.passErr}/>
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
