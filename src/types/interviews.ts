import { JobApplication } from "./jobApplication";

export interface Interview {
  id: number;
  jobApplicationId: number;
  scheduledDate: Date;
  interviewerName: string;
  location: string;
  meetingLink: string | null;
  notes: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  jobApplication: JobApplication;
}
