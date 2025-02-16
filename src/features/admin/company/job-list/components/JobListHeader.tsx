import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Search, Sliders, X } from "lucide-react";
import { useRef, useState } from "react";

interface JobListHeaderProps {
  totalJobs: number;
  jobCategories: string[];
  isDisabled: boolean;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const JobListHeader = ({
  isDisabled,
  totalJobs,
  jobCategories,
  onCategoryChange,
  onSortChange,
  onSortOrderChange,
  onSearch,
}: JobListHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  const hasFiltersApplied =
    selectedSort !== "createdAt" ||
    selectedCategory !== "all" ||
    sortOrder !== "desc";

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
          <h1 className="text-2xl font-semibold text-gray-900">My Jobs</h1>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700"
          >
            {totalJobs}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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
            <Button variant="destructive" size="sm" onClick={handleResetAll}>
              <X className="mr-2 h-4 w-4" />
              Reset Filter
            </Button>
          )}
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
                <div>
                  <h3 className="font-semibold">Select Category</h3>
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
                <div>
                  <h3 className="font-semibold">Sort By</h3>
                  <div className="mt-2 flex w-full items-center gap-2">
                    <Button
                      variant={
                        selectedSort === "applicationDeadline"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="w-full"
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
                      className="w-full"
                      onClick={() => handleSortChange("createdAt")}
                      disabled={isDisabled}
                    >
                      Created Date
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-semibold">Sort Order</h3>
                  <div>
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
                {hasFiltersApplied && (
                  <SheetClose asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleResetAll}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reset All
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
