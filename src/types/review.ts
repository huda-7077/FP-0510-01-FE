export interface Review {
  id: number;
  userId: number;
  salaryEstimate: number;
  workCultureRating: number;
  workLifeBalanceRating: number;
  facilitiesRating: number;
  careerGrowthRating: number;
  overallRating: number;
  comment: string;
  createdAt: Date;
  position: string;
}
