import React from 'react'
import logo from '../assets/logo.svg'
import { Navbar, Nav, Container } from 'react-bootstrap';
// import Home from './components/Home';
// import Manufacture from './components/Manufacture';
// import Consumer from './components/Consumer';
// import Supplier from './components/Supplier';
import 'bootstrap/dist/css/bootstrap.min.css'
// import '../Styles/Navbar.css'

function Header() {
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="#home">Medicereum</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Manufacture</Nav.Link>
                        <Nav.Link>Consumer</Nav.Link>
                        <Nav.Link>Supplier</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>   

    )
}

export default Header;