import {
  Card,
  CardContent,
  CardDescription,
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
import useFormatRupiah from "@/hooks/useFormatRupiah";
import { FC } from "react";

interface SalaryByPositionCardProps {
  data: { position: string; avgSalary: number }[];
  onTimeRangeChange: (timeRange: string) => void;
}

const SalaryByPositionCard: FC<SalaryByPositionCardProps> = ({
  data,
  onTimeRangeChange,
}) => {
  return (
    <Card className="group h-fit rounded-2xl border-2 border-gray-200 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
      <CardHeader className="flex flex-row items-baseline justify-between gap-4 pt-2">
        <div>
          <CardTitle className="group-hover:text-blue-600">
            Salary Average By Position
          </CardTitle>
          <CardDescription>Salary Average Trends by Position</CardDescription>
        </div>
        <Select onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
              <SelectItem value="Last 365 Days">Last 365 Days</SelectItem>
              <SelectItem value="All Time">All Time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length <= 0 ? (
          <div className="flex items-center justify-between">
            <p className="font-semibold">No Data Found</p>
            <p>-</p>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            {data.map((item) => (
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item.position}</p>
                <p className="font-semibold text-blue-600">
                  {useFormatRupiah(item.avgSalary)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalaryByPositionCard;
