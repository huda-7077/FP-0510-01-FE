"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useGetJob from "@/hooks/api/job/useGetJob";
import useUpdateJob, { UpdateJobPayload } from "@/hooks/api/job/useUpdateJob";
import useFormatTitleCase from "@/hooks/useFormatTitleCase";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import {
  AlignLeft,
  Calendar,
  DollarSign,
  LibraryBig,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createJobSchema } from "../schemas";
import EditJobFormHeader from "./EditJobFormHeader";
import EditJobFormInput from "./EditJobFormInput";
import EditJobFormSelectInput from "./EditJobFormSelectInput";
import TagsInput from "./EditJobFormTagInput";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { useGetCompanyLocations } from "@/hooks/api/company-location/useGetCompanyLocations";
import useGetCompanyJob from "@/hooks/api/job/useGetCompanyJob";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

interface EditJobFormProps {
  id: number;
}

const EditJobForm: FC<EditJobFormProps> = ({ id }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const companyId = user?.companyId || 0;

  const [selectedImage, setSelectedImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [requiresAssessment, setRequiresAssessment] = useState(false);
  const bannerImageReff = useRef<HTMLInputElement | null>(null);

  const { formatTitleCase } = useFormatTitleCase();

  const { data: job, isPending: isJobPending } = useGetCompanyJob({
    jobId: id,
  });

  const { mutateAsync: updateJob, isPending: isUpdateJobPending } =
    useUpdateJob(id);

  const { data: companyLocations, isLoading: isCompanyLocationsLoading } =
    useGetCompanyLocations();

  const formik = useFormik({
    initialValues: {
      companyId: 0,
      title: "",
      description: "",
      bannerImage: null,
      category: "",
      salary: 0,
      tags: [] as string[],
      applicationDeadline: "",
      isPublished: false,
      requiresAssessment: false,
      companyLocationId: 0,
    },
    validationSchema: createJobSchema,
    onSubmit: async (values) => {
      try {
        const payload: UpdateJobPayload = {
          companyId,
          title: values.title,
          description: values.description,
          bannerImage: values.bannerImage,
          category: formatTitleCase(values.category),
          salary: values.salary,
          tags: values.tags,
          applicationDeadline: formatISO(new Date(values.applicationDeadline)),
          isPublished,
          requiresAssessment,
          companyLocationId: Number(values.companyLocationId),
        };
        const updatedJob = await updateJob(payload);
        router.push(`/dashboard/admin/jobs/${updatedJob.id}`);
        toast.success("Job Updated Successfully");
      } catch (error) {
        console.log(error);
        toast.error((error as Error).toString());
      }
    },
  });

  useEffect(() => {
    if (!isJobPending && job) {
      const applicationDeadline = job.applicationDeadline
        ? !isNaN(new Date(job.applicationDeadline).getTime())
          ? new Date(
              new Date(job.applicationDeadline).getTime() -
                new Date().getTimezoneOffset() * 60000,
            )
              .toISOString()
              .slice(0, 10)
          : ""
        : "";

      // Reset Formik Values
      formik.resetForm({
        values: {
          companyId: job.companyId,
          title: job.title || "",
          description: job.description || "",
          bannerImage: null,
          category: job.category || "",
          salary: job.salary || 0,
          tags: job.tags || [],
          applicationDeadline,
          isPublished: job.isPublished,
          requiresAssessment: job.requiresAssessment,
          companyLocationId: job.companyLocationId,
        },
      });

      setSelectedImage(job.bannerImage || "");
      setIsPublished(job.isPublished);
      setRequiresAssessment(job.requiresAssessment);

      if (bannerImageReff.current) {
        bannerImageReff.current.value = "";
      }
    }
  }, [job, isJobPending, id]);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("bannerImage", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("bannerImage", null);
    setSelectedImage("");
    if (bannerImageReff.current) {
      bannerImageReff.current.value = "";
    }
  };

  if (status === "loading" || isJobPending || isCompanyLocationsLoading) {
    return <LoadingScreen />;
  }

  if (!job) {
    return <DataNotFound />;
  }

  return (
    <div className="p-4 md:p-8">
      <EditJobFormHeader />
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-8">
          {/* Banner Image Preview */}
          {selectedImage && (
            <div className="w-full">
              <div className="relative h-[200px] overflow-hidden rounded-xl shadow-md sm:h-[300px] md:h-[480px]">
                <Image
                  src={selectedImage}
                  alt="thumbnail"
                  fill
                  className="object-cover duration-300 hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="space-y-3 rounded-lg border border-dashed border-blue-200 bg-blue-50/50 p-6">
            <Label className="flex items-center gap-2 text-lg font-semibold text-blue-700">
              <Upload size={20} />
              Job Banner
            </Label>
            <div className="flex items-center gap-3">
              <Input
                ref={bannerImageReff}
                type="file"
                accept="image/*"
                onChange={onChangeThumbnail}
                disabled={isUpdateJobPending}
                className="border-blue-100 bg-white hover:cursor-pointer focus:border-blue-500 focus:ring-blue-200"
              />
              {selectedImage && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={removeThumbnail}
                  className="px-2 py-1 transition-colors hover:bg-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
            {!!formik.touched.bannerImage && !!formik.errors.bannerImage && (
              <p className="text-sm text-red-500">
                {formik.errors.bannerImage}
              </p>
            )}
          </div>

          <EditJobFormInput
            name="title"
            label="Job Title"
            placeholder="Ex. Junior Software Engineer"
            formik={formik}
            icon={<Tag size={18} />}
            isNotEmpty={true}
            isDisabled={isUpdateJobPending}
          />

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="flex items-center gap-2 text-base font-semibold text-gray-700"
            >
              <AlignLeft size={18} />
              Job Description
            </Label>
            <RichTextEditor
              label="description"
              value={formik.values.description}
              onChange={(value: string) =>
                formik.setFieldValue("description", value)
              }
              touched={formik.touched.description}
              error={formik.errors.description}
              onBlur={() => formik.handleBlur}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <EditJobFormInput
              name="category"
              label="Job Category"
              placeholder="Ex. Software Development"
              formik={formik}
              icon={<LibraryBig size={18} />}
              isNotEmpty={true}
              isDisabled={isUpdateJobPending}
            />
            <EditJobFormInput
              name="salary"
              label="Salary"
              placeholder="10000000"
              formik={formik}
              type="number"
              icon={<DollarSign size={18} />}
              isNotEmpty={false}
              isDisabled={isUpdateJobPending}
            />
            <EditJobFormInput
              name="applicationDeadline"
              label="Application Deadline"
              placeholder="Choose when the job application ends"
              type="date"
              formik={formik}
              icon={<Calendar size={18} />}
              isNotEmpty={true}
              isDisabled={isUpdateJobPending}
            />
          </div>

          <TagsInput
            label="Tags"
            placeholder="Ex. Web Development, Network"
            value={formik.values.tags}
            formik={formik}
            onChange={(tags: string[]) => formik.setFieldValue("tags", tags)}
            isNotEmpty={true}
            isDisabled={isUpdateJobPending}
          />

          <EditJobFormSelectInput
            name="companyLocationId"
            label="Company Location"
            placeholder="Select Company Location"
            companyLocations={companyLocations || []}
            formik={formik}
            isDisabled={isUpdateJobPending}
          />

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center space-x-2">
                <Switch
                  id="require-assessment"
                  disabled={isUpdateJobPending}
                  checked={requiresAssessment}
                  onCheckedChange={setRequiresAssessment}
                />
                <Label htmlFor="require-assessment">Require Assessment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-publish"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                  disabled={
                    (requiresAssessment &&
                      job.preTestAssessments[0]?.status === "DRAFT") ||
                    (requiresAssessment &&
                      job.preTestAssessments.length <= 0) ||
                    isUpdateJobPending
                  }
                />
                <Label
                  htmlFor="is-publish"
                  className={`${
                    requiresAssessment &&
                    job.preTestAssessments[0]?.status === "DRAFT" &&
                    "text-gray-400"
                  }`}
                >
                  Publish
                </Label>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isUpdateJobPending}
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-fit"
            >
              {isUpdateJobPending ? "Updating Job..." : "Edit Job"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
