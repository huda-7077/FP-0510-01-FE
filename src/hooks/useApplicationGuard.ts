"use client";
import { useApplicationForm } from "@/features/job-application/context/ApplicationFormContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useGetProfile from "./api/account/useGetProfile";

export const useApplicationGuard = (currentStep: number) => {
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfile();
  const { formData, resetForm } = useApplicationForm();

  useEffect(() => {
    if (isLoading || !profile) return;

    const storedProgress = localStorage.getItem(`jobProgress_${formData.jobId}`);
    
    if (!storedProgress) {
      router.push(`/jobs/${formData.jobId}/apply`);
      return;
    }

    if (currentStep > 1) {
      if (currentStep === 2 && !isProfileComplete(profile)) {
        router.push(`/jobs/${formData.jobId}/apply`);
        return;
      }

      if (currentStep === 3 && !isDocumentsComplete(formData)) {
        router.push(`/jobs/${formData.jobId}/apply`);
        return;
      }

      localStorage.setItem(`jobProgress_${formData.jobId}`, currentStep.toString());
    }
  }, [currentStep, profile, isLoading, router, formData]);

  return { isLoading, profile };
};


const isProfileComplete = (profile: any) => {
  const requiredFields = [
    "fullName",
    "email",
    "phoneNumber",
    "currentAddress",
    "dateOfBirth",
    "gender",
    "educationLevel",
  ];

  return requiredFields.every((field) => Boolean(profile[field]));
};

const isDocumentsComplete = (formData: any) => {
  return Boolean(
    formData.expectedSalary && (formData.useExistingCV || formData.cvFile),
  );
};
