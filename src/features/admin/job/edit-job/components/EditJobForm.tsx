"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetCompanyLocations } from "@/hooks/api/company-location/useGetCompanyLocations";
import useGetCompanyJob from "@/hooks/api/job/useGetCompanyJob";
import useUpdateJob, { UpdateJobPayload } from "@/hooks/api/job/useUpdateJob";
import useFormatTitleCase from "@/hooks/useFormatTitleCase";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import {
  AlignLeft,
  Calendar,
  DollarSign,
  Tag,
  Trash2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { JobCategory } from "../../consts";
import { createJobSchema } from "../schemas";
import CategorySelectInput from "./CategorySelectInput";
import EditJobFormHeader from "./EditJobFormHeader";
import EditJobFormInput from "./EditJobFormInput";
import EditJobFormSelectInput from "./EditJobFormSelectInput";
import TagsInput from "./EditJobFormTagInput";
import useGetCompanyProfile from "@/hooks/api/company/useGetCompanyProfile";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

interface EditJobFormProps {
  id: number;
}

const EditJobForm: FC<EditJobFormProps> = ({ id }) => {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [generateSlug, setGenerateSlug] = useState(false);
  const [requiresAssessment, setRequiresAssessment] = useState(false);
  const bannerImageReff = useRef<HTMLInputElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const { formatTitleCase } = useFormatTitleCase();

  const { data: job, isPending: isJobPending } = useGetCompanyJob({
    jobId: id,
  });

  const { mutateAsync: updateJob, isPending: isUpdateJobPending } =
    useUpdateJob(id);

  const { data: companyProfile, isLoading: isCompanyProfileLoading } =
    useGetCompanyProfile();

  const formik = useFormik({
    initialValues: {
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
          generateSlug,
        };
        const updatedJob = await updateJob(payload);
        router.push(`/dashboard/admin/jobs/${updatedJob.id}`);
        toast.success("Job Updated Successfully");
      } catch (error) {
        console.log(error);
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

      const validCategory = JobCategory.includes(job.category)
        ? job.category
        : "";

      formik.resetForm({
        values: {
          title: job.title || "",
          description: job.description || "",
          bannerImage: null,
          category: validCategory,
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
  }, [job, isJobPending, companyProfile, isCompanyProfileLoading, id]);

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

  if (isJobPending && isCompanyProfileLoading) {
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
          <div className="grid gap-4">
            <EditJobFormInput
              name="title"
              label="Job Title"
              placeholder="Ex. Junior Software Engineer"
              formik={formik}
              icon={<Tag size={18} />}
              isNotEmpty={true}
              isDisabled={isUpdateJobPending}
            />
            <TooltipProvider>
              <div className="flex items-center justify-end space-x-2">
                <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                  <TooltipTrigger asChild>
                    <div>
                      <Switch
                        id="is-generate-slug"
                        onCheckedChange={(value) => {
                          setGenerateSlug(value);
                          setShowTooltip(true);
                        }}
                        disabled={isUpdateJobPending}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center border border-yellow-300 bg-yellow-100 text-yellow-800">
                    <TriangleAlert className="mr-2 h-4 w-4" />
                    <p className="w-[205px] text-balance">
                      Caution! Changing the slug will break existing links.
                      Ensure you understand the consequences before proceeding.
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Label htmlFor="is-generate-slug">Generate Slug</Label>
              </div>
            </TooltipProvider>
          </div>

          <div className={`space-y-2`}>
            <Label
              htmlFor="slug"
              className="flex items-center gap-2 text-base font-semibold text-gray-700"
            >
              <Tag className="h-4 w-4" />
              Slug
            </Label>
            <div className="relative">
              <Input
                id="slug"
                type="text"
                disabled={true}
                value={job.slug}
                className={`w-full rounded-md border bg-white px-4 py-3 text-gray-800 transition-all duration-300 hover:bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-blue-200`}
              />
            </div>
          </div>

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
            <CategorySelectInput
              name="category"
              label="Category"
              formik={formik}
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
            companyLocations={companyProfile?.companyLocations || []}
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
                      job.preTestAssessments[0] &&
                      job.preTestAssessments[0].status === "DRAFT") ||
                    (requiresAssessment &&
                      job.preTestAssessments.length <= 0) ||
                    isUpdateJobPending
                  }
                />
                <Label
                  htmlFor="is-publish"
                  className={`${
                    requiresAssessment &&
                    job.preTestAssessments[0] &&
                    job.preTestAssessments[0].status === "DRAFT" &&
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
