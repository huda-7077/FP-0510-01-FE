"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Edit, Save } from "lucide-react";
import { User } from "@/types/user";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { useFormik } from "formik";
import { personalSchema } from "../schemas";
import useUpdateProfile from "@/hooks/api/account/useUpdateProfile";
import { FormFields } from "../components/FormFields";
import AddressForm from "../components/AddressForm";


interface ProfileReviewProps {
  onNext: () => void;
}

interface ProfileField {
  key: keyof User;
  label: string;
  format?: (value: any) => string;
}

interface FormValues {
  fullName: string;
  headline: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "";
  educationLevel: string;
  currentAddress: string;
  phoneNumber: string;
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
}

const ProfileReview = ({ onNext }: ProfileReviewProps) => {
  const { data: profile, isLoading, refetch } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const requiredFields: ProfileField[] = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "currentAddress", label: "Current Address" },
    {
      key: "dateOfBirth",
      label: "Date of Birth",
      format: (value: Date) => new Date(value).toLocaleDateString(),
    },
    { key: "gender", label: "Gender" },
    { key: "educationLevel", label: "Education Level" },
  ];

  const completedFields = requiredFields.filter((field) =>
    Boolean(profile?.[field.key])
  );

  const completionPercentage =
    (completedFields.length / requiredFields.length) * 100;

  const missingFields = requiredFields.filter((field) => !profile?.[field.key]);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: profile?.fullName || "",
      headline: profile?.headline || "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
        : "",
      gender: profile?.gender || "",
      educationLevel: profile?.educationLevel || "",
      currentAddress: profile?.currentAddress || "",
      phoneNumber: profile?.phoneNumber || "",
      skills: profile?.skills?.join(", ") || "",
      provinceId: profile?.regency?.provinceId?.toString() || "",
      regencyId: profile?.regencyId?.toString() || "",
    },
    validationSchema: personalSchema,
    enableReinitialize: true,
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
      };
      
      updateProfile(formData, {
        onSuccess: () => {
          refetch();
        }
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-pulse font-medium text-blue-700">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-blue-800 md:text-2xl">
          Profile Review
        </h2>

        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 bg-opacity-10 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Profile Completion
              </span>
            </div>
            <div className="flex items-center rounded-full bg-blue-500 bg-opacity-10 px-3 py-1">
              <span className="text-sm font-bold text-blue-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
          </div>

          <div className="relative mt-4">
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-in-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <div className="mt-1 flex w-full justify-between px-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${completionPercentage >= 25 ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${completionPercentage >= 50 ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${completionPercentage >= 75 ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${completionPercentage >= 100 ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
                <span className="mt-1 text-xs text-gray-500">100%</span>
              </div>
            </div>
          </div>
        </div>

        {missingFields.length > 0 ? (
          <Alert variant="destructive" className="border-red-300 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Incomplete Profile</AlertTitle>
            <AlertDescription className="text-red-700">
              Please complete the following information:
              <ul className="mt-2 list-disc pl-4">
                {missingFields.map((field) => (
                  <li key={field.key}>{field.label}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Profile Complete</AlertTitle>
            <AlertDescription className="text-green-700">
              Your profile has all required information for job application.
            </AlertDescription>
          </Alert>
        )}


          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <FormFields formik={formik} />
            <AddressForm
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              setFieldValue={formik.setFieldValue}
            />
            <div className="flex justify-end gap-3">
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isPending}
              >
                {isPending ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </form>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={onNext}
            disabled={completionPercentage < 100}
            className={`${
              completionPercentage < 100
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } rounded-md px-6 py-2 font-medium text-white shadow-sm transition-colors duration-200`}
          >
            {completionPercentage < 100
              ? "Complete Profile to Continue"
              : "Continue to Documents"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;