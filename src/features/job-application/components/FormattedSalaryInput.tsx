import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormattedSalaryInputProps {
  label: string;
  id: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const FormattedSalaryInput: React.FC<FormattedSalaryInputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      setDisplayValue(formatNumberWithDots(value.toString()));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const formatNumberWithDots = (val: string): string => {
    const digitsOnly = val.replace(/\D/g, "");

    return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const rawValue = inputValue.replace(/\./g, "");

    setDisplayValue(formatNumberWithDots(rawValue));

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        id: id,
        name: id,
        value: rawValue,
      },
    };

    onChange(syntheticEvent);
  };

  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
      <Label htmlFor={id} className="font-medium text-gray-800">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          className="peer pe-16 ps-8 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          inputMode="numeric"
        />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          Rp
        </span>
        <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          IDR
        </span>
      </div>
      {touched && error && (
        <div className="mt-1 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default FormattedSalaryInput;
