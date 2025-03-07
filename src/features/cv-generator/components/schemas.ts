import * as Yup from "yup";

const CVSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  details: Yup.array()
    .of(Yup.string().required("Detail is required"))
    .min(1, "At least one detail is required"),
  aboutMe: Yup.string()
    .required("About Me is required")
    .min(100, "About Me must be at least 100 characters"),
  educations: Yup.array()
    .of(
      Yup.object().shape({
        institution: Yup.string()
          .required("Institution is required")
          .min(3, "Institution must be at least 3 characters"),
        degree: Yup.string()
          .optional()
          .min(3, "Degree must be at least 3 characters"),
        location: Yup.string()
          .required("Location is required")
          .min(3, "Location must be at least 3 characters"),
        year: Yup.string()
          .required("Year is required")
          .min(4, "Year must be at least 4 characters"),
        gpa: Yup.string().required(
          "GPA is required (e.g., 3.45/4.00 or 90/100)",
        ),
        experiences: Yup.array().of(
          Yup.object().shape({
            details: Yup.string()
              .required("Experience details are required")
              .min(10, "Experience details must be at least 10 characters"),
            year: Yup.string()
              .required("Experience year is required")
              .min(4, "Experience year must be at least 4 characters"),
          }),
        ),
      }),
    )
    .min(1, "At least one education is required"),
  experiences: Yup.array()
    .of(
      Yup.object().shape({
        company: Yup.string().required("Company is required"),
        position: Yup.string().required("Position is required"),
        location: Yup.string().required("Location is required"),
        duration: Yup.string().required("Duration is required"),
        descriptions: Yup.array().of(
          Yup.object().shape({
            details: Yup.string().required("Description is required"),
          }),
        ),
      }),
    )
    .min(1, "At least one experience is required"),
  organizations: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Organization name is required"),
        position: Yup.string().required("Position is required"),
        location: Yup.string().required("Location is required"),
        duration: Yup.string().required("Duration is required"),
        descriptions: Yup.array().of(
          Yup.object().shape({
            details: Yup.string().required("Description is required"),
          }),
        ),
      }),
    )
    .optional(),
  nonFormalEducations: Yup.array()
    .of(
      Yup.object().shape({
        institution: Yup.string().required("Institution is required"),
        position: Yup.string().required("Position is required"),
        location: Yup.string().required("Location is required"),
        duration: Yup.string().required("Duration is required"),
        descriptions: Yup.array().of(
          Yup.object().shape({
            details: Yup.string().required("Description is required"),
          }),
        ),
      }),
    )
    .optional(),
  certifications: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Certification name is required"),
        nomor: Yup.string().required("Certification number is required"),
        year: Yup.string().required("Certification year is required"),
      }),
    )
    .optional(),
  skills: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().required("Skill type is required"),
        details: Yup.string().required("Skill details are required"),
      }),
    )
    .min(1, "At least one skill is required"),
});

export default CVSchema;
