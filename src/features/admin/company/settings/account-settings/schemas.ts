import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});
