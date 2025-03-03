import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCategory } from "@/features/admin/job/consts";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";
import { cn } from "@/lib/utils";
import { addDays, addMonths, endOfDay, format, startOfDay } from "date-fns";
import {
  AlertCircle,
  ArrowUpDown,
  CalendarDays,
  Check,
  ChevronDown,
  Hourglass,
  MapPinned,
  RotateCcw,
  Search,
  Shapes,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useId, useState } from "react";

export function JobSearchSidebar() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });
  const [timeRange, setTimeRange] = useQueryState("timeRange", {
    defaultValue: "",
  });
  const [startDate, setStartDate] = useQueryState("startDate");
  const [endDate, setEndDate] = useQueryState("endDate");
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  // New state for temporary custom date range values and validation
  const [tempStartDate, setTempStartDate] = useState(startDate || "");
  const [tempEndDate, setTempEndDate] = useState(endDate || "");
  const [isDateRangeInvalid, setIsDateRangeInvalid] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Initialize temp dates when parent dates change from non-custom sources
  useEffect(() => {
    if (timeRange !== "custom") {
      setTempStartDate(startDate || "");
      setTempEndDate(endDate || "");
    }
  }, [timeRange, startDate, endDate]);

  // Validate date range
  useEffect(() => {
    if (tempStartDate && tempEndDate) {
      setIsDateRangeInvalid(new Date(tempStartDate) > new Date(tempEndDate));
    } else {
      setIsDateRangeInvalid(false);
    }
  }, [tempStartDate, tempEndDate]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value || null);
    const today = new Date();

    if (value === "week") {
      const newStartDate = format(startOfDay(addDays(today, -7)), "yyyy-MM-dd");
      const newEndDate = format(endOfDay(today), "yyyy-MM-dd");
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setTempStartDate(newStartDate);
      setTempEndDate(newEndDate);
    } else if (value === "month") {
      const newStartDate = format(
        startOfDay(addMonths(today, -1)),
        "yyyy-MM-dd",
      );
      const newEndDate = format(endOfDay(today), "yyyy-MM-dd");
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setTempStartDate(newStartDate);
      setTempEndDate(newEndDate);
    } else if (value === "custom") {
      // When switching to custom, initialize with current values but don't apply yet
      setTempStartDate(startDate || "");
      setTempEndDate(endDate || "");
    } else {
      setStartDate(null);
      setEndDate(null);
      setTempStartDate("");
      setTempEndDate("");
    }
  };

  const handleApplyCustomRange = () => {
    if (!isDateRangeInvalid && tempStartDate && tempEndDate) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory(null);
    setLocation(null);
    setTimeRange(null);
    setStartDate(null);
    setEndDate(null);
    setSortOrder("desc");
    setTempStartDate("");
    setTempEndDate("");
  };

  return (
    <div className="p-4 md:p-0">
      <div className="flex w-full flex-col gap-4 rounded-md border-[1px] p-5 shadow-lg md:w-72">
        <div>
          <Label
            htmlFor="search"
            className="flex items-center justify-center gap-2 text-lg font-semibold md:justify-start"
          >
            <Search className="h-6 w-6 text-blue-600" strokeWidth={2.5} />
            <span>Search</span>
          </Label>
          <Input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job by title, tag, company"
            className="mt-2"
          />
        </div>

        <div className="md:hidden">
          <Button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full bg-blue-600 hover:bg-blue-800"
          >
            {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 space-y-0 transition-all duration-300 md:space-y-5",
            isFiltersOpen || "hidden md:block",
          )}
        >
          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <MapPinned className="h-4 w-4 text-blue-600" /> Location
            </Label>
            <LocationFilter />
          </div>

          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <Shapes className="h-4 w-4 text-blue-600" /> Category
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {JobCategory.map((category, idx) => (
                  <SelectItem key={idx} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <Hourglass className="h-4 w-4 text-blue-600" /> Time Range
            </Label>
            <RadioGroup value={timeRange} onValueChange={handleTimeRangeChange}>
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

            {timeRange === "custom" && (
              <div className="mt-5 space-y-3">
                <div>
                  <Label className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" /> Start
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" /> End Date
                  </Label>
                  <Input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {isDateRangeInvalid && (
                  <div className="flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Start date cannot be greater than end date
                  </div>
                )}

                <Button
                  onClick={handleApplyCustomRange}
                  variant="ghost"
                  disabled={
                    isDateRangeInvalid || !tempStartDate || !tempEndDate
                  }
                  className="w-full bg-white text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                >
                  Apply Custom Range
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <ArrowUpDown className="h-4 w-4 text-blue-600" /> Sort Order
            </Label>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Latest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4 text-blue-600" /> Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

function LocationFilter() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });

  const { data: regencies, isPending } = useGetRegencies();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {location
            ? regencies?.find((reg) => reg.regency === location)?.regency
            : "Select location"}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {regencies?.map((reg) => (
                <CommandItem
                  key={reg.id}
                  onSelect={() => {
                    setLocation(location === reg.regency ? "" : reg.regency);
                    setOpen(false);
                  }}
                >
                  {reg.regency}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      location === reg.regency ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
