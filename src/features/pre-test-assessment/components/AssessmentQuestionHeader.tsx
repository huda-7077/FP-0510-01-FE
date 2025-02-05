import React, { FC, useState, useEffect, useRef } from "react";
import { Timer, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AssessmentQuestionHeaderProps {
  index: number;
  totalQuestions: number;
  remainingTime: number;
  onTimeExpired: () => void;
}

const formatTime = (seconds: number): string =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const AssessmentQuestionHeader: FC<AssessmentQuestionHeaderProps> = ({
  index,
  totalQuestions,
  remainingTime: initialRemainingTime,
  onTimeExpired,
}) => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  const [isTimeWarning, setIsTimeWarning] = useState(false);
  const hasExpired = useRef(false);

  useEffect(() => {
    if (remainingTime <= 0 && !hasExpired.current) {
      hasExpired.current = true;
      onTimeExpired();
      toast.success("Time's up! Your progress has been saved.");
      setTimeout(() => router.push("/"), 2000);
    }
  }, [remainingTime, onTimeExpired, router]);

  useEffect(() => {
    const timer = setInterval(
      () => setRemainingTime((prevTime) => Math.max(prevTime - 1, 0)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("remainingTime", remainingTime.toString());
  }, [remainingTime]);

  useEffect(() => {
    setIsTimeWarning(remainingTime <= 300);
  }, [remainingTime]);

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
              Question {index + 1}{" "}
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
            {formatTime(remainingTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestionHeader;
