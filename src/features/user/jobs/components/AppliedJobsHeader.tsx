import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, Calendar } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AppliedJobsHeaderProps {
  totalApplications: number;
  categories: string[];
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  onCategoryChange: (category: string) => void;
  onDateChange: (startDate: string, endDate: string) => void;
  isDisabled: boolean;
}

export const AppliedJobsHeader = React.memo(
  ({
    totalApplications,
    categories,
    onSearch,
    onStatusChange,
    onCategoryChange,
    onDateChange,
    isDisabled,
  }: AppliedJobsHeaderProps) => {
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [status, setStatus] = useQueryState("status", { defaultValue: "" });
    const [category, setCategory] = useQueryState("category", {
      defaultValue: "",
    });
    const [startDate, setStartDate] = useQueryState("startDate", {
      defaultValue: "",
    });
    const [endDate, setEndDate] = useQueryState("endDate", {
      defaultValue: "",
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearch(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(e.target.value);
    };

    const applyDateFilter = () => {
      onDateChange(startDate, endDate);
      setShowDateFilter(false);
    };

    const clearDateFilter = () => {
      setStartDate("");
      setEndDate("");
      onDateChange("", "");
      setShowDateFilter(false);
    };

    const toggleDatePicker = () => {
      setShowDateFilter(!showDateFilter);
    };

    const statusOptions = [
      { value: "all", label: "All Statuses" },
      { value: "PENDING", label: "Pending" },
      { value: "IN_REVIEW", label: "In Review" },
      { value: "INTERVIEW_SCHEDULED", label: "Interview Scheduled" },
      { value: "ACCEPTED", label: "Accepted" },
      { value: "REJECTED", label: "Rejected" },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-2xl font-bold gap-2">
            My Applications{" "}
            <span className="text-sm font-normal text-gray-500">
              <Badge
                variant="secondary"
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 sm:text-sm"
              >
                {totalApplications}
              </Badge>
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Input
              placeholder="Search applications..."
              value={search}
              onChange={handleSearchChange}
              className="pl-9"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <Select
            onValueChange={onStatusChange}
            disabled={isDisabled}
            value={status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={onCategoryChange}
            disabled={isDisabled}
            value={category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Button
              variant="outline"
              onClick={toggleDatePicker}
              className="w-full justify-start"
              disabled={isDisabled}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Filter by date
            </Button>

            <div className="relative">
              {showDateFilter && (
                <div className="absolute right-0 top-12 z-10 rounded-md border bg-white p-4 shadow-lg">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label
                        htmlFor="start-date"
                        className="text-xs font-medium"
                      >
                        Start Date
                      </label>
                      <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="end-date" className="text-xs font-medium">
                        End Date
                      </label>
                      <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearDateFilter}
                      >
                        Clear
                      </Button>
                      <Button size="sm" onClick={applyDateFilter}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
