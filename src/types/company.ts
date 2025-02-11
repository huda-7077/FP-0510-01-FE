import { User } from "./user";

export interface Company {
  id: number;
  name: string;
  description: string;
  about: string;
  industry: string;
  logo: string;
  links: string;
  employeeCount: number;
  establishedYear: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  phoneNumber: string;
  email: string;
}
