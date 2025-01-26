import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const CreateAssessmentSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  passingScore: Yup.number().min(1).required("Passing Score is required"),
});
