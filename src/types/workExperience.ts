export interface WorkExperience {
  id: number;
  userId: number;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  description?: string;
}

export type CreateWorkExperienceDTO = {
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  isCurrentJob: boolean;
  description: string | null;
};
