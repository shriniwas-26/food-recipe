import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signUpSchema } from "../validation-schemas/SignUpSchema";
import '../assets/styles/signupstyle.css';

// Dummy signUp function to simulate backend call
const signUp = async (formData) => {
  console.log("Simulating API call with data:", formData);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: 200, message: "User created" }), 1000)
  );
};

export function SignupPage() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await signUp(formData);
      console.log("Response from dummy signUp:", response);

      if (response.status === 200) {
        toast.success("Sign Up Successful!");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong");
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Alert variant="success" className="text-center">
            <h4>Sign Up to use Food Recipe App</h4>
          </Alert>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
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
                    autoComplete="off"
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
                    autoComplete="off"
                  />
                  <ErrorMessage name="confirmPassword" component="span" className="error" />
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-50"
                    // disabled={!(dirty && isValid)}
                  >
                    Signup
                  </Button>
                </div>

                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <Button variant="link" onClick={redirectToLogin}>
                      Login Now
                    </Button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
