import React, { Component } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => authenticated
				? <Component {...props} />
				: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
		/>
	)
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => !authenticated
				? <Component {...props} />
				: <Redirect to={{ pathname: '/chat', state: { from: props.location } }} />}
		/>
	)
}

class App extends Component {

	constructor() {
		super();
		this.state = {
			authenticated: false,
			loading: true,
		};
	}

	componentDidMount() {
		auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					authenticated: true,
					loading: false,
				});
			} else {
				this.setState({
					authenticated: false,
					loading: false,
				});
			}
		})
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<PrivateRoute
						path="/chat"
						authenticated={this.state.authenticated}
						component={Chat}
					/>
					<PublicRoute
						path="/signup"
						authenticated={this.state.authenticated}
						component={SignUp}
					/>
					<PublicRoute
						path="/login"
						authenticated={this.state.authenticated}
						component={Login}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;