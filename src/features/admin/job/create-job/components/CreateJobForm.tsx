"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useCreateJob, { CreateJobPayload } from "@/hooks/api/job/useCreateJob";
import useFormatTitleCase from "@/hooks/useFormatTitleCase";
import { formatISO } from "date-fns";
import { useFormik } from "formik";
import {
  AlignLeft,
  Calendar,
  DollarSign,
  Tag,
  Trash2,
  Upload,
} from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { createJobSchema } from "../schemas";
import CategorySelectInput from "./CategorySelectInput";
import CompanyLocationSelectInput from "./CompanyLocationSelectInput";
import CreateJobFormHeader from "./CreateJobFormHeader";
import CreateJobFormInput from "./CreateJobFormInput";
import TagsInput from "./CreateJobFormTagInput";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const CreateJobForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [requiresAssessment, setRequiresAssessment] = useState<boolean>(false);

  const bannerImageReff = useRef<HTMLInputElement>(null);

  const { formatTitleCase } = useFormatTitleCase();

  useEffect(() => {
    if (requiresAssessment) {
      setIsPublished(false);
    }
  }, [isPublished, requiresAssessment]);

  const { mutateAsync: createJob, isPending: isCreateJobPending } =
    useCreateJob();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      bannerImage: null,
      category: "",
      salary: 0,
      tags: [],
      applicationDeadline: "",
      isPublished,
      requiresAssessment,
      companyLocationId: "",
    },
    validationSchema: createJobSchema,
    onSubmit: async (values) => {
      try {
        const payload: CreateJobPayload = {
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
        const newJob = await createJob(payload);
        router.push(`/dashboard/admin/jobs/${newJob.id}`);
        toast.success("Job Created Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (status === "loading") {
    return <LoadingScreen />;
  }

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

  return (
    <div className="p-4 md:p-8">
      <CreateJobFormHeader />
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
                disabled={isCreateJobPending}
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

          <CreateJobFormInput
            name="title"
            label="Job Title"
            placeholder="Ex. Junior Software Engineer"
            formik={formik}
            icon={<Tag size={18} />}
            isNotEmpty={true}
            isDisabled={isCreateJobPending}
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
            <CategorySelectInput
              name="category"
              label="Category"
              formik={formik}
              isDisabled={isCreateJobPending}
            />
            <CreateJobFormInput
              name="salary"
              label="Salary"
              placeholder="10000000"
              formik={formik}
              type="number"
              icon={<DollarSign size={18} />}
              isNotEmpty={false}
              isDisabled={isCreateJobPending}
            />
            <CreateJobFormInput
              name="applicationDeadline"
              label="Application Deadline"
              placeholder="Choose when the job application ends"
              type="date"
              formik={formik}
              icon={<Calendar size={18} />}
              isNotEmpty={true}
              isDisabled={isCreateJobPending}
            />
          </div>

          <TagsInput
            label="Tags"
            placeholder="Ex. Web Development, Network"
            value={formik.values.tags}
            formik={formik}
            onChange={(tags: string[]) => formik.setFieldValue("tags", tags)}
            isNotEmpty={true}
            isDisabled={isCreateJobPending}
          />

          <CompanyLocationSelectInput
            name="companyLocationId"
            label="Company Location"
            placeholder="Select Company Location"
            formik={formik}
            isDisabled={isCreateJobPending}
          />

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center space-x-2">
                <Switch
                  id="require-assessment"
                  disabled={isCreateJobPending}
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
                  disabled={requiresAssessment || isCreateJobPending}
                />
                <Label
                  htmlFor="is-publish"
                  className={`${requiresAssessment && "text-gray-400"}`}
                >
                  Publish
                </Label>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isCreateJobPending}
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-fit"
            >
              {isCreateJobPending ? "Creating Job..." : "Create Job"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
