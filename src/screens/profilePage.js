import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import {Button, Row, Col, Card, CardTitle, CardText} from 'reactstrap';



function RenderComment({comment}){
  return(
      <Card key={comment._id}> 
        <CardTitle tag="h5">{comment.from}</CardTitle>
        <CardText>{comment.comment}</CardText>
        <CardText className="ml-auto mr-3">
          -- {new Intl.DateTimeFormat('en-US',{
              day:'2-digit',
              month:'short',
              year:'numeric'
          }).format(new Date(comment.time))}
        </CardText>
      </Card>
  );
}
class ProfilePage extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      comments:[],
      user:{},
      url:{}
    }
  }


  componentDidMount() {
    console.log(this.props.id);
		fetch(`http://localhost:4000/users/${this.props.id}`)
			.then((response) => response.json())
      .then((data) => this.setState({user:data}))

    fetch(`http://localhost:4000/get_comments?to=${this.props.id}`)
			.then((response) => response.json())
      .then((data) => this.setState({comments:data.comments}))
      
        
	}
  render(){
    console.log(this.state.comments)
    const dispComment = this.state.comments.map((comment)=>{
      return(
        <Col md={6}>
          <RenderComment comment={comment}/>
        </Col>
      );
    });
    function handleSubmit(values){
      console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.setState('nani', 'teja', values.comment);
    }
    return(
    <div className="container">
      <div className="container-banner">
        <img src={'/photos/anushree.jpg'} alt="Avatar" height="170" width="170"></img>
        <h2> {this.state.user.name} </h2>
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
}
export default ProfilePage;
