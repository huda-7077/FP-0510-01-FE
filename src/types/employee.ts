import { Company } from "./company";
import { User } from "./user";

export interface Employee {
  id: number;
  companyId: number;
  userId: number;
  isEmployee: boolean;
  position: string;
  createdAt: Date;
  company: Pick<Company, "name" | "logo" | "industry">;
  user: Pick<User, "fullName" | "email" | "profilePicture">;
}
