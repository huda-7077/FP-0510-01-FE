import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ValidationStatusProps {
  questionCount: number;
}

export function ValidationStatus({ questionCount }: ValidationStatusProps) {
  const isValid = questionCount >= 25;
  const progress = Math.min((questionCount / 25) * 100, 100);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-2 flex items-center">
          {isValid ? (
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
          )}
          <h3 className="text-lg font-semibold">Validation Status</h3>
        </div>
        <p className="mb-2">
          {isValid
            ? "The test meets the minimum requirement of 25 questions."
            : `The test requires at least 25 questions. Current count: ${questionCount}`}
        </p>
        <Progress value={progress} className="w-full" />
        <p className="mt-1 text-right text-sm">{`${questionCount}/25 questions`}</p>
      </CardContent>
    </Card>
  );
}
