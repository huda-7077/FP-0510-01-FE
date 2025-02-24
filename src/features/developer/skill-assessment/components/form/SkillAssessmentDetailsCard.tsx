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
import useUpdateSkillAssessment from "@/hooks/api/skill-assessment/useUpdateSkillAssessment";
import {
  SkillAssessment,
  SkillAssessmentStatus,
} from "@/types/skillAssessments";
import { useFormik } from "formik";
import {
  ChevronsDown,
  ChevronsUp,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { UpdateSkillAssessmentSchema } from "../../schemas";

interface SkillAssessmentDetailsCardProps {
  skillAssessment: SkillAssessment;
  slug: string;
  isProcessing: boolean;
}

const SkillAssessmentDetailsCard: FC<SkillAssessmentDetailsCardProps> = ({
  skillAssessment,
  slug,
  isProcessing,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const badgeImageRef = useRef<HTMLInputElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [generateSlug, setGenerateSlug] = useState(false);
  const { mutateAsync: updateSkillAssessment } = useUpdateSkillAssessment();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      passingScore: 0,
      status: SkillAssessmentStatus.DRAFT,
      badgeImage: null as File | null,
    },
    validationSchema: UpdateSkillAssessmentSchema,
    onSubmit: async (values) => {
      try {
        const updateSkillAssessmentData = await updateSkillAssessment({
          ...values,
          slug,
          generateSlug,
        });

        if (generateSlug === true) {
          await updateSkillAssessmentData.skillAssessment;

          router.replace(
            `/dashboard/developer/skill-assessments/${updateSkillAssessmentData.skillAssessment.slug}`,
          );
        }
      } catch (error) {
        console.error("Creation failed:", error);
      }
    },
  });

  useEffect(() => {
    if (skillAssessment) {
      formik.setValues({
        title: skillAssessment.title,
        description: skillAssessment.description,
        passingScore: skillAssessment.passingScore,
        status: skillAssessment.status,
        badgeImage: null,
      });
      setSelectedImage(skillAssessment.badgeImage || "");

      if (badgeImageRef.current) {
        badgeImageRef.current.value = "";
      }
    }
  }, [skillAssessment]);

  const handleBadgeImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("badgeImage", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveBadgeImage = () => {
    formik.setFieldValue("badgeImage", null);
    setSelectedImage("");
    if (badgeImageRef.current) {
      badgeImageRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("badgeImage", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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
                  disabled={isProcessing}
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
                            disabled={isProcessing}
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
                />
                {!!formik.touched.passingScore &&
                  !!formik.errors.passingScore && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.passingScore}
                    </p>
                  )}
              </div>
              <div className="space-y-4">
                <Label
                  htmlFor="badgeImage"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Badge Image
                </Label>
                <div
                  className="group relative mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-all hover:border-blue-500 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {selectedImage ? (
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedImage}
                        alt="Badge Preview"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={handleRemoveBadgeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-4 text-center">
                      <Upload className="h-10 w-10 text-blue-600" />
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Drag & drop your badge image here or
                        </p>
                        <Input
                          ref={badgeImageRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBadgeImageChange}
                          className="hidden"
                          id="badgeImage"
                        />
                        <Label
                          htmlFor="badgeImage"
                          className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                        >
                          click to upload
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 1MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={isProcessing || !formik.isValid}
                >
                  Update Details
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </form>
    </>
  );
};

export default SkillAssessmentDetailsCard;
