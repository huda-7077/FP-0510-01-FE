import useAxios from "@/hooks/useAxios";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

interface CompanyProfile extends Company {
  phoneNumber: string;
  email: string;
}

const useGetCompanyProfile = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<CompanyProfile>("/companies/profile");
      return data;
    },
  });
};

export default useGetCompanyProfile;
