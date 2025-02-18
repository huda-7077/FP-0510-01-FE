"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCreateAssessmentQuestion from "@/hooks/api/assessment-question/useCreateAssessmentQuestion";
import useCreateAssessment from "@/hooks/api/assessment/useCreateAssessment";
import useCreateQuestionOptions from "@/hooks/api/question-options/useCreateQuestionPoints";
import useGetSkillAssessment from "@/hooks/api/skill-assessment/useGetSkillAssessment";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateSkillAssessmentSchema } from "../../schemas";
import { QuestionForm } from "./QuestionForm";
import { QuestionListTable } from "./QuestionListTable";
import SkillAssessmentDetailsCard from "./SkillAssessmentDetailsCard";
import { ValidationStatus } from "./ValidationStatues";
import useUpdateSkillAssessment from "@/hooks/api/skill-assessment/useUpdateSkillAssessment";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface PreAssessmentTestFormProps {
  slug: string;
}

export const UpdateSkillAssessmentDetails: FC<PreAssessmentTestFormProps> = ({
  slug,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitType, setSubmitType] = useState("draft");
  const [isProcessing, setIsProcessing] = useState(false);

  const addQuestion = (question: Omit<Question, "id">) => {
    setQuestions([...questions, { ...question, id: questions.length + 1 }]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const editQuestion = (id: number, updatedQuestion: Omit<Question, "id">) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...updatedQuestion, id } : q)),
    );
  };

  const { data: skillAssessment, isLoading } = useGetSkillAssessment(slug);
  // console.log(isLoading, skillAssessment);

  const {
    mutateAsync: createAssessmentQuestion,
    isPending: createAssessmentQuestionPending,
  } = useCreateAssessmentQuestion();

  const {
    mutateAsync: createQuestionOptions,
    isPending: createQuestionOptionsPending,
  } = useCreateQuestionOptions();

  useEffect(() => {
    if (skillAssessment) {
    }
  }, [skillAssessment]);

  useEffect(() => {
    const isPending =
      createAssessmentQuestionPending || createQuestionOptionsPending;
    setIsProcessing(isPending);
  }, [createAssessmentQuestionPending, createQuestionOptionsPending]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="my-1 md:my-2">
          <DashboardBreadcrumb
            route="developer"
            crumb1={{ href: "skill-assessments", label: "Skill Assessments" }}
            lastCrumb={skillAssessment ? `${skillAssessment.title}` : ""}
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
                    onAddQuestion={addQuestion}
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
                  questions={questions}
                  onDelete={deleteQuestion}
                  onEdit={editQuestion}
                />
              </CardContent>
            </Card>

            <ValidationStatus questionCount={questions.length} />

            <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
              <CardContent className="p-6">
                <p className="mb-4 text-xs text-red-500">
                  *The Question Will Be Saved Once You Save it as Draft.
                </p>
                <div className="flex h-full items-center justify-end gap-2">
                  <Button
                    type="submit"
                    // onClick={() => setSubmitType("draft")}
                    disabled={isProcessing}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    {isProcessing ? "Saving..." : "Save as Draft"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
