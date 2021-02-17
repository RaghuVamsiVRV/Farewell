import React, { Component } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Button, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardBody,Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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
function RenderComment({ userB, userB1, comment, onDelete}) {

	const handleDelete = () => {
		fetch(`http://localhost:4000/api/delete_comment/${comment._id}`, {method:"DELETE", credentials:'include', headers: { "Content-Type": "application/json", "Accept":"application/json"}})
		.then((response)=>{if(!response.ok){throw response} return response.json()})
		.then((data)=> {toast.dark("Comment Deleted");onDelete()})
		.catch(err =>{
			err.text().then(errMsg=>
				{
					var error=JSON.parse(errMsg);
					toast.error(error.error, {toastId:"error"})
				})
		})
	  }
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
			<CardTitle md={10} style={{fontFamily: 'Biryani',color: "#000"}} tag="h5"><Link className="text-secondary" to={`/${comment.from}`}>{comment.senderName}</Link> <Button  style={{position:"absolute", top:"10px", right:"5px"}} color="link" className="text-danger" size="sm" onClick={()=>handleDelete(comment._id)}><DeleteOutlinedIcon fontSize="small" /> </Button></CardTitle>
			
			<CardSubtitle style={{color: "#000"}} tag="h5">{userB1}{','}{userB}</CardSubtitle>
			<CardBody>
				<CardText style={{fontFamily: 'Coming Soon' , color: "#000", fontWeight:'bold'}}>{comment.comment}</CardText>
				<CardText style={{color: "#000" , fontSize:"12px", position: 'absolute', bottom:'0', right:'0', margin: '8px'}} className="ml-auto mr-3">
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
		let userID=store.get('userID');
		super(props);
		this.state = {
			comments: [],
			user: {},
			url: {}, 
			isOpen:false, 
			showComment:userID?userID.userID!==this.props.id:true, 
			text:""
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleDelete(){
		fetch(`http://localhost:4000/get_comments?to=${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ comments: data.comments }));
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
	handleSubmit(values, event) {
		event.preventDefault();
		this.setState({text:""})
		var senderName = store.get('userName');
		if(senderName != null){
			if (values.comment) {
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
				toast.dark("Enter Comment")
			}
		}
		else{
			toast.dark("Please Login")
		}
		
	}

	toggleAlert(){
		this.setState({isOpen:false})
	}


	render() {
		const dispComment = this.state.comments.map((comment) => {
			return (
				<Col md={4}>
					<RenderComment userB={this.state.user.batch} userB1={this.state.user.branch} comment={comment} onDelete={this.handleDelete}/>
				</Col>
			);
		});
		return (
			<div>
				<div className="container-banner">
					<img
						src={'/photos/' + this.state.user.imageURL || '/photos/anushree.jpg'}
						alt="Avatar"
						height="170"
						width="170"
					/>
					<h2 className="Tname"> {this.state.user.name} </h2>
					<h5 className="Tname1"> {this.state.user.branch}{', '}{this.state.user.batch} </h5>
					<Row>{dispComment}</Row>
				</div>
				<div className="container-banner">
					<LocalForm onSubmit={this.handleSubmit}>	
						<AddComment show={this.state.showComment}/>			
					</LocalForm>
				</div>
			</div>
		);
	}
}
export default ProfilePage;
