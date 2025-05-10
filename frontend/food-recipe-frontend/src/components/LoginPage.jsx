// import { useState } from "react";
// import {
//   Alert,
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Spinner,
// } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/UserService";
// import { loginSchema } from "../validation-schemas/LoginSchema";
// import { Formik, Field, ErrorMessage } from "formik";

// function LoginPage() {

//     const initialValues = {
//         email: '',
//         password: ''
//     };
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false); // For handling loading state

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

// //   const validateForm = () => {
// //     if (!formData.email || !formData.password) {
// //       toast.error("Please fill out all fields.");
// //       return false;
// //     }
// //     return true;
// //   };

//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();

//     //   if (!validateForm()) return; // Validate form before submitting

//       setLoading(true); // Set loading to true when API call is in progress
//       const response = await login(formData);

//       if (response.status === 200) {
//         // storeToken(response.data.token);
//         // navigate("/dashboard");
//         localStorage.setItem("token", response.data.token);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false); // Stop loading after the request
//       if (error.response?.status === 400) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong...!");
//       }
//     }
//   };

//   const openSignUpForm = () => {
//     navigate("/signup"); // Fixed to navigate to signup page
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Alert variant="primary" className="mb-3">
//             Login
//           </Alert>
//           <p className="mb-3">
//             Need an account?
//             <Button variant="success" onClick={openSignUpForm}>
//               Create an account
//             </Button>
//           </p>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={loginSchema}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => {
//               const { errors, touched, isValid, dirty } = formik;
//               return (
//                 <Form>

//                   <Row>
//                     <Col lg={6}>
//                       <div className="mb-3">
//                         <label className="form-label">Email</label>
//                         <Field
//                           type="text"
//                           className="form-control"
//                           name="email"
//                           placeholder="Enter email"
//                         />
//                         <ErrorMessage
//                           name="email"
//                           component="span"
//                           className="error"
//                         />
//                       </div>
//                     </Col>
//                     <Col lg={6}>
//                       <div className="mb-3">
//                         <label className="form-label">Password</label>
//                         <Field
//                           type="password"
//                           className="form-control"
//                           name="password"
//                           placeholder="Enter password"
//                         />
//                         <ErrorMessage
//                           name="password"
//                           component="span"
//                           className="error"
//                         />
//                       </div>
//                     </Col>
//                   </Row>

//                   <Button
//                     type="submit"
//                     variant="primary"
//                     disabled={!(dirty && isValid)}
//                   >
//                     Login
//                   </Button>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default LoginPage;




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
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import { loginSchema } from "../validation-schemas/LoginSchema";
import { Formik, Field, ErrorMessage } from "formik";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // For handling loading state

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
        toast.success("Login successful!");
        // navigate("/dashboard");
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

  const openSignUpForm = () => {
    navigate("/signup");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Alert variant="primary" className="mb-3">
            Login
          </Alert>
          <p className="mb-3">
            Need an account?
            <Button variant="success" onClick={openSignUpForm} className="ms-2">
              Create an account
            </Button>
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty, handleSubmit } = formik;
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Enter email"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Field
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter password"
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-danger"
                        />
                      </div>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="primary"
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
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
