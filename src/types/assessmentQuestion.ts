import { AssessmentOption } from "./assessmentOptions";

export interface AssessmentQuestion {
  data: [
    {
      id: number;
      assessmentId: number;
      question: string;
      createdAt: Date;
      assessmentOptions: [
        {
          id: number;
          questionId: number;
          option: string;
          isCorrect: boolean;
          createdAt: Date;
        },
      ];
    },
  ];
}
