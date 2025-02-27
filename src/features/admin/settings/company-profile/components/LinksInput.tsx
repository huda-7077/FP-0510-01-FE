import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Globe } from "lucide-react";

interface LinksInputProps {
  label: string;
  placeholder?: string;
  value: string;
  formik: any;
  onChange: (links: string) => void;
}

const LinksInput: React.FC<LinksInputProps> = ({
  label,
  placeholder = "e.g. https://example.com, https://social-media.com",
  value,
  formik,
  onChange,
}) => {
  const [linkInput, setLinkInput] = useState("");

  const linksArray = value ? value.split(",").map((link) => link.trim()) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.endsWith(",")) {
      const newLink = inputValue.slice(0, -1).trim();
      if (newLink && !linksArray.includes(newLink)) {
        const updatedLinks = [...linksArray, newLink].join(", ");
        onChange(updatedLinks);
      }
      setLinkInput("");
    } else {
      setLinkInput(inputValue);
    }
  };

  const removeLink = (linkToRemove: string) => {
    const updatedLinks = linksArray
      .filter((link) => link !== linkToRemove)
      .join(", ");
    onChange(updatedLinks);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 font-semibold text-gray-700">
        <Globe size={18} />
        {label}
        <span className="text-red-600">*</span>
      </label>

      <div
        className={`flex flex-wrap gap-2 py-2 ${
          linksArray.length === 0 ? "hidden" : ""
        }`}
      >
        {linksArray.map((link, index) => (
          <Badge
            key={index}
            className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-red-200 hover:text-red-700"
            onClick={() => removeLink(link)}
          >
            {link}
          </Badge>
        ))}
      </div>

      <Input
        id="links"
        name="links"
        value={linkInput}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        className="border-gray-200 focus:border-blue-500 focus:ring-purple-200"
      />

      {!!formik.touched["links"] && !!formik.errors["links"] && (
        <p className="text-sm text-red-500">{formik.errors["links"]}</p>
      )}

      <p className="text-sm italic text-gray-600">
        <span className="text-blue-600">*</span> Press comma (,) button on your
        keyboard to add a link.
      </p>
    </div>
  );
};

export default LinksInput;