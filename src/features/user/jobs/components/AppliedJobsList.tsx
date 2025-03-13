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
import { MapPin, CheckCircle, Wallet, Calendar } from "lucide-react";
import { format } from "date-fns";
import { JobApplication } from "@/types/jobApplication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGetAssessmentSlug from "@/hooks/api/assessment/useGetAssessmentSlug";

interface AppliedJobsListProps {
  applications: JobApplication[];
  isLoading: boolean;
  error: Error | null;
}

const AppliedJobsList = ({
  applications = [],
  isLoading = false,
  error = null,
}: AppliedJobsListProps) => {
  const router = useRouter();

  const { data: assessment, isLoading: isAssessmentLoading } =
    useGetAssessmentSlug();

  const formatSalary = (amount: number | null | undefined): string | null => {
    if (!amount) return null;
    return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

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
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const CompanyLogo = ({
    company,
  }: {
    company: { name: string; logo: string | null };
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

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px]">Job</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expected Salary</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="py-8 text-center">
                    Loading your applications...
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="py-8 text-center text-red-500">
                    Error loading applications
                  </div>
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="py-8 text-center">No applications found</div>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="flex items-start gap-3 py-4">
                    <div className="min-w-[40px] flex-shrink-0">
                      <CompanyLogo company={application.job.company} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-medium">
                        {application.job.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {application.job.company.name}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin size={14} className="mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {application.job.companyLocation?.regency
                              ?.regency || "Remote"}
                          </span>
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
                    {formatDate(application.createdAt.toString())}
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
                    <div className="flex items-center text-gray-700">
                      <Wallet size={16} className="mr-1" />
                      {formatSalary(application.expectedSalary) ||
                        "Not specified"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {application.job.requiresAssessment &&
                    application.status === "IN_REVIEW" ? (
                      <Link href={`/pre-test-assessment/${assessment?.slug}`}>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {isLoading ? (
          <div className="py-8 text-center">Loading your applications...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            Error loading applications
          </div>
        ) : applications.length === 0 ? (
          <div className="py-8 text-center">No applications found</div>
        ) : (
          applications.map((application) => (
            <Link
              key={application.id}
              href={`/dashboard/user/jobs/${application.id}`}
              className="block rounded-md border-[1px] bg-card p-4 shadow-sm duration-150 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-base font-semibold">
                  {application.job.title}
                </h2>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-none bg-blue-100 text-blue-700"
                  >
                    {application.job.category}
                  </Badge>
                  <div className="flex items-center">
                    <CheckCircle
                      size={16}
                      className={`mr-2 ${getStatusColor(application.status)}`}
                    />
                    <span
                      className={`text-xs ${getStatusColor(application.status)}`}
                    >
                      {application.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <CompanyLogo company={application.job.company} />
                    <div className="space-y-1">
                      <h3 className="text-sm">
                        {application.job.company.name}
                      </h3>
                      <p className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-4" />
                        {application.job.companyLocation?.regency?.regency ||
                          "Remote"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div className="flex items-center justify-end">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(application.createdAt.toString())}
                    </div>
                    <div className="mt-1 flex items-center justify-end">
                      <Wallet size={14} className="mr-1" />
                      {formatSalary(application.expectedSalary) ||
                        "Not specified"}
                    </div>
                  </div>
                </div>
                {application.job.requiresAssessment &&
                  application.status === "IN_REVIEW" && (
                    <Button
                      variant="ghost"
                      className="text-orange-400 hover:bg-orange-100 hover:text-orange-400"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/pre-test-assessment/${assessment?.slug}`);
                      }}
                    >
                      Start Assessment
                    </Button>
                  )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(AppliedJobsList);
