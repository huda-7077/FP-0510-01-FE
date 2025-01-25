"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateAssessmentQuestion from "@/hooks/api/assessment-question/useCreateAssessmentQuestion";
import useCreateAssessment from "@/hooks/api/assessment/useCreateAssessment";
import useCreateQuestionOptions from "@/hooks/api/question-options/useCreateQuestionPoints";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateAssessmentSchema } from "../../schemas";
import { QuestionForm } from "./QuestionForm";
import { QuestionListTable } from "./QuestionListTable";
import { ValidationStatus } from "./ValidationStatues";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface PreAssessmentTestFormProps {
  jobId: string;
}

export const CreatePreAssessmentTestForm: FC<PreAssessmentTestFormProps> = ({
  jobId,
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

  const { mutateAsync: createAssessment, isPending: createAssessmentPending } =
    useCreateAssessment();

  const {
    mutateAsync: createAssessmentQuestion,
    isPending: createAssessmentQuestionPending,
  } = useCreateAssessmentQuestion();

  const {
    mutateAsync: createQuestionOptions,
    isPending: createQuestionOptionsPending,
  } = useCreateQuestionOptions();

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
        const createdAssessment = await createAssessment({
          ...values,
          jobId: parseInt(jobId),
          status: submitType.toUpperCase(),
        });

        const assessmentId = createdAssessment.id;

        for (const q of questions) {
          const createdAssessmentQuestions = await createAssessmentQuestion({
            assessmentId,
            question: q.question,
          });

          await createQuestionOptions({
            questionId: createdAssessmentQuestions.id,
            options: q.options,
            isCorrect: q.options.map((o) => o === q.correctAnswer),
          });
        }

        toast.success("Assessment Created Successfully");

        formik.resetForm();
        setQuestions([]);
      } catch (error) {
        toast.error(`${error}`);
      }
    },
  });

  useEffect(() => {
    const isPending =
      createAssessmentQuestionPending || createQuestionOptionsPending;
    setIsProcessing(isPending);
  }, [createAssessmentQuestionPending, createQuestionOptionsPending]);

  const isPublishable = questions.length >= 25;

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
                      disabled={createAssessmentPending}
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
                      disabled={createAssessmentPending}
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
                      disabled={createAssessmentPending}
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
                  <QuestionForm onAddQuestion={addQuestion} />
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
                <QuestionListTable
                  questions={questions}
                  onDelete={deleteQuestion}
                  onEdit={editQuestion}
                />
              </CardContent>
            </Card>
            <ValidationStatus questionCount={questions.length} />
            <Card>
              <CardContent>
                <div className="flex h-full items-center justify-end gap-2 pt-6">
                  <Button
                    type="submit"
                    onClick={() => setSubmitType("draft")}
                    disabled={isProcessing}
                  >
                    Save as Draft
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
