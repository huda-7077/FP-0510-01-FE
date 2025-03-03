import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, CheckCircle, Wallet } from "lucide-react";
import { format } from "date-fns";
import { JobApplication } from "@/types/jobApplication";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecentJobsProps {
  applications: JobApplication[];
  isLoading: boolean;
  error: Error | null;
}

const formatSalary = (amount: number | null | undefined): string | null => {
  if (!amount) return null;
  return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const RecentJobs = ({
  applications = [],
  isLoading = false,
  error = null,
}: RecentJobsProps) => {
  const router = useRouter();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-500";
      case "PENDING":
        return "text-yellow-500";
      case "IN_REVIEW":
        return "text-blue-500";
      case "INTERVIEW_SCHEDULED":
        return "text-purple-500";
      case "REJECTED":
        return "text-red-500";
      case "CANCELLED":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy h:mm a");
  };

  const CompanyLogo = ({
    company,
  }: {
    company: { name: string; logo: string };
  }) => {
    if (company.logo) {
      return (
        <div className="h-12 w-12 overflow-hidden rounded">
          <img
            src={company.logo}
            alt={company.name}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-400">
        <span className="text-lg font-bold text-white">
          {company.name.charAt(0)}
        </span>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="py-8 text-center">Loading recent applications...</div>
    );
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        Error loading applications
      </div>
    );
  if (applications.length === 0)
    return <div className="py-8 text-center">No recent applications found</div>;

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px]">Job</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="flex items-start gap-3 py-4 text-xs">
                  <CompanyLogo company={application.job.company} />
                  <div>
                    <h3 className="text-base font-medium">
                      {application.job.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        {application.job.companyLocation?.regency?.regency ||
                          "N/A"}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Wallet size={16} className="mr-1" />
                        {formatSalary(application.job.salary) ||
                          "Not specified"}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="border-none bg-blue-100 text-blue-700"
                      >
                        {application.job.category}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(String(application.createdAt))}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CheckCircle
                      size={16}
                      className={`mr-2 ${getStatusColor(application.status)}`}
                    />
                    <span className={getStatusColor(application.status)}>
                      {application.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {application.job.requiresAssessment &&
                  application.status === "IN_REVIEW" ? (
                    <Link href={`/dashboard/user/jobs/${application.id}`}>
                      <Button
                        variant="ghost"
                        className="text-orange-400 hover:bg-orange-100 hover:text-orange-400"
                      >
                        Start Assessment
                      </Button>
                    </Link>
                  ) : (
                    <>-</>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/user/jobs/${application.id}`}>
                    <Button
                      variant="outline"
                      className="border-none text-blue-500 shadow-none hover:bg-blue-50 hover:text-blue-700"
                    >
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="space-y-4 md:hidden">
        {applications.map((application) => (
          <Card key={application.id} className="space-y-4 p-4">
            <div className="mb-3 flex items-start gap-3">
              <CompanyLogo company={application.job.company} />
              <div>
                <h3 className="text-base font-medium">
                  {application.job.title}
                </h3>
                <Badge
                  variant="outline"
                  className="mt-1 border-none bg-blue-100 text-blue-700"
                >
                  {application.job.category}
                </Badge>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-gray-500">
                <MapPin size={16} className="mr-1" />
                {application.job.companyLocation?.regency?.regency || "Remote"}
              </div>
              <div className="flex items-center text-gray-500">
                <Wallet size={16} className="mr-1" />
                {formatSalary(application.job.salary) || "Not specified"}
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {formatDate(String(application.createdAt))}
              </div>
              <div className="flex items-center">
                <CheckCircle
                  size={16}
                  className={`mr-2 ${getStatusColor(application.status)}`}
                />
                <span className={getStatusColor(application.status)}>
                  {application.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {application.job.requiresAssessment &&
                application.status === "IN_REVIEW" && (
                  <Button
                    variant="ghost"
                    className="text-orange-400 hover:bg-orange-100 hover:text-orange-400"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/jobs/pre-assessment");
                    }}
                  >
                    Start Assessment
                  </Button>
                )}

              <Button
                variant="outline"
                className="w-full border-none text-blue-500 shadow-none hover:bg-blue-50 hover:text-blue-700"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
