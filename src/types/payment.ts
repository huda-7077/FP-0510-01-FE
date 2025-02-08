import { SubscriptionCategory } from "./subscription";
import { User } from "./user";

export interface Payment {
  id: number;
  uuid: string;
  paymentMethod: PaymentMethod;
  invoiceUrl: string;
  category: SubscriptionCategory;
  duration: number;
  total: number;
  status: PaymentStatus;
  createdAt: string;
  paidAt: string;
  expiredAt: string;
  updatedAt: string;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  WAITING_ADMIN = "WAITING_ADMIN",
  PAID = "PAID",
  EXPIRED = "EXPIRED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  PAYMENT_MANUAL = "PAYMENT_MANUAL",
  PAYMENT_GATEWAY = "PAYMENT_GATEWAY",
}
export interface PaymentData extends Payment {
  userId: number;
  paymentProof: string;
  user: Pick<User, "email" | "fullName">;
}
