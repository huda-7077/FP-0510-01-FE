import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { JobApplication } from "@/types/jobApplication";
import {
  Calendar,
  Download,
  Eye,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserPlus,
} from "lucide-react";
import ApplicantProfilePicture from "./ApplicantProfilePicture";

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
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto rounded-lg border-none p-0">
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <ApplicantProfilePicture
                  profilePicture={applicant.user.profilePicture}
                  fullName={applicant.user.fullName}
                  ringColor="ring-blue-100"
                />
                <div className="space-y-1">
                  <h2 className="line-clamp-1 text-center text-2xl font-bold text-white sm:text-start">
                    {applicant.user.fullName}
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="default">
                      <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="font-medium">Hire Candidate</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(applicant.cvFile, "_blank")}
                    >
                      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                      <span className="font-medium">Download CV</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 p-8 md:grid-cols-2">
            <Card>
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
            <Card>
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
                      <p className="text-sm font-medium text-gray-400">Phone</p>
                      <p className="text-gray-900">
                        {applicant.user.phoneNumber || "+1-202-555-0141"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Email</p>
                      <p className="text-gray-900">
                        {applicant.user.email || "esther.howard@gmail.com"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
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
                    <p className="text-3xl font-bold text-green-600">95</p>
                    <p className="text-sm text-gray-400">Score</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDetails;
