"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface EmployeeListHeaderProps {
  totalEmployee: number;
  onSortChange: (sort: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const EmployeeListHeader = ({
  totalEmployee,
  onSortChange,
  onSortOrderChange,
  onSearch,
}: EmployeeListHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const hasFiltersApplied = selectedSort !== "createdAt" || sortOrder !== "asc";

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleResetAll = () => {
    setSelectedSort("createdAt");
    onSortChange("createdAt");
    setSortOrder("asc");
    onSortOrderChange("asc");
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
            Employees
          </h2>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 sm:text-sm"
          >
            {totalEmployee}
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
                      Registered At
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
