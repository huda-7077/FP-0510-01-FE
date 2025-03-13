"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";

interface CreateJobFormSalaryInputProps {
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

const formatCurrency = (value: any): string => {
  const stringValue = String(value || "");
  const numericValue = stringValue.replace(/[^0-9]/g, "");

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseCurrency = (value: any): number => {
  const stringValue = String(value || "");
  const numericString = stringValue.replace(/[^0-9]/g, "");

  return numericString ? Number(numericString) : 0;
};

const CreateJobFormSalaryInput: React.FC<CreateJobFormSalaryInputProps> = ({
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const parsedValue = parseCurrency(rawValue);
    formik.setFieldValue(name, parsedValue);

    const cursorPosition = e.target.selectionStart;

    e.target.value = rawValue;

    if (inputRef.current && cursorPosition !== null) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const parsedValue = parseCurrency(rawValue);

    formik.setFieldValue(name, parsedValue);

    e.target.value = formatCurrency(rawValue);

    formik.handleBlur(e);
  };

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
          ref={inputRef}
          id={name}
          name={name}
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          value={formatCurrency(formik.values[name])}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full rounded-md border bg-white px-4 py-3 text-gray-800 transition-all duration-300 hover:bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-200 ${
            type === "date" ? "cursor-pointer" : ""
          } `}
        />
      </div>
      {!!formik.touched[name] && !!formik.errors[name] && (
        <p className="text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CreateJobFormSalaryInput;
