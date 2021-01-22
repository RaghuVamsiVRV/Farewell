import React, {Component} from "react";
import {Button, Label, Col, Row} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@iitp\.ac\.in$/i.test(val);
const passMatch = (Val) => (val) => (val) && (Val) && (val===Val);

class Signup extends Component{
    constructor(props) {
        super(props);
        this.state={
            input:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);  
        this.handleChange = this.handleChange.bind(this);      
    }

    handleChange(event){
        let input=this.state.input;
        input=event.target.value;
        this.setState({
            input
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'This is a required field, ',
                                            minLength: 'Must be greater than 2 characters, ',
                                            maxLength: 'Must be 15 characters or less'
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
                                            validEmail: 'Invalid Email Address'
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
                                        required
                                    }}/>
                                    <Errors 
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field'
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="re:password" md={3}>Re-enter password</Label>
                                <Col md={9}>
                                    <Control.text type="password" model=".re:password" id="re:password" name="re:password"
                                    className="form-control"
                                    placeholder="Password"
                                    validators={{
                                        required, passMatch: passMatch(this.state.input)
                                    }}/>
                                    <Errors 
                                    className="text-danger"
                                    model=".re:password"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        passMatch: 'Passwords should match'
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
                                        required, isNumber
                                    }}    
                                    />
                                    <Errors
                                    className="text-danger"
                                    model=".batch"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field, ',
                                        isNumber: 'Enter a number'
                                    }}
                                    />                
                                </Col>
                            </Row>
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

export default Signup;
