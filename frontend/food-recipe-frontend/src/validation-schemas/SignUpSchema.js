import * as Yup from "yup"; // name aliasing

// key in the validation schema should be the name of the field
export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/, 'Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit'),
    email: Yup.string().required("Email is required"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref('password')], "Passwords must match")
});