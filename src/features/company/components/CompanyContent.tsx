import MarkDown from "@/components/Markdown";
import { Company } from "@/types/company";

interface CompanyContentProps {
  company?: Company;
}

const CompanyContent = ({ company }: CompanyContentProps) => {
  return (
    <div className="space-y-7">
      <div className="space-y-5">
        <h1 className="text-xl">Description</h1>
        <p className="text-sm text-gray-700">
          {company?.description || "No description available."}
        </p>
      </div>
      <div className="space-y-5">
        <h1 className="text-xl">About</h1>
        <MarkDown content={company?.about || "No about section available."} />
      </div>
    </div>
  );
};

export default CompanyContent;
