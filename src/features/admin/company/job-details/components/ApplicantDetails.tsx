import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { JobApplication } from "@/types/jobApplication";
import {
  Building2,
  Calendar,
  Clock,
  Eye,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ApplicationStatus } from "../consts";
import ApplicantProfilePicture from "./ApplicantProfilePicture";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import DownloadCVButton from "./DownloadCVButton";

interface ApplicantDetailsProps {
  applicant: JobApplication;
  score: number;
  assessmentStatus: string;
}

const ApplicantDetails = ({
  applicant,
  score,
  assessmentStatus,
}: ApplicantDetailsProps) => {
  const { formatLongDate } = useLongDateFormatter();
  const currentStatus = applicant.status;
  const progressValue = ((ApplicationStatus[currentStatus] + 1) / 4) * 100;

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button className="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black">
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen max-w-5xl overflow-y-auto border-none p-0 md:h-fit md:max-h-[90vh] md:rounded-2xl">
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 sm:px-20">
            <div className="flex flex-col items-center gap-6 sm:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-8 sm:flex-row">
                <ApplicantProfilePicture
                  profilePicture={applicant.user.profilePicture}
                  fullName={applicant.user.fullName}
                  ringColor="ring-white"
                />
                <div className="space-y-2">
                  <h2 className="text-center text-2xl font-bold text-white sm:text-start">
                    {applicant.user.fullName}
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <DownloadCVButton
                      cvUrl={applicant.cvFile}
                      clasName="h-8 text-xs sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b bg-white p-8 shadow-md sm:px-20">
            <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Status
                </h3>
                <p className="hidden text-sm text-gray-500 sm:block">
                  Current progress in hiring pipeline
                </p>
              </div>
              <ApplicationStatusBadge
                currentStatus={currentStatus}
                className="px-4 py-2"
              />
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Pending</span>
              <span>In Review</span>
              <span>Interview</span>
              <span>Decision</span>
            </div>
          </div>
          <div className="bg-gray-50/70 p-8 sm:px-20">
            <div className="grid h-full gap-6 sm:mx-0 md:grid-cols-2">
              <Card className="border-2 shadow-none">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Calendar className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Date of Birth
                        </p>
                        <p className="text-gray-900">
                          {formatLongDate(applicant.user.dateOfBirth)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Globe className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Nationality
                        </p>
                        <p className="text-gray-900">Indonesia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <GraduationCap className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Education Level
                        </p>
                        <p className="text-gray-900">
                          {applicant.user.educationLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 shadow-none">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-lg font-semibold text-gray-900">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Location
                        </p>
                        <p className="text-gray-900">
                          {applicant.user.currentAddress},{" "}
                          {applicant.user.regency.regency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Phone
                        </p>
                        <p className="text-gray-900">
                          {applicant.user.phoneNumber || "+1-202-555-0141"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          Email
                        </p>
                        <p className="text-gray-900">
                          {applicant.user.email || "esther.howard@gmail.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 border border-gray-200 shadow-none">
                <CardContent className="p-6">
                  <CardTitle className="mb-6 text-lg font-semibold text-gray-900">
                    Work Experiences
                  </CardTitle>
                  <div className="divide-y divide-gray-100">
                    {applicant.user.experience?.length > 0 ? (
                      applicant.user.experience?.map((experience, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-1 gap-4 ${
                            index > 0 ? "pt-6" : ""
                          } ${
                            index < applicant.user.experience.length - 1
                              ? "pb-6"
                              : ""
                          } md:grid-cols-3`}
                        >
                          {/* Timeline and Company Info */}
                          <div className="md:col-span-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>
                                {formatLongDate(experience.startDate)} -{" "}
                                {experience.endDate
                                  ? formatLongDate(experience.endDate)
                                  : "Present"}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">
                                {experience.companyName}
                              </span>
                            </div>
                          </div>

                          {/* Role and Description */}
                          <div className="md:col-span-2">
                            <h4 className="text-base font-semibold text-gray-900">
                              {experience.jobTitle}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                              {experience.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center py-8 text-gray-500">
                        <p>No work experience available.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              {applicant.job.requiresAssessment && (
                <Card className="border-2 shadow-none md:col-span-2">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Assessment Score
                      </h3>
                      <p className="text-sm text-gray-400">
                        Overall performance evaluation
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p
                          className={`text-3xl font-bold ${
                            assessmentStatus === "Passed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {score}
                        </p>
                        <p className="text-sm text-gray-400">Score</p>
                      </div>
                      <Separator orientation="vertical" className="h-12" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDetails;
