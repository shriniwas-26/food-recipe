import "../components/recipeItems.css";
import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { addFeedback } from "../services/userService";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const ContactUs = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  function resetFormData() {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await addFeedback(formData);
      if (response.status == 201) {
        toast.success("Feedback added successfully...");
        setIsSubmitting(false);
        resetFormData();
        console.log(formData)
      } else {
        toast.error("Internal server error...");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }

  }

  const isFormComplete = Object.values(formData).every(value => value.trim() !== '');

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" value={formData.name} name="name" onChange={handleChange} required placeholder="Enter your name" />
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={formData.email} name="email" onChange={handleChange} required placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="subject" className="mt-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" value={formData.subject} name="subject" onChange={handleChange} required placeholder="Brief summary of your message" />
              </Form.Group>
              <Form.Group controlId="message" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} value={formData.message} name="message" onChange={handleChange} required placeholder="Write your message" />
              </Form.Group>
              <div className="btn-container">
              <button disabled={isSubmitting || !isFormComplete} className="share-btn1">Send Message</button>
              </div>
            </Form>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg border-0 about-card">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                <Card.Text><strong>Phone:</strong> +91-9876543210</Card.Text>
                <Card.Text><strong>Email:</strong> info@tastybite.com</Card.Text>
                <Card.Text><strong>Address:</strong> 123 Street, Kolhapur, Maharashtra</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;
