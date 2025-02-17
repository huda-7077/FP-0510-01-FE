import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface UpdateCompanyData {
  name: string;
  description?: string;
  industry?: string;
  employeeCount?: number;
  establishedYear?: number;
  links?: string;
  about?: string;
  phoneNumber?: string;
  logo?: File;
}

const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const token = data?.user.token;
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (data: UpdateCompanyData) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          if (key === "logo") {
            if (value instanceof File) {
              formData.append(key, value);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await axiosInstance.patch(
        "/companies/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
      toast.success("Company profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update company profile",
      );
    },
  });
};

export default useUpdateCompanyProfile;
