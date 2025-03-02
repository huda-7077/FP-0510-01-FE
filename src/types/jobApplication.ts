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
  updatedAt: Date;
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
  job: {
    title: string;
    requiresAssessment: boolean;
    preTestAssessments: {
      id: number;
      passingScore: number;
      userPreTestAssessments: {
        userId: number;
        score: number;
      }[];
    }[];
  };
}
