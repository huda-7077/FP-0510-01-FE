"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useGetUserScore from "@/hooks/api/assessment-user-attempt/useGetUserScore";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AssessmentEndScreenProps {
  slug: string;
}

export default function AssessmentEndScreen({
  slug,
}: AssessmentEndScreenProps) {
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

  const { data: userScore, isLoading: userScoreLoading } =
    useGetUserScore(attemptId);

  const router = useTransitionRouter();

  const handleGoBack = () => {
    router.replace("/dashboard/user");
  };

  if (userScoreLoading) {
    return <LoadingScreen message="Calculating your score..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        {submitted && userScore && userScore.preTestAssessment.slug === slug ? (
          <Card className="max-w-xl space-y-6 shadow-2xl">
            <CardContent className="p-8 sm:p-12">
              <div className="flex w-full items-center justify-center">
                <div className="relative h-[180px] w-[180px] md:h-[360px] md:w-[360px]">
                  <Image
                    className="rounded-xl object-cover md:rounded-2xl"
                    src={"/finished-assessment.webp"}
                    alt="project1"
                    fill
                    loading="lazy"
                  />
                </div>
              </div>
              <h1 className="text-center font-bold md:text-xl">
                Assessment Complete. The recruiter will review your application.
              </h1>
              <Button
                onClick={handleGoBack}
                className="mt-4 w-full bg-blue-600 py-6 hover:bg-blue-700 md:text-lg"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <DataNotFound
              title="Score Not Found"
              message="You have not submitted the assessment yet or the assessment does not exist."
            />
          </>
        )}
      </div>
    </div>
  );
}
