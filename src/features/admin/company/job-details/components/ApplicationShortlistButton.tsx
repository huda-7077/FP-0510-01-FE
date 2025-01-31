import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { FC } from "react";

interface ApplicationShortlistButtonProps {
  jobApplicationId?: number;
  className?: string;
}

const ApplicationShortlistButton: FC<ApplicationShortlistButtonProps> = ({
  className,
  jobApplicationId,
}) => {
  return (
    <Button
      variant="default"
      className={`h-8 flex-1 text-xs sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5 ${className}`}
      // onClick={ Update Job Application Status to PENDING}
    >
      <UserPlus className="h-4 w-4" />
      <span className="font-medium">Shortlist</span>
    </Button>
  );
};

export default ApplicationShortlistButton;
