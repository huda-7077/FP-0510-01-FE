import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Hourglass } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addDays, addMonths, endOfDay, format, startOfDay } from "date-fns";

interface TimeRangeFilterProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  startDate: string; // Add startDate as a prop
  setStartDate: (value: string) => void;
  endDate: string; // Add endDate as a prop
  setEndDate: (value: string) => void;
}

export const TimeRangeFilter = ({
  timeRange,
  setTimeRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: TimeRangeFilterProps) => {
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    const today = new Date();
    if (value === "week") {
      setStartDate(format(startOfDay(addDays(today, -7)), "yyyy-MM-dd"));
      setEndDate(format(endOfDay(today), "yyyy-MM-dd"));
    } else if (value === "month") {
      setStartDate(format(startOfDay(addMonths(today, -1)), "yyyy-MM-dd"));
      setEndDate(format(endOfDay(today), "yyyy-MM-dd"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <div>
      <Label className="text-base font-medium">
        <div className="flex items-center gap-2">
          <Hourglass className="h-5 text-blue-600" />
          Time Range
        </div>
      </Label>
      <RadioGroup
        value={timeRange}
        onValueChange={handleTimeRangeChange}
        className="mt-2 pl-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="week" id="week" />
          <Label htmlFor="week">Last 7 days</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="month" id="month" />
          <Label htmlFor="month">Last month</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Custom range</Label>
        </div>
      </RadioGroup>

      {/* Custom Date Range */}
      {timeRange === "custom" && (
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="startDate" className="text-base font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 text-blue-600" />
                Start Date
              </div>
            </Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-base font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 text-blue-600" />
                End Date
              </div>
            </Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};