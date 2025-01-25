import { ClipboardList } from "lucide-react";
import React from "react";

const NoQuestionsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
        <ClipboardList className="h-6 w-6 text-gray-400" />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-600">
        No questions found
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Add your first question to get started
      </p>
    </div>
  );
};

export default NoQuestionsFound;
