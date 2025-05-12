import * as Yup from "yup"; // name aliasing

// key in the validation schema should be the name of the field
export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'),
    email: Yup.string().required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('password')], "Passwords must match")
});