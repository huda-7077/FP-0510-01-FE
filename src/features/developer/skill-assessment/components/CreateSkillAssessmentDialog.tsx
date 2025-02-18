"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateSkillAssessment from "@/hooks/api/skill-assessment/useCreateSkillAssessment";
import { useFormik } from "formik";
import { Receipt, Upload, X, BookOpen, FileText, Award } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateSkillAssessmentSchema } from "../schemas";

interface CreateSkillAssessmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSkillAssessmentDialog({
  isOpen,
  onClose,
}: CreateSkillAssessmentDialogProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const badgeImageRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createSkillAssessment, isPending } =
    useCreateSkillAssessment();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      passingScore: 75,
      badgeImage: null as File | null,
    },
    validationSchema: CreateSkillAssessmentSchema,
    onSubmit: async (values) => {
      try {
        await createSkillAssessment(values);
        onClose();
      } catch (error) {
        console.error("Creation failed:", error);
      }
    },
  });

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

  const handleConfirm = () => {
    formik.handleSubmit();
    setIsAlertDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900 sm:p-8">
          <DialogHeader className="mb-6 space-y-1">
            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Create Skill Assessment
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details below to create a new skill assessment
            </p>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
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

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Badge Image
                </h3>
              </div>
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

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-24"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!formik.isValid || !formik.dirty}
                onClick={() => setIsAlertDialogOpen(true)}
                className="w-24 bg-blue-600 hover:bg-blue-700"
              >
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Confirm Submission
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to create this skill assessment?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel
              onClick={() => setIsAlertDialogOpen(false)}
              className="w-24"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isPending}
              className="w-24 bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Creating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
