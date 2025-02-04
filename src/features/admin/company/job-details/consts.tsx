import {
  CalendarCheck,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock,
  Eye,
  X,
  XCircle,
} from "lucide-react";

export const ApplicationStatus = {
  PENDING: 0,
  IN_REVIEW: 1,
  INTERVIEW_SCHEDULED: 2,
  ACCEPTED: 3,
  REJECTED: 3,
};

export const getApplicationStatusColor = (status: string) => {
  const colors: any = {
    PENDING: "border-yellow-500 bg-yellow-50/90 text-yellow-600",
    IN_REVIEW: "border-blue-500 bg-blue-50/90 text-blue-600",
    INTERVIEW_SCHEDULED: "border-purple-500 bg-purple-50/90 text-purple-600",
    ACCEPTED: "border-green-500 bg-green-50/90 text-green-600",
    REJECTED: "border-red-500 bg-red-50/90 text-red-600",
  };
  return colors[status] || "bg-gray-500";
};

export const getApplicationStatusIcon = (status: string) => {
  const icons: any = {
    PENDING: <Clock className="h-5 w-5" />,
    IN_REVIEW: <Eye className="h-5 w-5" />,
    INTERVIEW_SCHEDULED: <CalendarCheck className="h-5 w-5" />,
    ACCEPTED: <CheckCircle2 className="h-5 w-5" />,
    REJECTED: <XCircle className="h-5 w-5" />,
  };
  return icons[status] || null;
};

export const getAssessmentStatusColor = (status: string) => {
  const colors: any = {
    Passed: "border-green-500 bg-green-50/90 text-green-600",
    Failed: "border-red-500 bg-red-50/90 text-red-600",
  };

  return colors[status] || "border-gray-500 bg-gray-50/90 text-gray-600";
};

export const getAssessmentStatusIcon = (status: string) => {
  const icons: any = {
    Passed: <Check className="h-5 w-5" />,
    Failed: <X className="h-5 w-5" />,
  };

  return icons[status] || <CircleAlert className="h-5 w-5" />;
};
