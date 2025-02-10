import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

interface FormValues {
  fullName: string;
  headline: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "";
  educationLevel: string;
  currentAddress: string;
  phoneNumber: string;
  cvUrl: File | null;
  cvUrlPreview?: string;
  profilePicture: File | null;
  profilePicturePreview?: string;
  skills: string;
  provinceId: string;
  regencyId: string;
}

interface FormFieldsProps {
  formik: FormikProps<FormValues>;
}

export const ProfilePictureSection = ({ formik }: FormFieldsProps) => {
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        formik.setFieldValue("profilePicture", file);
        const imageUrl = URL.createObjectURL(file);
        formik.setFieldValue("profilePicturePreview", imageUrl);
      } else {
        toast.error("Image size should be less than 1MB");
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>Profile Picture</Label>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={formik.values.profilePicturePreview || "/anonymous.svg"}
            />
            <AvatarFallback>{formik.values.fullName?.[0] || ""}</AvatarFallback>
          </Avatar>
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 text-primary" />
            <input
              type="file"
              id="profilePicture"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleProfilePictureChange}
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
