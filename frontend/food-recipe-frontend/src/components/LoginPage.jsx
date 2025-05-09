import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../validation-schemas/LoginSchema";
import "../assets/styles/signupstyle.css"; // reuse same styles

export function UserLogin() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Login form submitted:", values);
    toast.success("Login successful!");
    navigate("/dashboard"); // redirect to dashboard or homepage
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Alert variant="success">
            <h4 className="text-center">Login to Food Recipe App</h4>
          </Alert>
          <p>
            Don’t have an account?{" "}
            <Button variant="primary" onClick={goToSignup}>
              Sign Up Now
            </Button>
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              const { isValid, dirty } = formik;
              return (
                <Form>
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

                  <div className="d-flex justify-content-center">
                    <Button
                      type="submit"
                      variant="success"
                      className="w-50"
                      // disabled={!(dirty && isValid)}
                    >
                      Login
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

export default UserLogin;
