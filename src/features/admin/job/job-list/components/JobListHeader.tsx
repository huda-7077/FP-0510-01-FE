import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Search, Sliders, TriangleAlert, X } from "lucide-react";
import { useRef, useState } from "react";

interface JobListHeaderProps {
  totalJobs: number;
  jobCategories: string[];
  isDisabled: boolean;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  onStartEndDateChange: (startDate: string, endDate: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const JobListHeader = ({
  isDisabled,
  totalJobs,
  jobCategories,
  onCategoryChange,
  onSortChange,
  onSortOrderChange,
  onStartEndDateChange,
  onSearch,
}: JobListHeaderProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dateRangeChanged, setDateRangeChanged] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const hasFiltersApplied =
    dateRangeChanged ||
    selectedSort !== "createdAt" ||
    selectedCategory !== "all" ||
    sortOrder !== "desc";

  const handleStartEndDateChange = () => {
    onStartEndDateChange(startDate, endDate);
    setDateRangeChanged(true);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleResetAll = () => {
    setSelectedSort("createdAt");
    onSortChange("createdAt");
    setSelectedCategory("all");
    onCategoryChange("all");
    setSortOrder("desc");
    onSortOrderChange("desc");
    setStartDate("");
    setEndDate("");
    onStartEndDateChange("", "");
    setDateRangeChanged(false);
  };

  const handleSearchReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      onSearch("");
    }
  };

  return (
    <div className="space-y-4 border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900 sm:text-2xl">
            My Jobs
          </h1>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 sm:text-sm"
          >
            {totalJobs}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            disabled={isDisabled}
            placeholder="Search job title..."
            onChange={(e) => onSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 bg-white pl-10 pr-8 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchInputRef.current?.value && (
            <button
              onClick={handleSearchReset}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFiltersApplied && (
            <Button
              variant="destructive"
              size="sm"
              className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
              onClick={handleResetAll}
            >
              <X className="h-4 w-4" />
              Reset Filter
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="default"
                className="w-full bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white sm:px-4 sm:py-2 sm:text-sm"
              >
                <Sliders className="hidden h-4 w-4 md:block" />
                <span className="block md:hidden">Advanced Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Advanced Filter</SheetTitle>
              </SheetHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Select Category
                  </h3>
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                    disabled={isDisabled}
                  >
                    <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem
                        value="all"
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        All Categories
                      </SelectItem>
                      {jobCategories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Date Range
                </h3>
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Created At
                  </h3>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div className="w-full">
                      <Label
                        htmlFor="start-date"
                        className="text-xs font-semibold"
                      >
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={
                          new Date(startDate) > new Date(endDate)
                            ? ""
                            : startDate
                        }
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Label
                        htmlFor="end-date"
                        className="text-xs font-semibold"
                      >
                        End Date
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  {new Date(startDate) > new Date(endDate) && (
                    <p className="text-xs text-red-600">
                      Start Date cannot be after End Date
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  onClick={handleStartEndDateChange}
                  disabled={
                    !startDate ||
                    !endDate ||
                    new Date(startDate) > new Date(endDate)
                  }
                  className="bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white sm:px-4 sm:py-2 sm:text-sm"
                >
                  Set Date Range
                </Button>
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Sort By
                  </h3>
                  <div className="flex w-full items-center gap-2">
                    <Button
                      variant={
                        selectedSort === "applicationDeadline"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className={`w-full px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        selectedSort === "applicationDeadline"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => handleSortChange("applicationDeadline")}
                      disabled={isDisabled}
                    >
                      Application Deadline
                    </Button>
                    <Button
                      variant={
                        selectedSort === "createdAt" ? "default" : "outline"
                      }
                      size="sm"
                      className={`w-full px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        selectedSort === "createdAt"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => handleSortChange("createdAt")}
                      disabled={isDisabled}
                    >
                      Created Date
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Sort Order
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant={sortOrder === "asc" ? "default" : "outline"}
                      size="sm"
                      className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        sortOrder === "asc"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => {
                        setSortOrder("asc");
                        onSortOrderChange("asc");
                      }}
                    >
                      A - Z
                    </Button>
                    <Button
                      variant={sortOrder === "desc" ? "default" : "outline"}
                      size="sm"
                      className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        sortOrder === "desc"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => {
                        setSortOrder("desc");
                        onSortOrderChange("desc");
                      }}
                    >
                      Z - A
                    </Button>
                  </div>
                </div>
              </div>
              <SheetFooter>
                {hasFiltersApplied && (
                  <SheetClose asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                      onClick={handleResetAll}
                    >
                      <X className="h-4 w-4" />
                      Reset Filter
                    </Button>
                  </SheetClose>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
