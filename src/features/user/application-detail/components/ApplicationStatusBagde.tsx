import { Badge } from "@/components/ui/badge";

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pending", variant: "outline" as const };
      case "IN_REVIEW":
        return { label: "In Review", variant: "secondary" as const };
      case "INTERVIEW_SCHEDULED":
        return {
          label: "Interview Scheduled",
          variant: "default" as const,
          className: "bg-blue-600",
        };
      case "ACCEPTED":
        return {
          label: "Accepted",
          variant: "default" as const,
          className: "bg-green-600",
        };
      case "REJECTED":
        return { label: "Rejected", variant: "destructive" as const };
      case "CANCELLED":
        return { label: "Cancelled", variant: "outline" as const };
      default:
        return { label: status, variant: "outline" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
