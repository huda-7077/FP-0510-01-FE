import { Button } from "@/components/ui/button";
import { Company } from "@/types/company";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CompanyHeaderProps {
  company?: Company;
}

const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  const router = useRouter();

  const openJobsUrl = company?.id ? `/companies/${company.id}/open-jobs` : "#";

  return (
    <div className="container mx-auto p-0 md:p-6">
      <div className="flex flex-col items-center justify-between gap-3 rounded-md p-6 shadow-none md:flex-row md:border-[1px] md:shadow-lg">
        <div className="flex flex-col items-center gap-9 md:flex-row">
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={company?.logo || "/anonymous.svg"}
              alt={company?.name || "Company Logo"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-3 md:items-start md:gap-5">
            <h1 className="text-2xl">{company?.name || "Unknown Company"}</h1>
            <p className="text-gray-500">
              {company?.industry || "Unknown Industry"}
            </p>
          </div>
        </div>

        <Button
          className="bg-blue-600 p-5 text-white hover:bg-blue-100 hover:text-blue-600 md:p-7"
          asChild
        >
          <Link href={openJobsUrl}>View Open Positions</Link>
        </Button>
      </div>
    </div>
  );
};

export default CompanyHeader;
