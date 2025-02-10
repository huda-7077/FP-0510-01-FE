import useAxios from "@/hooks/useAxios";
import { WorkExperience } from "@/types/workExperience";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetWorkExperiences = () => {
  const { data: session } = useSession();
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["workExperiences"],
    queryFn: async () => {
      const token = session?.user.token;
      const { data } = await axiosInstance.get("/work-experiences", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data as WorkExperience[];
    },
  });
};
