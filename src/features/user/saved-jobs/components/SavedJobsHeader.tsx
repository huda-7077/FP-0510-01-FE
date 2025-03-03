"use client";

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
import { JobCategory } from "@/features/admin/job/create-job/consts";

interface SavedJobsHeaderProps {
  totalSavedJobs: number;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDateChange: (startDate: string, endDate: string) => void;
  isDisabled: boolean;
}

export const SavedJobsHeader = React.memo(
  ({
    totalSavedJobs,
    onSearch,
    onCategoryChange,
    onDateChange,
    isDisabled,
  }: SavedJobsHeaderProps) => {
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [category, setCategory] = useQueryState("category", {
      defaultValue: "",
    });
    const [startDate, setStartDate] = useQueryState("startDate", {
      defaultValue: "",
    });
    const [endDate, setEndDate] = useQueryState("endDate", {
      defaultValue: "",
    });
    const [dateError, setDateError] = useState<string | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearch(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStartDate = e.target.value;
      setStartDate(newStartDate);

      if (endDate && newStartDate > endDate) {
        setDateError(
          "Start date cannot be later than end date. Adjusting end date.",
        );
        setEndDate(newStartDate);
      } else {
        setDateError(null);
      }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEndDate = e.target.value;
      setEndDate(newEndDate);

      if (startDate && startDate > newEndDate) {
        setDateError(
          "End date cannot be earlier than start date. Adjusting start date.",
        );
        setStartDate(newEndDate);
      } else {
        setDateError(null);
      }
    };

    const applyDateFilter = () => {
      onDateChange(startDate, endDate);
      setShowDateFilter(false);
      setDateError(null);
    };

    const clearDateFilter = () => {
      setStartDate("");
      setEndDate("");
      onDateChange("", "");
      setShowDateFilter(false);
      setDateError(null);
    };

    const toggleDatePicker = () => {
      setShowDateFilter(!showDateFilter);
      setDateError(null);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            Saved Jobs{" "}
            <span className="text-sm font-normal text-gray-500">
              <Badge
                variant="secondary"
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 sm:text-sm"
              >
                {totalSavedJobs}
              </Badge>
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Input
              placeholder="Search saved jobs..."
              value={search}
              onChange={handleSearchChange}
              className="pl-9"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

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
              {JobCategory.map((category, idx) => (
                <SelectItem key={idx} value={category}>
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
                    {dateError && (
                      <div className="flex items-center text-xs text-red-500">
                        {dateError}
                      </div>
                    )}
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

SavedJobsHeader.displayName = "SavedJobsHeader";
