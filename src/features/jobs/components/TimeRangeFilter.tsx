import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addDays, addMonths, endOfDay, format, startOfDay } from "date-fns";
import { AlertCircle, CalendarDays, Hourglass } from "lucide-react";
import { useState, useEffect } from "react";

interface TimeRangeFilterProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  onApplyFilter?: () => void;
}

export const TimeRangeFilter = ({
  timeRange,
  setTimeRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyFilter,
}: TimeRangeFilterProps) => {
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [isDateRangeInvalid, setIsDateRangeInvalid] = useState(false);

  // Initialize temp dates when parent dates change from non-custom sources
  useEffect(() => {
    if (timeRange !== "custom") {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
  }, [timeRange, startDate, endDate]);

  // Validate date range
  useEffect(() => {
    if (tempStartDate && tempEndDate) {
      setIsDateRangeInvalid(new Date(tempStartDate) > new Date(tempEndDate));
    } else {
      setIsDateRangeInvalid(false);
    }
  }, [tempStartDate, tempEndDate]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    const today = new Date();
    
    if (value === "week") {
      const newStartDate = format(startOfDay(addDays(today, -7)), "yyyy-MM-dd");
      const newEndDate = format(endOfDay(today), "yyyy-MM-dd");
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setTempStartDate(newStartDate);
      setTempEndDate(newEndDate);
    } else if (value === "month") {
      const newStartDate = format(startOfDay(addMonths(today, -1)), "yyyy-MM-dd");
      const newEndDate = format(endOfDay(today), "yyyy-MM-dd");
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setTempStartDate(newStartDate);
      setTempEndDate(newEndDate);
    } else if (value === "custom") {
      // When switching to custom, initialize with current values but don't apply yet
      setTempStartDate(startDate || "");
      setTempEndDate(endDate || "");
    }
  };

  const handleApplyCustomRange = () => {
    if (!isDateRangeInvalid && tempStartDate && tempEndDate) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
      if (onApplyFilter) {
        onApplyFilter();
      }
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
              value={tempStartDate}
              onChange={(e) => setTempStartDate(e.target.value)}
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
              value={tempEndDate}
              onChange={(e) => setTempEndDate(e.target.value)}
              className="mt-2"
            />
          </div>
          
          {isDateRangeInvalid && (
            <div className="flex items-center text-red-500 mt-2 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              Start date cannot be greater than end date
            </div>
          )}
          
          <Button 
            onClick={handleApplyCustomRange}
            disabled={isDateRangeInvalid || !tempStartDate || !tempEndDate}
            className="w-full mt-2"
          >
            Apply Custom Range
          </Button>
        </div>
      )}
    </div>
  );
};