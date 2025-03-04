"use client";

import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import useCreateJobApplication from "@/hooks/api/job-applications/useCreateJobApplication";
import { Job } from "@/types/job";
import { CreateJobApplicationRequest } from "@/types/jobApplication";
import {
  Briefcase,
  FileText,
  User,
  ChevronLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmissionLoadingOverlay } from "../components/SubmissionLoadingOverlay";
import { SubmitConfirmationDialog } from "../components/SubmitConfirmationDialog";
import { useApplicationForm } from "../context/ApplicationFormContext";

const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface FinalReviewProps {
  onBack: () => void;
  job: Job;
}

const FinalReview = ({ onBack, job }: FinalReviewProps) => {
  const router = useRouter();
  const { data: profile } = useGetProfile();
  const { formData, resetForm } = useApplicationForm();
  const { mutate: submitApplication, isPending } = useCreateJobApplication();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false);

    setTimeout(() => {
      const applicationData: CreateJobApplicationRequest = {
        jobId: job.id,
        expectedSalary: Number(formData.expectedSalary),
        useExistingCV: formData.useExistingCV,
        cvFile: formData.cvFile,
        attachment: formData.attachment,
      };

      submitApplication(applicationData);
    }, 50);
  };

  return (
    <>
      {isPending && <SubmissionLoadingOverlay />}
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 md:text-2xl">
            Review Application
          </h2>
          <p className="text-gray-600">
            Please review your application details before submitting
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-all hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Job Details</h3>
            </div>
            <div className="grid gap-3">
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">Job: </span>
                <span className="text-sm font-medium text-blue-900">
                  {job.title}
                </span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Company:{" "}
                </span>
                <span className="text-sm text-blue-900">
                  {job.company.name}
                </span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Location:{" "}
                </span>
                <span className="text-sm text-blue-900">
                  {job.companyLocation.address},{" "}
                  {job.companyLocation.regency.regency},{" "}
                  {job.companyLocation.regency.province.province}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="rounded-lg border border-green-100 bg-green-50 p-4 transition-all hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Personal Details</h3>
            </div>
            <div className="grid gap-3">
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Full Name:{" "}
                </span>
                <span className="text-sm text-gray-900">
                  {profile?.fullName}
                </span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Email:{" "}
                </span>
                <span className="text-sm text-gray-900">{profile?.email}</span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Phone:{" "}
                </span>
                <span className="text-sm text-gray-900">
                  {profile?.phoneNumber}
                </span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Address:{" "}
                </span>
                <span className="text-sm text-gray-900">
                  {profile?.currentAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Application Details Section */}
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-all hover:shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">
                Application Details
              </h3>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center rounded bg-white p-2">
                <span className="mr-2 text-sm font-medium text-gray-700">
                  CV:{" "}
                </span>
                <span className="flex-1 text-sm text-blue-900">
                  {formData.useExistingCV ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      Using CV from profile
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-blue-500" />
                      {formData.cvFile?.name}
                    </span>
                  )}
                </span>
              </div>
              <div className="rounded bg-white p-2">
                <span className="text-sm font-medium text-gray-700">
                  Expected Salary:{" "}
                </span>
                <span className="text-sm font-medium text-blue-900">
                  {formatIDR(Number(formData.expectedSalary))}
                </span>
              </div>
              {formData.attachment && (
                <div className="flex items-center rounded bg-white p-2">
                  <span className="mr-2 text-sm font-medium text-gray-700">
                    Additional Document:{" "}
                  </span>
                  <span className="flex items-center text-sm text-blue-900">
                    <FileText className="mr-1 h-4 w-4 text-blue-500" />
                    {formData.attachment.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between border-t border-gray-100 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isPending}
            className="flex items-center gap-1 border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" /> Submit Application
              </>
            )}
          </Button>
        </div>
      </div>

      <SubmitConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmSubmit}
        jobTitle={job.title}
        isPending={isPending}
      />
    </>
  );
};

export default FinalReview;
