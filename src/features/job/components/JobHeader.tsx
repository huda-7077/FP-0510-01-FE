import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCreateSavedJob from "@/hooks/api/saved-job/useCreateSavedJob";
import useDeleteSavedJob from "@/hooks/api/saved-job/useDeleteSavedJob";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FC } from "react";
import { toast } from "react-toastify";

interface Job {
  id: number;
  bannerImage?: string;
  company?: {
    logo?: string;
    name?: string;
  };
  companyId?: string;
  title?: string;
  category?: string;
  slug: string;
}

const JobHeader: FC<{ job: Job }> = ({ job }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

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

  const isJobBookmarked = () => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return false;
    return savedJobsData.data.some((savedJob) => savedJob.job.id === job.id);
  };

  const getSavedJobId = () => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return null;
    const savedJob = savedJobsData.data.find(
      (savedJob) => savedJob.job.id === job.id,
    );
    return savedJob ? savedJob.id : null;
  };

  const handleBookmarkToggle = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to bookmark jobs");
      router.push(`/login?redirect=/jobs/${job.id}`);
      return;
    }

    const bookmarked = isJobBookmarked();

    if (bookmarked) {
      const savedJobId = getSavedJobId();
      if (savedJobId) {
        deleteSavedJobMutation.mutate(job.id);
      } else {
        console.error("Saved job ID not found");
      }
    } else {
      createSavedJobMutation.mutate({ jobId: job.id });
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job");
      router.push(`/login?redirect=/jobs/${job.slug}`);
      return;
    }

    if (!user?.isVerified) {
      toast.error("Please verify your email to apply for jobs");
      router.push("/profile/verification");
      return;
    }

    router.push(`/jobs/${job.slug}/apply`);
  };

  if (!job) return <JobHeaderSkeleton />;

  return (
    <div className="container mx-auto space-y-5 p-5">
      <div className="w-full">
        <div className="relative h-[150px] overflow-hidden rounded-xl shadow-md md:h-[250px]">
          <Image
            src={job.bannerImage || "/default-banner.webp"}
            alt="thumbnail"
            fill
            className="object-cover duration-300 hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-9 md:flex-row">
        <div className="flex flex-col items-center gap-7 md:flex-row">
          <Avatar className="h-24 w-24 md:h-28 md:w-28">
            <AvatarImage
              src={job.company?.logo || "/anonymous.svg"}
              alt={job.company?.name}
              className="object-cover"
            />
            <AvatarFallback>{job.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h1 className="text-2xl md:text-3xl">{job.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                {" "}
                at{" "}
                <a
                  href={`/companies/${job.companyId}`}
                  className="hover:text-blue-500"
                >
                  {job.company?.name}
                </a>
              </span>
              <Badge className="rounded-sm bg-green-600 text-white hover:bg-green-200 hover:text-green-700">
                {job.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleBookmarkToggle}
            className={`h-12 w-12 ${
              isJobBookmarked()
                ? "bg-blue-600 text-blue-50"
                : "bg-blue-50 text-blue-600"
            } hover:bg-blue-600 hover:text-blue-100 md:h-16 md:w-16`}
          >
            {isJobBookmarked() ? (
              <BookmarkCheck style={{ width: "27px", height: "27px" }} />
            ) : (
              <Bookmark style={{ width: "27px", height: "27px" }} />
            )}
          </Button>
          <Button
            onClick={handleApply}
            className="group h-12 bg-blue-600 px-16 font-semibold text-blue-100 hover:bg-blue-50 hover:text-blue-600 md:h-16"
          >
            Apply Now
            <ArrowRight className="stroke-[3] transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const JobHeaderSkeleton = () => {
  return (
    <div className="container mx-auto space-y-5 p-5">
      <div className="w-full">
        <div className="relative h-[150px] animate-pulse rounded-xl bg-gray-200 shadow-md md:h-[250px]"></div>
      </div>
      <div className="flex flex-col items-center justify-between gap-9 md:flex-row">
        <div className="flex flex-col items-center gap-7 md:flex-row">
          <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200 md:h-28 md:w-28"></div>
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="h-9 w-60 animate-pulse rounded bg-gray-200"></div>
            <div className="flex items-center gap-4">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-7 w-20 animate-pulse rounded-sm bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded bg-gray-200 md:h-16 md:w-16"></div>
          <div className="h-12 w-40 animate-pulse rounded bg-gray-200 md:h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
