"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useCreateInterview, {
  CreateInterviewPayload,
} from "@/hooks/api/interview/useCreateInterview";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import { Calendar, Clipboard, Link, MapPin, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createInterviewSchema } from "../schemas";
import CreateInterviewFormHeader from "./CreateInterviewFormHeader";
import CreateInterviewFormInput from "./CreateInterviewFormInput";

interface CreateInterviewFormProps {
  jobApplicationId: number;
}

const CreateInterviewForm: FC<CreateInterviewFormProps> = ({
  jobApplicationId,
}) => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const { mutateAsync: createInterview, isPending: isCreateInterviewPending } =
    useCreateInterview();

  const getValidationSchema = () => {
    return isOnline
      ? createInterviewSchema.omit(["location"])
      : createInterviewSchema;
  };

  const formik = useFormik({
    initialValues: {
      jobApplicationId,
      scheduledDate: "",
      interviewerName: "",
      location: "",
      meetingLink: "",
      notes: "",
    },
    validationSchema: getValidationSchema(),
    onSubmit: async (values) => {
      try {
        const payload: CreateInterviewPayload = {
          jobApplicationId,
          scheduledDate: formatISO(new Date(values.scheduledDate)),
          interviewerName: values.interviewerName,
          location: isOnline ? "Online" : values.location,
          meetingLink: isOnline ? values.meetingLink : undefined,
          notes: values.notes ?? undefined,
        };
        await createInterview(payload);
        router.push(`/dashboard/admin/interviews`);
        toast.success("Interview Created Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [isOnline]);

  return (
    <div className="p-4 md:p-8">
      <CreateInterviewFormHeader />
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-2">
            <CreateInterviewFormInput
              name="scheduledDate"
              label="Schedule Date"
              type="datetime-local"
              formik={formik}
              icon={<Calendar size={18} />}
              isNotEmpty={true}
              isDisabled={isCreateInterviewPending}
            />
            <div className="col-span-3">
              <CreateInterviewFormInput
                name="interviewerName"
                label="Interviewer Name"
                placeholder="Ex. John Doe"
                formik={formik}
                icon={<User2 size={18} />}
                isNotEmpty={true}
                isDisabled={isCreateInterviewPending}
              />
            </div>
          </div>
          <div className="col-span-3 space-y-4">
            {isOnline ? (
              <CreateInterviewFormInput
                name="meetingLink"
                label="Meeting Link"
                placeholder="Ex. https://us05web.zoom.us/j/..."
                formik={formik}
                icon={<Link size={18} />}
                isNotEmpty={true}
                isDisabled={!isOnline || isCreateInterviewPending}
              />
            ) : (
              <CreateInterviewFormInput
                name="location"
                label="Location"
                placeholder="Ex. Pacific Building 4th Floor, Yogyakarta"
                formik={formik}
                icon={<MapPin size={18} />}
                isNotEmpty={true}
                isDisabled={isOnline || isCreateInterviewPending}
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
              disabled={isCreateInterviewPending}
              value={formik.values.notes}
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex flex-col justify-end gap-4 sm:flex-row">
            <Button
              type="submit"
              disabled={isCreateInterviewPending}
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-fit"
            >
              {isCreateInterviewPending
                ? "Creating Schedule..."
                : "Create Schedule"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInterviewForm;
