import { AlertDialogComponent } from "@/components/AlertDialogComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/types/review";
import { format } from "date-fns";
import { Star, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Rating {
  label: string;
  value: number;
}

interface RatingStarsProps {
  rating: number;
}

interface ReviewCardProps {
  review: Review;
  onDelete: (id: number) => void;
  userId: number | undefined;
}
const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const decimalPart = rating - Math.floor(rating);
        const fillPercentage =
          rating >= starValue
            ? 100
            : rating > index && rating < starValue
              ? decimalPart * 100
              : 0;

        return (
          <div key={index} className="relative inline-block">
            <Star size={16} className="fill-gray-200 text-gray-200" />
            {fillPercentage > 0 && (
              <Star
                size={16}
                className="absolute left-0 top-0 fill-blue-500 text-blue-500"
                style={{
                  clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
const formatRupiah = (number: number) => {
  if (number >= 1000000) {
    const juta = number / 1000000;
    return `± Rp${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1)}jt`;
  } else if (number >= 1000) {
    const ribu = number / 1000;
    return `± Rp${ribu % 1 === 0 ? ribu.toFixed(0) : ribu.toFixed(1)}rb`;
  } else {
    return `± Rp${number.toLocaleString("id-ID")}`;
  }
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  userId,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ratings: Rating[] = [
    { label: "Work Culture", value: review.workCultureRating },
    { label: "Work-Life Balance", value: review.workLifeBalanceRating },
    { label: "Facilities", value: review.facilitiesRating },
    { label: "Career Growth", value: review.careerGrowthRating },
  ];

  const handleDelete = () => {
    onDelete(review.id);
    setIsDialogOpen(false);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-900">
              {review.position}
            </h3>
            <Badge variant="secondary" className="mt-1">
              {formatRupiah(review.salaryEstimate)}
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {Number(review.overallRating).toFixed(1)}
              </span>
              <RatingStars rating={Number(review.overallRating)} />
            </div>
            <span className="text-sm text-gray-500">
              {format(new Date(review.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ratings.map((rating) => (
            <div
              key={rating.label}
              className="flex items-center justify-between gap-2 sm:flex-col sm:items-start"
            >
              <span className="text-sm text-gray-600">{rating.label}</span>
              <RatingStars rating={rating.value} />
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <p className="leading-relaxed text-gray-700">{review.comment}</p>
        {Number(userId) === review.userId && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
        <AlertDialogComponent
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Delete"
          description="Are you sure you want to delete this review? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
