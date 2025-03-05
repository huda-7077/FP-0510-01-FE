"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import MarkDown from "@/components/Markdown";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetAssessmentSlug from "@/hooks/api/assessment/useGetAssessmentSlug";
import useGetJobApplication from "@/hooks/api/job-applications/useGetJobApplication";
import useUpdateJobApplication from "@/hooks/api/job-applications/useUpdateJobApplication";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Loader2,
  MapPin,
} from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import ApplicationDetailSkeleton from "./components/ApplicationDetailSkeleton";
import { ApplicationStatusBadge } from "./components/ApplicationStatusBagde";
import { ApplicationTimeline } from "./components/ApplicationTimeline";
import { InterviewDetails } from "./components/InterviewDetails";
import { RejectionFeedback } from "./components/RejectionFeedback";

interface JobApplicationDetailProps {
  jobApplicationId: number;
}

const ApplicationDetailPage = ({
  jobApplicationId,
}: JobApplicationDetailProps) => {
  const { data: application, isLoading } = useGetJobApplication({
    jobApplicationId,
  });
  const updateJobApplication = useUpdateJobApplication();
  const { data: assessment, isLoading: isAssessmentLoading } =
    useGetAssessmentSlug();

  const handleCancelApplication = () => {
    updateJobApplication.mutate({ id: jobApplicationId, status: "CANCELLED" });
  };

  const showAssessmentButton =
    application?.job.requiresAssessment && application?.status === "IN_REVIEW";
  const assessmentDeadline = application
    ? new Date(
        new Date(application.updatedAt).getTime() + 3 * 24 * 60 * 60 * 1000,
      )
    : null;
  const isAssessmentOverdue = assessmentDeadline
    ? new Date() > assessmentDeadline
    : false;

  return (
    <>
      <DashboardBreadcrumb
        route="user"
        crumb1={{ href: "jobs", label: "Applied Jobs" }}
        lastCrumb={`${application?.job.title || "Job Application Details"}`}
      />
      <div className="container mx-auto space-y-6 px-1 py-2">
        <div className="mb-6 w-fit">
          <Link
            href="/dashboard/user/jobs"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </div>

        {isLoading && isAssessmentLoading ? (
          <ApplicationDetailSkeleton />
        ) : application ? (
          <>
            {showAssessmentButton && (
              <Card className="mb-6 border-2 border-yellow-400">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                      <h2 className="flex items-center text-lg font-semibold text-yellow-700">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Assessment Required
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        You need to complete the assessment within 3 days (by{" "}
                        {assessmentDeadline?.toLocaleDateString()}).
                      </p>
                      {isAssessmentOverdue && (
                        <p className="mt-1 text-sm text-red-600">
                          The assessment deadline has passed. Please complete it
                          as soon as possible.
                        </p>
                      )}
                    </div>
                    <Link href={`/pre-test-assessment/${assessment?.slug}`}>
                      <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                        Start Assessment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mb-8 flex flex-col gap-6 md:flex-row">
              <div className="md:w-2/3">
                <Card className="group hover:border-blue-600">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={
                              application.job.company.logo || "/anonymous.svg"
                            }
                            alt={application.job.company.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold group-hover:text-blue-600">
                            {application.job.title}
                          </h1>
                          <p className="text-gray-600">
                            {application.job.company.name}
                          </p>
                          <div className="mt-1 flex items-center text-gray-500">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span className="text-sm">
                              {application.job.companyLocation?.regency
                                ?.regency || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ApplicationStatusBadge status={application.status} />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Applied On</p>
                        <p className="flex items-center font-medium">
                          <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Application Deadline
                        </p>
                        <p className="flex items-center font-medium">
                          <Clock className="mr-2 h-4 w-4 text-blue-600" />
                          {new Date(
                            application.job.applicationDeadline,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expected Salary</p>
                        <p className="font-medium">
                          Rp{" "}
                          {application.expectedSalary.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Industry</p>
                        <p className="font-medium">
                          {application.job.company.industry}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h2 className="mb-2 text-lg font-semibold">Documents</h2>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <a href={application.cvFile} target="_blank" download>
                            <Download className="mr-2 h-4 w-4" />
                            {application.user.fullName} CV / Resume
                          </a>
                        </Button>
                        {application.attachment && (
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                          >
                            <a
                              href={application.attachment}
                              target="_blank"
                              download
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {application.user.fullName} Attachment
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {application.status === "INTERVIEW_SCHEDULED" &&
                      application.interviews && (
                        <InterviewDetails
                          interview={application.interviews[0]}
                        />
                      )}

                    {application.status === "REJECTED" && (
                      <RejectionFeedback notes={application.notes || ""} />
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-1/3">
                <Card className="group hover:border-blue-600">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold group-hover:text-blue-600">
                      Application Timeline
                    </h2>
                    <ApplicationTimeline application={application} />
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="group hover:border-blue-600">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold group-hover:text-blue-600">
                  Job Description
                </h2>
                <MarkDown content={application.job.description} />
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-600">
                  Cancellation Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {application.status === "CANCELLED" ? (
                  <>
                    <CardDescription>
                      You have withdrawn this application. This action cannot be
                      undone.
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <CardDescription>
                      Withdraw your job application. This action cannot be
                      undone.
                    </CardDescription>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          Cancel Application
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="space-y-4">
                            <p>
                              This action cannot be undone. Withdrawing your
                              application means you will no longer be considered
                              for this position.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleCancelApplication}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={updateJobApplication.isPending}
                          >
                            {updateJobApplication.isPending ? (
                              <span className="animate-spin">
                                <Loader2 />
                              </span>
                            ) : (
                              "Cancel Application"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <div>No application data found.</div>
        )}
      </div>
    </>
  );
};

export default ApplicationDetailPage;
