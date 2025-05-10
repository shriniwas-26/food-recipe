import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../validation-schemas/SignUpSchema";
import '../assets/styles/signupstyle.css';
import { signUp } from "../services/UserService";

function SignupPage() {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = async (formData) => {
        try {
            const response = await signUp(formData);
          
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                toast.success("Sign Up Successful")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
        <Container className="mt-5">
            <Alert variant="success">
                <h4>Sign Up</h4>
            </Alert>
            <p>Already have an account?
                <Button variant="primary" onClick={redirectToLogin}>Login Now</Button>
            </p>

            <Container className="mt-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={signUpSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            const { errors, touched, isValid, dirty } = formik;
                            return (
                                <Form>
                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <Field type="text" className="form-control" name="name" placeholder="Enter name" />
                                                <ErrorMessage name="name" component="span" className="error" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <Field type="text" className="form-control" name="email" placeholder="Enter email" />
                                                <ErrorMessage name="email" component="span" className="error" />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <Field type="password" className="form-control" name="password" placeholder="Enter password" />
                                                <ErrorMessage name="password" component="span" className="error" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <label className="form-label">Confirm Password</label>
                                                <Field type="password" className="form-control" name="confirmPassword" placeholder="Confirm password" />
                                                <ErrorMessage name="confirmPassword" component="span" className="error" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Button type="submit" variant="primary" disabled={!(dirty && isValid)}>Register</Button>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </Container>
        </Container>
    );
}

export default SignupPage