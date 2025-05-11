import { useState } from "react";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { loginSchema } from "../validation-schemas/LoginSchema";
import { Formik, Field, ErrorMessage } from "formik";
import '../assets/styles/signupstyle.css'; // adjust path based on actual location

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            const response = await login(values);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success("Login successful!");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong...!");
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <div className="signup-box p-4 rounded shadow-sm bg-white w-100" style={{ maxWidth: '500px' }}>
                <Alert variant="success" className="mb-3 text-center">
                    <h4>Login page</h4>
                </Alert>

                <p className="text-center mb-4">
                    Need an account?
                    <Link to="/signup" className="ms-2 text-primary fw-semibold">
                        Create an account
                    </Link>
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, isValid, dirty }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger small" />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger small" />
                            </div>

                            <div className="d-flex justify-content-center">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-50 mt-2"
                                    disabled={loading || !(dirty && isValid)}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export default LoginPage;
