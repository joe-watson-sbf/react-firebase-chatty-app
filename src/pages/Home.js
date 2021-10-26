import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from '../asserts/images/chat-img.png'
import { Row, Image, Container, Col } from "react-bootstrap";
export default class Home extends Component {
  render() {
    return (
      <Container className="container app-form" fluid>
        <h1 className="text-center mt-4 mb-4">Welcome to Chatty App</h1>
        <Row >
          <Col xs={9} md={8} lg={7}>
            <Image style={{width:"90px", height:"90px"}} src={img} roundedCircle />
          </Col>
        </Row>
        <Row  aria-label="Basic example" >
          <Link className="btn btn-secondary form-control mt-4" to = "/login">Log In</Link>
          <Link className="btn btn-secondary form-control mb-3 mt-3" to="/signup">Create Account</Link>
        </Row>
      </Container>
    )
  }
}