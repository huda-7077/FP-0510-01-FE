"use client";

import { useState } from "react";
import useGetJob from "@/hooks/api/job/useGetJob";
import ProfileReview from "./steps/ProfileReview";
import DocumentUpload from "./steps/DocumentUpload";
import FinalReview from "./steps/FinalReview";
import StepIndicator from "./components/StepIndicator";
import { LoadingState } from "./components/ApplicationLoadingState";
import { useApplicationGuard } from "@/hooks/useApplicationGuard";
import { useApplicationForm } from "./context/ApplicationFormContext";
import { usePathname, useRouter } from "next/navigation";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";

const steps = [
  {
    title: "Profile Review",
    description: "Review your profile information",
  },
  {
    title: "Documents",
    description: "Upload required documents",
  },
  {
    title: "Final Review",
    description: "Review your application",
  },
];

export const ApplicationSteps = ({ jobId }: { jobId: string }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { data: job, isLoading: jobLoading } = useGetJob({
    jobId: Number(jobId),
  });
  const { isLoading: guardLoading } = useApplicationGuard(currentStep);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (jobLoading || guardLoading) {
    return (
      <div>
        <StepIndicator steps={steps} currentStep={currentStep} />
        <LoadingState />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium">Unable to load job details</h3>
        <p className="text-sm text-gray-600">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex flex-col items-start justify-between px-6 py-5 md:flex-row md:items-center">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Apply Job
          </h1>
          <HomeBreadcrumb
            crumb1={{ href: "jobs", label: "Find Jobs" }}
            crumb2={{ href: `${job.id}`, label: `${job.title}` }}
            lastCrumb="Apply Job"
          />
        </div>
      </div>
      <StepIndicator steps={steps} currentStep={currentStep} />
      {currentStep === 1 && <ProfileReview onNext={handleNext} />}
      {currentStep === 2 && (
        <DocumentUpload onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && <FinalReview job={job} onBack={handleBack} />}
    </div>
  );
};
