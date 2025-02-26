import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const CreateAssessmentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  description: Yup.string().required("Description is required").min(10),
  passingScore: Yup.number().min(1).required("Passing Score is required"),
});

export const UpdateAssessmentSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  description: Yup.string().required("Description is required").min(10),
  passingScore: Yup.number().min(1).required("Passing Score is required"),
});

export const QuestionFormSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  options: Yup.array()
    .of(Yup.string().required("Each option must be filled"))
    .min(4, "You must provide exactly 4 options")
    .max(4, "You must provide exactly 4 options"),
  correctAnswer: Yup.string().required("Correct answer is required"),
});
