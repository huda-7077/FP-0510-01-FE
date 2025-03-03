"use client";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateAssessment from "@/hooks/api/assessment/useCreateAssessment";
import { useFormik } from "formik";
import { Award, BookOpen, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { CreateAssessmentSchema } from "../schemas";
import { useRouter } from "next/navigation";

interface CreateSkillAssessmentFormProps {
  jobId: number;
}

export function CreateAssessmentComponent({
  jobId,
}: CreateSkillAssessmentFormProps) {
  const router = useRouter();

  const { mutateAsync: createAssessment, isPending } = useCreateAssessment();

  const formik = useFormik({
    initialValues: {
      jobId,
      title: "",
      description: "",
      passingScore: 75,
    },
    validationSchema: CreateAssessmentSchema,
    onSubmit: async (values) => {
      try {
        const newAssessment = await createAssessment(values);
        router.push(
          `/dashboard/admin/pre-test-assessment/update/${newAssessment.slug}`,
        );
        toast.success("Assessment Created Successfully");
      } catch (error) {
        console.error("Creation failed:", error);
      }
    },
  });

  const handleConfirm = () => {
    formik.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-24">
      <div className="container mx-auto w-full max-w-lg space-y-4 lg:max-w-3xl">
        <DashboardBreadcrumb
          route="admin"
          crumb1={{ href: "jobs", label: "Jobs" }}
          crumb2={{ href: `${jobId}`, label: "Jobs Details" }}
          lastCrumb="Create Assessment"
        />
        <Card className="rounded-xl">
          <CardHeader className="rounded-t-xl bg-blue-600 p-8">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Create Assessment
            </CardTitle>
            <CardDescription className="text-sm text-white">
              Fill in the details below to create a new pre test assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="rounded-xl bg-white p-6 dark:bg-gray-900 sm:p-8">
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6 rounded-xl"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    Title <span className="text-red-500">*</span>
                  </div>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter assessment title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-xs text-red-500">{formik.errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-blue-600" />
                    Description <span className="text-red-500">*</span>
                  </div>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={6}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter assessment description"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-xs text-red-500">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="passingScore"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-blue-600" />
                    Passing Score <span className="text-red-500">*</span>
                  </div>
                </Label>
                <Input
                  id="passingScore"
                  name="passingScore"
                  type="number"
                  value={formik.values.passingScore}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
                {formik.touched.passingScore && formik.errors.passingScore && (
                  <p className="text-xs text-red-500">
                    {formik.errors.passingScore}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 rounded-xl pt-4">
                <Button type="button" variant="outline" className="w-24">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  type="button"
                  disabled={!formik.isValid || !formik.dirty || isPending}
                  className="w-24 bg-blue-600 hover:bg-blue-700"
                >
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
