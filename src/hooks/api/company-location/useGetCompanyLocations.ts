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
      try {
        const token = session?.user?.token;

        const { data } = await axiosInstance.get("/company-locations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from the server");
        }

        return data as CompanyLocation[];
      } catch (error) {
        console.error("Error fetching company locations:", error);
        throw error; // Re-throw the error for React Query to handle
      }
    },
  });
};
