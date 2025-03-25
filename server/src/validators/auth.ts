import * as yup from "yup";

const specialChars = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;
const isCap = /.*[A-Z].*/;

const password = {
    password: yup
      .string()
      .required("Password is missing")
      .min(8, "Password must be at least 8 characters long")
      .matches(specialChars, "Password must contain at least 1 special characters")
      .matches(isCap, "Password must contain at least one uppercase letter"),
};

export const email = {
    email: yup
      .string()
      .min(3, "Email must be at least 3 characters long")
      .required("Email is missing")
      .email("Invalid Email"),
  };

export const newUserSchema = yup.object({
    name: yup.string().required("Name is missing"),
    ...email,
    ...password,
});