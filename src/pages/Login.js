import React, { Component } from "react";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import { Formulario } from "../components/Formulario";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			email: "",
			password: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.googleSignIn = this.googleSignIn.bind(this);
		this.githubSignIn = this.githubSignIn.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		this.setState({ error: "" });
		try {
			await signin(this.state.email, this.state.password);
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	async googleSignIn() {
		try {
			await signInWithGoogle();
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	async githubSignIn() {
		try {
			await signInWithGitHub();
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	render() {
		return (
			<>
				<Formulario
					title = "Sign In"
					email={this.state.email}
					password={this.state.password}
					error = {this.state.error}
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					googleSignIn = {this.googleSignIn}
					githubSignIn = {this.githubSignIn}
				/>
			</>

		);
	}
}


