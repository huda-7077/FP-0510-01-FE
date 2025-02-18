import { Badge } from "@/components/ui/badge";
import FindJobsBreadCrumb from "./components/FindJobsBreadcrumb";
import { JobSearchSidebar } from "./components/JobsSearchSidebar";
import { Bookmark, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const JobsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex justify-between px-6 py-5">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Find Job
          </h1>
          <FindJobsBreadCrumb />
        </div>
      </div>

      <div className="container relative mx-auto flex flex-col bg-background p-4 md:flex-row md:gap-7">
        <JobSearchSidebar />

        <main className="flex-1">
          <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">Results</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Example job listings - replace with your actual job data */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((job) => (
                <div
                  key={job}
                  className="rounded-md border-[1px] bg-card p-4 shadow-sm duration-150 hover:border-blue-500 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold">Job Title {job}</h2>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="rounded-sm bg-green-100 text-green-600 hover:bg-green-600 hover:text-green-100"
                      >
                        Category
                      </Badge>
                      <p className="text-xs text-gray-500">Salary: Rp20000</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Avatar />
                        <div className="space-y-1">
                          <h3 className="text-sm">Company Name</h3>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-4" />
                            Regency, Province
                          </p>
                        </div>
                      </div>
                      <Bookmark className="h-6 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="mt-6 flex justify-center gap-2 border-t border-gray-100 pt-6">
          {jobApplications &&
            jobApplications.data.length > 0 &&
            jobApplications.meta.total > jobApplications.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={jobApplications.meta.take || 4}
                total={jobApplications.meta.total}
              />
            )}
        </div> */}
        </main>
      </div>
    </div>
  );
};

export default JobsPage;
