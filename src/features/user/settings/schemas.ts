import * as Yup from "yup";

export const personalSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  headline: Yup.string().required(
    "Please add a headline to describe your profession or skills",
  ),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test("age", "You must be at least 15 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 15;
    }),
  gender: Yup.string().required("Gender is required"),
  educationLevel: Yup.string().required("Education level is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must only contain numbers")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  skills: Yup.string().required(
    "Skills are required to highlight your expertise",
  ),
  currentAddress: Yup.string().required("Current address is required"),
  provinceId: Yup.string().required("Province is required"),
  regencyId: Yup.string().required("Regency is required"),
});

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

export const workExperienceSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  jobTitle: Yup.string().required("Job title is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().when('isCurrentJob', {
    is: false,
    then: (schema) => schema
      .required("End date is required")
      .min(Yup.ref('startDate'), "End date must be after start date"),
    otherwise: (schema) => schema.nullable(),
  }),
  isCurrentJob: Yup.boolean().default(false),
  description: Yup.string().nullable(),
});
