import { useMemo } from "react";

const useGetAssessmentPath = (assessmentLength: number, jobId: string) => {
  const baseUrl = "/pre-test-assessment/";

  const getAssessmentPath = useMemo(() => {
    const action =
      assessmentLength <= 0 ? `/create/${jobId}` : `/update/${jobId}`;
    return baseUrl + action;
  }, [assessmentLength, jobId]);

  return { getAssessmentPath };
};

export default useGetAssessmentPath;
