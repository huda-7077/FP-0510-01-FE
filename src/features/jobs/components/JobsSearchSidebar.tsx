"use client";

import { addDays, addMonths, endOfDay, format, startOfDay } from "date-fns";
import {
  ArrowUpDown,
  CalendarDays,
  FilterIcon,
  Hourglass,
  MapPinned,
  Search,
  Shapes,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function JobSearchSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [timeRange, setTimeRange] = useState(
    searchParams.get("timeRange") || "",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || "",
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc",
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (title) params.set("search", title);
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (timeRange) params.set("timeRange", timeRange);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    params.set("sortOrder", sortOrder);

    router.push(`/jobs?${params.toString()}`);
    setIsOpen(false);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    const today = new Date();

    if (value === "week") {
      setStartDate(format(startOfDay(addDays(today, -7)), "yyyy-MM-dd"));
      setEndDate(format(endOfDay(today), "yyyy-MM-dd"));
    } else if (value === "month") {
      setStartDate(format(startOfDay(addMonths(today, -1)), "yyyy-MM-dd"));
      setEndDate(format(endOfDay(today), "yyyy-MM-dd"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category" className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Shapes className="h-5 text-blue-600" />
            Category
          </div>
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="mt-2">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            {/* Add more categories as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-base font-medium">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 text-blue-600" />
            Location
          </div>
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-medium">
          {" "}
          <div className="flex items-center gap-2">
            <Hourglass className="h-5 text-blue-600" />
            Time Range
          </div>
        </Label>
        <RadioGroup
          value={timeRange}
          onValueChange={handleTimeRangeChange}
          className="mt-2 pl-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="week" />
            <Label htmlFor="week">Last 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="month" />
            <Label htmlFor="month">Last month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom range</Label>
          </div>
        </RadioGroup>
      </div>

      {timeRange === "custom" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate" className="text-base font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 text-blue-600" />
                Start Date
              </div>
            </Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-base font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 text-blue-600" />
                End Date
              </div>
            </Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="sortOrder" className="text-base font-medium">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-5 text-blue-600" />
            Sort Order
          </div>
        </Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger id="sortOrder" className="mt-2">
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Latest first</SelectItem>
            <SelectItem value="asc">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden rounded-md border duration-700 shadow-lg hover:shadow-blue-300 md:sticky md:inset-y-0 md:top-32 md:flex md:w-72 md:flex-col">
        <div className="flex flex-col overflow-y-auto">
          <div className="flex-grow px-4 py-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-xl font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-blue-100 p-1">
                      <Search className="h-5 text-blue-600 duration-150 hover:h-6" />
                    </div>
                    Search
                  </div>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Search job titles"
                  className="mt-2"
                />
              </div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <div className="rounded-md bg-blue-100 p-1">
                  <FilterIcon className="h-5 text-blue-700" />
                </div>
                Filter Jobs
              </h2>

              <FilterContent />
            </div>
          </div>
          <div className="p-4">
            <Button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-800"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search bar and filter button */}
      <div className="z-10 border-b bg-background p-4 md:hidden">
        <div className="mb-4">
          <Label htmlFor="mobile-title" className="text-base font-semibold">
            <div className="flex items-center justify-center gap-2">
              <Search className="h-5 text-blue-600" />
              Search Job
            </div>
          </Label>
          <Input
            id="mobile-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search job titles"
            className="mt-2"
          />
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-800"
        >
          <FilterIcon size={18} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="h-[80vh] rounded-t-3xl px-4 py-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Filters</h2>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </Button> */}
          </div>
          <div className="h-[calc(80vh-80px)] overflow-y-auto pb-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
