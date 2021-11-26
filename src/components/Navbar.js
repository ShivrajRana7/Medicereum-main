import React from 'react'
// import logo from '../assets/logo.svg'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../assets/Logo.png'
import {useState }from 'react';


const Navbar1 = () => {
    return(
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/manufacturer">Manufacturer</Nav.Link>
                <Nav.Link href="/consumer">Consumer</Nav.Link>
                <Nav.Link href="/supplier">Supplier</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbar1