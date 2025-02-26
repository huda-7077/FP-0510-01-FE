"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUpdateAssessment from "@/hooks/api/assessment/useUpdateAssessment";
import { Assessment, AssessmentStatus } from "@/types/assessment";
import { useFormik } from "formik";
import { ChevronsDown, ChevronsUp, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { UpdateAssessmentSchema } from "../../schemas";
import { toast } from "react-toastify";

interface AssessmentDetailsCardProps {
  assessment: Assessment;
  slug: string;
  isProcessing: boolean;
}

const AssessmentDetailsCard: FC<AssessmentDetailsCardProps> = ({
  assessment,
  slug,
  isProcessing,
}) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [generateSlug, setGenerateSlug] = useState(false);
  const { mutateAsync: updateAssessment, isPending: isUpdateJobStatusPending } =
    useUpdateAssessment();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      passingScore: 0,
      status: AssessmentStatus.DRAFT,
    },
    validationSchema: UpdateAssessmentSchema,
    onSubmit: async (values) => {
      try {
        const updateAssessmentData = await updateAssessment({
          ...values,
          slug,
          generateSlug,
        });

        if (generateSlug === true) {
          await updateAssessmentData.preTestAssessment;

          router.replace(
            `/pre-test-assessment/update/${updateAssessmentData.preTestAssessment.slug}`,
          );
        }

        toast.success("Assessments Updated Successfullly");
      } catch (error) {
        console.error("Creation failed:", error);
      }
    },
  });

  useEffect(() => {
    if (assessment) {
      formik.setValues({
        title: assessment.title,
        description: assessment.description,
        passingScore: assessment.passingScore,
        status: assessment.status,
      });
    }
  }, [assessment]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 bg-blue-600 px-6 py-3">
            <CardTitle className="flex text-xl font-semibold text-white">
              Skill Assessment Details
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={toggleCollapse}
              className="flex text-white hover:bg-blue-700 hover:text-white"
            >
              {isCollapsed ? <ChevronsDown /> : <ChevronsUp />}
            </Button>
          </CardHeader>
          {!isCollapsed && (
            <CardContent className="space-y-5 p-6">
              <div>
                <Label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter test title"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  disabled={isProcessing || isUpdateJobStatusPending}
                  required
                />
                <TooltipProvider>
                  <div
                    className={`flex flex-col md:flex-row ${!!formik.touched.title && !!formik.errors.title ? "justify-between" : "justify-end"}`}
                  >
                    {!!formik.touched.title && !!formik.errors.title && (
                      <span className="mt-1 text-sm text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                    <div className="flex flex-row items-center justify-end py-1">
                      <span className="ml-1 text-xs text-gray-600">
                        Generate slug
                      </span>
                      <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
                        <TooltipTrigger asChild>
                          <Checkbox
                            id="generateSlug"
                            name="generateSlug"
                            type="button"
                            checked={generateSlug}
                            onClick={() => {
                              setShowTooltip(true);
                              setGenerateSlug(!generateSlug);
                            }}
                            disabled={isProcessing || isUpdateJobStatusPending}
                            className="mx-1 flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-white"
                          />
                        </TooltipTrigger>
                        <TooltipContent className="flex items-center border border-yellow-300 bg-yellow-100 text-yellow-800">
                          <TriangleAlert className="mr-2 h-4 w-4" />
                          <p className="w-[205px] text-balance">
                            Caution! Changing the slug will break existing
                            links. Ensure you understand the consequences before
                            proceeding.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TooltipProvider>
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter test description"
                  className="min-h-[100px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  rows={4}
                  disabled={isProcessing || isUpdateJobStatusPending}
                />
                {!!formik.touched.description &&
                  !!formik.errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.description}
                    </p>
                  )}
              </div>
              <div>
                <Label
                  htmlFor="score"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Passing Score
                </Label>
                <Input
                  id="passingScore"
                  type="number"
                  min={0}
                  max={100}
                  value={formik.values.passingScore}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter test passing score"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  disabled={isProcessing || isUpdateJobStatusPending}
                />
                {!!formik.touched.passingScore &&
                  !!formik.errors.passingScore && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.passingScore}
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={
                    isProcessing || !formik.isValid || isUpdateJobStatusPending
                  }
                >
                  {isUpdateJobStatusPending ? "Updating..." : "Update Details"}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </form>
    </>
  );
};

export default AssessmentDetailsCard;
