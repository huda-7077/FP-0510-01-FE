import { Card } from "@/components/ui/card";
import useLongDateTimeFormatter from "@/hooks/useLongDateTimeFormatter";
import { Interview } from "@/types/interviews";
import InterviewActionsMenu from "./InterviewActionsMenu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface InterviewCardProps {
  interview: Interview;
}

export const InterviewCard = ({ interview }: InterviewCardProps) => {
  const { formatLongDateTime } = useLongDateTimeFormatter();

  return (
    <Card className="group rounded-2xl border-2 border-gray-200 p-4 px-8 shadow-sm transition-all duration-200 hover:border-blue-600">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full space-y-3 sm:w-auto">
          <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
            {interview.jobApplication.job.title}
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400">Applicant:</span>
              <span className="font-semibold text-gray-500">
                {interview.jobApplication.user.fullName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400">Interviewer:</span>
              <span className="font-semibold text-gray-500">
                {interview.interviewerName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-400">Location:</span>
              <span className="font-semibold text-gray-500">
                {interview.location}
              </span>
              {interview.location === "Online" && interview.meetingLink && (
                <Link href={interview.meetingLink} target="_blank">
                  <Badge className="rounded-md border border-blue-500 bg-blue-50 px-2 py-1 text-sm text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white">
                    Meeting Link
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <p className="text-sm font-medium text-gray-500">
            {formatLongDateTime(interview.scheduledDate)}
          </p>
          <InterviewActionsMenu application={interview.jobApplication} />
        </div>
      </div>
    </Card>
  );
};
