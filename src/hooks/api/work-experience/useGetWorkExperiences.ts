import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkExperiences = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["workExperiences"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/work-experiences");
      return data;
    },
  });
};
