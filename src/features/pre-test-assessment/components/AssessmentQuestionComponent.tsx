"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import useGetAssessmentQuestions from "@/hooks/api/assessment-question/useGetAssessmentQuestions";
import useGetUserAssessment from "@/hooks/api/user-assessment/useGetUserAssessment";
import useUpdateUserAssessment from "@/hooks/api/user-assessment/useUpdateUserAssessment";
import { AssessmentQuestionData } from "@/types/assessmentQuestion";
import AssessmentQuestionHeader from "./AssessmentQuestionHeader";
import { handleNextQuestion, handleSubmit } from "../consts";

interface PreAssessmentTestProps {
  userAssessmentId: number;
}

const AssessmentQuestionComponent: FC<PreAssessmentTestProps> = ({
  userAssessmentId,
}) => {
  const router = useRouter();
  const userId = 2; // Placeholder for user ID
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<AssessmentQuestionData | null>(null);
  const [remainingTime, setRemainingTime] = useState(7200);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const {
    data: userAssessment,
    isLoading: isUserAssessmentLoading,
    refetch: refetchUserAssessment,
  } = useGetUserAssessment({ id: userAssessmentId });
  const { data: questions, isLoading: isQuestionsLoading } =
    useGetAssessmentQuestions({
      assessmentId: userAssessment?.assessmentId || 0,
    });
  const {
    mutateAsync: updateUserAssessment,
    isPending: isUpdateUserAssessmentPending,
  } = useUpdateUserAssessment();

  useEffect(() => {
    if (!toastShown && userAssessment) {
      const statusMessages: Record<string, string> = {
        DONE: "You cannot redo an assessment",
        EXPIRED: "Your assessment test has expired",
        PENDING: "You do not have access to this assessment",
      };

      if (
        statusMessages[userAssessment.status] ||
        userId !== userAssessment.userId
      ) {
        toast.error(
          statusMessages[userAssessment.status] ||
            "You do not have access to this assessment",
        );
        router.push("/");
        setToastShown(true);
      }
    }
  }, [userAssessment, router, toastShown, userId]);

  useEffect(() => {
    setRemainingTime(
      localStorage.getItem("remainingTime")
        ? parseInt(localStorage.getItem("remainingTime")!, 10)
        : 7200,
    );
    if (!localStorage.getItem("remainingTime"))
      localStorage.setItem("remainingTime", "7200");
  }, []);

  useEffect(() => {
    if (!isQuestionsLoading && questions?.data?.[currentQuestionIndex]) {
      setCurrentQuestion(questions.data[currentQuestionIndex]);
    }
  }, [questions, isQuestionsLoading, currentQuestionIndex]);

  const handleAnswerChange = (answerId: string) => {
    if (userAssessment?.status !== "DONE") setSelectedAnswer(answerId);
  };

  const isAnswerCorrect =
    questions?.data[currentQuestionIndex]?.assessmentOptions.find(
      (option) => option.id === Number(selectedAnswer),
    )?.isCorrect || false;

  const handleNext = async () => {
    await handleNextQuestion(
      userAssessment,
      updateUserAssessment,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      router,
      refetchUserAssessment,
      questions,
      setScore,
      isAnswerCorrect,
    );
    setSelectedAnswer(null);
  };

  const handleSubmitClick = async () => {
    if (isSubmitting || userAssessment?.status === "DONE") return;

    setIsSubmitting(true);
    setScore((prev) => (isAnswerCorrect ? prev + 4 : prev));
    await handleSubmit(userAssessment, score, router, updateUserAssessment);
    setIsSubmitting(false);
  };

  if (
    isUserAssessmentLoading ||
    isQuestionsLoading ||
    ["PENDING", "EXPIRED", "DONE"].includes(userAssessment?.status || "")
  ) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AssessmentQuestionHeader
        index={currentQuestionIndex}
        totalQuestions={25}
        remainingTime={remainingTime}
        onTimeExpired={() =>
          !isSubmitting &&
          handleSubmit(userAssessment, score, router, updateUserAssessment)
        }
      />
      <div className="container mx-auto flex h-screen items-center py-8 sm:py-16">
        <div className="mx-80 w-full rounded-lg bg-white p-6 shadow-md">
          {currentQuestion && (
            <>
              <h2 className="mb-4 text-lg text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.assessmentOptions.map((option) => (
                  <div key={option.id}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="option"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        value={option.id}
                        required
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        checked={selectedAnswer === option.id.toString()}
                        disabled={userAssessment?.status === "DONE"}
                      />
                      <span className="text-gray-700">{option.option}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                {currentQuestionIndex === (questions?.data?.length || 0) - 1 ? (
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={!selectedAnswer || isSubmitting}
                    onClick={handleSubmitClick}
                  >
                    {isSubmitting ? <span>Submitting...</span> : "Submit"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={
                      !selectedAnswer ||
                      isSubmitting ||
                      isUpdateUserAssessmentPending
                    }
                  >
                    Next
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestionComponent;
