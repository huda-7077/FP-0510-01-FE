import * as Yup from "yup";

export const companyLocationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  regencyId: Yup.string().required("Regency is required"),
  postalCode: Yup.string().required("Postal code is required"),
  latitude: Yup.string().required("Please select location on map"),
  longitude: Yup.string().required("Please select location on map"),
});
