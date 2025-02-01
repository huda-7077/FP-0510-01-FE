export type UserRole = "USER" | "ADMIN" | "DEVELOPER";
export type UserGender = "MALE" | "FEMALE";

export interface User {
  id: number;
  companyId?: number;
  regencyId?: number;
  email: string;
  password?: string;
  role: UserRole;
  fullName: string;
  dateOfBirth?: Date;
  gender?: UserGender;
  educationLevel?: string;
  currentAddress?: string;
  profilePicture?: string;
  phoneNumber?: string;
  cvUrl?: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  fullName: string;
  phoneNumber?: string;
}

export interface RegisterResponse {
  message: string;
  user: Omit<User, "password">;
  verificationToken?: string;
}
