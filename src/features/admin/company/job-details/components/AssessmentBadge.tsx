import { Check } from "lucide-react";
import React, { FC } from "react";

interface AssessmentBadgeProps {
  userId: number;
}
const AssessmentBadge: FC<AssessmentBadgeProps> = ({ userId }) => {
  const passedStyle =
    "border-green-300 bg-green-50/90 text-green-600 sm:bg-green-50";

  const failedStyle = "border-red-300 bg-red-50/90 text-red-600 sm:bg-red-50";

  const notDoneStyle =
    "border-gray-300 bg-gray-50/90 text-gray-600 sm:bg-gray-50";

  return (
    <span
      className={
        passedStyle +
        " inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold"
      }
    >
      <Check size={12} />
      Score: {95}
    </span>
  );
};

export default AssessmentBadge;
