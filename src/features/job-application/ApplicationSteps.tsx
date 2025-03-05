"use client";

import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import useGetJob from "@/hooks/api/job/useGetJob";
import { useApplicationGuard } from "@/hooks/useApplicationGuard";
import { useState, useEffect } from "react";
import { LoadingState } from "./components/ApplicationLoadingState";
import StepIndicator from "./components/StepIndicator";
import DocumentUpload from "./steps/DocumentUpload";
import FinalReview from "./steps/FinalReview";
import ProfileReview from "./steps/ProfileReview";

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

export const ApplicationSteps = ({ slug }: { slug: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: job, isLoading: jobLoading } = useGetJob({
    slug,
  });
  const { isLoading: guardLoading } = useApplicationGuard(currentStep);

  useEffect(() => {
    const storedProgress = localStorage.getItem(`jobProgress_${slug}`);
    if (storedProgress) {
      const parsedStep = parseInt(storedProgress, 10);
      if (parsedStep > 1 && parsedStep <= steps.length) {
        setCurrentStep(parsedStep);
      }
    }
  }, [slug]);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    localStorage.setItem(`jobProgress_${slug}`, nextStep.toString());
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    localStorage.setItem(`jobProgress_${slug}`, prevStep.toString());
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
            crumb2={{ href: `${job.slug}`, label: `${job.title}` }}
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
