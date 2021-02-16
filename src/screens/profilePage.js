import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Button, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardBody,Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var store = require('store');

function AddComment({show}){
	if(show===true){
		return(
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
				<Col>
				<Button outline type="submit">
					<span className="fa fa-pencil"/> Submit Comment
				</Button>	
				</Col>
			</Row>
		)
	}
	else{
		return(<div/>)
	}
}


function RenderComment({ userB, userB1, comment }) {
	return (
		<Card
			key={comment._id}
			body
			inverse
			className="p-3"
			style={{
				backgroundColor: "white",
				borderBottomColor: '#000',
				borderBottomWidth: "4px",
				borderRightColor: '#000',
				borderRightWidth: "2px",
				padding: '10px',
				margin: 10
			}}
		>
			<CardTitle style={{fontFamily: 'Biryani',color: "#000"}} tag="h5">{comment.senderName}</CardTitle>
			<CardSubtitle style={{color: "#000"}} tag="h5">{userB}{','}{userB1}</CardSubtitle>
			<CardBody>
				<CardText style={{fontFamily: 'Coming Soon' , color: "#000", fontWeight:'bold'}}>{comment.comment}</CardText>
				<CardText style={{color: "#000" , fontSize:"12px", position: ''}} className="ml-auto mr-3">
					--{' '}
					{new Intl.DateTimeFormat('en-US', {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					}).format(new Date(comment.time))}
				</CardText>
			</CardBody>
		</Card>
	);
}

class ProfilePage extends Component {
	constructor(props) {
		
		super(props);
		this.state = {
			comments: [],
			user: {},
			url: {}, 
			isOpen:false, 
			
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		fetch(`http://localhost:4000/users/${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ user: data }));

		fetch(`http://localhost:4000/get_comments?to=${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ comments: data.comments }));
	}
	handleChange(){
		this.setState({isOpen:false})
	}
	handleSubmit(values) {
		if(values.comment!=null){
			var senderName = store.get('userName');
			if (senderName != null) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						to: this.state.user._id,
						senderName: senderName.userName,
						comment: values.comment
					})
				};
				fetch('http://localhost:4000/api/add_comment', requestOptions)
					.then((response) => response.json())
					.then((data) => this.setState({ comments: [ ...this.state.comments, data ] }));
			}
			else {
				toast.dark("Please Login")
			}
		}
		else{
			toast.dark("Enter Comment")
		}
		
	}

	toggleAlert(){
		this.setState({isOpen:false})
	}


	render() {
		
		const dispComment = this.state.comments.map((comment) => {
			return (
				<Col md={4}>
					<RenderComment userB={this.state.user.batch} userB1={this.state.user.branch} comment={comment} />
				</Col>
			);
		});
		return (
			<div className="container">
				<div className="container-banner">
					<img
						src={'/photos/' + this.state.user.imageURL || '/photos/anushree.jpg'}
						alt="Avatar"
						height="170"
						width="170"
					/>
					<h2> {this.state.user.name} </h2>
					<Row>{dispComment}</Row>
				</div>
				<div className="container-banner">
					<LocalForm onSubmit={this.handleSubmit}>
						<Row className="form-group">
							<Col md={12}>
								<Alert color="danger" isOpen={this.state.isOpen} toggle={this.toggleAlert}>
									Please login
								</Alert>
							</Col>								
						</Row>		
						<AddComment show={true}/>			
					</LocalForm>
				</div>
			</div>
		);
	}
}
export default ProfilePage;
