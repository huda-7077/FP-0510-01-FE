"use client";

import useGetCompanyProfile from "@/hooks/api/company/useGetCompanyProfile";
import useUpdateCompanyProfile from "@/hooks/api/company/useUpdateCompanyProfile";
import { useFormik } from "formik";
import { useEffect } from "react";
import { CompanyFormFields } from "./components/FormFields";
import { LogoUploadSection } from "./components/LogoUploadSection";
import { CompanyActionButtons } from "./components/CompanyActionButtons";
import { companySchema } from "./schemas";

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

interface UpdateCompanyData {
  name: string;
  description?: string;
  industry?: string;
  employeeCount?: number;
  establishedYear?: number;
  links?: string;
  about?: string;
  phoneNumber?: string;
  logo?: File;
}

const CompanyProfile = () => {
  const { data: companyData } = useGetCompanyProfile();
  const { mutate: updateCompany, isPending } = useUpdateCompanyProfile();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: companyData?.name || "",
      description: companyData?.description || "",
      industry: companyData?.industry || "",
      employeeCount: companyData?.employeeCount || 0,
      establishedYear: companyData?.establishedYear || new Date().getFullYear(),
      links: companyData?.links || "",
      about: companyData?.about || "",
      phoneNumber: companyData?.phoneNumber || "",
      logo: null,
      logoPreview: companyData?.logo || "/anonymous.svg",
    },
    validationSchema: companySchema,
    onSubmit: (values) => {
      const formData: UpdateCompanyData = {
        name: values.name,
        description: values.description,
        industry: values.industry,
        employeeCount: Number(values.employeeCount),
        establishedYear: Number(values.establishedYear),
        links: values.links,
        about: values.about,
        phoneNumber: values.phoneNumber,
        ...(values.logo && { logo: values.logo }),
      };
      updateCompany(formData);
    },
  });

  useEffect(() => {
    if (companyData) {
      formik.setValues({
        name: companyData.name || "",
        description: companyData.description || "",
        industry: companyData.industry || "",
        employeeCount: companyData.employeeCount || 0,
        establishedYear:
          companyData.establishedYear || new Date().getFullYear(),
        links: companyData.links || "",
        about: companyData.about || "",
        phoneNumber: companyData.phoneNumber || "",
        logo: null,
        logoPreview: companyData.logo || "/anonymous.svg",
      });
    }
  }, [companyData]);

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <LogoUploadSection formik={formik} />
        <CompanyFormFields formik={formik} />
        <CompanyActionButtons
          formik={formik}
          companyData={companyData}
          isPending={isPending}
        />
      </form>
    </div>
  );
};

export default CompanyProfile;
