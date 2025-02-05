import { AssessmentData } from "./assessment";

export interface UserAssessmentData {
  assessmentId: number;
  userId: number;
  status: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  score: number;
  assessment: AssessmentData;
}

export interface UserAssessment {
  data: UserAssessmentData[];
}
