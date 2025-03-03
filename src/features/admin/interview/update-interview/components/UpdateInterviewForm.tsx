"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useGetInterview from "@/hooks/api/interview/useGetInterview";
import useUpdateInterview, {
  UpdateIntervewPayload,
} from "@/hooks/api/interview/useUpdateInterview";
import useFormatDateForDateTimeLocal from "@/hooks/useFormatDateForDateTimeLocal";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import { Calendar, Clipboard, Link, MapPin, User2 } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateInterviewSchema } from "../schemas";
import UpdateInterviewFormHeader from "./UpdateInterviewFormHeader";
import UpdateInterviewFormInput from "./UpdateInterviewFormInput";

interface UpdateInterviewFormProps {
  id: number;
}

const UpdateInterviewForm: FC<UpdateInterviewFormProps> = ({ id }) => {
  const router = useTransitionRouter();
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { formatDateForDateTimeLocal } = useFormatDateForDateTimeLocal();
  const { data: interview, isPending: isInterviewPending } = useGetInterview({
    id,
  });
  const { mutateAsync: updateInterview, isPending: isUpdateInterviewPending } =
    useUpdateInterview();

  const getValidationSchema = () => {
    return isOnline
      ? updateInterviewSchema.omit(["location"])
      : updateInterviewSchema;
  };

  const formik = useFormik({
    initialValues: {
      jobApplicationId: 0,
      scheduledDate: "",
      interviewerName: "",
      location: "",
      meetingLink: "",
      notes: "",
      isDeleted: false,
    },
    validationSchema: getValidationSchema(),
    onSubmit: async (values) => {
      try {
        const payload: UpdateIntervewPayload = {
          id,
          jobApplicationId: interview?.jobApplicationId || 0,
          scheduledDate: formatISO(new Date(values.scheduledDate)),
          interviewerName: values.interviewerName,
          location: isOnline ? "Online" : values.location,
          meetingLink: isOnline ? values.meetingLink : "",
          notes: values.notes ?? undefined,
          isDeleted: false,
        };
        await updateInterview(payload);
        router.push(`/dashboard/admin/interviews`);
        toast.success("Interview Updated Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (!isInterviewPending && interview && !isInitialized) {
      if (interview.location === "Online") {
        setIsOnline(true);
      }
      setIsInitialized(true);
    }
  }, [interview, isInterviewPending, isInitialized]);

  useEffect(() => {
    if (!isInterviewPending && interview) {
      formik.resetForm({
        values: {
          jobApplicationId: interview.jobApplicationId || 0,
          scheduledDate: formatDateForDateTimeLocal(interview.scheduledDate),
          interviewerName: interview.interviewerName,
          location: isOnline ? "Online" : interview.location,
          meetingLink:
            isOnline && interview.meetingLink ? interview.meetingLink : "",
          notes: interview.notes || "",
          isDeleted: false,
        },
      });
    }
  }, [interview, isInterviewPending, id, isOnline]);

  useEffect(() => {
    formik.validateForm();
  }, [isOnline]);

  if (isInterviewPending) {
    return <LoadingScreen />;
  }

  if (!interview) {
    return <DataNotFound />;
  }

  return (
    <div className="p-4 md:p-8">
      <UpdateInterviewFormHeader />
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-2">
            <UpdateInterviewFormInput
              name="scheduledDate"
              label="Schedule Date"
              type="datetime-local"
              formik={formik}
              icon={<Calendar size={18} />}
              isNotEmpty={true}
              isDisabled={isUpdateInterviewPending}
            />
            <div className="col-span-3">
              <UpdateInterviewFormInput
                name="interviewerName"
                label="Interviewer Name"
                placeholder="Ex. John Doe"
                formik={formik}
                icon={<User2 size={18} />}
                isNotEmpty={true}
                isDisabled={isUpdateInterviewPending}
              />
            </div>
          </div>
          <div className="col-span-3 space-y-4">
            {isOnline ? (
              <UpdateInterviewFormInput
                name="meetingLink"
                label="Meeting Link"
                placeholder="Ex. https://us05web.zoom.us/j/..."
                formik={formik}
                icon={<Link size={18} />}
                isNotEmpty={true}
                isDisabled={!isOnline || isUpdateInterviewPending}
              />
            ) : (
              <UpdateInterviewFormInput
                name="location"
                label="Location"
                placeholder="Ex. Pacific Building 4th Floor, Yogyakarta"
                formik={formik}
                icon={<MapPin size={18} />}
                isNotEmpty={true}
                isDisabled={isOnline || isUpdateInterviewPending}
              />
            )}
            <div className="flex items-center gap-2">
              <Switch
                id="is-online"
                disabled={false}
                checked={isOnline}
                onCheckedChange={(checked) => {
                  setIsOnline(checked);
                  if (checked) {
                    formik.setFieldValue("location", "Online");
                  } else {
                    formik.setFieldValue("location", "");
                    formik.setFieldValue("meetingLink", "");
                  }
                }}
              />
              <Label htmlFor="is-online">Online</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="flex items-center gap-2 text-base font-semibold text-gray-700"
            >
              <Clipboard size={18} />
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="ex. Applicant must arrive at the interview location 1 hour before scheduled time."
              disabled={isUpdateInterviewPending}
              value={formik.values.notes}
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col justify-end gap-4 sm:flex-row">
            <Button
              type="submit"
              disabled={isUpdateInterviewPending}
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-fit"
            >
              {isUpdateInterviewPending
                ? "Updating Schedule..."
                : "Update Schedule"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateInterviewForm;
