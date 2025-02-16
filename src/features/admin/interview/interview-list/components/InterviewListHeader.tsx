import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Sliders, X } from "lucide-react";
import { useRef, useState } from "react";

interface JobListHeaderProps {
  totalInterview: number;
  isDisabled: boolean;
  onSortOrderChange: (sortOrder: string) => void;
  onStartEndDateChange: (startDate: string, endDate: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const InterviewListHeader = ({
  isDisabled,
  totalInterview,
  onSortOrderChange,
  onStartEndDateChange,
  onSearch,
}: JobListHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const hasFiltersApplied = !!startDate || !!endDate || sortOrder !== "desc";

  const handleStartEndDateChange = () => {
    onStartEndDateChange(startDate, endDate);
  };

  const handleResetAll = () => {
    setStartDate("");
    setEndDate("");
    setSortOrder("desc");
    onStartEndDateChange("", "");
    onSortOrderChange("desc");
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Scheduled Interview
          </h1>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700"
          >
            {totalInterview}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            disabled={isDisabled}
            placeholder="Search applicant name, job title, or interviewer name"
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Sliders />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filter</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-between gap-2">
                  <div className="w-full">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={handleStartEndDateChange}
                  disabled={!startDate || !endDate}
                >
                  Set Date Range
                </Button>
                <div className="grid gap-2">
                  <h3 className="font-semibold">Sort By</h3>
                  <div>
                    <Label>Scheduled Date</Label>
                    <div className="mt-2 flex gap-2">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortOrder("asc");
                          onSortOrderChange("asc");
                        }}
                      >
                        Ascending
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortOrder("desc");
                          onSortOrderChange("desc");
                        }}
                      >
                        Descending
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  {hasFiltersApplied && (
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={handleResetAll}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
