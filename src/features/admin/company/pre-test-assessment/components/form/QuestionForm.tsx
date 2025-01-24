"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuestionFormProps {
  onAddQuestion: (question: {
    question: string;
    options: string[];
    correctAnswer: string;
  }) => void;
}

export function QuestionForm({ onAddQuestion }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      question &&
      options.every((option) => option.trim() !== "") &&
      correctAnswer
    ) {
      onAddQuestion({
        question: question,
        options,
        correctAnswer,
      });
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="question" className="text-lg font-semibold">
          Question
        </Label>
        <Textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question text"
          required
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
              required
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
          disabled={options.some((option) => option === "")}
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`correct-${index}`} />
              <Label htmlFor={`correct-${index}`} className="font-semibold">
                {String.fromCharCode(65 + index)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full">
        Add Question
      </Button>
    </form>
  );
}
