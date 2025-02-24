import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

interface SkillAssessmentsHeaderProps {
  totalSkillAssessments: number;
  onSortOrderChange: (sortOrder: string) => void;
  onSortChange: (sort: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const SkillAssessmentHeader = ({
  totalSkillAssessments,
  onSortOrderChange,
  onSortChange,
  onSearch,
}: SkillAssessmentsHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>("");

  const handleSortOrderChange = (sortOrder: string) => {
    setSelectedSortOrder(sortOrder);
    onSortOrderChange(sortOrder);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  const handleSearchReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      onSearch("");
    }
  };

  return (
    <>
      <div className="space-y-4 border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Skill Assessments
            </h1>
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700"
            >
              {totalSkillAssessments}
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
              placeholder="Search skill assessments"
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
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <Select onValueChange={handleSortChange} value={selectedSort}>
              <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium sm:max-w-[170px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">CreatedAt (Default)</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleSortOrderChange}
              value={selectedSortOrder}
            >
              <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium sm:max-w-[160px]">
                <SelectValue placeholder="Order By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">DESC (Default)</SelectItem>
                <SelectItem value="asc">ASC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
