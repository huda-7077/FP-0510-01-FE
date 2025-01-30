import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: number;
  applicantName: string;
  email: string;
  appliedDate: string;
  status: string;
}

interface ApplicationCardProps {
  application: Application;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white p-4 transition-all duration-300 ease-in-out hover:border-blue-100 hover:shadow-lg sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            {application.applicantName}
          </h3>
          <p className="line-clamp-1 text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-600">
            {application.email}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            <p className="text-sm text-gray-500">
              Applied on {formatDate(application.appliedDate)}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-2 sm:flex-shrink-0 sm:gap-4">
          <Button
            variant="outline"
            className="h-9 bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
              >
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 space-y-1 p-2">
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
                Download CV
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
                View Assessment
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                Reject Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
