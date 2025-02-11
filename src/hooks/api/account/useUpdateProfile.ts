import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface UpdateProfileData {
  fullName: string;
  headline?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE";
  educationLevel?: string;
  currentAddress?: string;
  phoneNumber?: string;
  skills?: string;
  regencyId?: string;
  profilePicture?: File;
  cvUrl?: File;
}

const useUpdateProfile = () => {
  const { data } = useSession();
  const token = data?.user.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          if (key === "profilePicture" || key === "cvUrl") {
            if (value instanceof File) {
              formData.append(key, value);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await axiosInstance.patch(
        "/accounts/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
};

export default useUpdateProfile;
