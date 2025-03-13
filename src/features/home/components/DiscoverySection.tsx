import DiscoverySkeleton from "@/components/skeletons/DiscoverySkeleton";
import { Button } from "@/components/ui/button";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import useCreateSavedJob from "@/hooks/api/saved-job/useCreateSavedJob";
import useDeleteSavedJob from "@/hooks/api/saved-job/useDeleteSavedJob";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Wallet,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { LocationPermission } from "./LocationPermission";

const formatSalary = (amount: number | null | undefined): string | null => {
  if (!amount) return null;
  return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
    <Image
      src="/empty-jobs.svg"
      alt="No jobs found"
      width={200}
      height={200}
      className="mb-4"
    />
    <h3 className="text-lg font-medium text-gray-900">No Jobs Found</h3>
    <p className="mt-1 text-sm text-gray-500">
      We couldn't find any jobs matching your criteria.
    </p>
    <Button
      variant="default"
      className="mt-4 bg-blue-600 hover:bg-blue-700"
      asChild
    >
      <Link href="/jobs">Browse All Jobs</Link>
    </Button>
  </div>
);

export default function DiscoverySection() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session;

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLocationDenied, setIsLocationDenied] = useState(false);

  const { data: jobsData, isLoading } = useGetJobs({
    page: 1,
    take: 5,
    userLatitude: userLocation?.latitude,
    userLongitude: userLocation?.longitude,
    maxDistance: isLocationDenied ? undefined : 50,
  });

  const { data: savedJobsData } = useGetSavedJobs(
    {
      page: 1,
      take: 100,
    },
    {
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000,
    },
  );

  const createSavedJobMutation = useCreateSavedJob();
  const deleteSavedJobMutation = useDeleteSavedJob();

  const isJobBookmarked = (jobId: number) => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return false;
    return savedJobsData.data.some((savedJob) => savedJob.job.id === jobId);
  };

  const getSavedJobId = (jobId: number) => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return null;
    const savedJob = savedJobsData.data.find(
      (savedJob) => savedJob.job.id === jobId,
    );
    return savedJob ? savedJob.id : null;
  };

  const handleBookmarkToggle = (jobId: number) => {
    if (!isAuthenticated) {
      toast.info("Please log in to bookmark jobs");
      return;
    }

    const bookmarked = isJobBookmarked(jobId);

    if (bookmarked) {
      const savedJobId = getSavedJobId(jobId);
      if (savedJobId) {
        deleteSavedJobMutation.mutate(jobId);
      }
    } else {
      createSavedJobMutation.mutate({ jobId });
    }
  };

  const handleLocationUpdate = (coordinates?: { lat: number; lng: number }) => {
    if (coordinates) {
      setUserLocation({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      });
      setIsLocationDenied(false);
    } else {
      setUserLocation(null);
      setIsLocationDenied(true);
    }
  };

  if (isLoading && userLocation) {
    return (
      <section className="container mx-auto space-y-4 px-4 py-20 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold sm:text-2xl">Jobs Near You</h2>
          <LocationPermission
            onLocationUpdate={handleLocationUpdate}
            isUsingLocation={!!userLocation}
          />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <DiscoverySkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!jobsData?.data.length) {
    return (
      <section className="container mx-auto space-y-4 px-4 py-20 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {isLocationDenied ? "Latest Jobs" : "Jobs Near You"}
          </h2>
          <LocationPermission
            onLocationUpdate={handleLocationUpdate}
            isUsingLocation={!!userLocation}
          />
        </div>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20 md:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {isLocationDenied ? "Latest Jobs" : "Jobs Near You"}
          </h2>
          <LocationPermission
            onLocationUpdate={handleLocationUpdate}
            isUsingLocation={!!userLocation}
          />
        </div>
        <Link href="/jobs">
          <Button
            variant="outline"
            className="group self-start rounded-sm font-semibold text-[#0A65CC] shadow-none transition-colors hover:border-blue-50 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {jobsData?.data.map((job) => (
          <div
            key={job.id}
            className="flex flex-col gap-4 rounded-lg border p-4 transition-all hover:border-blue-400 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="min-w-[40px] flex-shrink-0">
                <div className="h-12 w-12 overflow-hidden rounded">
                  <img
                    src={job.company.logo || "/anonymous.svg"}
                    alt={job.company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-600">
                  {job.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>
                      {job.companyLocation?.regency?.regency ||
                        "Unknown Location"}
                    </span>
                  </div>
                  {formatSalary(job.salary) && (
                    <div className="flex items-center gap-1">
                      <Wallet size={16} />
                      <span>{formatSalary(job.salary)}/month</span>
                    </div>
                  )}
                  <span>{job.category}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              {isJobBookmarked(job.id) ? (
                <BookmarkCheck
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => handleBookmarkToggle(job.id)}
                />
              ) : (
                <Bookmark
                  className="cursor-pointer text-blue-300 hover:text-blue-600"
                  onClick={() => handleBookmarkToggle(job.id)}
                />
              )}
              <Button
                asChild
                className="rounded-sm bg-blue-50 px-6 text-blue-600 shadow-none hover:bg-blue-600 hover:text-blue-50"
              >
                <Link href={`/jobs/${job.slug}`}>Apply Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
