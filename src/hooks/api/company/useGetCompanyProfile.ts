import useAxios from "@/hooks/useAxios";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetCompanyProfile = () => {
  const session = useSession();
  const token = session.data?.user.token;
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Company>("/companies/profile");
      return data;
    },
    enabled: !!token,
  });
};

export default useGetCompanyProfile;
