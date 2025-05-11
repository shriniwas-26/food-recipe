import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import "../components/recipeItems.css";

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
                            <li><a href="/about" className="text-dark">About Us</a></li>
                            <li><a href="/contact" className="text-dark">Contact Us</a></li>
                            <li><a href="/recipes" className="text-dark">Recipes</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#" className="text-dark me-3">
                                <FaFacebook className="me-1" /> Facebook
                            </a><br />
                            <a href="#" className="text-dark me-3">
                                <FaInstagram className="me-1" /> Instagram
                            </a><br />
                            <a href="#" className="text-dark">
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
