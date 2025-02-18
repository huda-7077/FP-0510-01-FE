import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UpdateInterviewFormBreadCrumb = ({ crumb }: { crumb: string }) => {
  return (
    <Breadcrumb className="my-4 font-semibold">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/dashboard/admin/interviews`}
            className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50/90 hover:text-blue-800"
          >
            Interviews
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

export default UpdateInterviewFormBreadCrumb;
