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
import { useGetIndustries } from "@/hooks/api/industry/useGetIndustry";
import useGetRegencies from "@/hooks/api/location/useGetRegencies";
import { cn } from "@/lib/utils";
import {
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
import { useState } from "react";

export function EmployerSearchSidebar() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [location, setLocation] = useQueryState("location", {
    defaultValue: "",
  });
  const [industry, setIndustry] = useQueryState("industry", {
    defaultValue: "",
  });
  const [establishedYearMin, setEstablishedYearMin] = useQueryState(
    "establishedYearMin",
    { defaultValue: "" },
  );
  const [establishedYearMax, setEstablishedYearMax] = useQueryState(
    "establishedYearMax",
    { defaultValue: "" },
  );
  const [hasActiveJobs, setHasActiveJobs] = useQueryState("hasActiveJobs", {
    defaultValue: "",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, index) => 1950 + index,
  );

  const { data: industries, isLoading: isIndustriesLoading } =
    useGetIndustries();

  const handleReset = () => {
    setSearch("");
    setLocation(null);
    setIndustry(null);
    setEstablishedYearMin(null);
    setEstablishedYearMax(null);
    setHasActiveJobs(null);
    setSortOrder("asc");
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
            placeholder="Search companies by name or industry"
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
              <Shapes className="h-4 w-4 text-blue-600" /> Industry
            </Label>
            <Select
              value={industry}
              onValueChange={(value) => setIndustry(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {isIndustriesLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading industries...
                  </SelectItem>
                ) : industries && industries.length > 0 ? (
                  industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-industries" disabled>
                    No industries available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <CalendarDays className="h-4 w-4 text-blue-600" /> Established
              Year
            </Label>
            <div className="flex gap-2">
              {/* Min Year */}
              <Select
                value={establishedYearMin}
                onValueChange={(value) => setEstablishedYearMin(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Min year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={establishedYearMax}
                onValueChange={(value) => setEstablishedYearMax(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Max year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 pb-2 text-base">
              <Hourglass className="h-4 w-4 text-blue-600" /> Active Jobs
            </Label>
            <RadioGroup
              value={hasActiveJobs}
              onValueChange={(value) => setHasActiveJobs(value || null)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="hasActiveJobs-true" />
                <Label htmlFor="hasActiveJobs-true">With active jobs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="hasActiveJobs-false" />
                <Label htmlFor="hasActiveJobs-false">All companies</Label>
              </div>
            </RadioGroup>
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
                <SelectItem value="asc">A-Z</SelectItem>
                <SelectItem value="desc">Z-A</SelectItem>
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
