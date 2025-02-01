export interface Assessment {
  data: [
    {
      id: number;
      jobId: number;
      title: string;
      description: string;
      passingScore: number;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      userAssessments: {
        userId: number;
        score: number;
      }[];
    },
  ];
}
