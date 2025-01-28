export interface AssessmentOption {
  data: [
    {
      id: number;
      questionId: number;
      option: string;
      isCorrect: boolean;
      createdAt: Date;
    },
  ];
}
