import React, {Component} from 'react';
import {Button, Row, Col, Label, Card, CardImg, CardImgOverlay, CardTitle, CardText} from 'reactstrap';
import pic from '../media/photos/teja.jpg';


class ProfilePage extends Component {
  render() {
    return(
    <div className="container">
      <div className="container-banner">
        <img src={pic} alt="Avatar" height="200" width="170"></img>
        <h2> Teja </h2>
      </div>
      <div>
        <Row className="form-group">
          <Label htmlFor="comment" md={12}>
            Comment
          </Label>
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
        <Row className="row">
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">Hello anna</CardTitle>
              <CardText>Hi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnavHi babu ela vunnav</CardText>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
    )
  }
}

export default ProfilePage;
