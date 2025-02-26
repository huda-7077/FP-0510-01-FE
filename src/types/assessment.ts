import { Job } from "./job";
import { User } from "./user";

export interface Assessment {
  id: number;
  jobId: number;
  title: string;
  slug: string;
  description: string;
  passingScore: number;
  status: AssessmentStatus;
  createdAt: Date;
  updatedAt: Date;
  Job: Job;
  AssessmentQuestions: AssessmentQuestion[];
  userAssessments: UserAssessment[];
}

export interface AssessmentQuestion {
  id: number;
  preTestAssessmentId: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  preTestAssessment: Assessment;
  preTestAssessmentOptions: AssessmentOption[];
}

export interface AssessmentOption {
  id: number;
  option: string;
  isCorrect: boolean;
  createdAt: Date;
  preTestAssessmentQuestionId: number;
  preTestAssessmentQuestion: AssessmentQuestion;
}

export interface UserAssessment {
  id: number;
  userId: number;
  preTestAssessmentId: number;
  score: number;
  createdAt: Date;
  preTestAssessment: Assessment;
  user: User;
}

export enum AssessmentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface AssessmentUserAttempt {
  id: number;
  userId: number;
  preTestAssessmentId: number;
  correctAnswer: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userAssessment: UserAssessment;
  user: User;
  preTestAssessment: Assessment;
}

export enum AssessmentUserAttemptStatus {
  STARTED = "STARTED",
  ENDED = "ENDED",
}
