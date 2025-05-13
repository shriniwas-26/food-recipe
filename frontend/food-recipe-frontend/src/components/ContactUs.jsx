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

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  function resetFormData() {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTouched({});
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFieldInvalid = (field) => {
    const value = formData[field].trim();
    if (!touched[field]) return false;
    if (field === 'email') return !validateEmail(value);
    return value === '';
  };

  const isFormComplete = Object.values(formData).every(value => value.trim() !== '') && validateEmail(formData.email);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await addFeedback(formData);
      if (response.status === 201) {
        toast.success("Feedback added successfully...");
        setIsSubmitting(false);
        resetFormData();
      } else {
        toast.error("Internal server error...");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-center mt-4" style={{ color: '#ff4d30' }}>Contact Us</h2>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleOnSubmit} noValidate>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isFieldInvalid('name')}
                  placeholder="Enter your name"
                />
                <Form.Control.Feedback type="invalid">
                  Name is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isFieldInvalid('email')}
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  {formData.email.trim() === '' ? 'Email is required.' : 'Enter a valid email address.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="subject" className="mt-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isFieldInvalid('subject')}
                  placeholder="Brief summary of your message"
                />
                <Form.Control.Feedback type="invalid">
                  Subject is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="message" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={isFieldInvalid('message')}
                  placeholder="Write your message"
                />
                <Form.Control.Feedback type="invalid">
                  Message is required.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="btn-container mt-4">
                <button disabled={isSubmitting || !isFormComplete} className="share-btn1">
                  Send Message
                </button>
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