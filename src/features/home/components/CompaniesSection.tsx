import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCompanies from "@/hooks/api/company/useGetCompanies";
import Link from "next/link";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
    <Image
      src="/empty-companies.svg"
      alt="No companies found"
      width={200}
      height={200}
      className="mb-4"
    />
    <h3 className="text-lg font-medium text-gray-900">No Companies Found</h3>
    <p className="mt-1 text-sm text-gray-500">
      We couldn't find any companies at the moment.
    </p>
    <Button
      variant="default"
      className="mt-4 bg-blue-600 hover:bg-blue-700"
      asChild
    >
      <Link href="/companies">Browse All Companies</Link>
    </Button>
  </div>
);

export default function CompaniesSection() {
  const { data: companiesData, isLoading } = useGetCompanies({
    page: 1,
    take: 8,
    sortBy: "name",
    sortOrder: "asc",
  });

  return (
    <section className="container mx-auto px-4 py-10 md:px-6 md:pb-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Discover Top Companies
        </h2>
        <Button
          variant="outline"
          className="group self-start rounded-sm font-semibold text-[#0A65CC] shadow-none transition-colors hover:border-blue-50 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-md border border-gray-200 shadow-none"
            >
              <CardContent className="p-4">
                <div className="mb-4 flex items-start gap-3">
                  <Skeleton className="h-12 w-12 flex-shrink-0 rounded-lg" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="mt-2 h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-9 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : companiesData?.data.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companiesData.data.map((company) => (
            <Card
              key={company.id}
              className="group relative overflow-hidden rounded-md border border-gray-200 shadow-none transition-all hover:border-blue-500 hover:shadow-lg hover:ring-1 hover:ring-blue-500"
            >
              <CardContent className="flex h-full flex-col p-4">
                {/* Company Header */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={company.logo || "/placeholder-logo.png"}
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
                      {company.totalJobs > 0 && (
                        <span className="inline-flex rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
                          {company.totalJobs} Jobs
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {company.companyLocations[0]?.regency.regency},{" "}
                        {company.companyLocations[0]?.regency.province.province}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Details & Button */}
                <div className="mt-auto space-y-3">
                  {company.averageRating > 0 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Rating:</span>
                      <span className="ml-1 font-medium text-yellow-500">
                        {company.averageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                  <Button
                    className="w-full rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                    variant="ghost"
                  >
                    View Company
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
