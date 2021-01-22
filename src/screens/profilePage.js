import React, {Component, useState} from 'react';
import { Control, LocalForm } from 'react-redux-form';
import {Button, Row, Col, Card, CardTitle, CardText} from 'reactstrap';
import pic from '../media/photos/teja.jpg';


function RenderComment({comment}){
  return(
      <Card key={comment.id}> 
        <CardTitle tag="h5">{comment.from}</CardTitle>
        <CardText>{comment.comment}</CardText>
      </Card>
  );
}

const ProfilePage = (props) => {
    const dispComment = props.comments.map((comment)=>{
      return(
        <Col md={6}>
          <RenderComment comment={comment}/>
        </Col>
      );
    });
    function handleSubmit(values){
      console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    return(
    <div className="container">
      <div className="container-banner">
        <img src={pic} alt="Avatar" height="170" width="170"></img>
        <h2> Teja </h2>
        <Row>
          {dispComment}
        </Row>
      </div>
      <div className="container-banner">
        <LocalForm onSubmit={(values) => handleSubmit(values)}>
          <Row className="form-group">
            <Col md={12}>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows={3}
                className="form-control"
              />
            </Col>
          </Row>
          <Button outline type="submit"><span className="fa fa-pencil" /> Submit Comment</Button>
        </LocalForm>
      </div>
    </div>
    );
}
export default ProfilePage;
