import * as Yup from "yup";

export const applicationSchema = Yup.object().shape({
  expectedSalary: Yup.number()
    .required("Expected salary is required")
    .min(1000000, "Minimum salary is IDR 1,000,000")
    .max(1000000000, "Maximum salary is IDR 1,000,000,000")
    .integer("Salary must be a whole number")
    .typeError("Please enter a valid number"),
  useExistingCV: Yup.boolean(),
  cvFile: Yup.mixed().when("useExistingCV", {
    is: true,
    then: () => Yup.mixed().nullable(),
    otherwise: () => Yup.mixed().required("Please upload a CV"),
  }),
  notes: Yup.string().optional(),
  attachment: Yup.mixed()
    .nullable()
    .test("fileSize", "File size must be less than 1MB", function (value) {
      if (!value) return true;
      return (value as File).size <= 1024 * 1024;
    }),
});

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