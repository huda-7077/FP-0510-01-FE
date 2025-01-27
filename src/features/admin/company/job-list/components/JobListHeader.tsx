"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

interface JobListHeaderProps {
  totalJobs: number;
  jobCategories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const JobListHeader = ({
  totalJobs,
  jobCategories,
  onCategoryChange,
  onSortChange,
  onSearch,
}: JobListHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleResetSort = () => {
    setSelectedSort("");
    onSortChange("id");
  };

  const handleSearchReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";

      onSearch("");
    }
  };
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:pb-5 md:justify-between md:pb-6 lg:flex-row lg:items-center lg:gap-5">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
          My Jobs
        </h1>
        <Badge
          variant="secondary"
          className="rounded-full px-2 py-0.5 text-xs sm:text-sm md:text-base"
        >
          {totalJobs}
        </Badge>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex w-full">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search job title"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-md border py-1.5 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base"
          />
          {searchInputRef.current?.value ? (
            <button
              onClick={handleSearchReset}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
            >
              <X size={16} className="text-red-500" />
            </button>
          ) : (
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            />
          )}
        </div>

        <div className="flex w-full items-center gap-2">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="h-9 w-1/2 text-xs sm:h-10 sm:text-sm md:h-10 md:text-base lg:w-40">
              <SelectValue placeholder="Job Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Category</SelectItem>
              {jobCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex w-1/2 items-center gap-2">
            <Select
              onValueChange={(value) => {
                setSelectedSort(value);
                handleSortChange(value);
              }}
              value={selectedSort}
            >
              <SelectTrigger className="h-9 w-32 text-xs sm:h-10 sm:text-sm md:h-10 md:text-base lg:w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applicationDeadline">
                  Application Deadline
                </SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
              </SelectContent>
            </Select>

            {selectedSort && (
              <Button
                onClick={handleResetSort}
                variant="ghost"
                size="icon"
                className="h-8 w-8 min-w-10 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white sm:h-10 sm:w-10"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
