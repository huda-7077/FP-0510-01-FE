import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { JobApplication } from "@/types/jobApplication";
import {
  Building2,
  Calendar,
  Clipboard,
  Clock,
  Download,
  Eye,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import ApplicantProfilePicture from "./ApplicantProfilePicture";
import DownloadCVButton from "./DownloadCVButton";

interface ApplicantDetailsProps {
  applicant: JobApplication;
}

const ApplicantDetails = ({ applicant }: ApplicantDetailsProps) => {
  const { formatLongDate } = useLongDateFormatter();

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button className="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black">
          <Eye className="h-4 w-4" />
          View Applicant Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl overflow-y-auto border-none p-0 md:max-h-[90vh] md:rounded-2xl">
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
                      icon={
                        <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                      }
                      text="Download CV"
                      variant="outline"
                      url={applicant.cvFile}
                      className="h -8 text-xs sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                    />
                    {applicant.attachment && (
                      <DownloadCVButton
                        icon={
                          <Clipboard className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                        }
                        text="Attachment"
                        variant="default"
                        url={applicant.attachment}
                        className="h-8 text-xs sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/70 p-8 sm:px-20">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-gray-200 shadow-none">
                <CardContent className="p-6">
                  <CardTitle className="mb-6 text-lg font-semibold text-gray-900">
                    Personal Information
                  </CardTitle>
                  <div className="space-y-4">
                    <InfoRow
                      icon={<Calendar className="h-5 w-5 text-blue-600" />}
                      label="Date of Birth"
                      value={formatLongDate(applicant.user.dateOfBirth)}
                    />
                    <InfoRow
                      icon={<Globe className="h-5 w-5 text-blue-600" />}
                      label="Nationality"
                      value="Indonesia"
                    />
                    <InfoRow
                      icon={<GraduationCap className="h-5 w-5 text-blue-600" />}
                      label="Education Level"
                      value={applicant.user.educationLevel}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-none">
                <CardContent className="p-6">
                  <CardTitle className="mb-6 text-lg font-semibold text-gray-900">
                    Contact Information
                  </CardTitle>
                  <div className="space-y-4">
                    <InfoRow
                      icon={<MapPin className="h-5 w-5 text-blue-600" />}
                      label="Location"
                      value={`${applicant.user.currentAddress}, ${applicant.user.regency.regency}`}
                    />
                    <InfoRow
                      icon={<Phone className="h-5 w-5 text-blue-600" />}
                      label="Phone"
                      value={applicant.user.phoneNumber || "+1-202-555-0141"}
                    />
                    <InfoRow
                      icon={<Mail className="h-5 w-5 text-blue-600" />}
                      label="Email"
                      value={applicant.user.email || "esther.howard@gmail.com"}
                    />
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    {icon}
    <div>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default ApplicantDetails;
