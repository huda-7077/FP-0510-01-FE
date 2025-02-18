import { Job } from "./job";
import { WorkExperience } from "./workExperience";

export type JobApplicationStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "INTERVIEW_SCHEDULED"
  | "ACCEPTED"
  | "REJECTED";

export interface JobApplication {
  id: number;
  jobId: number;
  userId: number;
  cvFile: string;
  attachment: string | null;
  expectedSalary: number;
  status: JobApplicationStatus;
  notes: string | null;
  createdAt: Date;
  user: {
    fullName: string;
    currentAddress: string;
    educationLevel: string;
    dateOfBirth: Date;
    email: string;
    gender: string;
    phoneNumber: string;
    profilePicture: string;
    regency: {
      regency: string;
    };
    experience: WorkExperience[];
  };
  job: Pick<Job, "title" | "requiresAssessment">;
}
