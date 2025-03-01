import { Interview } from "./interviews";
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
  interviews: Interview[];
  job: Pick<
    Job,
    | "title"
    | "requiresAssessment"
    | "salary"
    | "company"
    | "category"
    | "companyLocation"
    | "applicationDeadline"
    | "description"
  >;
}

export interface JobApplicationFormData {
  expectedSalary: number;
  notes?: string;
  useExistingCV: boolean;
  cvFile: File | null;
  attachment?: File | null;
}

export interface CreateJobApplicationRequest {
  jobId: number;
  expectedSalary: number;
  notes?: string;
  cvFile?: File | null;
  useExistingCV?: boolean;
  attachment?: File | null;
}
