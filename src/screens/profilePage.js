import React, { Component, useState } from 'react';
import { Control, LocalForm } from 'react-redux-form';
import { Button, Row, Col, Card, CardTitle, CardSubtitle, CardText, CardBody, ButtonGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReactCardFlip from 'react-card-flip';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
var store = require('store');

const Undo = ({text, data, onDelete}) => {
	const dismiss = () =>  toast.dismiss("Undo");
	let userDetails=store.get('userDetails')
	const handleUndo = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				to: data.to,
				senderName: data.senderName,
				comment: data.comment, 
				senderBranch: userDetails.branch,
				senderBatch: userDetails.batch,
				senderCollege: userDetails.college
			})
		};
		fetch('http://localhost:4000/api/add_comment', requestOptions)
			.then((response) => response.json())
			.then(() => {onDelete(); dismiss()});

	}
	return(
		<div>
			{text} 
			<Button color ="link" className="text-success" onClick={handleUndo} size="sm">Undo</Button>
		</div>
	)
}

function AddComment({show}){
	if(show===true){
		return(
			<Row className="form-group">
				<Col md={12} style={{
				margin: 10,
			}}>
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


// function RenderComment({ userB, userB1, comment, onDelete}) {
// 	const handleDelete = () => {
// 		fetch(`http://localhost:4000/api/delete_comment/${comment._id}`, {method:"DELETE", credentials:'include', headers: { "Content-Type": "application/json", "Accept":"application/json"}})
// 		.then((response)=>{if(!response.ok){throw response} return response.json()})
// 		.then((data)=> {toast.dark(({})=><Undo text="Comment deleted" data={data} onDelete={onDelete}/>, {toastId:"Undo"});onDelete()})
// 		.catch(err =>{
// 			err.text().then(errMsg=>
// 				{
// 					var error=JSON.parse(errMsg);
// 					toast.error(error.error, {toastId:"error"})
// 				})
// 		})
// 	  }
	  
// 	return (
// 		<Card
// 			key={comment._id}
// 			body
// 			inverse
// 			className="p-3"
// 			style={{
// 				backgroundColor: "#fff",
// 				borderBottomColor: '#000',
// 				borderBottomWidth: "4px",
// 				borderRightColor: '#000',
// 				borderRightWidth: "2px",
// 				borderTopColor: '#000',
// 				borderTopWidth: "1px",
// 				borderLeftColor: '#000',
// 				borderLeftWidth: "1px",
// 				padding: '10px',
// 				margin: 10
// 			}}
// 		>
// 			<CardTitle md={10} style={{fontFamily: 'Varela Round',color: "#000", fontSize: "16px", textAlign:'left'}} tag="h5"><Link className="text-secondary" to={`/${comment.from}`}>{comment.senderName}</Link> <Button  style={{position:"absolute", top:"10px", right:"5px"}} color="link" className="text-danger" size="sm" onClick={()=>handleDelete(comment._id)}><DeleteOutlinedIcon fontSize="small" /> </Button></CardTitle>
			
// 			<CardSubtitle style={{color: "#000",fontSize: "12px", textAlign:'left'}} tag="h5">{userB1}{','}{userB}</CardSubtitle>
// 			<CardBody>
// 				<CardText style={{fontFamily: 'Architects Daughter' , color: "#000"}}>{comment.comment}</CardText>
// 				<CardText style={{color: "#000" , fontSize:"12px", position: 'absolute', bottom:'0', right:'0', margin: '8px'}} className="ml-auto mr-3">
// 					--{' '}
// 					{new Intl.DateTimeFormat('en-US', {
// 						day: '2-digit',
// 						month: 'short',
// 						year: 'numeric'
// 					}).format(new Date(comment.time))}
// 				</CardText>
// 			</CardBody>
// 		</Card>
// 	);
// }




function RenderComment2({ userB, userB1, comment, onDelete, id, show}) {
	var [isFlipped, Flip] = useState(true);
	if(show==="1")
	{
		isFlipped=false
	}
	const handleDelete = () => {
		fetch(`http://localhost:4000/api/delete_comment/${comment._id}`, {method:"DELETE", credentials:'include', headers: { "Content-Type": "application/json", "Accept":"application/json"}})
		.then((response)=>{if(!response.ok){throw response} return response.json()})
		.then((data)=> {toast.dark(({})=><Undo text="Comment deleted" data={data} onDelete={onDelete}/>, {toastId:"Undo"});onDelete()})
		.catch(err =>{
			err.text().then(errMsg=>
				{
					var error=JSON.parse(errMsg);
					toast.error(error.error, {toastId:"error"})
				})
		})
	  }
	if(show==="2"){
		setTimeout(function(){
			Flip(id!==comment.from)
		}, 250);
	}
	else { 
		setTimeout(function(){
			Flip(false)
		}, 250);
	}
	

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div key="front">
				<Card
					key={comment._id}
					body
					inverse
					className="p-3"
					style={{
						backgroundColor: "#fff",
						borderBottomColor: '#000',
						borderBottomWidth: "4px",
						borderRightColor: '#000',
						borderRightWidth: "2px",
						borderTopColor: '#000',
						borderTopWidth: "1px",
						borderLeftColor: '#000',
						borderLeftWidth: "1px",
						padding: '10px',
						margin: 10
					}}
				>
					<CardTitle md={10} style={{fontFamily: 'Varela Round',color: "#000", fontSize: "16px", textAlign:'left'}} tag="h5"><Link className="text-secondary" to={`/${comment.from}`}>{comment.senderName}</Link> <Button  style={{position:"absolute", top:"10px", right:"5px"}} color="link" className="text-danger" size="sm" onClick={()=>handleDelete(comment._id)}><DeleteOutlinedIcon fontSize="small" /> </Button></CardTitle>
					
					<CardSubtitle style={{color: "#000",fontSize: "12px", textAlign:'left'}} tag="h5">{comment.senderBranch}{','}{comment.senderBatch}</CardSubtitle>
					<CardBody>
						<CardText style={{fontFamily: 'Architects Daughter' , color: "#000"}}>{comment.comment}</CardText>
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
				</div>

				<div key="back">
					<Card
						key={comment._id}
						body
						inverse
						className="p-3"
						style={{
							backgroundColor: "#fff",
							borderBottomColor: '#000',
							borderBottomWidth: "4px",
							borderRightColor: '#000',
							borderRightWidth: "2px",
							borderTopColor: '#000',
							borderTopWidth: "1px",
							borderLeftColor: '#000',
							borderLeftWidth: "1px",
							padding: '10px',
							margin: 10
						}}
					>
						<CardTitle><br/></CardTitle>
						
						<CardBody><br/></CardBody>
					</Card>
				</div>
		</ReactCardFlip>
		
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
			text:"",
			commentsType:"0",
			myComments:[]
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMyComments = this.handleMyComments.bind(this);
	}
	handleDelete(){
		fetch(`http://localhost:4000/get_comments?to=${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ comments: data.comments , commentsType:"1"}));
		fetch('http://localhost:4000/api/my_comments', {credentials:'include'})
			.then((response) => response.json())
			.then((data) => {this.setState({ myComments: data.comments, commentsType:"1" }); console.log(data)});		
	}
	componentDidMount() {
		fetch(`http://localhost:4000/users/${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ user: data }));

		fetch(`http://localhost:4000/get_comments?to=${this.props.id}`)
			.then((response) => response.json())
			.then((data) => this.setState({ comments: data.comments }));

		fetch('http://localhost:4000/api/my_comments', {credentials:'include'})
			.then((response) => response.json())
			.then((data) => {this.setState({ myComments: data.comments }); });	
	}
	handleMyComments(){
		this.setState({commentsType:"3"})
	}
	handleChange(){
		this.setState({isOpen:false})
	}
	handleSubmit(values, event) {
		event.preventDefault();
		this.setState({text:""})
		let userDetails=store.get('userDetails')
		if(userDetails != null){
			if (values.comment) {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						to: this.state.user._id,
						senderName: userDetails.name,
						comment: values.comment, 
						senderBranch: userDetails.branch,
						senderBatch: userDetails.batch,
						senderCollege: userDetails.college,
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
			toast.error("Please Login")
		}
		
	}

	toggleAlert(){
		this.setState({isOpen:false})
	}


	render() {
		var userID=store.get('userID')
		const dispComment  = this.state.comments.map((comment) => {
			return (
				<Col md={6}>
					<RenderComment2 userB={this.state.user.batch} userB1={this.state.user.branch} comment={comment} onDelete={this.handleDelete} id={userID?userID.userID:""}  show={this.state.commentsType} />
				</Col>
			);
		});
		const dispComment2 = this.state.myComments?this.state.myComments.map((comment) => {
			return (
				<Col md={6}>
					<RenderComment2 userB={this.state.user.batch} userB1={this.state.user.branch} comment={comment} onDelete={this.handleDelete} id={userID?userID.userID:""}  show={this.state.commentsType} />
				</Col>
			);
		}): ()=>{return(<div/>)}
		const DispComment = ({id}) =>{
			if(id==="3"){
				return(
					<Row>{dispComment2}</Row>
				)
			}
			else{
				return(
					<Row>{dispComment}</Row>
				)
			}
		}
		const CommentNav = ({handleMyComments}) =>{
			if(store.get('userDetails')&&store.get('userDetails')._id===this.props.id){
				return(
					<Button onClick={handleMyComments}>
						My Comments
					</Button>
				)
			}
			else{
				return(
					<Button onClick={()=>{
						if(store.get('userID')){this.setState({commentsType:"2"});}
						else{toast.error("Please Login", {toastId:"pl"})}
						}}>
						My Comments
					</Button>
				)
			}
		}
		const DispEdit = ({show}) =>{
			if(show){
				return(
					<Link to="/editUser" style={{position:"relative", left:"-2em", top:"3em", textDecoration:"none"}}> 
						<Fab color="default" size="small" aria-label="edit"><EditIcon /></Fab>
					</Link>	
				)
			}
			else{
				return <div/>
			}
			
		}
		return (
			<div className="lcontainer">
				<div className="container-banner">
					<img
						src={'/photos/' + this.state.user.imageURL}
						alt="Avatar"
						height="170"
						width="170"
					/>
					<DispEdit show={store.get('userDetails')?this.state.user._id===store.get('userDetails')._id:false}/>
					<h2 className="Tname"> {this.state.user.name} </h2>
					<h5 className="Tname1"> {this.state.user.branch}{', '}{this.state.user.batch}</h5>
					
					<ButtonGroup>
							<Button onClick={()=>{this.setState({commentsType:"0"});}}>
								All Comments
							</Button>
							<CommentNav handleMyComments={this.handleMyComments}/>
					</ButtonGroup>
					<DispComment id={this.state.commentsType} />					
				</div>
				<div className="container-banner">
					<LocalForm onSubmit={this.handleSubmit} >	
						<AddComment show={this.state.showComment}/>			
					</LocalForm>
				</div>
			</div>
		);
	}
}
export default ProfilePage;
