"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface CreateInterviewFormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  formik: any;
  icon?: React.ReactNode;
  className?: string;
  isNotEmpty?: boolean;
  isDisabled: boolean;
}

const CreateInterviewFormInput: React.FC<CreateInterviewFormInputProps> = ({
  name,
  label,
  placeholder = "",
  type = "text",
  formik,
  icon,
  className = "",
  isNotEmpty = false,
  isDisabled = false,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={name}
        className="flex items-center gap-2 text-base font-semibold text-gray-700"
      >
        {icon && icon}
        {label}
        {isNotEmpty && <span className="text-red-600">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded-md border bg-white px-4 py-3 text-gray-800 transition-all duration-300 hover:bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-200 ${type === "date" ? "cursor-pointer" : ""} `}
        />
      </div>
      {!!formik.touched[name] && !!formik.errors[name] && (
        <p className="text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CreateInterviewFormInput;
