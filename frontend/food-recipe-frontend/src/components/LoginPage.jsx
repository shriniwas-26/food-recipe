import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false); // For handling loading state

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            toast.error('Please fill out all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            
            if (!validateForm()) return; // Validate form before submitting

            setLoading(true); // Set loading to true when API call is in progress
            const response = await login(formData);

            if (response.status === 200) {
                // storeToken(response.data.token);
                // navigate("/dashboard");
                localStorage.setItem("token",response.data.token);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false); // Stop loading after the request
            if (error.response?.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong...!');
            }
        }
    };

    const openSignUpForm = () => {
        navigate("/signup"); // Fixed to navigate to signup page
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={4}>
                    <Alert variant="primary" className="mb-3">Login</Alert>
                    <p className="mb-3">
                        Need an account? 
                        <Button variant="success" onClick={openSignUpForm}>Create an account</Button>
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange} 
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage