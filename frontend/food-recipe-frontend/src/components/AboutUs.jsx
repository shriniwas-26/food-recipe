import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from "../components/Footer";

import team1 from '../assets/images/team1.jpg';
import team2 from '../assets/images/team2.jpg';
import team3 from '../assets/images/team3.png';


const teamMembers = [
  {
    name: 'Satyajeet Khamkar',
    email: 'khamkarsatyajeet190401@gmail.com',
    phone: '7378750403',
    address: 'Kolhapur, Maharashtra',
    image: team1,
  },
  {
    name: 'Shriniwas Pawar',
    email: 'pawar.shriniwas26@gmail.com',
    phone: '7020172470',
    address: 'Nanded, Maharashtra',
    image: team2,
  },
  {
    name: 'Saiteja Gampa',
    email: 'saitejagampa8@gmail.com',
    phone: '7658990750',
    address: 'Rajanna Sircilla, Telangana',
    image: team3,
  },
];

const AboutUs = () => {
  return (
    <>
      <Container className="my-5">
        <h2 className="text-center mb-4" style={{ color: '#ff4d30' }}>About Us</h2>
        <p className="text-center text-secondary mb-5">
          Welcome to TastyBite — your one-stop platform for discovering and sharing delicious homemade recipes.
          Our mission is to bring joy through food and connect people over authentic culinary experiences.
        </p>
        <Row>
          {teamMembers.map((member, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className="shadow-lg border-0 about-card">
                {/* <Card.Img variant="top" src={member.image} /> */}
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={member.name}
                  className="img-fluid"
                  style={{ width: '300px', height: '400px', objectFit: 'cover', margin: 'auto', paddingTop: '10px' }}
                />
                <Card.Body>
                  <Card.Title className='text-center'>{member.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {member.email}<br />
                    <strong>Phone:</strong> {member.phone}<br />
                    <strong>Address:</strong> {member.address}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
