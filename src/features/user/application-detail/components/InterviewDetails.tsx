import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterviewDetailsProps {
  interview: {
    scheduledDate: Date;
    interviewerName: string;
    location: string;
    meetingLink: string | null;
    notes?: string  | null;
  };
}

export function InterviewDetails({ interview }: InterviewDetailsProps) {
  const interviewDate = new Date(interview.scheduledDate);

  return (
    <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h2 className="mb-4 text-lg font-semibold text-blue-800">
        Interview Details
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-blue-700">Date</p>
          <p className="flex items-center font-medium">
            <Calendar className="mr-2 h-4 w-4 text-blue-600" />
            {interviewDate.toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-700">Time</p>
          <p className="flex items-center font-medium">
            <Clock className="mr-2 h-4 w-4 text-blue-600" />
            {interviewDate.toLocaleTimeString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-700">Interviewer</p>
          <p className="font-medium">{interview.interviewerName}</p>
        </div>
        <div>
          <p className="text-sm text-blue-700">Location</p>
          <p className="flex items-center font-medium">
            <MapPin className="mr-2 h-4 w-4 text-blue-600" />
            {interview.location}
          </p>
        </div>
      </div>

      {interview.meetingLink && (
        <div className="mt-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 md:w-auto"
            asChild
          >
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video className="mr-2 h-4 w-4" />
              Join Meeting
            </a>
          </Button>
        </div>
      )}

      {interview.notes && (
        <div className="mt-4">
          <p className="text-sm text-blue-700">Notes</p>
          <p className="mt-1 text-sm text-blue-800">{interview.notes}</p>
        </div>
      )}
    </div>
  );
}
