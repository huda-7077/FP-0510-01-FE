import useAxios from "@/hooks/useAxios";
import { WorkExperience } from "@/types/workExperience";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
