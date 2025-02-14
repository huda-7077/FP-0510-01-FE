import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useLongDateTimeFormatter from "@/hooks/useLongDateTimeFormatter";
import { Interview } from "@/types/interviews";
import { CalendarClock, MapPin, User, Users } from "lucide-react";
import Link from "next/link";
import InterviewActionsMenu from "./InterviewActionsMenu";

interface InterviewCardProps {
  interview: Interview;
}

export const InterviewCard = ({ interview }: InterviewCardProps) => {
  const { formatLongDateTime } = useLongDateTimeFormatter();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 px-8 py-4 shadow-sm transition-all duration-200 hover:border-blue-600 hover:shadow-md">
      <div className="absolute right-2 top-2">
        <InterviewActionsMenu
          application={interview.jobApplication}
          interviewId={interview.id}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 pr-8 sm:gap-1">
          <div className="flex-1 space-y-2 sm:space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="line-clamp-1 text-base font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                {interview.jobApplication.job.title}
              </h3>
            </div>
            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center">
              <div className="flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5 text-gray-400" />
                <time className="font-medium">
                  {formatLongDateTime(interview.scheduledDate)}
                </time>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-medium">{interview.location}</span>
                {interview.location === "Online" && interview.meetingLink && (
                  <Link
                    href={interview.meetingLink}
                    target="_blank"
                    className="inline-flex items-center"
                  >
                    <Badge className="ml-1 rounded-md border border-blue-500 bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white">
                      Join Meeting
                    </Badge>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100" />

        {/* Bottom Section */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Applicant Info */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-gray-400">Applicant</p>
              <p className="text-sm font-semibold text-gray-900">
                {interview.jobApplication.user.fullName}
              </p>
            </div>
          </div>

          {/* Interviewer Info */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-gray-400">Interviewer</p>
              <p className="text-sm font-semibold text-gray-900">
                {interview.interviewerName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InterviewCard;
