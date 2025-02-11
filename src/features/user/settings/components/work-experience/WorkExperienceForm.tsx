"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkExperience } from "@/hooks/api/work-experience/useCreateWorkExperience";
import { useFormik } from "formik";
import { Loader2, Plus } from "lucide-react";
import { workExperienceSchema } from "../../schemas";

const WorkExperienceForm = () => {
  const { mutate: createWorkExperience, isPending } = useCreateWorkExperience();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobTitle: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      isCurrentJob: false,
      description: "",
    },
    validationSchema: workExperienceSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        startDate: new Date(values.startDate),
        endDate: values.endDate ? new Date(values.endDate) : null,
      };
      createWorkExperience(payload);
    },
  });

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.companyName}
              className={
                formik.errors.companyName && formik.touched.companyName
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-xs text-red-500">
                {formik.errors.companyName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.jobTitle}
              className={
                formik.errors.jobTitle && formik.touched.jobTitle
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.jobTitle && formik.errors.jobTitle && (
              <p className="text-xs text-red-500">{formik.errors.jobTitle}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
              className={
                formik.errors.startDate && formik.touched.startDate
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-xs text-red-500">{formik.errors.startDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate || ""}
              disabled={formik.values.isCurrentJob}
              className={
                formik.errors.endDate && formik.touched.endDate
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="text-xs text-red-500">{formik.errors.endDate}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isCurrentJob"
            checked={formik.values.isCurrentJob}
            onCheckedChange={(checked) => {
              formik.setFieldValue("isCurrentJob", checked);
              if (checked) {
                formik.setFieldValue("endDate", null);
                formik.setFieldTouched("endDate", false);
              }
            }}
          />
          <Label htmlFor="isCurrentJob">I currently work here</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            rows={4}
            className={
              formik.errors.description && formik.touched.description
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-xl bg-[#0a65cc] hover:bg-[#254e7e]"
            disabled={isPending || !formik.isValid}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Experience
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
