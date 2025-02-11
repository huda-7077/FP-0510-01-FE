import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const companySchema = Yup.object().shape({
  name: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),

  description: Yup.string()
    .required("Description is required")
    .max(200, "Description must not exceed 200 characters"),

  industry: Yup.string()
    .required("Industry is required")
    .max(50, "Industry must not exceed 50 characters"),

  employeeCount: Yup.number()
    .required("Employee count is required")
    .min(1, "Employee count must be at least 1")
    .max(1000000, "Employee count seems too high"),

  establishedYear: Yup.number()
    .required("Established year is required")
    .min(1800, "Year seems too early")
    .max(currentYear, "Year cannot be in the future"),

  links: Yup.string()
    .required("Company website/links are required")
    .url("Please enter a valid URL")
    .max(500, "Links must not exceed 500 characters"),

  about: Yup.string()
    .required("About section is required")
    .max(1000, "About section must not exceed 1000 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+()-\s]*$/, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),

  logo: Yup.mixed().nullable(),

  logoPreview: Yup.string(),
});
