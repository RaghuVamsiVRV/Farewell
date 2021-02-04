import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import {Button, Row, Col, Card, CardTitle, CardText, CardBody} from 'reactstrap';



function RenderComment({comment}){
  return(
      <Card key={comment._id}> 
        <CardTitle tag="h5">{comment.senderName}</CardTitle>
        <CardBody>
          <CardText>{comment.comment}</CardText>
          <CardText className="ml-auto mr-3">
            -- {new Intl.DateTimeFormat('en-US',{
                day:'2-digit',
                month:'short',
                year:'numeric'
            }).format(new Date(comment.time))}
          </CardText>
        </CardBody>
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
    this.handleSubmit=this.handleSubmit.bind(this);
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
  handleSubmit(values){
    console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: this.state.user.id, senderName:"rachu", comment:values.comment })
        };
      fetch('http://localhost:4000/api/add_comment', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({comments: [...this.state.comments, data]}));


      // let comment={
      //   _id: "600721ebdffb1c45f8af67c4",
      //   comment: values.comment,
      //   to: this.state.user._id,
      //   from: "6007214cf887071e4010bf6d",
      //   time: "2021-01-19T18:16:11.764Z",
      //   __v: 0
      // }
      // this.setState({
      //   comments: [...this.state.comments, comment]
      // })
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
    return(
    <div className="container">
      <div className="container-banner">
          <img src={this.state.user.imageURL||'/photos/anushree.jpg'} alt="Avatar" height="190" width="190"></img>
        <h2> {this.state.user.name} </h2>
        <Row>
          {dispComment}
        </Row>
      </div>
      <div className="container-banner">
        <LocalForm onSubmit={this.handleSubmit}>
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
