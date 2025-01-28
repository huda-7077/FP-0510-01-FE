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
    <div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="question"
            className="block text-sm font-semibold text-gray-700"
          >
            Question
          </Label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question text"
            className="min-h-[100px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            rows={3}
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-4">
          <Label className="block text-sm font-semibold text-gray-700">
            Answer Options
          </Label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Label
                htmlFor={`option-${index}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-sm font-semibold text-gray-700"
              >
                {String.fromCharCode(65 + index)}
              </Label>
              <Input
                id={`option-${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                disabled={isProcessing}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {options.length > 1 && (
            <Label className="block text-sm font-semibold text-gray-700">
              Correct Answer
            </Label>
          )}
          <RadioGroup
            value={correctAnswer}
            onValueChange={setCorrectAnswer}
            className="flex flex-wrap gap-4"
            disabled={!areAllOptionsFilled || isProcessing}
          >
            {options.map(
              (option, index) =>
                option.trim() !== "" && (
                  <div
                    key={index}
                    className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`correct-${index}`}
                      className="text-blue-600 focus:ring-blue-500/20"
                    />
                    <Label
                      htmlFor={`correct-${index}`}
                      className="text-sm font-semibold text-gray-700"
                    >
                      {String.fromCharCode(65 + index)}
                    </Label>
                  </div>
                ),
            )}
          </RadioGroup>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
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
              className="w-full border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
