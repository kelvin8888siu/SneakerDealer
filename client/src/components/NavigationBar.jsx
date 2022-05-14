import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Navbar.css'


export default function NavigationBar() {
    const {logout} = useAuth0();

    function logoutClicked(e){
        e.preventDefault()
        logout({ returnTo: window.location.origin })
    }

  return (
    <div className="navbar-background">
        <Navbar bg="light" expand="lg" className="navbar-light">
            <Container fluid>
                <Navbar.Brand href="/app">SneakerDealer</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/app">Home</Nav.Link>
                    <Nav.Link href="/app/debugger">Debugger</Nav.Link>
                    <Nav.Link href="/loginregister">Login</Nav.Link>
                    <Nav.Link href="/app/logout">Logout</Nav.Link>
                    <NavDropdown title="Account" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/app/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/app/sell">Sell</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
