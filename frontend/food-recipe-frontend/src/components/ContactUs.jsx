import "../components/recipeItems.css";
import React from 'react';
import { Container, Row, Col, Form, Card, Toast } from 'react-bootstrap';
import { toast } from "react-toastify"
import Footer from "../components/Footer";

const ContactUs = () => {
  function handleSubmit(e) {
    e.preventDefault();
  
    toast.success("Received your message !")
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#ff4d30' }}>Contact Us</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group controlId="subject" className="mt-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Brief summary of your message" required />
            </Form.Group>
            <Form.Group controlId="message" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write your message" required />
            </Form.Group>
            <button className="share-btn1 d-block mx-auto mt-4">Send Message</button>
          </Form>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg border-0 about-card">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text><strong>Phone:</strong> +91-9876543210</Card.Text>
              <Card.Text><strong>Email:</strong> info@foodcity.com</Card.Text>
              <Card.Text><strong>Address:</strong> 123 Street, Kolhapur, Maharashtra</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
