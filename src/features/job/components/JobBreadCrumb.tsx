import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  
  const JobBreadCrumb = () => {
    return (
      <Breadcrumb className="font-semibold">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50/90 hover:text-blue-800"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/jobs"
              className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50/90 hover:text-blue-800"
            >
              Find Job
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Job Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
  
  export default JobBreadCrumb;
  