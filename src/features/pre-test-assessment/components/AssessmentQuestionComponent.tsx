"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import useGetAssessmentQuestions from "@/hooks/api/assessment-question/useGetAssessmentQuestions";
import useGetUserAssessment from "@/hooks/api/user-assessment/useGetUserAssessment";
import useUpdateUserAssessment from "@/hooks/api/user-assessment/useUpdateUserAssessment";
import { AssessmentQuestionData } from "@/types/assessmentQuestion";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  handleAnswerChange,
  handleNextQuestion,
  handleSubmit,
} from "../consts";
import AssessmentQuestionHeader from "./AssessmentQuestionHeader";

interface PreAssessmentTestProps {
  userAssessmentId: number;
}

const AssessmentQuestionComponent: FC<PreAssessmentTestProps> = ({
  userAssessmentId,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<AssessmentQuestionData | null>(null);
  const [remainingTime, setRemainingTime] = useState(7200);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: userAssessment, isLoading: isUserAssessmentLoading } =
    useGetUserAssessment({ id: userAssessmentId });

  const { data: questions, isLoading: isQuestionsLoading } =
    useGetAssessmentQuestions({
      assessmentId: userAssessment?.assessmentId || 0,
    });

  const { mutateAsync: updateUserAssessment } = useUpdateUserAssessment();

  useEffect(() => {
    if (
      (!isUserAssessmentLoading && !userAssessment) ||
      (session?.user &&
        userAssessment &&
        Number(session.user.id) !== userAssessment.userId)
    ) {
      toast.error("You do not have access to this assessment");
      router.push("/");
    }
  }, [userAssessment, session, router]);

  useEffect(() => {
    const savedTime = localStorage.getItem("remainingTime");
    setRemainingTime(savedTime ? parseInt(savedTime, 10) : 7200);
    if (!savedTime) localStorage.setItem("remainingTime", "7200");
  }, []);

  useEffect(() => {
    if (!isQuestionsLoading && questions?.data?.[currentQuestionIndex]) {
      setCurrentQuestion(questions.data[currentQuestionIndex]);
    }
  }, [questions, isQuestionsLoading, currentQuestionIndex]);

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
      questions,
      setScore,
      isAnswerCorrect,
    );
    setSelectedAnswer(null);
  };

  const handleSubmitClick = async () => {
    if (isSubmitting || userAssessment?.status === "DONE") return;
    setIsSubmitting(true);
    try {
      const newScore = isAnswerCorrect ? score + 4 : score;
      setScore(newScore);
      await handleSubmit(
        userAssessment,
        newScore,
        router,
        updateUserAssessment,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (
    status === "loading" ||
    isUserAssessmentLoading ||
    isQuestionsLoading ||
    ["PENDING", "EXPIRED", "DONE"].includes(userAssessment?.status || "")
  ) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <AssessmentQuestionHeader
        index={currentQuestionIndex}
        totalQuestions={25}
        remainingTime={remainingTime}
        onTimeExpired={() =>
          !isSubmitting &&
          handleSubmit(userAssessment, score, router, updateUserAssessment)
        }
      />
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-shadow hover:shadow-xl sm:p-10">
          {currentQuestion && (
            <>
              <h2 className="mb-6 text-lg text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.assessmentOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 p-4 italic transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option.id.toString()}
                      checked={selectedAnswer === option.id.toString()}
                      onChange={(e) =>
                        handleAnswerChange(
                          e.target.value,
                          userAssessment,
                          setSelectedAnswer,
                        )
                      }
                      disabled={userAssessment?.status === "DONE"}
                      className="h-5 w-5 accent-blue-600"
                    />
                    <span className="text-base text-gray-700">
                      {option.option}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                {currentQuestionIndex === (questions?.data?.length || 0) - 1 ? (
                  <Button
                    className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={!selectedAnswer || isSubmitting}
                    onClick={handleSubmitClick}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" color="#fff" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={!selectedAnswer || isSubmitting}
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
