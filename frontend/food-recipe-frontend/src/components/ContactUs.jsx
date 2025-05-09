import "../components/recipeItems.css";
import React from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

const ContactUs = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#ff4d30' }}>Contact Us</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="subject" className="mt-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Brief summary of your message" />
            </Form.Group>
            <Form.Group controlId="message" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write your message" />
            </Form.Group>
            <button  className="bg-light-green text-black rounded-3 outline-none border-none mt-4">Send Message</button>
          </Form>
        </Col>
        <Col md={6}>
          <Card>
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
