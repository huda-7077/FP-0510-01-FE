"use client";

import { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { QuestionListTable } from "./QuestionListTable";
import { QuestionForm } from "./QuestionForm";
import { ValidationStatus } from "./ValidationStatues";
import useCreateAssessment from "@/hooks/api/assessment/useCreateAssessment";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useCreateQuestionOptions from "@/hooks/api/question-options/useCreateQuestionPoints";
import useCreateAssessmentQuestion from "@/hooks/api/assessment-question/useCreateAssessmentQuestion";

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
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitType, setSubmitType] = useState("draft");

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

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      passingScore: 0,
      status: "draft",
    },
    onSubmit: async () => {
      try {
        const createdAssessment = await createAssessment({
          jobId: parseInt(jobId),
          title,
          description,
          passingScore: score,
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
      } catch (error) {
        toast.error(`${error}`);
      }
    },
  });

  const isPublishable = questions.length >= 25;

  return (
    <div className="container mx-auto p-6">
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter test title"
                    className="mt-1"
                  />
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter test description"
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="score" className="text-lg font-semibold">
                    Passing Score
                  </Label>
                  <Input
                    id="score"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value))}
                    placeholder="Enter test passing score"
                    className="mt-1"
                  />
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
              <form
                onSubmit={formik.handleSubmit}
                className="flex h-full items-center justify-end gap-2 pt-6"
              >
                <Button
                  type="submit"
                  variant="outline"
                  onClick={() => setSubmitType("draft")}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  onClick={() => setSubmitType("published")}
                  disabled={!isPublishable}
                >
                  Publish Test
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
