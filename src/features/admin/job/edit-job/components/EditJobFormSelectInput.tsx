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
import { CompanyLocation } from "@/types/companyLocation";
import { MapPin } from "lucide-react";
import React from "react";

interface EditJobFormSelectInputProps {
  name: string;
  label: string;
  placeholder?: string;
  formik: any; // Replace `any` with a proper Formik type if available
  className?: string;
  isDisabled: boolean;
  // companyLocations: CompanyLocation[];
}

const EditJobFormSelectInput: React.FC<EditJobFormSelectInputProps> = ({
  name,
  label,
  placeholder = "Select company locations",
  formik,
  className = "",
  isDisabled = false,
  // companyLocations,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label
        htmlFor={name}
        className="flex items-center gap-2 text-base font-semibold text-gray-700"
      >
        <MapPin />
        {label}
        <span className="text-red-600">*</span>
      </Label>
      <Select
        disabled={isDisabled}
        value={formik.values[name].toString() || ""}
        onValueChange={(value: string) => formik.setFieldValue(name, value)}
      >
        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-200">
          {/* <SelectValue
            placeholder={
              companyLocations.length <= 0
                ? "Loading Locations Data"
                : placeholder
            }
          /> */}
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          {/* <SelectGroup>
            {companyLocations.length <= 0 ? (
              <SelectItem value="Loading" disabled={true}>
                Loading...
              </SelectItem>
            ) : (
              companyLocations.map((location) => (
                <SelectItem key={location.id} value={String(location.id)}>
                  {location.address}, {location.regency.regency}
                </SelectItem>
              ))
            )}
          </SelectGroup> */}
        </SelectContent>
      </Select>
      {!!formik.touched[name] && !!formik.errors[name] && (
        <p className="text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default EditJobFormSelectInput;
