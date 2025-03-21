import * as yup from "yup";

export const createInterviewSchema = yup.object().shape({
  jobApplicationId: yup.number().required("Job Application Id is required"),
  scheduledDate: yup.string().required("Scheduled Date is required"),
  interviewerName: yup.string().required("Interviewer Name is required"),
  location: yup.string().required("Location is required"),
  meetingLink: yup.string().optional(),
  notes: yup.string().optional(),
});

export type CreateInterviewFormValues = yup.InferType<
  typeof createInterviewSchema
>;
