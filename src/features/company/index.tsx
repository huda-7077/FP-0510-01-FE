"use client";

import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetCompany from "@/hooks/api/company/useGetCompany";
import {
  AlertTriangle,
  BriefcaseBusiness,
  Building,
  Building2,
  MessageSquareQuote,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import CompanyContent from "./components/CompanyContent";
import CompanyHeader from "./components/CompanyHeader";
import CompanyOverview from "./components/CompanyOverview";
import CompanyReviews from "./components/CompanyReviews";
import OpenJobs from "./components/OpenJobs";

interface CompanyDetailsProps {
  companyId: number;
}

const TABS = [
  {
    label: "Company Details",
    path: "",
    icon: Building2,
    ariaLabel: "View Company Details",
  },
  {
    label: "Open Jobs",
    path: "open-jobs",
    icon: BriefcaseBusiness,
    ariaLabel: "View Open Jobs",
  },
  {
    label: "Company Reviews",
    path: "reviews",
    icon: MessageSquareQuote,
    ariaLabel: "View Company Reviews",
  },
];

const ErrorState = () => (
  <div className="container mx-auto px-6 py-12">
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Company Not Found
      </h2>
      <p className="mb-6 text-gray-600">
        We couldn't find the company you're looking for. This could be because:
      </p>
      <ul className="mb-6 space-y-2 text-gray-600">
        <li>• The company may no longer be active</li>
        <li>• The URL might be incorrect</li>
        <li>• The company data is temporarily unavailable</li>
      </ul>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
        >
          Go Back
        </button>
        <a
          href="/companies"
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Browse Companies
        </a>
      </div>
    </div>
  </div>
);

const NoDataState = () => (
  <div className="container mx-auto px-6 py-8">
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-blue-100 p-3">
          <Building className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        No Company Data Available
      </h2>
      <p className="mb-4 text-gray-600">
        The company information is currently unavailable. Please check back
        later.
      </p>
      <a
        href="/companies"
        className="inline-block rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        View Other Companies
      </a>
    </div>
  </div>
);

const CompanyPage = ({ companyId }: CompanyDetailsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments.pop() || "";
  const currentTab =
    lastSegment === "" || lastSegment === String(companyId)
      ? "details"
      : lastSegment;

  const handleTabClick = (tabPath: string) => {
    if (tabPath === "") {
      router.push(`/companies/${companyId}`);
    } else {
      router.push(`/companies/${companyId}/${tabPath}`);
    }
  };

  const { data: company, isLoading, isError } = useGetCompany({ companyId });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!company) {
    return <NoDataState />;
  }

  return (
    <div className="mb-8 space-y-5">
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex flex-col items-start justify-between px-6 py-5 md:flex-row md:items-center md:gap-0">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Employer Details
          </h1>
          <HomeBreadcrumb
            crumb1={{ href: "companies", label: "Find Employers" }}
            lastCrumb={company?.name || "Unknown Company"}
          />
        </div>
      </div>
      <CompanyHeader company={company} />
      <div className="container mx-auto mt-6 px-6">
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                aria-label={tab.ariaLabel}
                className={`flex flex-1 items-center justify-center gap-2 py-3 text-center font-medium transition-colors ${
                  currentTab === (tab.path || "details")
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                <Icon size={20} className="md:size-[18px]" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="container mx-auto mt-6">
        {currentTab === "details" && (
          <div className="space-y-5 p-6">
            <div className="flex flex-col justify-between gap-10 md:flex-row">
              <div className="w-full md:w-7/12">
                <CompanyContent company={company} />
              </div>
              <div className="w-full md:w-5/12">
                <CompanyOverview company={company} />
              </div>
            </div>
          </div>
        )}
        {currentTab === "open-jobs" && <OpenJobs companyId={company?.id} />}
        {currentTab === "reviews" && <CompanyReviews companyId={company?.id} />}
      </div>
    </div>
  );
};

export default CompanyPage;
