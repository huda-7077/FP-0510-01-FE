import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { FormikProps } from "formik";
import { Company } from "@/types/company";

interface FormValues {
  name: string;
  description: string;
  industry: string;
  employeeCount: number;
  establishedYear: number;
  links: string;
  about: string;
  phoneNumber: string;
  logo: File | null;
  logoPreview?: string;
}

interface CompanyActionButtonsProps {
  formik: FormikProps<FormValues>;
  companyData: Company | undefined;
  isPending: boolean;
}

export const CompanyActionButtons = ({
  formik,
  companyData,
  isPending,
}: CompanyActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 md:items-end">
      <div className="inline-flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            formik.setValues({
              name: companyData?.name || "",
              description: companyData?.description || "",
              industry: companyData?.industry || "",
              employeeCount: companyData?.employeeCount || 0,
              establishedYear:
                companyData?.establishedYear || new Date().getFullYear(),
              links: companyData?.links || "",
              about: companyData?.about || "",
              phoneNumber: companyData?.phoneNumber || "",
              logo: null,
              logoPreview: companyData?.logo || "/company-placeholder.svg",
            });
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-xl bg-[#0a65cc] hover:bg-[#254e7e]"
          disabled={isPending}
        >
          {isPending ? (
            "Updating..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
