import React from 'react'
import { Link } from "react-router-dom";
import { Form, Button, Row, Alert, Container, Col } from "react-bootstrap";
import GitHubButton from '../asserts/images/github.png';
import GoogleButton from 'react-google-button';

export const Formulario = (props) => {
    return (
        <div className="app-form">

				<h3 className="text-center m-4">Chatty App - {props.title}</h3>

				<Form onSubmit={props.handleSubmit} autoComplete="off" className="w-50">
					<Form.Group className="mb-3" as={Row}>
						<Form.Label>Email address</Form.Label>
						<Form.Control 
							type="text"
							id="login"
							name="email"
							className="form-input input-form"
							placeholder="Enter email"
							onChange={props.handleChange}
							value={props.email} />
					</Form.Group>
					<Form.Group className="mb-3" as={Row}>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							id="password"
							name="password"
							className="form-input input-form"
							placeholder="Password"
							onChange={props.handleChange}
							value={props.password} />
					</Form.Group>
					{props.error && 
						
						<Alert variant="danger">
							{props.error}
						</Alert>
					}
					<Button variant="primary" type="submit"> {props.title} </Button>
					
					<p> {props.title==="Sign In" ? 'You havent\'t an account?  ' : 'Have you an account?  '} 

                        <Link to={props.title==="Sign In" ? '/signup' : "/login"}>
                            {props.title==="Sign In" ? '  Sign Up' : "  Sign In"}
                        </Link> 
                    </p>
				</Form>

                <Container>
                    <Row className="justify-content-md-center" xs={2} md={4} lg={9}>
                        <Col xs>
                            <GoogleButton type="dark"  className="btn-google" onClick={props.googleSignIn} />
                        </Col>
                        <Col xs>
                            <div onClick={props.githubSignIn} className="github-btn">
                                <div>
                                    <img src={GitHubButton} alt="github"/>
                                </div>
                                <p>Sign in with GitHub</p>
                            </div>
                        </Col>
                    </Row>
                    
                    
                </Container>
				
		</div>
    )
}
