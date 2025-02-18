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
    <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isValid ? (
              <CheckCircle2 className="h-8 w-8 animate-pulse text-blue-600" />
            ) : (
              <AlertCircle className="h-8 w-8 animate-pulse text-yellow-500" />
            )}
            <h3 className="text-2xl font-semibold text-gray-700">
              Validation Status
            </h3>
          </div>
          <span className="text-sm font-medium text-gray-600">
            <span className="text-xl font-semibold">{questionCount}</span> /25
            questions
          </span>
        </div>

        <p className="text-sm text-gray-600">
          {isValid
            ? "The test meets the minimum requirement of 25 questions. You are good to go!"
            : `The test requires at least 25 questions before it can be published.`}
        </p>

        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <Progress
              value={progress}
              className={`h-full transition-all ${
                isValid ? "bg-gray-400" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ValidationStatus;
