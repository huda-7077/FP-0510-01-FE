import MarkDown from "@/components/Markdown";

interface Job {
  description: string;
  tags: string[];
}

const JobContent = ({ job }: { job: Job }) => {
  if (!job) return <JobContentSkeleton />;
  
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-lg">Job Description</h1>
        <div className="space-y-7">
          <MarkDown content={job.description} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-gray-700">Tags:</h2>
        <div className="flex flex-wrap gap-3">
          {job.tags && job.tags.map((tag, index) => (
            <p key={index} className="w-fit rounded-sm bg-gray-100 px-5 py-1 text-gray-500 hover:text-gray-100 hover:bg-gray-500">
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const JobContentSkeleton = () => {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-lg">Job Description</h1>
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
          ))}
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-gray-700">Tags:</h2>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 animate-pulse rounded-sm bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobContent;