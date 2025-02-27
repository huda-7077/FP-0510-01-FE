"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCreateAssessmentQuestion from "@/hooks/api/assessment-question/useCreateAssessmentQuestion";
import useUpdateAssessmentQuestion from "@/hooks/api/assessment-question/useUpdateAssessmentQuestion";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { QuestionFormSchema } from "../../schemas";

interface Question {
  id: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

interface QuestionFormProps {
  assessmentId?: number;
  assessmentQuestionId?: number;
  editQuestion?: Question | null;
  onCancelEdit?: () => void;
  isProcessing: boolean;
}

export function QuestionForm({
  assessmentId,
  assessmentQuestionId,
  editQuestion,
  onCancelEdit,
  isProcessing,
}: QuestionFormProps) {
  const { mutateAsync: createAssessmentQuestion, isPending: createPending } =
    useCreateAssessmentQuestion();
  const { mutateAsync: updateAssessmentQuestion, isPending: updatePending } =
    useUpdateAssessmentQuestion();

  const formik = useFormik({
    initialValues: {
      question: editQuestion?.question || "",
      options: editQuestion?.options.map((opt) => opt.option) || [
        "",
        "",
        "",
        "",
      ],
      correctAnswer:
        editQuestion?.options.find((opt) => opt.isCorrect)?.option || "",
    },
    validationSchema: QuestionFormSchema,
    onSubmit: async (values) => {
      const payload = {
        question: values.question.trim(),
        options: values.options.map((option) => ({
          option,
          isCorrect: option === values.correctAnswer,
        })),
      };

      if (editQuestion) {
        if (!assessmentQuestionId) {
          toast.error("Assessment Question ID is required");
          return;
        }
        await updateAssessmentQuestion({
          preTestAssessmentQuestionId: assessmentQuestionId,
          ...payload,
        });
      } else {
        if (!assessmentId) {
          toast.error("Assessment ID is required");
          return;
        }
        await createAssessmentQuestion({
          preTestAssessmentId: assessmentId,
          ...payload,
        });
      }
      formik.resetForm();
      if (onCancelEdit) {
        onCancelEdit();
      } else {
        toast.success("Question updated successfully");
      }
    },
  });

  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
    formik.resetForm();
  };

  useEffect(() => {
    if (editQuestion) {
      formik.setValues({
        question: editQuestion.question,
        options: editQuestion.options.map((opt) => opt.option),
        correctAnswer:
          editQuestion.options.find((opt) => opt.isCorrect)?.option || "",
      });
    }
  }, [editQuestion]);

  return (
    <form onSubmit={formik.handleSubmit} className="rounded-lg">
      <div className="space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="question"
            className="text-base font-semibold text-gray-900"
          >
            Question
          </Label>
          <Textarea
            id="question"
            {...formik.getFieldProps("question")}
            placeholder="Type your question here..."
            className="min-h-[120px] resize-y rounded-lg border-gray-200 text-base placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            disabled={isProcessing}
          />
          {formik.touched.question && formik.errors.question && (
            <p className="text-sm text-red-500">{formik.errors.question}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-900">
            Answer Options
          </Label>
          <div className="grid gap-4">
            {formik.values.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 font-semibold text-gray-700">
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  id={`option-${index}`}
                  name={`options[${index}]`}
                  value={option}
                  onChange={formik.handleChange}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  disabled={isProcessing}
                  className="rounded-lg border-gray-200 text-base placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            ))}
          </div>
          {formik.touched.options &&
            typeof formik.errors.options === "string" && (
              <p className="text-sm text-red-500">{formik.errors.options}</p>
            )}
        </div>

        {formik.values.options.every((opt) => opt.trim() !== "") && (
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-900">
              Correct Answer
            </Label>
            <RadioGroup
              value={formik.values.correctAnswer}
              onValueChange={(value) =>
                formik.setFieldValue("correctAnswer", value)
              }
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              disabled={isProcessing}
            >
              {formik.values.options.map(
                (option, index) =>
                  option.trim() !== "" && (
                    <Label
                      key={index}
                      htmlFor={`correct-${index}`}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`correct-${index}`}
                        className="text-blue-600 focus:ring-blue-500/20"
                      />
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </Label>
                  ),
              )}
            </RadioGroup>
            {formik.touched.correctAnswer && formik.errors.correctAnswer && (
              <p className="text-sm text-red-500">
                {formik.errors.correctAnswer}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse">
          <Button
            type="submit"
            className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
            disabled={isProcessing || formik.isSubmitting}
          >
            {editQuestion ? "Update Question" : "Add Question"}
          </Button>
          {editQuestion && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isProcessing}
              className="rounded-lg border-gray-200 px-8 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
