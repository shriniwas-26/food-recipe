import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './NavigationBar.css';
import logo1 from "../Images/Logo1.png";


export function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.clear();
    setTimeout(() => navigate("/login"), 0); // Ensure navigation works even in StrictMode
  };

  return (
    <Navbar expand="lg" variant="light" style={{ backgroundColor: "#C5E1A5" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-dark d-flex align-items-center">
            <img src={logo1} alt="TastyBite Logo" style={{ height: "70px", width: "80px", marginRight: "10px" }} />
          </Link>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="nav-link">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link className="nav-link">Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard">
              <Nav.Link className="nav-link">Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contactus">
              <Nav.Link className="nav-link">ContactUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/aboutus">
              <Nav.Link className="nav-link">AboutUs</Nav.Link>
            </LinkContainer>
            {/* Added "My Recipes" and "Favourite" */}
            <LinkContainer to="/myrecipes">
              <Nav.Link className="nav-link">My Recipes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favourite">
              <Nav.Link className="nav-link">Favourite</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={handleLogout} className="logout-btn">
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
