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
}

export function QuestionForm({
  onAddQuestion,
  editQuestion,
  onCancelEdit,
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
    <div className="space-y-6">
      <div>
        <Label htmlFor="question" className="text-lg font-semibold">
          Question
        </Label>
        <Textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question text"
          className="mt-1"
          rows={3}
        />
      </div>
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Answer Options</Label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Label htmlFor={`option-${index}`} className="w-6 font-semibold">
              {String.fromCharCode(65 + index)}
            </Label>
            <Input
              id={`option-${index}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
            />
          </div>
        ))}
      </div>
      <div>
        <Label className="text-lg font-semibold">Correct Answer</Label>
        <RadioGroup
          value={correctAnswer}
          onValueChange={setCorrectAnswer}
          className="mt-2 flex space-x-4"
          disabled={!areAllOptionsFilled}
        >
          {options.map(
            (option, index) =>
              option.trim() !== "" && (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`correct-${index}`} />
                  <Label htmlFor={`correct-${index}`} className="font-semibold">
                    {String.fromCharCode(65 + index)}
                  </Label>
                </div>
              ),
          )}
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full"
          disabled={!areAllOptionsFilled}
        >
          {editQuestion ? "Update Question" : "Add Question"}
        </Button>
        {editQuestion && (
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className="w-full"
          >
            Cancel Edit
          </Button>
        )}
      </div>
    </div>
  );
}
