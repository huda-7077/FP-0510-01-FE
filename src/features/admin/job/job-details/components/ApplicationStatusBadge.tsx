import { FC } from "react";
import { getApplicationStatusColor, getApplicationStatusIcon } from "../consts";

interface ApplicationStatusBadgeProps {
  currentStatus: string;
  className?: string;
}

const ApplicationStatusBadge: FC<ApplicationStatusBadgeProps> = ({
  currentStatus,
  className,
}) => {
  return (
    <span
      className={
        getApplicationStatusColor(currentStatus) +
        ` flex items-center justify-center gap-2 text-wrap rounded-md border text-xs font-bold ${className}`
      }
    >
      {getApplicationStatusIcon(currentStatus)}
      {currentStatus.replace("_", " ")}
    </span>
  );
};

export default ApplicationStatusBadge;
