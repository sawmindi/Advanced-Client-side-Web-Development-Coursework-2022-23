import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary pt-0 mt-0">
      <Container className='pt-0 mt-0'>
        <Navbar.Brand href="#home"className="custom-navbar-brand">Estate Agent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/" className={`m-1 ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
          <Nav.Link href="/properties" className={`m-1 ${location.pathname === '/properties' ? 'active' : ''}`}>Properties</Nav.Link>
          <Nav.Link href="/aboutus" className={`m-1 ${location.pathname === '/aboutus' ? 'active' : ''}`}>About Us</Nav.Link>
          <Nav.Link href="/contactus" className={`m-1 ${location.pathname === '/contactus' ? 'active' : ''}`}>Contact Us</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
