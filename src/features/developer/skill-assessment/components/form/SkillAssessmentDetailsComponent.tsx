"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteSkillAssessmentQuestion from "@/hooks/api/skill-assessment-question/useDeleteSkillAssessmentQuestion";
import useGetSkillAssessmentQuestions from "@/hooks/api/skill-assessment-question/useGetSkillAssessmentQuestions";
import useGetSkillAssessment from "@/hooks/api/skill-assessment/useGetSkillAssessment";
import useUpdateSkillAssessmentStatus from "@/hooks/api/skill-assessment/useUpdateSkillAssessmentStatus";
import { SkillAssessmentStatus } from "@/types/skillAssessments";
import { FC, useEffect, useState } from "react";
import { QuestionForm } from "./QuestionForm";
import { QuestionListTable } from "./QuestionListTable";
import SkillAssessmentDetailsCard from "./SkillAssessmentDetailsCard";
import { ValidationStatus } from "./ValidationStatues";

interface Question {
  id: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

interface PreAssessmentTestFormProps {
  slug: string;
}

export const SkillAssessmentDetailsComponent: FC<
  PreAssessmentTestFormProps
> = ({ slug }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanBePublished, setIsCanBePublished] = useState(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const { data: skillAssessment, isLoading: isLoadingSkillAssessment } =
    useGetSkillAssessment(slug);
  const { data: skillAssessmentQuestion, isLoading: isLoadingQuestions } =
    useGetSkillAssessmentQuestions(slug);

  const {
    mutateAsync: deleteSkillAssessmentQuestion,
    isPending: deleteSkillAssessmentQuestionPending,
  } = useDeleteSkillAssessmentQuestion();

  const {
    mutateAsync: updateSkillAssessmentStatus,
    isPending: updateSkillAssessmentStatusPending,
  } = useUpdateSkillAssessmentStatus();

  const handleEdit = (id: number, question: Omit<Question, "id">) => {
    setEditQuestion({ id, ...question });
  };

  const handleCancelEdit = () => {
    setEditQuestion(null);
  };

  const handleDelete = async (id: number) => {
    await deleteSkillAssessmentQuestion(id);
  };

  const handleUpdateStatus = async (
    slug: string,
    status: SkillAssessmentStatus,
  ) => {
    await updateSkillAssessmentStatus({
      slug,
      status,
    });
  };

  useEffect(() => {
    const isLoading = isLoadingSkillAssessment || isLoadingQuestions;
    setIsLoading(isLoading);
  }, [isLoadingSkillAssessment, isLoadingQuestions]);

  useEffect(() => {
    const isPending =
      deleteSkillAssessmentQuestionPending ||
      updateSkillAssessmentStatusPending;
    setIsProcessing(isPending);
  }, [
    deleteSkillAssessmentQuestionPending,
    updateSkillAssessmentStatusPending,
  ]);

  useEffect(() => {
    if (skillAssessmentQuestion) {
      setIsCanBePublished(skillAssessmentQuestion.data.length >= 25);
    }
  }, [skillAssessmentQuestion]);

  if (isLoading || !skillAssessment || !skillAssessmentQuestion) {
    return <LoadingScreen message="Loading skill assessment details" />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="my-1 md:my-2">
          <DashboardBreadcrumb
            route="developer"
            crumb1={{ href: "skill-assessments", label: "Skill Assessments" }}
            lastCrumb={`${skillAssessment.title}`}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              {skillAssessment && (
                <SkillAssessmentDetailsCard
                  slug={slug}
                  skillAssessment={skillAssessment}
                  isProcessing={isProcessing}
                />
              )}

              <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
                <CardHeader className="border-b border-gray-200 bg-blue-600 px-6 py-4">
                  <CardTitle className="text-xl font-semibold text-white">
                    Add New Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <QuestionForm
                    skillAssessmentId={skillAssessment.id}
                    skillAssessmentQuestionId={editQuestion?.id}
                    editQuestion={editQuestion}
                    onCancelEdit={handleCancelEdit}
                    isProcessing={isProcessing}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
              <CardHeader className="border-b border-gray-200 bg-blue-600 px-6 py-4">
                <CardTitle className="text-xl font-semibold text-white">
                  Question List
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <QuestionListTable
                  questions={skillAssessmentQuestion.data}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </CardContent>
            </Card>

            <ValidationStatus
              questionCount={skillAssessmentQuestion.data.length}
            />

            <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    Current Status:
                  </p>
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-medium ${
                      skillAssessment.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {skillAssessment.status}
                  </span>
                </div>

                <p className="mb-4 text-xs text-red-500">
                  *You quest will be saved as a draft at any time. To publish,
                  please ensure your quest contains at least 25 questions.
                </p>

                <div className="flex h-full items-center justify-end gap-2">
                  {skillAssessment.status === "DRAFT" ? (
                    <Button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(
                          slug,
                          SkillAssessmentStatus.PUBLISHED,
                        )
                      }
                      disabled={isProcessing || !isCanBePublished}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {isProcessing ? "Publishing..." : "Publish"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(slug, SkillAssessmentStatus.DRAFT)
                      }
                      disabled={isProcessing}
                      className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400/20 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {isProcessing ? "Saving..." : "Save as Draft"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
