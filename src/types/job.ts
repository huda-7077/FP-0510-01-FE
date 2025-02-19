import { AssessmentData } from "./assessment";
import { Company } from "./company";
import { CompanyLocation } from "./companyLocation";

export type JobStatus = "published" | "draft";

export interface Job {
  id: number;
  companyId: number;
  companyLocationId: number;
  title: string;
  description: string;
  bannerImage?: string;
  category: string;
  salary?: number;
  tags: string[];
  applicationDeadline: Date;
  isPublished: boolean;
  requiresAssessment: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  companyLocation: CompanyLocation;
  assessments: Pick<AssessmentData, "id" | "passingScore">[];
  company: Pick<Company, "name" | "logo" | "industry">;
}
