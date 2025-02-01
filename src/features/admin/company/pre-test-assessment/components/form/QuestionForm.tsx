"use client";

import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionFormProps {
  onAddQuestion: (
    question: {
      question: string;
      options: string[];
      correctAnswer: string;
    },
    editingId?: number,
  ) => void;
  editQuestion?: Question | null;
  onCancelEdit?: () => void;
  isProcessing: boolean;
}

export function QuestionForm({
  onAddQuestion,
  editQuestion,
  onCancelEdit,
  isProcessing,
}: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const resetForm = useCallback(() => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    if (onCancelEdit) onCancelEdit();
  }, [onCancelEdit]);

  const handleOptionChange = useCallback((index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const nonEmptyOptions = options.filter((option) => option.trim() !== "");
    if (nonEmptyOptions.length < 2) {
      toast.error("Please provide at least 2 options");
      return;
    }

    if (!correctAnswer) {
      toast.error("Please select a correct answer");
      return;
    }

    const uniqueOptions = new Set(nonEmptyOptions);
    if (uniqueOptions.size !== nonEmptyOptions.length) {
      toast.error("Options must be unique");
      return;
    }

    onAddQuestion(
      {
        question: question.trim(),
        options: nonEmptyOptions,
        correctAnswer,
      },
      editQuestion?.id,
    );

    resetForm();
    toast.success(
      editQuestion
        ? "Question updated successfully"
        : "Question added successfully",
    );
  }, [
    question,
    options,
    correctAnswer,
    onAddQuestion,
    editQuestion,
    resetForm,
  ]);

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion.question);
      setOptions(editQuestion.options);
      setCorrectAnswer(editQuestion.correctAnswer);
    } else {
      resetForm();
    }
  }, [editQuestion, resetForm]);

  const areAllOptionsFilled = options.every((option) => option.trim() !== "");

  return (
    <div className="rounded-lg">
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
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="min-h-[120px] resize-y rounded-lg border-gray-200 text-base placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-900">
            Answer Options
          </Label>
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 font-semibold text-gray-700">
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  disabled={isProcessing}
                  className="rounded-lg border-gray-200 text-base placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Correct Answer Section */}
        <div className="space-y-4">
          {options.length > 1 && (
            <Label className="text-base font-semibold text-gray-900">
              Correct Answer
            </Label>
          )}
          <RadioGroup
            value={correctAnswer}
            onValueChange={setCorrectAnswer}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            disabled={!areAllOptionsFilled || isProcessing}
          >
            {options.map(
              (option, index) =>
                option.trim() !== "" && (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`correct-${index}`}
                      className="text-blue-600 focus:ring-blue-500/20"
                    />
                    <Label
                      htmlFor={`correct-${index}`}
                      className="cursor-pointer font-medium text-gray-700"
                    >
                      Option {String.fromCharCode(65 + index)}
                    </Label>
                  </div>
                ),
            )}
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse">
          <Button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
            disabled={!areAllOptionsFilled || isProcessing}
          >
            {editQuestion ? "Update Question" : "Add Question"}
          </Button>
          {editQuestion && (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isProcessing}
              className="rounded-lg border-gray-200 px-8 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
