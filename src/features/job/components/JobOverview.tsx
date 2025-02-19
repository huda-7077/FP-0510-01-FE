import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { Calendar, Check, House, Link, Map, Timer } from "lucide-react";
import { useState } from "react";
import { format, isValid } from "date-fns";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const JobOverview = ({ job }: { job: Job }) => {
  if (!job) return <JobOverviewSkeleton />;
  
  const [copied, setCopied] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `Check out this job: ${job.title} at ${job.company?.name}`;
  const shareDescription = `${job.title} at ${job.company?.name}. Location: ${job.companyLocation?.regency?.regency}, ${job.companyLocation?.regency?.province?.province}`;

  // Format dates using date-fns
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Not specified";
    
    const date = new Date(dateString);
    if (!isValid(date)) return "Invalid date";
    
    return format(date, "d MMM, yyyy");
  };

  const formattedPostedDate = formatDate(String(job.createdAt));
  const formattedDeadlineDate = formatDate(String(job.applicationDeadline));

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-2 border-r-[1px] border-blue-200 pr-3">
            <h2 className="text-sm">Salary (IDR)</h2>
            <p className="text-lg text-green-600">{job.salary ? `Rp ${job.salary.toLocaleString()}` : "Not specified"}</p>
            <p className="text-sm text-gray-400">Monthly</p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 pl-3">
            <Map className="h-8 w-8 text-blue-600" />
            <p className="text-sm">Job Location</p>
            <p className="text-center text-sm text-gray-400">
              {job.companyLocation?.regency?.regency}, {job.companyLocation?.regency?.province?.province || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-9 rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="space-y-5">
          <h2>Job Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Calendar className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                JOB POSTED:
              </p>
              <p className="text-sm">{formattedPostedDate}</p>
            </div>
            <div className="space-y-1">
              <Timer className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                JOB EXPIRED IN:
              </p>
              <p className="text-sm">{formattedDeadlineDate}</p>
            </div>
            <div className="space-y-1">
              <House className="h-7 w-7 text-blue-600" />
              <p className="text-[11px] font-extralight text-gray-400">
                COMPANY INDUSTRY:
              </p>
              <p className="text-sm">{job.company?.industry || "Not specified"}</p>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-blue-200 pt-5 space-y-4">
          <h2>Share this job:</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              className="rounded-sm bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-blue-50"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Link className="h-5 w-5 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
            <LinkedinShareButton
              url={shareUrl}
              title={shareTitle}
              summary={shareDescription}
              source={job.company?.name}
            >
              <LinkedinIcon size={37} round />
            </LinkedinShareButton>
            <FacebookShareButton
              url={shareUrl}
              hashtag="#JobOpening"
            >
              <FacebookIcon size={37} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={shareTitle}
              hashtags={["JobOpening", job.category?.replace(/\s+/g, '')]}
            >
              <XIcon size={37} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              separator=":: "
            >
              <WhatsappIcon size={37} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-2 border-r-[1px] border-blue-200 pr-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2 pl-3">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="space-y-9 rounded-lg border-[1px] border-blue-200 p-8 shadow-sm">
        <div className="space-y-5">
          <div className="h-6 w-28 animate-pulse rounded bg-gray-200"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-[1px] border-blue-200 pt-5 space-y-4">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-24 animate-pulse rounded bg-gray-200"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-9 animate-pulse rounded-full bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;