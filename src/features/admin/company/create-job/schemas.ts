import * as yup from "yup";

const requiredTag = yup.string().required("Tag is required");

export const createJobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  bannerImage: yup.mixed().required("Thumbnail is required"),
  category: yup.string().required("Category is required"),
  salary: yup.number(),
  tags: yup.array().of(requiredTag),
  applicationDeadline: yup
    .string()
    .required("Applicatoin deadline is required"),
  companyLocationId: yup
    .number()
    .required("City is required")
    .positive("Invalid city selection"),
});

export type CreateJobFormValues = yup.InferType<typeof createJobSchema>;
