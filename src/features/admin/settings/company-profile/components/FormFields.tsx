import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormikProps } from "formik";
import dynamic from "next/dynamic";
import { IndustrySelect } from "./IndustrySelect";

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
          <Label htmlFor="name">Company Name</Label>
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
          <Label htmlFor="employeeCount">Number of Employees</Label>
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
          <Label htmlFor="establishedYear">Established Year</Label>
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
        <Label htmlFor="description">Description</Label>
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
        <Label htmlFor="links">Company Links</Label>
        <Input
          id="links"
          name="links"
          placeholder="Enter company website, social media links"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.links}
          className={
            formik.errors.links && formik.touched.links ? "border-red-500" : ""
          }
        />
        {formik.errors.links && formik.touched.links && (
          <p className="text-xs text-red-500">{formik.errors.links}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
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
