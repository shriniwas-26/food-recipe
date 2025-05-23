import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../validation-schemas/SignUpSchema";
import '../assets/styles/signupstyle.css';
import { signUp } from "../services/userService";

function SignupPage() {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values);
            const response = await signUp(values);
            console.log(response);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                toast.success("User Registered Successfully");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-image">
            <div className="signup-box p-4 rounded shadow-sm bg-white w-100" style={{ maxWidth: "600px" }}>
                <Alert variant="success" className="text-center">
                    <h4>Signup Page</h4>
                </Alert>
                <p className="text-center">
                    Already have an account? <Link to="/login">Login Now</Link>
                </p>

                <Container className="mt-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty, isSubmitting }) => (
                            <Form>
                                <Row>
                                    <Col xs={12} className="mb-3">
                                        <label className="form-label">Name</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter name"
                                        />
                                        <ErrorMessage name="name" component="span" className="error" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12} md={6} className="mb-3">
                                        <label className="form-label">Email</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email"
                                        />
                                        <ErrorMessage name="email" component="span" className="error" />
                                    </Col>
                                    <Col xs={12} md={6} className="mb-3">
                                        <label className="form-label">Password</label>
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Enter password"
                                        />
                                        <ErrorMessage name="password" component="span" className="error" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={12} className="mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                        />
                                        <ErrorMessage name="confirmPassword" component="span" className="error" />
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-center">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-50 mt-2"
                                        disabled={!(dirty && isValid) || isSubmitting}
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </Container>
    );
}

export default SignupPage;
