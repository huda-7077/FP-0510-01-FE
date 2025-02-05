"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateAssessmentQuestion from "@/hooks/api/assessment-question/useCreateAssessmentQuestion";
import useDeleteAssessmentQuestion from "@/hooks/api/assessment-question/useDeleteAssessmentQuestion";
import useGetAssessmentQuestions from "@/hooks/api/assessment-question/useGetAssessmentQuestions";
import useUpdateAssessmentQuestion from "@/hooks/api/assessment-question/useUpdateAssessmentQuestion";
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import useUpdateAssessment from "@/hooks/api/assessment/useUpdateAssessment";
import useCreateQuestionOptions from "@/hooks/api/question-options/useCreateQuestionPoints";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QuestionForm } from "./QuestionForm";
import { QuestionListTable } from "./QuestionListTable";
import { ValidationStatus } from "./ValidationStatues";
import useDeleteQuestionOptionByQuestionId from "@/hooks/api/question-options/useDeleteQuestionOptionByQuestionId";
import { CreateAssessmentSchema } from "../../schemas";
import useUpdateQuestionOptionByQuestionId from "@/hooks/api/question-options/useUpdateQuestionOptionByQuestionId.ts";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import AssessmentFormBreadCrumb from "./AssessmentFormBreadCrumb";
import { redirect } from "next/navigation";

interface ModifiedQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  isModified: boolean;
  areOptionsModified: boolean;
}

interface PreAssessmentTestFormProps {
  jobId: string;
}

export const UpdatePreAssessmentTestForm: FC<PreAssessmentTestFormProps> = ({
  jobId,
}) => {
  const {
    data: assessment,
    isLoading: isAssessmentLoading,
    refetch: refetchAssessment,
  } = useGetAssessments({
    jobId: parseInt(jobId),
  });

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    refetch: refetchQuestions,
  } = useGetAssessmentQuestions({
    assessmentId: assessment?.data?.[0]?.id || 0,
  });

  const {
    mutateAsync: updateAssessment,
    isPending: isUpdateAssessmentPending,
  } = useUpdateAssessment();

  const {
    mutateAsync: createAssessmentQuestion,
    isPending: createAssessmentQuestionPending,
  } = useCreateAssessmentQuestion();

  const {
    mutateAsync: updateAssessmentQuestion,
    isPending: isUpdateAssessmentQuestionPending,
  } = useUpdateAssessmentQuestion();

  const {
    mutateAsync: deleteAssessmentQuestion,
    isPending: isDeleteAssessmentQuestionPending,
  } = useDeleteAssessmentQuestion();

  const {
    mutateAsync: createQuestionOptions,
    isPending: createQuestionOptionsPending,
  } = useCreateQuestionOptions();

  const {
    mutateAsync: deleteQuestionOptionByQuestionId,
    isPending: isdeleteQuestionOptionByQuestionIdPending,
  } = useDeleteQuestionOptionByQuestionId();

  const {
    mutateAsync: updateQuestionOptionByQuestionId,
    isPending: isUpdateQuestionOptionByQuestionIdPending,
  } = useUpdateQuestionOptionByQuestionId();

  const [questionsStates, setQuestionStates] = useState<ModifiedQuestion[]>([]);
  const [submitType, setSubmitType] = useState("draft");
  const [editingQuestion, setEditingQuestion] =
    useState<ModifiedQuestion | null>(null);
  const [onEdit, setOnEdit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const areOptionsEqual = (options1: string[], options2: string[]): boolean => {
    if (options1.length !== options2.length) return false;
    return options1.every((opt, idx) => opt === options2[idx]);
  };

  const addQuestion = (
    newQuestion: Omit<
      ModifiedQuestion,
      "id" | "isModified" | "areOptionsModified"
    >,
    editingId?: number,
  ) => {
    if (editingId !== undefined) {
      setQuestionStates((prevQuestions) => {
        return prevQuestions.map((q) =>
          q.id === editingId
            ? {
                ...q,
                ...newQuestion,
                isModified: q.question !== newQuestion.question,
                areOptionsModified:
                  !areOptionsEqual(q.options, newQuestion.options) ||
                  q.correctAnswer !== newQuestion.correctAnswer,
              }
            : q,
        );
      });
      setOnEdit(false);
      setEditingQuestion(null);
    } else {
      const existingQuestionIds = questionsStates.map(({ id }) => id);
      const newId =
        existingQuestionIds.length > 0
          ? Math.max(...existingQuestionIds) + 1
          : 1;

      setQuestionStates((previousQuestions) => [
        ...previousQuestions,
        {
          ...newQuestion,
          id: newId,
          isModified: true,
          areOptionsModified: true,
        },
      ]);
    }
  };

  const handleCancelEdit = () => {
    setOnEdit(false);
    setEditingQuestion(null);
  };

  const deleteQuestion = (id: number) => {
    setQuestionStates(questionsStates.filter((q) => q.id !== id));
  };

  const editQuestion = (id: number) => {
    setOnEdit(true);
    setEditingQuestion(questionsStates.find((q) => q.id === id) || null);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      passingScore: 0,
      status: "draft",
    },
    validationSchema: CreateAssessmentSchema,
    onSubmit: async (values) => {
      try {
        if (assessment?.data?.[0]?.id && !isUpdateAssessmentPending) {
          await updateAssessment({
            id: assessment.data[0].id,
            title: values.title,
            description: values.description,
            passingScore: values.passingScore,
            status: submitType.toUpperCase(),
          });

          const modifiedQuestions = questionsStates.filter(
            (q) => q.isModified || q.areOptionsModified,
          );

          for (const q of modifiedQuestions) {
            const existingQuestion = questions?.data.find(
              (existQ) => existQ.id === q.id,
            );

            if (existingQuestion) {
              if (q.isModified) {
                await updateAssessmentQuestion({
                  id: q.id,
                  question: q.question,
                });
              }

              if (q.areOptionsModified) {
                await updateQuestionOptionByQuestionId({
                  questionId: q.id,
                  options: q.options,
                  isCorrect: q.options.map(
                    (option) => option === q.correctAnswer,
                  ),
                });
              }
            } else {
              const createdQuestion = await createAssessmentQuestion({
                assessmentId: assessment.data[0].id,
                question: q.question,
              });

              if (createdQuestion?.id) {
                await createQuestionOptions({
                  questionId: createdQuestion.id,
                  options: q.options,
                  isCorrect: q.options.map(
                    (option) => option === q.correctAnswer,
                  ),
                });
              }
            }
          }

          const questionsToDelete = questions?.data.filter(
            (existQ) => !questionsStates.some((q) => q.id === existQ.id),
          );

          if (questionsToDelete?.length) {
            for (const question of questionsToDelete) {
              await deleteQuestionOptionByQuestionId(question.id);
              await deleteAssessmentQuestion(question.id);
            }
          }

          toast.success("Assessment Updated Successfully");

          if (submitType === "draft") {
            formik.resetForm();
            setQuestionStates([]);
          }

          await Promise.all([refetchAssessment(), refetchQuestions()]);

          redirect(`/dashboard/admin/jobs/${jobId}`);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    },
  });

  useEffect(() => {
    if (assessment && !isAssessmentLoading) {
      formik.resetForm({
        values: {
          title: assessment.data[0].title,
          description: assessment.data[0].description,
          passingScore: assessment.data[0].passingScore,
          status: assessment.data[0].status,
        },
      });
    }
  }, [assessment, questions]);

  useEffect(() => {
    if (questions && !isQuestionsLoading) {
      setQuestionStates((prevQuestions) => {
        const existingQuestionsMap = new Map(
          prevQuestions.map((q) => [q.id, q]),
        );

        const updatedQuestions = questions.data.map((q) => {
          const { id, question, assessmentOptions } = q;
          const existingQuestion = existingQuestionsMap.get(id);
          const correctAnswer =
            assessmentOptions.find((o) => o.isCorrect)?.option || "";
          const options = assessmentOptions.map((o) => o.option);

          if (!existingQuestion) {
            return {
              id,
              question,
              options,
              correctAnswer,
              isModified: false,
              areOptionsModified: false,
            };
          }

          return {
            ...existingQuestion,
            isModified: existingQuestion.isModified || false,
            areOptionsModified: existingQuestion.areOptionsModified || false,
          };
        });

        return updatedQuestions;
      });
    }
  }, [questions, isQuestionsLoading]);

  useEffect(() => {
    const isPending =
      isUpdateAssessmentPending ||
      createAssessmentQuestionPending ||
      isUpdateAssessmentQuestionPending ||
      isDeleteAssessmentQuestionPending ||
      createQuestionOptionsPending ||
      isdeleteQuestionOptionByQuestionIdPending ||
      isUpdateQuestionOptionByQuestionIdPending;

    setIsProcessing(isPending);
  }, [
    isUpdateAssessmentPending,
    createAssessmentQuestionPending,
    isUpdateAssessmentQuestionPending,
    isDeleteAssessmentQuestionPending,
    createQuestionOptionsPending,
    isdeleteQuestionOptionByQuestionIdPending,
    isUpdateQuestionOptionByQuestionIdPending,
  ]);

  const isPublishable = questionsStates.length >= 25;

  if (isAssessmentLoading) {
    return <LoadingScreen message="Loading Assessment Data" />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <AssessmentFormBreadCrumb jobId={jobId} crumb={"Edit Assessment"} />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="sticky top-6 space-y-6">
                <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
                  <CardHeader className="border-b border-gray-200 bg-blue-600 px-6 py-4">
                    <CardTitle className="text-xl font-semibold text-white">
                      Test Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 p-6">
                    <div>
                      <Label
                        htmlFor="title"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter test title"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        required
                        disabled={isProcessing}
                      />
                      {!!formik.touched.title && !!formik.errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                          {formik.errors.title}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="description"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter test description"
                        className="min-h-[100px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        rows={4}
                        disabled={isProcessing}
                      />
                      {!!formik.touched.description &&
                        !!formik.errors.description && (
                          <p className="mt-1 text-sm text-red-500">
                            {formik.errors.description}
                          </p>
                        )}
                    </div>
                    <div>
                      <Label
                        htmlFor="score"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Passing Score
                      </Label>
                      <Input
                        id="passingScore"
                        type="number"
                        min={0}
                        max={100}
                        value={formik.values.passingScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isProcessing}
                        placeholder="Enter test passing score"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      {!!formik.touched.passingScore &&
                        !!formik.errors.passingScore && (
                          <p className="mt-1 text-sm text-red-500">
                            {formik.errors.passingScore}
                          </p>
                        )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
                  <CardHeader className="border-b border-gray-200 bg-blue-600 px-6 py-4">
                    <CardTitle className="text-xl font-semibold text-white">
                      Add New Question
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <QuestionForm
                      onAddQuestion={addQuestion}
                      editQuestion={onEdit ? editingQuestion : null}
                      onCancelEdit={handleCancelEdit}
                      isProcessing={isProcessing}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-3">
              <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
                <CardHeader className="border-b border-gray-200 bg-blue-600 px-6 py-4">
                  <CardTitle className="text-xl font-semibold text-white">
                    Question List
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isQuestionsLoading ? (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-sm text-gray-500">
                        Loading questions...
                      </p>
                    </div>
                  ) : (
                    <QuestionListTable
                      questions={questionsStates}
                      onDelete={deleteQuestion}
                      onEdit={editQuestion}
                    />
                  )}
                </CardContent>
              </Card>

              <ValidationStatus questionCount={questionsStates.length} />

              <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
                <CardContent className="p-6">
                  <p className="mb-4 text-xs text-red-500">
                    *The Question Will Be Updated Once You Save or Publish Your
                    Assessment
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      type="submit"
                      variant="outline"
                      onClick={() => setSubmitType("draft")}
                      disabled={isProcessing}
                      className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {isProcessing ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => setSubmitType("published")}
                      disabled={!isPublishable || isProcessing}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {isPublishable && isProcessing
                        ? "Publishing..."
                        : "Publish Test"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
