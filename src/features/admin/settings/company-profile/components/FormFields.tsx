import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormikProps } from "formik";
import dynamic from "next/dynamic";
import { IndustrySelect } from "./IndustrySelect";
import {
  Binoculars,
  Building2,
  CalendarFold,
  Globe,
  NotebookPen,
  Phone,
  Users,
} from "lucide-react";
import LinksInput from "./LinksInput";

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

interface CompanyFormFieldsProps {
  formik: FormikProps<FormValues>;
}

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export const CompanyFormFields = ({ formik }: CompanyFormFieldsProps) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Building2 size={18} />
            Company Name
            <span className="text-red-600">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter company name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={
              formik.errors.name && formik.touched.name ? "border-red-500" : ""
            }
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <IndustrySelect formik={formik} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="employeeCount"
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <Users size={18} />
            Number of Employees
            <span className="text-red-600">*</span>
          </Label>
          <Input
            id="employeeCount"
            name="employeeCount"
            type="number"
            placeholder="Enter number of employees"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeCount}
            className={
              formik.errors.employeeCount && formik.touched.employeeCount
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.employeeCount && formik.touched.employeeCount && (
            <p className="text-xs text-red-500">
              {formik.errors.employeeCount}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="establishedYear"
            className="flex items-center gap-2 font-semibold text-gray-700"
          >
            <CalendarFold size={18} />
            Established Year
            <span className="text-red-600">*</span>
          </Label>
          <Input
            id="establishedYear"
            name="establishedYear"
            type="number"
            placeholder="Enter established year"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.establishedYear}
            className={
              formik.errors.establishedYear && formik.touched.establishedYear
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.establishedYear && formik.touched.establishedYear && (
            <p className="text-xs text-red-500">
              {formik.errors.establishedYear}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="flex items-center gap-2 font-semibold text-gray-700"
        >
          <NotebookPen size={18} />
          Description
          <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter company description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className={
            formik.errors.description && formik.touched.description
              ? "border-red-500"
              : ""
          }
        />
        {formik.errors.description && formik.touched.description && (
          <p className="text-xs text-red-500">{formik.errors.description}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="about"
          className="flex items-center gap-2 font-semibold text-gray-700"
        >
          <Binoculars size={18} />
          About Company
          <span className="text-red-600">*</span>
        </Label>
        <RichTextEditor
          label="About Company"
          value={formik.values.about}
          onChange={(value) => formik.setFieldValue("about", value)}
          onBlur={() => formik.handleBlur({ target: { name: "about" } })}
          error={formik.errors.about}
          touched={formik.touched.about}
        />
      </div>

      <div className="space-y-2">
        <LinksInput
          label="Company Links"
          placeholder="e.g. https://example.com, https://social-media.com"
          value={formik.values.links}
          formik={formik}
          onChange={(links) => formik.setFieldValue("links", links)}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phoneNumber"
          className="flex items-center gap-2 font-semibold text-gray-700"
        >
          <Phone size={18} />
          Phone Number
          <span className="text-red-600">*</span>
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter company phone number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          className={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? "border-red-500"
              : ""
          }
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
        )}
      </div>
    </>
  );
};
