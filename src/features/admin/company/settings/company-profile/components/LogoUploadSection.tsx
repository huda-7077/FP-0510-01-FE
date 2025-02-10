import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

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

interface LogoUploadSectionProps {
  formik: FormikProps<FormValues>;
}

export const LogoUploadSection = ({ formik }: LogoUploadSectionProps) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        formik.setFieldValue("logo", file);
        const imageUrl = URL.createObjectURL(file);
        formik.setFieldValue("logoPreview", imageUrl);
      } else {
        toast.error("Image size should be less than 1MB");
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>Company Logo</Label>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 rounded-lg">
            <AvatarImage
              src={formik.values.logoPreview || "/anonymous.svg"}
              className="rounded-lg object-cover"
            />
            <AvatarFallback className="rounded-lg">
              {formik.values.name?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="logo"
            className="absolute bottom-0 right-0 cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 text-primary" />
            <input
              type="file"
              id="logo"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>
        <p className="text-sm text-gray-500">
          Upload JPG or PNG file up to 1MB
        </p>
      </div>
    </div>
  );
};
