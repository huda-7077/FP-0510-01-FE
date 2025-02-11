import { axiosInstance } from "@/lib/axios";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetCompanyProfile = () => {
  const session = useSession();
  const token = session.data?.user.token;

  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Company>("/companies/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetCompanyProfile;
