import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../validation-schemas/SignUpSchema";
import '../assets/styles/signupstyle.css';

export function SignupPage() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log("Signup form submitted:", values);
    toast.success("Signup successful!");
    navigate("/login");
  };

  const redirectToLogin = () => {
    navigate("/login");
  }

  const redirectToHome = () => {
    toast.success("Signup successful!");
    navigate("/");
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Alert variant="success">
            <h4 className="text-center">Sign Up to use food recipe app</h4>
          </Alert>
          <p>Already have an account? <Button variant="primary" onClick={redirectToLogin}>Login Now</Button></p>
          <Container className="mt-4"></Container>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              const { isValid, dirty } = formik;
              return (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">name</label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      className="form-control"
                    />
                    <ErrorMessage name="username" component="span" className="error" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="form-control"
                    />
                    <ErrorMessage name="email" component="span" className="error" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                    />
                    <ErrorMessage name="password" component="span" className="error" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="form-control"
                    />
                    <ErrorMessage name="confirmPassword" component="span" className="error" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={redirectToHome}
                      className="w-50"
                    // disabled={!(dirty && isValid)}
                    >
                      Signup
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
