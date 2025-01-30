import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CVData } from "@/types/cv";
import { Plus, Trash } from "lucide-react";
import { ChangeEvent } from "react";

interface DetailInputProps {
  details: CVData["details"];
  setDetails: React.Dispatch<React.SetStateAction<CVData["details"]>>;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function DetailInput({
  details,
  setDetails,
  onBlur,
  errors,
  touched,
}: DetailInputProps) {
  const addDetail = () => {
    setDetails([...details, ""]);
    if (onBlur) onBlur();
  };

  const updateDetail = (index: number, value: string) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateDetail(index, e.target.value);
    if (onBlur) onBlur();
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="flex w-full items-center space-x-2">
            <Input
              value={detail}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Enter a detail (e.g., johndoe123@mail.com, 123-456-7890, 123 Main St, San Francisco, CA 94105)"
              onBlur={onBlur}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeDetail(index)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          {errors?.details?.[index] && touched?.details?.[index] && (
            <p className="text-xs text-red-500">{errors.details[index]}</p>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={addDetail}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Detail
      </Button>
    </div>
  );
}
