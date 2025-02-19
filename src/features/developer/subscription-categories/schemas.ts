import * as Yup from "yup";

export const CreateSubscriptionCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  features: Yup.array()
    .of(Yup.string().required("Feature is required"))
    .min(1, "At least one feature is required"),
});
