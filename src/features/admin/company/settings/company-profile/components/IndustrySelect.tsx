import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormikProps } from "formik";
import { useState } from "react";

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

interface IndustrySelectProps {
  formik: FormikProps<FormValues>;
}

const COMMON_INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Entertainment",
  "Real Estate",
  "Transportation",
  "Construction",
  "Other",
];

export const IndustrySelect = ({ formik }: IndustrySelectProps) => {
  const [showCustomInput, setShowCustomInput] = useState(() => {
    // Check if initial value is not in common industries
    return !COMMON_INDUSTRIES.includes(formik.values.industry);
  });

  const handleIndustryChange = (value: string) => {
    if (value === "Other") {
      setShowCustomInput(true);
      formik.setFieldValue("industry", "");
    } else {
      setShowCustomInput(false);
      formik.setFieldValue("industry", value);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="industry">Industry</Label>
      {!showCustomInput ? (
        <Select
          onValueChange={handleIndustryChange}
          value={
            COMMON_INDUSTRIES.includes(formik.values.industry)
              ? formik.values.industry
              : "Other"
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {COMMON_INDUSTRIES.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id="industry"
          name="industry"
          placeholder="Enter your industry"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.industry}
          className={
            formik.errors.industry && formik.touched.industry
              ? "border-red-500"
              : ""
          }
        />
      )}
      {showCustomInput && (
        <button
          type="button"
          onClick={() => setShowCustomInput(false)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Select industries
        </button>
      )}
      {formik.errors.industry && formik.touched.industry && (
        <p className="text-xs text-red-500">{formik.errors.industry}</p>
      )}
    </div>
  );
};
