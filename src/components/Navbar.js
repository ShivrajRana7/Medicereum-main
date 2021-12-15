import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../assets/Logo.png'
import {useState }from 'react';


const Navbar1 = () => {
    return(
        <Navbar style={{background:"#5840ba"}} variant="dark">
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/manufacturer">Manufacturer</Nav.Link>
            <Nav.Link as={Link} to="/consumer">Consumer</Nav.Link>
            <Nav.Link as={Link} to="/supplier">Supplier</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbar1