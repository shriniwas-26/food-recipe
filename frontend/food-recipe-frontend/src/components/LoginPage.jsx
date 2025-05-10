import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, storeToken } from "../services/UserService";

function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(formData);
            const response = await login(formData);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data.token);
                storeToken(response.data.token);
                toast.success("Login Successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                console.log(error);
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong...!');
            }
        }
    };

    const openSignUpForm = () => {
        navigate("/signup");
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
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage