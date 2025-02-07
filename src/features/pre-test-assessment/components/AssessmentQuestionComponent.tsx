"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-xl overflow-hidden rounded-2xl border-2 border-gray-300 bg-white">
          {currentQuestion && (
            <CardContent className="space-y-6 p-8">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <div>
                {currentQuestion.assessmentOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-baseline space-x-3"
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
                    />
                    <span className="text-base text-gray-700">
                      {option.option}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end">
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
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AssessmentQuestionComponent;
