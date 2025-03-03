import { CompanyLocation } from "./companyLocation";
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
  users: User[];
  phoneNumber: string;
  email: string;
  companyLocations: {
    id: number;
    address: string;
    latitude: string;
    longitude: string;
    regency: {
      regency: string;
      province: { province: string };
    };
  }[];
}
