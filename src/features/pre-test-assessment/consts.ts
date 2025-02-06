import { AssessmentQuestion } from "@/types/assessmentQuestion";
import { UserAssessmentData } from "@/types/userAssessment";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const handleNextQuestion = async (
  userAssessment: UserAssessmentData | undefined,
  updateUserAssessment: (userAssessment: {
    id: number;
    status: string;
  }) => Promise<void>,
  currentQuestionIndex: number,
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
  router: any,
  refetchUserAssessment: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<UserAssessmentData, Error>>,
  questions: AssessmentQuestion | undefined,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  isAnswerCorrect: boolean,
) => {
  if (isAnswerCorrect) {
    setScore((prev) => prev + 4);
  }

  if (userAssessment && userAssessment.status !== "ON_DOING") {
    try {
      await updateUserAssessment({
        id: userAssessment.id,
        status: "ON_DOING",
      });

      await refetchUserAssessment();
    } catch (error) {
      console.error("Error updating user assessment:", error);
      router.push("/");
      return;
    }
  }

  if (currentQuestionIndex < (questions?.data?.length || 0) - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
  } else {
    console.log("Test is complete.");
  }
};

export const handleSubmit = async (
  userAssessment: UserAssessmentData | undefined,
  score: number,
  router: any,
  updateUserAssessment: (userAssessment: {
    id: number;
    status: string;
    score: number;
  }) => Promise<void>,
) => {
  if (userAssessment && userAssessment.status === "DONE") {
    router.push("/"); // Redirect to the home page or dashboard
    return;
  }

  if (userAssessment) {
    if (
      userAssessment.status === "ON_DOING" ||
      userAssessment.status === "STARTED"
    ) {
      try {
        await updateUserAssessment({
          id: userAssessment.id,
          status: "DONE",
          score,
        });
        toast.success(
          `Thank you for taking the test! We will contact you soon.`,
        );
        router.push("/"); // Redirect to the home page or dashboard
      } catch (error) {
        console.error("Error updating user assessment:", error);
        toast.error("Failed to update the score. Please try again.");
        router.push("/"); // Redirect to home or show error page
      }
    }
  }
};

export const handleAnswerChange = (
  answerId: string,
  userAssessment: UserAssessmentData | undefined,
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (userAssessment?.status !== "DONE") setSelectedAnswer(answerId);
};
