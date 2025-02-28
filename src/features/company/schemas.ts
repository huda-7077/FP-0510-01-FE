import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const CreateCompanyReviewSchema = Yup.object().shape({
  salaryEstimate: Yup.number().min(1).required("Salary Estimate is required"),
  workCultureRating: Yup.number()
    .min(1)
    .max(5)
    .required("Work Culture Rating is required"),
  workLifeBalanceRating: Yup.number()
    .min(1)
    .max(5)
    .required("Work Life Balance Rating is required"),
  careerGrowthRating: Yup.number()
    .min(1)
    .max(5)
    .required("Career Growth Rating is required"),
  facilitiesRating: Yup.number()
    .min(1)
    .max(5)
    .required("Facilities Rating is required"),
  comment: Yup.string().required("Comment is required").min(10),
});
