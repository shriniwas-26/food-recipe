import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../validation-schemas/LoginSchema";
import "../assets/styles/signupstyle.css"; // reuse same styles

// Dummy login function to simulate an API call
const login = async (formData) => {
  console.log("Simulating login with data:", formData);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: 200, data: { token: "dummy-token" } }), 1000)
  );
};

// Dummy function to store token
const storeToken = (token) => {
  console.log("Token stored:", token);
  localStorage.setItem("authToken", token);
};

export function UserLogin() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await login(formData);
      console.log("Login response:", response);

      if (response.status === 200) {
        storeToken(response.data.token);
        toast.success("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
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
            {({ isValid, dirty }) => (
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
                    disabled={!(dirty && isValid)}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default UserLogin;
