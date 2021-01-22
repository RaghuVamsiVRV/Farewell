import React, { Component } from 'react';
import { Nav, Navbar, NavbarToggler, Collapse, NavItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props)    
    {
        super(props);
        
        this.state={
            isNavOpen: false,
            isModalOpen: false,  
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
        alert("Username: " + this.username.value + " Password: " + this.password.value
                + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
    render(){
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
                                        <NavLink className="nav-link" to='/profilePage'>Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to='/signup'>
                                            <span className="fa fa-sign-in fa-lg"> Signup</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg"> Login</span>
                            </Button>
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
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input}  />
                                        Remember me
                                </Label>
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