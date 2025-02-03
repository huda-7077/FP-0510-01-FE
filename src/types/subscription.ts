import { Payment } from "./payment";

export interface Subscription {
  id: number;
  userId: number;
  paymentId: number;
  expiredDate: Date;
  status: SubscriptionStatus;
  createdAt: Date;
  payment: Payment;
}

export enum SubscriptionStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  MAILED = "MAILED",
  RENEWED = "RENEWED",
}

export interface SubscriptionCategory {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}
