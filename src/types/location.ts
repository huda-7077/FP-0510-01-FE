import { CompanyLocation } from "./companyLocation";
import { User } from "./user";

export interface Regency {
  id: number;
  regency: string;
  type: string;
  provinceId: number;
  users: User[];
  companyLocations: CompanyLocation[];
  province: Province;
}

export interface Province {
  id: number;
  province: string;
  regencies: Regency[];
}
