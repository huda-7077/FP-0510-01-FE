import { SubscriptionCategory } from "./subscription";
import { User } from "./user";

export interface Payment {
  id: number;
  uuid: string;
  paymentMethod: string;
  invoiceUrl: string;
  category: SubscriptionCategory;
  duration: number;
  total: number;
  status: string;
  createdAt: string;
  paidAt: string;
  expiredAt: string;
  updatedAt: string;
}

export interface PaymentData extends Payment {
  userId: number;
  paymentProof: string;
  user: Pick<User, "email">;
}
