import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../assets/Logo.png'
import {useState }from 'react';


const Navbar1 = () => {
    return(
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/" style={{fontFamily:"Segoe UI", fontSize:"1rem"}}>Home</Nav.Link>
                    <Nav.Link href="/manufacturer" style={{fontFamily:"Segoe UI", fontSize:"1rem"}}>Manufacturer</Nav.Link>
                    <Nav.Link href="/consumer" style={{fontFamily:"Segoe UI", fontSize:"1rem"}}>Consumer</Nav.Link>
                    <Nav.Link href="/supplier" style={{fontFamily:"Segoe UI", fontSize:"1rem"}}>Supplier</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbar1