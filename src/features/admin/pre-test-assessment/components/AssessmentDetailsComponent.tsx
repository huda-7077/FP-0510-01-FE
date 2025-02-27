"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDeleteAssessmentQuestion from "@/hooks/api/assessment-question/useDeleteAssessmentQuestion";
import useGetAssessmentQuestions from "@/hooks/api/assessment-question/useGetAssessmentQuestions";
import useGetAssessment from "@/hooks/api/assessment/useGetAssessment";
import useUpdateAssessmentStatus from "@/hooks/api/assessment/useUpdateAssessmentStatus";
import { AssessmentStatus } from "@/types/assessment";
import { FC, useEffect, useState } from "react";
import AssessmentDetailsCard from "./form/AssessmentDetailsCard";
import { QuestionForm } from "./form/QuestionForm";
import { QuestionListTable } from "./form/QuestionListTable";
import ValidationStatus from "./form/ValidationStatues";

interface Question {
  id: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

interface PreAssessmentTestFormProps {
  slug: string;
}

export const AssessmentDetailsComponent: FC<PreAssessmentTestFormProps> = ({
  slug,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanBePublished, setIsCanBePublished] = useState(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const { data: assessment, isLoading: isLoadingAssessment } =
    useGetAssessment(slug);

  const { data: assessmentQuestion, isLoading: isLoadingQuestions } =
    useGetAssessmentQuestions(slug);

  const {
    mutateAsync: deleteAssessmentQuestion,
    isPending: deleteAssessmentQuestionPending,
  } = useDeleteAssessmentQuestion();

  const {
    mutateAsync: updateAssessmentStatus,
    isPending: updateAssessmentStatusPending,
  } = useUpdateAssessmentStatus();

  const handleEdit = (id: number, question: Omit<Question, "id">) => {
    setEditQuestion({ id, ...question });
  };

  const handleCancelEdit = () => {
    setEditQuestion(null);
  };

  const handleDelete = async (id: number) => {
    await deleteAssessmentQuestion(id);
  };

  const handleUpdateStatus = async (slug: string, status: AssessmentStatus) => {
    await updateAssessmentStatus({
      slug,
      status,
    });
  };

  useEffect(() => {
    const isLoading = isLoadingAssessment || isLoadingQuestions;
    setIsLoading(isLoading);
  }, [isLoadingAssessment, isLoadingQuestions]);

  useEffect(() => {
    const isPending =
      deleteAssessmentQuestionPending || updateAssessmentStatusPending;
    setIsProcessing(isPending);
  }, [deleteAssessmentQuestionPending, updateAssessmentStatusPending]);

  useEffect(() => {
    if (assessmentQuestion) {
      setIsCanBePublished(assessmentQuestion.data.length >= 25);
    }
  }, [assessmentQuestion]);

  if (isLoading || !assessment || !assessmentQuestion) {
    return <LoadingScreen message="Loading assessment details" />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="my-1 md:my-2">
          <DashboardBreadcrumb
            route="admin"
            crumb1={{ href: "jobs", label: "Jobs" }}
            lastCrumb="Edit Assessment"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              {assessment && (
                <AssessmentDetailsCard
                  slug={slug}
                  assessment={assessment}
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
                    assessmentId={assessment.id}
                    assessmentQuestionId={editQuestion?.id}
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
                  questions={assessmentQuestion.data}
                  isProcessing={isProcessing}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </CardContent>
            </Card>

            <ValidationStatus questionCount={assessmentQuestion.data.length} />

            <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold text-gray-900">Current Status:</p>
                  <span
                    className={`rounded-md border-2 px-3 py-1 text-xs font-bold ${
                      assessment.status === "PUBLISHED"
                        ? "border-green-300 bg-green-100 text-green-600"
                        : "border-yellow-300 bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {assessment.status}
                  </span>
                </div>

                <p className="mb-4 text-xs text-red-500">
                  *You question will be saved as a draft at any time. To
                  publish, please ensure your quest contains at least 25
                  questions.
                </p>

                <div className="flex h-full items-center justify-end gap-2">
                  {assessment.status === "DRAFT" ? (
                    <Button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(slug, AssessmentStatus.PUBLISHED)
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
                        handleUpdateStatus(slug, AssessmentStatus.DRAFT)
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
