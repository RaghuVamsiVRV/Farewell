import React, {Component} from "react";
import {Button, Label, Col, Row} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { min } from "d3";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);
const eqLength = (len) => (val) => (val) && (val.length==len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@iitp\.ac\.in$/i.test(val);
const passMatch = (Val) => (val) => (val) && (Val) && (val===Val);

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state={
            input:"",
            user:{}
        };

        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleChange = this.handleChange.bind(this);      
    }

    handleChange(event){
        let input=this.state.input;
        input=event.target.value;
        this.setState({
            input:input
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        if(values.password===values.re_password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:values.name, email:values.email, password:values.password, branch:values.branch, batch:values.batch, college:"IIT PATNA", imageURL:values.imageURL})
        };
        fetch('http://localhost:4000/signup', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({user: data}));
            alert(this.state.user.message)    
        }
        else{
            alert('The passwords doesnt match');
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                            <Label htmlFor="name" md={3}>Name</Label>
                                <Col md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'This is a required field, ',
                                            minLength: 'Must be greater than 2 characters, ',
                                            maxLength: 'Must be 30 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={3}>Webmail</Label>
                                <Col md={9}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Webmail"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'This is a required field, ',
                                            validEmail: 'Enter college webmail'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={3}>Password</Label>
                                <Col md={9}>
                                    <Control.text type="password" model=".password" id="password" name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    validators={{
                                        required, minLength: minLength(8)
                                    }}/>
                                    <Errors 
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        minLength: 'Enter min 8 characters'
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="re_password" md={3}>Re-enter password</Label>
                                <Col md={9}>
                                    <Control.text type="password" model=".re_password" id="re_password" name="re_password"
                                    className="form-control"
                                    placeholder="Password"
                                    validators={{
                                        required, passMatch: passMatch(this.state.input)
                                    }}/>
                                    <Errors 
                                    className="text-danger"
                                    model=".re_password"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        passMatch: 'Passwords should match'
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="branch" md={3}>Branch</Label>
                                <Col md={9}>
                                    <Control.text model=".branch" id="branch" name="branch"
                                    className="form-control"
                                    placeholder="Branch Code"
                                    validators={{
                                        required, eqLength: eqLength(2)
                                    }}    
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".branch"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        eqLength: "Enter branch code, e.g 'CS, EE'"                                        
                                    }}
                                    />                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="batch" md={3}>Batch</Label>
                                <Col md={9}>
                                    <Control.text model=".batch" id="batch" name="batch"
                                    className="form-control"
                                    placeholder="Joining Year"
                                    validators={{
                                        required, isNumber, eqLength: eqLength(4)
                                    }}    
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".batch"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        isNumber: 'Enter a number',
                                        eqLength: "Enter year, e.g '2021'"                                        
                                    }}
                                    />                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="imageURL" md={3}>imageURL</Label>
                                <Col md={9}>
                                    <Control.text model=".imageURL" id="imageURL" name="imageURL"
                                    className="form-control"
                                    placeholder="URL"
                                    validators={{
                                        required
                                    }}    
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".batch"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, '                                       
                                    }}
                                    />                
                                </Col>
                            </Row>                    
                            <Row className="form-group">
                                <Button className="ml-2" type="submit" value="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}
{/* <Row className="form-group">
    <Label htmlFor="college" md={3}>College</Label>
    <Col md={9}>
        <Control.text model=".college" id="college" name="college"
        className="form-control"
        placeholder="College name"
        validators={{
            required
        }}
        />
        <Errors
        className="text-danger"
        model=".college"
        show="touched"
        messages={{
            required: 'This is a required field'    
        }}
        />
    </Col>
</Row> */}
export default Signup;
