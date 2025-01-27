import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicantCountProps {
  count: number;
  className?: string;
}

export const ApplicantCount = ({ count, className }: ApplicantCountProps) => (
  <div
    className={`flex items-center text-xs text-gray-600 sm:text-sm lg:text-base ${className}`}
  >
    <Users size={16} className="mr-1 text-gray-500 sm:mr-1.5 lg:mr-2" />
    <span className="font-normal sm:font-medium">{count.toLocaleString()}</span>
    <span className="ml-0.5 sm:ml-1 lg:ml-1.5">Applicants</span>
  </div>
);
