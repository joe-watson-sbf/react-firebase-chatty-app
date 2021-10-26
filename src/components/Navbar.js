import React from 'react'
import img from '../asserts/images/chat-img.png'
import { auth } from '../services/firebase'
import { Navbar, Container, Button, Image } from 'react-bootstrap';

export const PrivateNavbar = () => (
	<Navbar className='mb-4'>
		<Container>
			<Navbar.Brand>
				<Image style={{ width: "90px", height: "90px" }} src={img} roundedCircle />
			</Navbar.Brand>
			<Navbar.Toggle />

			<Navbar.Collapse className="justify-content-end">
				<Button className='bg-gradient' onClick={() => auth().signOut()} > Sign Out</Button>
			</Navbar.Collapse>
		</Container>
	</Navbar>
)