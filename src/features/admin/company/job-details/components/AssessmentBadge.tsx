import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import { Check } from "lucide-react";
import React, { FC } from "react";
import { getAssessmentStatusColor, getAssessmentStatusIcon } from "../consts";

interface AssessmentBadgeProps {
  score: number;
  assessmentStatus: string;
}
const AssessmentBadge: FC<AssessmentBadgeProps> = ({
  score,
  assessmentStatus,
}) => {
  return (
    <span
      className={
        getAssessmentStatusColor(assessmentStatus) +
        " inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold"
      }
    >
      {getAssessmentStatusIcon(assessmentStatus)}
      Score: {score}
    </span>
  );
};

export default AssessmentBadge;
