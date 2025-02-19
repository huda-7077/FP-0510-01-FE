import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";

import { FC } from "react";

interface Job {
  bannerImage?: string;
  company?: {
    logo?: string;
    name?: string;
  };
  companyId?: string;
  title?: string;
  category?: string;
}

const JobHeader: FC<{ job: Job }> = ({ job }) => {
  if (!job) return <JobHeaderSkeleton />;

  return (
    <div className="container mx-auto p-5 space-y-5">
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
      <div className="flex items-center justify-between md:flex-row flex-col gap-9">
        <div className="flex items-center gap-7 md:flex-row flex-col">
          <Avatar className="md:h-28 md:w-28 h-24 w-24">
            <AvatarImage src={job.company?.logo || "/anonymous.svg"} alt={job.company?.name} />
            <AvatarFallback>{job.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3 md:items-start items-center">
            <h1 className="md:text-3xl text-2xl">{job.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                {" "}
                at <a href={`/companies/${job.companyId}`} className="hover:text-blue-500">{job.company?.name}</a>
              </span>
              <Badge className="rounded-sm bg-green-600 text-white hover:bg-green-200 hover:text-green-700">
                {job.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="md:h-16 md:w-16 h-12 w-12 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-blue-100">
            <Bookmark style={{ width: "27px", height: "27px" }} />
          </Button>
          <Button className="group md:h-16 h-12 bg-blue-600 px-16 font-semibold text-blue-100 hover:bg-blue-50 hover:text-blue-600">
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
    <div className="container mx-auto p-5 space-y-5">
      <div className="w-full">
        <div className="relative h-[150px] animate-pulse rounded-xl bg-gray-200 shadow-md md:h-[250px]"></div>
      </div>
      <div className="flex items-center justify-between md:flex-row flex-col gap-9">
        <div className="flex items-center gap-7 md:flex-row flex-col">
          <div className="md:h-28 md:w-28 h-24 w-24 animate-pulse rounded-full bg-gray-200"></div>
          <div className="flex flex-col gap-3 md:items-start items-center">
            <div className="h-9 w-60 animate-pulse rounded bg-gray-200"></div>
            <div className="flex items-center gap-4">
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-7 w-20 animate-pulse rounded-sm bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="md:h-16 md:w-16 h-12 w-12 animate-pulse rounded bg-gray-200"></div>
          <div className="md:h-16 h-12 w-40 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;