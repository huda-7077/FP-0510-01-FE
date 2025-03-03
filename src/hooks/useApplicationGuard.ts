"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetProfile from "./api/account/useGetProfile";
import { useApplicationForm } from "@/features/job-application/context/ApplicationFormContext";

export const useApplicationGuard = (currentStep: number) => {
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfile();
  const { formData, resetForm } = useApplicationForm();

  useEffect(() => {
    if (isLoading || !profile) return;

    // Get stored progress for this specific job
    const storedProgress = localStorage.getItem(`jobProgress_${formData.jobId}`);
    
    if (!storedProgress) {
      // If no progress exists for this job, start from step 1
      router.push(`/jobs/${formData.jobId}/apply`);
      return;
    }

    // Guard: Steps must be followed in order
    if (currentStep > 1) {
      // Check if profile review is complete
      if (currentStep === 2 && !isProfileComplete(profile)) {
        router.push(`/jobs/${formData.jobId}/apply`);
        return;
      }

      // Check if documents are uploaded
      if (currentStep === 3 && !isDocumentsComplete(formData)) {
        router.push(`/jobs/${formData.jobId}/apply`);
        return;
      }

      // Store progress for this job
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
