import React, {Component} from 'react';
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
        <Row className="form-group">
          <Col md={12}>
            <textarea
              model=".comment"
              id="comment"
              name="comment"
              rows={3}
              className="form-control"
            />
          </Col>
        </Row>
        <Button outline>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
      </div>
    </div>
    );
}

export default ProfilePage;
{/* <Row className="row">
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
        </Row> */}