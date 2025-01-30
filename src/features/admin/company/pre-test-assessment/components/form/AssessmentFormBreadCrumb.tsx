import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AssessmentFormBreadCrumb = ({
  jobId,
  crumb,
}: {
  jobId: string;
  crumb: string;
}) => {
  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/dashboard/admin/jobs`}
            className="text-blue-600 hover:text-blue-700"
          >
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/dashboard/admin/jobs/${jobId}`}
            className="text-blue-600 hover:text-blue-700"
          >
            Job Details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{crumb}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AssessmentFormBreadCrumb;
