"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="mx-auto container p-6">
      <div className="w-full">
        <div 
          role="navigation" 
          aria-label="Progress" 
          className="group/stepper flex sm:flex-row sm:items-center justify-between gap-2"
          data-orientation="horizontal"
        >
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isLast = index === steps.length - 1;
            
            return (
              <div 
                key={step.title} 
                className={`relative flex flex-1 flex-row sm:flex-col items-start sm:items-center ${isLast ? "" : "pb-8 sm:pb-0"}`}
                data-state={isCompleted ? "complete" : isCurrent ? "current" : "incomplete"}
                data-orientation="horizontal"
              >
                <button 
                  type="button"
                  className="group flex flex-col items-center gap-2 rounded p-1 text-center sm:flex-col z-10 bg-white"
                >
                  <span 
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      isCompleted ? "border-blue-500 bg-blue-500" : 
                      isCurrent ? "border-blue-500 bg-blue-50" : 
                      "border-gray-200 bg-white"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" strokeWidth={3} />
                    ) : (
                      <span className={`text-sm font-medium ${isCurrent ? "text-blue-500" : "text-gray-500"}`}>
                        {stepNumber}
                      </span>
                    )}
                  </span>
                  
                  <div className="space-y-0.5 px-2">
                    <p className={`text-sm font-medium ${
                      isCompleted || isCurrent ? "text-blue-500" : "text-gray-500"
                    }`}>
                      {step.title}
                    </p>
                    <p className="max-sm:hidden text-xs text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </button>
                
                {!isLast && (
                  <>
                    <span 
                      className={`absolute hidden sm:block h-0.5 inset-x-0 left-[calc(50%+0.75rem)] top-5 w-[calc(100%-1.5rem-0.5rem)] -translate-y-1/2 ${
                        isCompleted ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;