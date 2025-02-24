import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

interface PopularJobCategoriesCardProps {
  data: { category: string; applicants: number }[];
  onTimeRangeChange: (timeRange: string) => void;
}

const PopularJobCategoriesCard: FC<PopularJobCategoriesCardProps> = ({
  data,
  onTimeRangeChange,
}) => {
  return (
    <Card className="group flex h-full flex-col rounded-2xl border-2 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
      <CardHeader className="space-y-2">
        <div className="flex items-baseline justify-between">
          <CardTitle className="text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
            Popular Job Categories
          </CardTitle>
          <Select onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[180px] border-gray-200 bg-white shadow-sm hover:border-blue-200">
              <SelectValue placeholder="Last 5 years" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                <SelectItem value="Last 12 months">Last 12 months</SelectItem>
                <SelectItem value="Last 3 years">Last 3 years</SelectItem>
                <SelectItem value="Last 5 years">Last 5 years</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-sm text-gray-500"></CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        {data.length <= 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-6">
            <p className="text-center text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((item, idx) => (
              <div
                key={item.category}
                className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    {idx + 1}
                  </span>
                  <p className="font-medium text-gray-700">{item.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-blue-600">
                    {item.applicants.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">applicants</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto border-t border-gray-100 pt-4">
        <p className="text-xs italic text-gray-500">
          *Data shows top 10 positions with the highest amount of applicants
        </p>
      </CardFooter>
    </Card>
  );
};

export default PopularJobCategoriesCard;
