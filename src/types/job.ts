import { Company } from "./company";

export type JobStatus = "published" | "draft";

export interface Job {
  id: number;
  companyId: number;
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

  company: Pick<Company, "name" | "logo" | "industry">;
}
