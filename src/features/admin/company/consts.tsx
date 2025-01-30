export const getAssessmentPath = (assessmentLength: number, jobId: string) => {
  const baseUrl = "/pre-test-assessment/";
  const action = assessmentLength > 0 ? `/update/${jobId}` : `/create/${jobId}`;
  return baseUrl + action;
};
