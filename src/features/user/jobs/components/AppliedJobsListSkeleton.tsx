import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AppliedJobsListSkeleton = () => {
  return (
    <div className="w-full">
      {/* Desktop view skeleton */}
      <div className="hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px]">Job</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expected Salary</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-start gap-3 py-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div>
                    <Skeleton className="mb-2 h-5 w-40" />
                    <Skeleton className="mb-2 h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-8 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view skeleton */}
      <div className="grid gap-4 md:hidden">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="mb-4 h-5 w-3/4" />
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="mb-1 h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsListSkeleton;
