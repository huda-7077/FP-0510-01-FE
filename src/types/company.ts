export interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  logo: string;
  links: string;
  employeeCount: number;
  establishedYear: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
