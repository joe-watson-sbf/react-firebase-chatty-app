import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { PrivateNavbar } from "../components/Navbar";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: auth().currentUser,
			chats: [],
			content: '',
			error: null,
			loadingChats: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.myRef = React.createRef();
	}

	async componentDidMount() {
		this.setState({ error: null });
		try {
			db.ref("chats").on("value", snapshot => {
				let chats = [];
				snapshot.forEach((snap) => {
					chats.push(snap.val());
				});
				this.setState({ chats });
			});
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	handleChange(event) {
		this.setState({
			content: event.target.value
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		if(this.state.content.length>0){
			this.setState({ error: null });
			try {
				await db.ref("chats").push({
					content: this.state.content,
					timestamp: Date.now(),
					uid: this.state.user.uid
				});
				this.setState({ content: '' });
			} catch (error) {
				this.setState({ error: error.message });
			}

		}else{
			this.setState({ error: "Empty message!!! " });
		}
		
	}

	render() {
		return (
			<div className="app-form">
				
				<Container ref={this.myRef}>
				<PrivateNavbar />
					{this.state.loadingChats ?
						<Col role="status">
							<span className="sr-only">Loading...</span>
						</Col> : ""}
					

					{this.state.chats.map(chat => {
						return (
							<Row key={chat.timestamp} xs className="mt-2 p-3 bg-opacity-25 bg-success bg-opacity-10">
								<Col >
									{chat.content}
								</Col>
								<Col>
									<em>
											Date: 
											{
												" " +
												new Date(chat.timestamp).getDate()  + "/" +
												new Date(chat.timestamp).getMonth()+1  + "/" +
												new Date(chat.timestamp).getUTCFullYear() 
											
											}
											<br/>
											Hour: {
												new Date(chat.timestamp).getHours()  + "h " +
												new Date(chat.timestamp).getMinutes()  + "m " +
												new Date(chat.timestamp).getSeconds() +"s"
											}
										</em>
								</Col>
								
							</Row>
						)
					})}
					<Form className="mx-3" onSubmit={this.handleSubmit}>
						<Form.Label>Your Message</Form.Label>
						<Form.Control as="textarea" rows={3}
							onChange={this.handleChange}
							value={this.state.content}
						/>
						{this.state.error &&
							<Alert variant="danger" className="mt-2">
								{this.state.error}
							</Alert>
						}
						<Button className="mt-3" variant="dark" type="submit">Enviar</Button>
					</Form>
					<div className="py-5">
						Session: <strong>{this.state.user.email}</strong>
					</div>
					
				</Container>
			</div>
		);
	}
}