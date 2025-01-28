import { Card } from "@/components/ui/card";
import { ApplicationCard } from "./ApplicationCard";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { Separator } from "@/components/ui/separator";

interface JobApplicationsListProps {
  jobId: number;
}

export const JobApplicationsList = ({ jobId }: JobApplicationsListProps) => {
  // This would typically come from an API call
  const applications = [
    {
      id: 1,
      applicantName: "John Doe",
      email: "john@example.com",
      appliedDate: new Date().toISOString(),
      status: "pending",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      email: "jane@example.com",
      appliedDate: new Date().toISOString(),
      status: "pending",
    },
    {
      id: 3,
      applicantName: "Robert Johnson",
      email: "robert@example.com",
      appliedDate: new Date().toISOString(),
      status: "pending",
    },
    {
      id: 4,
      applicantName: "Sarah Williams",
      email: "sarah@example.com",
      appliedDate: new Date().toISOString(),
      status: "pending",
    },
  ];

  if (applications.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50">
        <DataNotFound title="No Applications Found" />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="space-y-2 md:space-y-3">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex w-full justify-between">
              <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
                Applications
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {applications.length} candidate
                {applications.length !== 1 ? "s" : ""} applied
              </p>
            </div>
            {/* Placeholder for future filters or actions */}
            <div className="flex items-center gap-2"></div>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="grid grid-cols-1 gap-2 md:gap-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="transform transition-transform duration-200 hover:-translate-y-1"
            >
              <ApplicationCard application={application} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Showing {applications.length} results
          </p>
          {/* Pagination will be added here */}
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};
