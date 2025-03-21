import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface JobApplicationListHeaderProps {
  totalJobApplications: number;
  userEducationLevels: string[];
  onEducationLevelChange: (category: string) => void;
  onMaxExpectedSalaryChange: (maxExpectedSalary: string) => void;
  onMinExpectedSalaryChange: (minExpectedSalary: string) => void;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const JobApplicationListHeader = ({
  totalJobApplications,
  userEducationLevels,
  onEducationLevelChange,
  onMaxExpectedSalaryChange,
  onMinExpectedSalaryChange,
  onSortChange,
  onSortOrderChange,
  onSearch,
}: JobApplicationListHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [maxExpectedSalary, setMaxExpectedSalary] = useState<string>("");
  const [minExpectedSalary, setMinExpectedSalary] = useState<string>("");

  const hasFiltersApplied =
    selectedSort !== "createdAt" ||
    selectedEducationLevel !== "all" ||
    sortOrder !== "asc" ||
    maxExpectedSalary !== "" ||
    minExpectedSalary !== "";

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
    onSortOrderChange(sortOrder);
  };

  const handleEducationLevelChange = (educationLevel: string) => {
    setSelectedEducationLevel(educationLevel);
    onEducationLevelChange(educationLevel);
  };

  const handleMaxExpectedSalaryChange = (maxExpectedSalary: string) => {
    setMaxExpectedSalary(maxExpectedSalary);
    onMaxExpectedSalaryChange(maxExpectedSalary);
  };
  const handleMinExpectedSalaryChange = (minExpectedSalary: string) => {
    setMinExpectedSalary(minExpectedSalary);
    onMinExpectedSalaryChange(minExpectedSalary);
  };

  const handleResetAll = () => {
    handleSortChange("createdAt");
    handleEducationLevelChange("all");
    handleSortOrderChange("asc");
    handleMaxExpectedSalaryChange("");
    handleMinExpectedSalaryChange("");
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
          <h2 className="text-lg font-semibold text-gray-900 sm:text-2xl">
            Applicants
          </h2>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 sm:text-sm"
          >
            {totalJobApplications}
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
            placeholder="Search applicant name..."
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
                    Education Level
                  </h3>
                  <Select
                    value={selectedEducationLevel}
                    onValueChange={(value) => handleEducationLevelChange(value)}
                  >
                    <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium">
                      <SelectValue placeholder="All Education Levels" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem
                        value="all"
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        All Education Levels
                      </SelectItem>
                      {userEducationLevels.map((educationLevel) => (
                        <SelectItem
                          key={educationLevel}
                          value={educationLevel}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {educationLevel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Expected Salary
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base">Min</h3>
                      <Input
                        placeholder="ex. 5000000"
                        onChange={(e) =>
                          handleMinExpectedSalaryChange(e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base">Max</h3>
                      <Input
                        placeholder="ex. 5000000"
                        onChange={(e) =>
                          handleMaxExpectedSalaryChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-sm font-semibold sm:text-base">
                    Sort By
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedSort === "createdAt" ? "default" : "outline"
                      }
                      size="sm"
                      className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        selectedSort === "createdAt"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => handleSortChange("createdAt")}
                    >
                      Submitted At
                    </Button>
                    <Button
                      variant={
                        selectedSort === "expectedSalary"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        selectedSort === "expectedSalary"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => handleSortChange("expectedSalary")}
                    >
                      Expected Salary
                    </Button>
                    <Button
                      variant={
                        selectedSort === "dateOfBirth" ? "default" : "outline"
                      }
                      size="sm"
                      className={`px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                        selectedSort === "dateOfBirth"
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:bg-blue-50"
                      }`}
                      onClick={() => handleSortChange("dateOfBirth")}
                    >
                      Age
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
                      onClick={() => handleSortOrderChange("asc")}
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
                      onClick={() => handleSortOrderChange("desc")}
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
