import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { FormikProps } from "formik";
import { User as UserType } from "@/types/user";

interface User {
  fullName?: string;
  headline?: string;
  dateOfBirth?: Date | string;
  gender?: "MALE" | "FEMALE" | "";
  educationLevel?: string;
  currentAddress?: string;
  phoneNumber?: string;
  cvUrl?: string;
  profilePicture?: string;
  skills?: string[];
  regency?: {
    provinceId?: string;
  };
  regencyId?: string;
}

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

interface ActionButtonsProps {
  formik: FormikProps<FormValues>;
  userData: UserType | undefined;
  isPending: boolean;
}

export const ActionButtons = ({
  formik,
  userData,
  isPending,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 md:items-end">
      <div className="inline-flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            formik.setValues({
              fullName: userData?.fullName || "",
              headline: userData?.headline || "",
              dateOfBirth: userData?.dateOfBirth
                ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
                : "",
              gender: (userData?.gender as "MALE" | "FEMALE" | "") || "",
              educationLevel: userData?.educationLevel || "",
              currentAddress: userData?.currentAddress || "",
              phoneNumber: userData?.phoneNumber || "",
              cvUrl: null,
              cvUrlPreview: userData?.cvUrl || "",
              profilePicture: null,
              profilePicturePreview:
                userData?.profilePicture || "/anonymous.svg",
              skills: userData?.skills?.join(", ") || "",
              provinceId: userData?.regency?.provinceId?.toString() || "",
              regencyId: userData?.regencyId?.toString() || "",
            });
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-xl bg-[#0a65cc] hover:bg-[#254e7e]"
          disabled={isPending}
        >
          {isPending ? (
            "Updating..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
