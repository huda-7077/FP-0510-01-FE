"use client";

import useGetProfile from "@/hooks/api/account/useGetProfile";
import useUpdateProfile from "@/hooks/api/account/useUpdateProfile";
import { useFormik } from "formik";
import { useEffect } from "react";
import { personalSchema } from "../../schemas";
import { ActionButtons } from "./ActionButtons";
import AddressForm from "./AddressForm";
import CvDropzone from "./CvDropzone";
import { FormFields } from "./FormFields";
import { ProfilePictureSection } from "./profilePictureSection";
import CreateCvButton from "@/components/CreateCvButton";

interface FormValues {
  fullName: string;
  headline: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "";
  educationLevel: string;
  currentAddress: string;
  phoneNumber: string;
  cvUrl: File | null;
  cvUrlPreview?: string | "";
  profilePicture: File | null;
  profilePicturePreview?: string;
  skills: string;
  provinceId: string;
  regencyId: string;
}

interface UpdateProfileData {
  fullName: string;
  headline?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE";
  educationLevel?: string;
  currentAddress?: string;
  phoneNumber?: string;
  skills?: string;
  regencyId?: string;
  profilePicture?: File;
  cvUrl?: File;
}

const PersonalForm = () => {
  const { data: userData } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: userData?.fullName || "",
      headline: userData?.headline || "",
      dateOfBirth: userData?.dateOfBirth
        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
        : "",
      gender: userData?.gender || "",
      educationLevel: userData?.educationLevel || "",
      currentAddress: userData?.currentAddress || "",
      phoneNumber: userData?.phoneNumber || "",
      cvUrl: null,
      cvUrlPreview: userData?.cvUrl || "",
      profilePicture: null,
      profilePicturePreview: userData?.profilePicture || "/anonymous.svg",
      skills: userData?.skills?.join(", ") || "",
      provinceId: userData?.regency?.provinceId?.toString() || "",
      regencyId: userData?.regencyId?.toString() || "",
    },
    validationSchema: personalSchema,
    onSubmit: (values) => {
      const formData: UpdateProfileData = {
        fullName: values.fullName,
        headline: values.headline,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender === "" ? undefined : values.gender,
        educationLevel: values.educationLevel,
        currentAddress: values.currentAddress,
        phoneNumber: values.phoneNumber,
        skills: values.skills,
        regencyId: values.regencyId,
        ...(values.profilePicture && { profilePicture: values.profilePicture }),
        ...(values.cvUrl && { cvUrl: values.cvUrl }),
      };
      updateProfile(formData);
    },
  });

  useEffect(() => {
    if (userData) {
      const provinceId = userData.regency?.provinceId?.toString() || "";
      const regencyId = userData.regencyId?.toString() || "";
      formik.setValues({
        fullName: userData.fullName || "",
        headline: userData.headline || "",
        dateOfBirth: userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: (userData.gender as "MALE" | "FEMALE" | "") || "",
        educationLevel: userData.educationLevel || "",
        currentAddress: userData.currentAddress || "",
        phoneNumber: userData.phoneNumber || "",
        cvUrl: null,
        cvUrlPreview: userData.cvUrl || "",
        profilePicture: null,
        profilePicturePreview: userData.profilePicture || "/anonymous.svg",
        skills: userData.skills?.join(", ") || "",
        provinceId: provinceId,
        regencyId: regencyId,
      });
    }
  }, [userData]);

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <ProfilePictureSection formik={formik} />
        <FormFields formik={formik} />
        <AddressForm
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          setFieldValue={formik.setFieldValue}
        />
        <CvDropzone formik={formik} />
        <CreateCvButton/>
        <ActionButtons
          formik={formik}
          userData={userData}
          isPending={isPending}
        />
      </form>
    </div>
  );
};

export default PersonalForm;
