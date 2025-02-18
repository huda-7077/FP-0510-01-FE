import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const CreateSkillAssessmentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  description: Yup.string().required("Description is required").min(10),
  passingScore: Yup.number().min(1).required("Passing Score is required"),
});

export const UpdateSkillAssessmentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  description: Yup.string().required("Description is required").min(10),
  passingScore: Yup.number().min(1).required("Passing Score is required"),
});
