"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutList } from "lucide-react";
import React from "react";
import { JobCategory } from "../../consts";

interface FormikSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  formik: any;
  className?: string;
  isDisabled: boolean;
}

const CategorySelectInput: React.FC<FormikSelectProps> = ({
  name,
  label,
  placeholder = "Select category",
  formik,
  className = "",
  isDisabled = false,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={name}
        className="flex items-center gap-2 text-base font-semibold text-gray-700"
      >
        <LayoutList />
        {label}
        <span className="text-red-600">*</span>
      </Label>
      <Select
        disabled={isDisabled}
        value={formik.values[name]?.toString() || ""}
        onValueChange={(value: string) => {
          formik.setFieldValue(name, value);
        }}
      >
        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-200">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          <SelectGroup>
            {JobCategory.map((category, idx) => (
              <SelectItem key={idx} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {!!formik.touched[name] && !!formik.errors[name] && (
        <p className="text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CategorySelectInput;
