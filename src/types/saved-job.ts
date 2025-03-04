import { Job } from "./job";
import { User } from "./user";

export interface SavedJob {
  id: number;
  userId: number;
  jobId: number;
  createdAt: string;
  job: {
    id: number,
    title: string,
    company: {
      name: string,
      logo: string,
    },
    slug: string,
    companyLocation: {
      regency: {
        regency: string,
      },
    },
    category: string,
    salary: number,
    applicationDeadline: string,
  },
}

// fix later