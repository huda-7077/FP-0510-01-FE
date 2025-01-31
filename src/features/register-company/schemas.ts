import * as yup from "yup";

export const companyRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  fullName: yup.string().required("Company name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms of services")
    .required("You must accept the terms of services"),
});

export type CompanyRegisterFormValues = yup.InferType<
  typeof companyRegisterSchema
>;