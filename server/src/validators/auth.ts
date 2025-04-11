import * as yup from "yup";

// Regex
const specialChars = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;
const isCap = /.*[A-Z].*/;
const hasNumber = /.*[0-9].*/;

const password = {
  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password must be at least 8 characters long")
    .matches(specialChars, "Password must contain at least 1 special character")
    .matches(isCap, "Password must contain at least one uppercase letter")
    .matches(hasNumber, "Password must contain at least one number"),
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

export const verifyUserSchema = yup.object({
  id: yup.string().required("id is missing"),
  token: yup.string().required("token required")
})

export const signInSchema = yup.object({
  ...email,
  ...password,
})

export const emailSchema = yup.object({
  ...email,
});