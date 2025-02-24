import { CertificateData } from "./certificate";
import { User } from "./user";

export interface SkillAssessment {
  id: number;
  title: string;
  slug: string;
  description: string;
  passingScore: number;
  badgeImage: string;
  status: SkillAssessmentStatus;
  createdAt: Date;
  updatedAt: Date;
  skillAssessmentQuestions: SkillAssessmentQuestion[];
  userSkillAssessments: UserSkillAssessment[];
}

export interface SkillAssessmentQuestion {
  id: number;
  skillAssessmentId: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  skillAssessment: SkillAssessment;
  skillAssessmentOptions: SkillAssessmentOption[];
}

export interface SkillAssessmentOption {
  id: number;
  option: string;
  isCorrect: boolean;
  createdAt: Date;
  skillAssessmentQuestionId: number;
  skillAssessmentQuestion: SkillAssessmentQuestion;
}

export interface UserSkillAssessment {
  id: number;
  userId: number;
  skillAssessmentId: number;
  score: number;
  createdAt: Date;
  skillAssessment: SkillAssessment;
  user: User;
  certificate: CertificateData;
}

export enum SkillAssessmentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface SkillAssessmentUserAttempt {
  id: number;
  userId: number;
  skillAssessmentId: number;
  correctAnswer: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userSkillAssessment: UserSkillAssessment;
  user: User;
  skillAssessment: SkillAssessment;
}

export enum SkillAssessmentUserAttemptStatus {
  STARTED = "STARTED",
  ENDED = "ENDED",
}
