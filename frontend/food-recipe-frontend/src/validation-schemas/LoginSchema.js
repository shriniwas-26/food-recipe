import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/, 'Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit'),
  email: Yup.string().required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
});
