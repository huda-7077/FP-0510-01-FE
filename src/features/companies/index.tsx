"use client";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { LocationPermission } from "@/components/LocationPermission";
import PaginationSection from "@/components/PaginationSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useGetCompanies from "@/hooks/api/company/useGetCompanies";
import { MapPin, Star } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { EmployerCardSkeleton } from "./components/EmployerCardSkeleton";
import { EmployerSearchSidebar } from "./components/EmployerSearchSidebar";

const CompaniesPage = () => {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [location] = useQueryState("location", { defaultValue: "" });
  const [industry] = useQueryState("industry", { defaultValue: "" });
  const [establishedYearMin] = useQueryState("establishedYearMin", {
    defaultValue: "",
  });
  const [establishedYearMax] = useQueryState("establishedYearMax", {
    defaultValue: "",
  });
  const [hasActiveJobs] = useQueryState("hasActiveJobs", {
    defaultValue: "",
  });
  const [sortOrder] = useQueryState("sortOrder", { defaultValue: "asc" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debouncedValue] = useDebounceValue(search, 500);
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userLat, setUserLat] = useQueryState("userLat");
  const [userLng, setUserLng] = useQueryState("userLng");
  const [isUsingLocation, setIsUsingLocation] = useState(
    !!userLat && !!userLng,
  );

  const { data: companies, isPending } = useGetCompanies({
    search: debouncedValue,
    location,
    industry,
    establishedYearMin,
    establishedYearMax,
    hasActiveJobs,
    sortBy: "name",
    sortOrder,
    take: 10,
    page,
    userLatitude: userLat ? parseFloat(userLat) : undefined,
    userLongitude: userLng ? parseFloat(userLng) : undefined,
  });

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Find Employers
          </h1>
          <HomeBreadcrumb lastCrumb="Find Employers" />
        </div>
      </div>
      <div className="container relative mx-auto flex flex-col bg-background p-4 md:flex-row md:gap-7">
        <EmployerSearchSidebar />
        <main className="flex-1">
          <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center justify-between">
              <LocationPermission
                onLocationUpdate={(coordinates) => {
                  if (coordinates) {
                    setUserLat(coordinates.lat.toString());
                    setUserLng(coordinates.lng.toString());
                  } else {
                    setUserLat(null);
                    setUserLng(null);
                  }
                  setIsUsingLocation(!!coordinates);
                }}
                isUsingLocation={isUsingLocation}
              />
            </div>
            {isPending ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <EmployerCardSkeleton key={index} />
                ))}
              </div>
            ) : !companies?.data || companies?.data.length === 0 ? (
              <>
                <h1 className="mb-4 text-2xl font-bold">No Results</h1>
                <div className="flex h-96 w-full flex-col items-center justify-center text-center font-semibold text-[#afaeae]">
                  <Image
                    src="/empty-companies.svg"
                    alt="No Companies Found"
                    width={200}
                    height={200}
                    className="mb-4"
                  />
                  <h1>No Companies Found</h1>
                </div>
              </>
            ) : (
              <>
                <h1 className="mb-4 text-2xl font-bold">
                  {companies.meta.total} Results
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                  {companies.data.map((company) => (
                    <Link
                      key={company.id}
                      href={`/companies/${company.slug}`}
                      className="group block"
                    >
                      <Card
                        key={company.id}
                        className="relative overflow-hidden rounded-md border border-gray-200 shadow-none transition-all hover:border-blue-500 hover:shadow-lg hover:ring-1 hover:ring-blue-500"
                      >
                        <CardContent className="flex h-full flex-col p-4">
                          <div className="mb-4 flex items-start gap-3">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={company.logo || "/anonymous.svg"}
                                alt={company.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="line-clamp-1 font-medium">
                                  {company.name}
                                </h3>
                                {company.industry && (
                                  <Link
                                    href={`?industry=${encodeURIComponent(company.industry)}`}
                                    className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                                  >
                                    {company.industry}
                                  </Link>
                                )}
                                {company.totalJobs > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500"
                                  >
                                    {company.totalJobs} Jobs
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-1 flex flex-col gap-1 text-sm text-gray-500">
                                {company.companyLocations.length > 0 ? (
                                  <>
                                    {company.companyLocations
                                      .slice(0, 2)
                                      .map((location, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-1"
                                        >
                                          <MapPin className="h-3 w-3 flex-shrink-0" />
                                          <span className="line-clamp-1">
                                            {location.regency.regency},{" "}
                                            {location.regency.province.province}
                                          </span>
                                        </div>
                                      ))}
                                    {company.companyLocations.length > 2 && (
                                      <button className="text-xs text-blue-500">
                                        + {company.companyLocations.length - 2}{" "}
                                        more locations
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span>No locations available</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-auto space-y-3">
                            {company.averageRating > 0 && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="ml-1 font-medium text-yellow-500">
                                  {company.averageRating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-2 border-t border-gray-100 pt-6">
                  {companies && companies.meta.total > companies.meta.take && (
                    <PaginationSection
                      onChangePage={onChangePage}
                      page={Number(page)}
                      take={companies.meta.take || 10}
                      total={companies.meta.total}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompaniesPage;
