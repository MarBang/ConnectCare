import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Navigation() {
  const { user, logout } = useAuth();


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/login">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            {user && <Nav.Link as={Link} to="/image">Image</Nav.Link>}
          </Nav>
          <Nav>
            {user ? (<Nav.Link onClick={logout}>Logout</Nav.Link>) : (null)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;