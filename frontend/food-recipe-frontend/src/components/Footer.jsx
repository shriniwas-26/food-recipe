import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import "../components/recipeItems.css";
import './NavigationBar.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-light-green text-dark py-4 mt-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About FoodieHeaven</h5>
                        <p>Discover and share delicious homemade recipes. Bringing people together through the love of food.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/AboutUs" className="footer-link">About Us</Link></li>
                            <li><Link to="/ContactUs" className="footer-link">Contact Us</Link></li>
                            <li><Link to="/MyRecipes" className="footer-link">Recipes</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>
                            <a href="https://www.facebook.com" target='_blank' className="footer-link">
                                <FaFacebook className="me-1" /> Facebook
                            </a><br />
                            <a href="https://www.instagram.com" target='_blank' className="footer-link">
                                <FaInstagram className="me-1" /> Instagram
                            </a><br />
                            <a href="https://www.twitter.com" target='_blank' className="footer-link">
                                <FaTwitter className="me-1" /> Twitter
                            </a>
                        </p>
                    </Col>
                </Row>
                <hr className="bg-light" />
                <p className="text-center mb-0">&copy; 2025 FoodieHeaven. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
