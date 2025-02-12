"use client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Tags } from "lucide-react";

interface EditJobFormTagInputProps {
  label: string;
  placeholder?: string;
  value: string[];
  formik: any;
  isNotEmpty?: boolean;
  isDisabled: boolean;
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<EditJobFormTagInputProps> = ({
  label,
  placeholder = "Enter tags",
  value,
  formik,
  isNotEmpty = false,
  isDisabled = false,
  onChange,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.endsWith(",")) {
      const newTag = inputValue.slice(0, -1).trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(inputValue);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-base font-semibold text-gray-700">
        <Tags />
        {label}
        {isNotEmpty && <span className="text-red-600">*</span>}
      </label>
      <div
        className={`flex flex-wrap gap-2 py-2 ${value.length === 0 && "hidden"}`}
      >
        {value.map((tag, index) => (
          <Badge
            key={index}
            className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-red-200 hover:text-red-700"
            onClick={() => removeTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Input
        id="tags"
        name="tags"
        value={tagInput}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        className="border-gray-200 focus:border-blue-500 focus:ring-purple-200"
      />
      {!!formik.touched["tags"] && !!formik.errors["tags"] && (
        <p className="text-sm text-red-500">{formik.errors["tags"]}</p>
      )}
      <p className="text-sm italic text-gray-600">
        <span className="text-blue-600">*</span> Press comma (,) button on your
        keyboard to add tag
      </p>
    </div>
  );
};

export default TagsInput;
