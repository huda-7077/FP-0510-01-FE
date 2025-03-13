"use client";
import { Input } from "@/components/ui/input";
import { useGetSearchSuggestions } from "@/hooks/api/search/useGetSearchSuggestion";
import { Search } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useTransitionRouter();

  const { data: suggestions, isLoading } = useGetSearchSuggestions(query);

  const jobs = suggestions?.jobs || [];
  const companies = suggestions?.companies || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownOpen(true);
  };

  const handleSelect = (type: "job" | "company", id: number, slug?: string) => {
    setIsDropdownOpen(false);
    if (type === "job") {
      router.push(`/jobs/${slug}`);
    } else if (type === "company") {
      router.push(`/companies/${slug}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsDropdownOpen(false);
      router.push(`/jobs?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative max-w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Job title, keyword, company"
        className="w-full max-w-xl pl-10"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : (
            <>
              {jobs.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                    Jobs
                  </div>
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleSelect("job", job.id, job.slug)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {job.title}
                    </div>
                  ))}
                </div>
              )}
              {companies.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
                    Companies
                  </div>
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => handleSelect("company", company.id, company.slug)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {company.title}
                    </div>
                  ))}
                </div>
              )}
              {jobs.length === 0 && companies.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
