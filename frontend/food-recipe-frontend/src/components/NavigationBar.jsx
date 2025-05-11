import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './NavigationBar.css';
import logo1 from "../Images/Logo1.png";
import { removeToken } from '../services/userService';

export function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));

  // Update login state on mount and when route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // triggers on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // update state
    navigate("/login"); // redirect
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
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contactus">
              <Nav.Link>ContactUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/aboutus">
              <Nav.Link>AboutUs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/addRecipe">
              <Nav.Link>AddYourRecipe</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myrecipes">
              <Nav.Link>My Recipes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favourite">
              <Nav.Link>Favourite</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {isLoggedIn && (
              <div>
              <Button variant="danger" onClick={handleLogout} className="logout-btn">
                Logout
              </Button>
              <span className='ms-3'>{ user?.email ? user?.email : ""}</span>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
