import useAxios from "@/hooks/useAxios";
import { CompanyLocation } from "@/types/companyLocation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetCompanyLocations = () => {
  const { data: session } = useSession();
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["companyLocations"],
    queryFn: async () => {
      const token = session?.user.token;
      const { data } = await axiosInstance.get("/company-locations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return (data as CompanyLocation[]) || [];
    },
    staleTime: 60000,
  });
};
