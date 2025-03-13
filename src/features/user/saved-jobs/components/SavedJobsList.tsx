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
import { MapPin, Bookmark, Wallet, Calendar, BookmarkX } from "lucide-react";
import { format, isPast } from "date-fns";
import Link from "next/link";
import { SavedJob } from "@/types/saved-job";

interface SavedJobsListProps {
  savedJobs: SavedJob[];
  isLoading: boolean;
  error: Error | null;
  onUnbookmark: (jobId: number) => void;
}

const SavedJobsList = ({
  savedJobs = [],
  isLoading = false,
  error = null,
  onUnbookmark,
}: SavedJobsListProps) => {
  const formatSalary = (amount: number | null | undefined): string | null => {
    if (!amount) return null;
    return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const isJobExpired = (deadline: string) => {
    return isPast(new Date(deadline));
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
            src={company.logo || "/anonymous.svg"}
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
              <TableHead>Saved On</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="py-8 text-center">
                    Loading your saved jobs...
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="py-8 text-center text-red-500">
                    Error loading saved jobs
                  </div>
                </TableCell>
              </TableRow>
            ) : savedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="py-8 text-center">No saved jobs found</div>
                </TableCell>
              </TableRow>
            ) : (
              savedJobs.map((savedJob) => (
                <TableRow key={savedJob.id}>
                  <TableCell className="flex items-start gap-3 py-4">
                    <div className="min-w-[40px] flex-shrink-0">
                      <CompanyLogo company={savedJob.job.company} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-medium">
                        {savedJob.job.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {savedJob.job.company.name}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin size={14} className="mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {savedJob.job.companyLocation?.regency?.regency ||
                              "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className="border-none bg-blue-100 text-blue-700"
                        >
                          {savedJob.job.category}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(savedJob.createdAt.toString())}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-700">
                      <Wallet size={16} className="mr-1" />
                      {formatSalary(savedJob.job.salary) || "Not specified"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {isJobExpired(savedJob.job.applicationDeadline) ? (
                      <span className="font-medium text-red-500">
                        Application Closed
                      </span>
                    ) : (
                      formatDate(savedJob.job.applicationDeadline.toString())
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        onClick={() => onUnbookmark(savedJob.job.id)}
                      >
                        <BookmarkX className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          isJobExpired(savedJob.job.applicationDeadline)
                            ? "cursor-not-allowed text-gray-400"
                            : "text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                        }
                        disabled={isJobExpired(
                          savedJob.job.applicationDeadline,
                        )}
                        onClick={() =>
                          !isJobExpired(savedJob.job.applicationDeadline) &&
                          (window.location.href = `/jobs/${savedJob.job.slug}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {isLoading ? (
          <div className="py-8 text-center">Loading your saved jobs...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            Error loading saved jobs
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="py-8 text-center">No saved jobs found</div>
        ) : (
          savedJobs.map((savedJob) => (
            <div
              key={savedJob.id}
              className="rounded-md border-[1px] bg-card p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold">
                      {savedJob.job.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {savedJob.job.company.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onUnbookmark(savedJob.job.id)}
                  >
                    <BookmarkX className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-none bg-blue-100 text-blue-700"
                  >
                    {savedJob.job.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    {savedJob.job.companyLocation?.regency?.regency || "N/A"}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Wallet className="mr-1 h-4 w-4 text-gray-500" />
                    <span>
                      {formatSalary(savedJob.job.salary) || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {isJobExpired(savedJob.job.applicationDeadline) ? (
                      <>
                        <Calendar className="mr-1 h-4 w-4 text-red-500" />
                        <span className="font-medium text-red-500">
                          Application Closed
                        </span>
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                        <span>
                          {formatDate(
                            savedJob.job.applicationDeadline.toString(),
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className={
                    isJobExpired(savedJob.job.applicationDeadline)
                      ? "w-full cursor-not-allowed text-gray-400"
                      : "w-full text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                  }
                  disabled={isJobExpired(savedJob.job.applicationDeadline)}
                  onClick={() =>
                    !isJobExpired(savedJob.job.applicationDeadline) &&
                    (window.location.href = `/jobs/${savedJob.job.slug}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(SavedJobsList);
