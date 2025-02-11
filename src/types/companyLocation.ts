import { Company } from "./company";

export interface CompanyLocation {
  id: number;
  companyId: number;
  regencyId: number;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  regency: {
    regency: string;
    province: string;
  };
  company: Pick<Company, "name">;
}
