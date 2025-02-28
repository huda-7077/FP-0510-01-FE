import PaginationSection from "@/components/PaginationSection";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCompanyReviews from "@/hooks/api/review/useGetCompanyReviews";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import ReviewCard from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { CreateCompanyReviewDialog } from "./CreateReviewDialog";
import { useState } from "react";
import useDeleteCompanyReview from "@/hooks/api/review/useDeleteCompanyReview";
import useGetCompanyEmployee from "@/hooks/api/employee/useGetCompanyEmployee";

interface CompanyReviewsProps {
  companyId: number;
}
const CompanyReviews = ({ companyId }: CompanyReviewsProps) => {
  const session = useSession();
  const user = session.data?.user;

  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });

  const { data: employee } = useGetCompanyEmployee(companyId, {
    enabled: !!user,
  });

  const { data: reviews } = useGetCompanyReviews(
    {
      page,
      sortOrder,
      sortBy,
      take: 10,
    },
    companyId,
  );

  const { mutateAsync: deleteCompanyReview } = useDeleteCompanyReview();

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  const handleDelete = async (id: number) => {
    await deleteCompanyReview(id);
  };

  return (
    <div className="container mx-auto mt-6 p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl">Company Reviews</h2>
          <p className="mt-1 text-gray-500">
            Anonymous reviews from verified employees
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          {user && employee && (
            <>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setOpenDialog(true)}
              >
                <Pen className="mr-2 h-4 w-4" />
                Add Review
              </Button>
            </>
          )}
          <div className="w-full md:w-48">
            <Select
              defaultValue="recent"
              onValueChange={(value) => {
                if (value === "recent") {
                  handleSortChange("createdAt");
                  handleSortOrderChange("desc");
                } else if (value === "highest") {
                  handleSortChange("overallRating");
                  handleSortOrderChange("desc");
                } else if (value === "lowest") {
                  handleSortChange("overallRating");
                  handleSortOrderChange("asc");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews && reviews.data.length > 0 ? (
          reviews.data.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              userId={user?.id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Card className="p-8">
            <p className="text-center text-gray-500">
              No reviews available yet.
            </p>
          </Card>
        )}
      </div>
      {reviews &&
        reviews.data.length > 0 &&
        reviews.meta.total > reviews.meta.take && (
          <PaginationSection
            onChangePage={onChangePage}
            page={Number(page)}
            take={reviews.meta.take || 4}
            total={reviews.meta.total}
          />
        )}
      {openDialog && (
        <CreateCompanyReviewDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          companyId={companyId}
        />
      )}
    </div>
  );
};

export default CompanyReviews;
