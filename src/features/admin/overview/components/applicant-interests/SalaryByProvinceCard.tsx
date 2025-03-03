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

interface SalaryByProvinceCardProps {
  data: { province: string; avgSalary: number }[];
  onTimeRangeChange: (timeRange: string) => void;
}

const SalaryByProvinceCard: FC<SalaryByProvinceCardProps> = ({
  data,
  onTimeRangeChange,
}) => {
  const formatRupiah = (amount: number): string => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "Rp0";
    }

    return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const formattedData = data.map((item) => ({
    ...item,
    formattedSalary: formatRupiah(item.avgSalary),
  }));

  return (
    <Card className="group flex h-full flex-col rounded-2xl border-2 bg-white shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
      <CardHeader className="space-y-2">
        <div className="flex items-baseline justify-between gap-12">
          <CardTitle className="text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
            Salary Average By Province
          </CardTitle>
          <Select onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-[180px] border-gray-200 bg-white shadow-sm hover:border-blue-200">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                <SelectItem value="Last 12 months">Last 12 months</SelectItem>
                <SelectItem value="All Time">All Time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="text-sm text-gray-500"></CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {formattedData.length <= 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-6">
            <p className="text-center text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formattedData.map((item, idx) => (
              <div
                key={item.province}
                className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    {idx + 1}
                  </span>
                  <p className="font-medium text-gray-700">{item.province}</p>
                </div>
                <p className="font-semibold text-blue-600">
                  {item.formattedSalary}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto border-t border-gray-100 pt-4">
        <p className="text-xs italic text-gray-500">
          * Data shows top 10 provinces with the highest average reported salary
          per month by user's location
        </p>
      </CardFooter>
    </Card>
  );
};

export default SalaryByProvinceCard;
