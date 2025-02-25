import { CertificateData } from "./certificate";

export interface BadgeData {
  id: number;
  userId: number;
  certificateId: number;
  badgeName: string;
  badgeImage: string;
  description: string;
  awardedAt: Date;
  certificate: Pick<CertificateData, "certificateUrl">;
}

export interface Badge {
  data: BadgeData[];
}
