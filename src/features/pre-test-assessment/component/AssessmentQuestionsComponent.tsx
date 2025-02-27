"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AssessmentUserAttempt } from "@/types/assessment";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AssessmentQuestionHeader from "./AssessmentQuestionHeader";
import useGetAssessmentQuestions from "@/hooks/api/assessment-question/useGetAssessmentQuestions";
import useSaveUserAnswer from "@/hooks/api/assessment-user-attempt/useSaveUserAnswer";
import useAutoSubmitUserAnswers from "@/hooks/api/assessment-user-attempt/useAutoSubmitUserAnswer";
import useSubmitUserAnswers from "@/hooks/api/assessment-user-attempt/useSubmitUserAnswers";

interface UserAnswer {
  questionId: number;
  selectedOptionId: number;
}

interface AssessmentProps {
  slug: string;
  attempt: AssessmentUserAttempt;
}

export default function AssessmentQuestionsComponent({
  slug,
  attempt,
}: AssessmentProps) {
  const { data: assessmentQuestion, isLoading } =
    useGetAssessmentQuestions(slug);
  const { mutateAsync: saveUserAnswer } = useSaveUserAnswer();
  const { mutateAsync: autoSubmitUserAnswers } = useAutoSubmitUserAnswers();
  const { mutateAsync: submitUserAnswers, isPending: isSubmitting } =
    useSubmitUserAnswers();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(() => {
    return sessionStorage.getItem("submitted") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("submitted", submitted.toString());
    sessionStorage.setItem("attemptId", String(attempt.id));
  }, [submitted]);

  const router = useRouter();
  const hasAutoSubmitted = useRef(false);

  const clearAndFinalizeAssessment = () => {
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("currentIndex");
    sessionStorage.setItem("submitted", "true");
    setSubmitted(true);
  };

  const handleAutoSubmit = async () => {
    if (!hasAutoSubmitted.current && !submitted) {
      hasAutoSubmitted.current = true;
      await autoSubmitUserAnswers(attempt.id);
      clearAndFinalizeAssessment();
      router.replace(`/pre-test-assessment/${slug}/score`);
    }
  };

  const handleAnswerSelect = async (optionId: number) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (ans) => ans.questionId === currentQuestion.id,
      );

      let updatedAnswers;
      if (existingAnswer) {
        updatedAnswers = prevAnswers.map((ans) =>
          ans.questionId === currentQuestion.id
            ? { ...ans, selectedOptionId: optionId }
            : ans,
        );
      } else {
        updatedAnswers = [
          ...prevAnswers,
          { questionId: currentQuestion.id, selectedOptionId: optionId },
        ];
      }

      sessionStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });

    await saveUserAnswer({
      attemptId: attempt.id,
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      sessionStorage.setItem("currentIndex", String(newIndex));
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      sessionStorage.setItem("currentIndex", String(newIndex));
      return newIndex;
    });
  };

  const handleSubmit = async () => {
    await submitUserAnswers(attempt.id);
    clearAndFinalizeAssessment();
    router.replace(`/pre-test-assessment/${slug}/score`);
  };

  useEffect(() => {
    const createdAtTime = new Date(attempt.createdAt).getTime();
    const endTime = createdAtTime + 2 * 60 * 60 * 1000;
    const updateTimer = () => {
      const now = new Date().getTime();
      const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remainingTime);

      if (remainingTime === 0 && !submitted) {
        handleAutoSubmit();
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [attempt.createdAt, submitted]);

  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("userAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    const savedIndex = sessionStorage.getItem("currentIndex");
    if (savedIndex) {
      setCurrentIndex(Number(savedIndex));
    }
  }, []);

  if (isLoading || !assessmentQuestion) {
    return <LoadingScreen message="Loading questions" />;
  }

  const questions = assessmentQuestion.data;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentAnswer = answers.find(
    (ans) => ans.questionId === currentQuestion.id,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {!submitted && (
        <AssessmentQuestionHeader
          currentIndex={currentIndex}
          timeLeft={timeLeft}
          totalQuestions={questions.length}
          progress={progress}
        />
      )}
      <div className="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
          {!submitted && (
            <>
              <CardHeader className="space-y-2 p-8">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 p-8">
                <RadioGroup
                  value={currentAnswer?.selectedOptionId.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  className="space-y-4"
                >
                  {currentQuestion.preTestAssessmentOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className="relative flex cursor-pointer items-center rounded-lg border p-4 transition-all hover:bg-slate-50"
                      onClick={() => handleAnswerSelect(opt.id)}
                    >
                      <RadioGroupItem
                        value={opt.id.toString()}
                        id={`option-${opt.id}`}
                        className="mr-4"
                      />
                      <span className="flex-1 text-base text-slate-700">
                        {opt.option}
                      </span>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-6">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    variant="outline"
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  {currentIndex < questions.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
