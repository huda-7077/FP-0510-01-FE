import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

// Search Bar Component
const HeroSearchBar = () => {
  return (
    <div className="mx-auto w-full max-w-4xl bg-white p-3 shadow-sm sm:p-4">
      <form className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#0062FF]" />
          <Input
            type="text"
            placeholder="Job title, Keyword..."
            className="h-11 w-full rounded-sm border-white pl-10 shadow-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden h-11 w-px bg-gray-300 sm:block" />

        {/* Location Input */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#0062FF]" />
          <Input
            type="text"
            placeholder="Your Location"
            className="h-11 w-full rounded-sm border-white pl-10 shadow-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-11 rounded-sm bg-[#0062FF] px-6 font-medium text-white hover:bg-[#0056E0] sm:px-8"
        >
          Find Job
        </Button>
      </form>
    </div>
  );
};

export default HeroSearchBar;
