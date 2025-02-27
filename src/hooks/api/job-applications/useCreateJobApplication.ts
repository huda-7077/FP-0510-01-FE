import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateJobApplicationRequest {
  jobId: number;
  expectedSalary: number;
  cvFile?: File | null;
  useExistingCV?: boolean;
  attachment?: File | null;
}

const useCreateJobApplication = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateJobApplicationRequest) => {
      console.log("Incoming data:", data);
      const formData = new FormData();

      formData.append("jobId", data.jobId.toString());
      formData.append("expectedSalary", data.expectedSalary.toString());

      if (data.useExistingCV) {
        formData.append("useExistingCV", "true");
      } else {
        formData.append("useExistingCV", "false");
        if (data.cvFile) {
          formData.append("cvFile", data.cvFile);
        }
      }

      if (data.attachment) {
        formData.append("attachment", data.attachment);
      }

      const response = await axiosInstance.post("/job-applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      toast.success("Application submitted successfully");
      router.push("/dashboard/user/jobs");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to submit application",
      );
    },
  });
};

export default useCreateJobApplication;
