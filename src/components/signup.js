import React, {Component} from "react";
import {Button, Label, Col, Row} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import ImageUploader from 'react-images-upload';
import { min } from "d3";

var store=require('store')

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
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:values.name, email:values.email, password:values.password, branch:values.branch, batch:values.batch, college:"IIT PATNA", size:Math.floor(Math.random() * (50 - 30 + 1) + 30)})
        };
        fetch('http://localhost:4000/signup', requestOptions)
            .then(response => {if(!response.ok){throw response} response.json()})
            .then(data => {this.setState({user: data});alert("Login to view your account")})
            .catch(err =>{
                err.text().then(errMsg=>
                    {
                        var error=JSON.parse(errMsg);
                        alert(error.error)
                    })
            })

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
                                    <Control.select model=".branchSelect" name ="branchSelect" id="branchSelect" className="form-control"
                                    validators={{
                                        required
                                    }}>
                                        <option/>
                                        <option value="CS">CS</option>
                                        <option value="EE">EE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="CB">CB</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".branchSelect"
                                        show="touched"
                                        messages={{
                                            required: 'This is a required field'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="batch" md={3}>Batch</Label>
                                <Col md={9}>
                                <Control.select model=".batchSelect" name ="batchSelect" id="batchSelect" className="form-control"
                                validators={{required}}>
                                    <option/>
                                    <option value='2016'>2016</option>
                                    <option value='2017'>2017</option>
                                    <option value="2018">2018</option>
                                </Control.select> 
                                <Errors
                                    className="text-danger"
                                    model=".batchSelect"
                                    show="touched"
                                    messages={{
                                        required: 'This is a required field'
                                    }}
                                />      
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="image" md={3}>Profile Photo</Label>
                                <Col md={9}>
                                    <ImageUploader
                                        withIcon={false}
                                        buttonText='Choose image'
                                        onChange={this.onDrop}
                                        label="Max file size: 0.5mb, accepted: jpg"
                                        imgExtension={['.jpg']}
                                        maxFileSize={524280}
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
