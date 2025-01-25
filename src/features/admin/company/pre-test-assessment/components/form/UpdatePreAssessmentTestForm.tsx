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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Test Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter test title"
                      className="mt-1"
                      // disabled={createAssessmentPending}
                      required
                    />
                    {!!formik.touched.title && !!formik.errors.title && (
                      <p className="text-sm text-red-500">
                        {formik.errors.title}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="text-lg font-semibold"
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
                      className="mt-1"
                      rows={4}
                      // disabled={createAssessmentPending}
                    />
                    {!!formik.touched.description &&
                      !!formik.errors.description && (
                        <p className="text-sm text-red-500">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>
                  <div>
                    <Label htmlFor="score" className="text-lg font-semibold">
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
                      placeholder="Enter test passing score"
                      className="mt-1"
                      // disabled={createAssessmentPending}
                    />
                    {!!formik.touched.passingScore &&
                      !!formik.errors.passingScore && (
                        <p className="text-sm text-red-500">
                          {formik.errors.passingScore}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Add New Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuestionForm
                    onAddQuestion={addQuestion}
                    editQuestion={onEdit ? editingQuestion : null}
                    onCancelEdit={handleCancelEdit}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Question List</CardTitle>
              </CardHeader>
              <CardContent>
                {isQuestionsLoading ? (
                  <p>Loading...</p>
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
            <Card className="pt-6">
              <CardContent>
                <p className="mb-2 text-xs text-red-400">
                  *The Question Will Be Updated Once You Save or Publish Your
                  Assessment
                </p>
                <div className="flex h-full items-center justify-end gap-2">
                  <Button
                    type="submit"
                    variant="outline"
                    onClick={() => setSubmitType("draft")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setSubmitType("published")}
                    disabled={!isPublishable || isProcessing}
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
  );
};
