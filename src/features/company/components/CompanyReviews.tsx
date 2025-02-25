import React from 'react';
import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Rating {
  label: string;
  value: number;
}

interface Review {
  id: number;
  jobTitle: string;
  salaryRange: string;
  workCultureRating: number;
  workLifeBalanceRating: number;
  facilitiesRating: number;
  careerGrowthRating: number;
  overallRating: number;
  comment: string;
  createdAt: Date;
}

interface RatingStarsProps {
  rating: number;
}

interface ReviewCardProps {
  review: Review;
}

const CompanyReviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      salaryRange: "$100k-$150k",
      workCultureRating: 4,
      workLifeBalanceRating: 5,
      facilitiesRating: 4,
      careerGrowthRating: 3,
      overallRating: 4,
      comment: "Great work environment with flexible hours. Good benefits and modern office facilities. Career growth could be better structured.",
      createdAt: new Date("2024-02-20")
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      salaryRange: "$120k-$180k",
      workCultureRating: 5,
      workLifeBalanceRating: 4,
      facilitiesRating: 5,
      careerGrowthRating: 4,
      overallRating: 5,
      comment: "Excellent company culture and strong emphasis on personal growth. Leadership is very supportive and transparent.",
      createdAt: new Date("2024-02-22")
    }
  ];

  const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating ? 'fill-blue-500 text-blue-500' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const ratings: Rating[] = [
      { label: 'Work Culture', value: review.workCultureRating },
      { label: 'Work-Life Balance', value: review.workLifeBalanceRating },
      { label: 'Facilities', value: review.facilitiesRating },
      { label: 'Career Growth', value: review.careerGrowthRating }
    ];

    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-blue-900">{review.jobTitle}</h3>
              <Badge variant="secondary" className="mt-1">
                {review.salaryRange}
              </Badge>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{review.overallRating}.0</span>
                <RatingStars rating={review.overallRating} />
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {ratings.map((rating) => (
              <div key={rating.label} className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
                <span className="text-sm text-gray-600">{rating.label}</span>
                <RatingStars rating={rating.value} />
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl">Company Reviews</h2>
          <p className="text-gray-500 mt-1">Anonymous reviews from verified employees</p>
        </div>
        <div className="w-full md:w-48">
          <Select defaultValue="recent">
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

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Card className="p-8">
            <p className="text-gray-500 text-center">No reviews available yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyReviews;