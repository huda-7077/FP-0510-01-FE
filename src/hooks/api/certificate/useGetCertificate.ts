import { axiosInstance } from "@/lib/axios";
import { CertificateData } from "@/types/certificate";
import { useQuery } from "@tanstack/react-query";

interface GetCertificatePayload {
  uuid: string;
  slug: string;
}

const useGetCertificate = (payload: GetCertificatePayload) => {
  return useQuery({
    queryKey: ["certificate", payload],
    queryFn: async () => {
      const { uuid, slug } = payload;
      const { data } = await axiosInstance.get<CertificateData>(
        `/certificates/${slug}/${uuid}`,
      );
      return data;
    },
  });
};
export default useGetCertificate;
