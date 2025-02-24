"use client";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Timer } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface SkillAssessmentQuestionHeaderProps {
  currentIndex: number;
  timeLeft: number;
  totalQuestions: number;
  progress: number;
}

const SkillAssessmentQuestionHeader: FC<SkillAssessmentQuestionHeaderProps> = ({
  currentIndex,
  totalQuestions,
  timeLeft,
  progress,
}) => {
  const [isTimeWarning, setIsTimeWarning] = useState(false);

  useEffect(() => {
    setIsTimeWarning(timeLeft <= 300);
  }, [timeLeft]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 h-16 w-full ${isTimeWarning ? "bg-red-600" : "bg-blue-600"} shadow-md transition-colors duration-300`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-white/20 p-2">
            <CheckCircle
              className={`text-white ${isTimeWarning ? "animate-pulse" : ""}`}
              size={24}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white md:text-xl">
              Question {currentIndex + 1}{" "}
              <span className="text-sm text-white/70">of {totalQuestions}</span>
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Timer
            className={`text-white ${isTimeWarning ? "animate-bounce" : ""}`}
            size={24}
          />
          <p className="text-lg font-bold text-white transition-colors duration-300 md:text-xl">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </p>
        </div>
      </div>
      <Progress
        value={progress}
        className={`blue rounded-none ${isTimeWarning ? "bg-red-500 [&>div]:bg-red-700" : "bg-blue-500 [&>div]:bg-blue-700"} shadow-md transition-colors duration-300`}
      />
    </div>
  );
};

export default SkillAssessmentQuestionHeader;
