import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubscriptionStatus } from "@/types/subscription";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

interface SubscribersHeaderProps {
  totalSubscribers: number;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  onSearch: (searchQuery: string) => void;
}

export const SubscribersHeader = ({
  totalSubscribers,
  onStatusChange,
  onSortChange,
  onSearch,
}: SubscribersHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedSort, setSelectedSort] = useState<string>("");

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
    <div className="space-y-4 border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700"
          >
            {totalSubscribers}
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
            placeholder="Search subscribers email or category"
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
        <div className="flex w-full flex-col items-center gap-3 sm:flex-row">
          <Select onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium sm:w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              {Object.values(SubscriptionStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex w-full items-center gap-2">
            <Select onValueChange={handleSortChange} value={selectedSort}>
              <SelectTrigger className="h-9 w-full border-gray-200 text-sm font-medium sm:w-[160px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Default (CreatedAt)</SelectItem>
                <SelectItem value="expiredDate">Expired Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
