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
import AssessmentFormBreadCrumb from "./AssessmentFormBreadCrumb";

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

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-6">
        <AssessmentFormBreadCrumb jobId={jobId} crumb={"Create Assessment"} />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="sticky top-6 space-y-4">
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
                        disabled={isProcessing}
                        required
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
                        placeholder="Enter test passing score"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        disabled={isProcessing}
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
                      onClick={() => setSubmitType("draft")}
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
        </form>
      </div>
    </div>
  );
};
