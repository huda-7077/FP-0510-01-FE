"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useGetUserScore from "@/hooks/api/skill-assessment-user-attempt/useGetUserScore";
import useGetSkillAssessment from "@/hooks/api/skill-assessment/useGetSkillAssessment";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";

interface SkillAssessmentProps {
  slug: string;
}

export default function SkillAssessmentScorePage({
  slug,
}: SkillAssessmentProps) {
  const [attemptId, setAttemptId] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("attemptId") &&
      sessionStorage.getItem("submitted")
    ) {
      setAttemptId(Number(sessionStorage.getItem("attemptId")));
      setSubmitted(sessionStorage.getItem("submitted") === "true");
    }
  }, []);

  const { data: skillAssessments, isLoading: isSkillAssessmentLoading } =
    useGetSkillAssessment(slug);

  const passingScore = skillAssessments?.passingScore || 0;

  const { data: userScore, isLoading: userScoreLoading } =
    useGetUserScore(attemptId);

  const router = useTransitionRouter();

  const handleGoBack = () => {
    router.replace("/skill-assessments");
  };

  const isLoading = isSkillAssessmentLoading || userScoreLoading;

  const formatScore = (score: any) => {
    const numericScore = Number(score);
    if (isNaN(numericScore)) return "-";
    return numericScore % 1 === 0
      ? numericScore.toFixed(0)
      : numericScore.toFixed(1);
  };

  const renderMessage = () => {
    if (Number(userScore?.score) >= passingScore) {
      return (
        <div className="mt-4 text-lg text-green-600">
          🎉 Congratulations! You have passed the assessment.
          <br />
          Your certificate can be viewed on your <strong>Profile Badge</strong>.
        </div>
      );
    }
    return (
      <div className="mt-4 text-lg text-red-600">
        Keep trying! You didn't pass this time.
        <br />
        Practice more and try again later!
      </div>
    );
  };

  if (isLoading) {
    return <LoadingScreen message="Calculating your score..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
          <CardContent className="p-12 text-center">
            {submitted && userScore && userScore.slug === slug ? (
              <div className="space-y-6">
                <CardTitle className="text-3xl font-bold">
                  Assessment Complete
                </CardTitle>
                <div className="rounded-full bg-blue-50 p-8">
                  <div
                    className={`text-5xl font-bold ${userScore && userScore.score >= passingScore ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatScore(userScore.score)}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Passing score: {passingScore}
                  </div>
                </div>
                {renderMessage()}
                <Button
                  onClick={handleGoBack}
                  className="mt-8 w-full bg-blue-600 py-6 text-lg hover:bg-blue-700"
                >
                  Back to Assessments
                </Button>
              </div>
            ) : (
              <>
                <DataNotFound
                  title="Score Not Found"
                  message="You have not submitted the assessment yet or the assessment does not exist."
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
