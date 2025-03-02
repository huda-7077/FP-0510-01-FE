"use client";
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
import useCreateCompanyReview from "@/hooks/api/review/useCreateCompanyReview";
import { useFormik } from "formik";
import { Award, BookOpen, FileText, Star } from "lucide-react";
import { CreateCompanyReviewSchema } from "../schemas";

interface CreateCompanyReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number;
}

export function CreateCompanyReviewDialog({
  isOpen,
  onClose,
  companyId,
}: CreateCompanyReviewDialogProps) {
  const { mutateAsync: createCompanyReview, isPending } =
    useCreateCompanyReview(companyId);

  const formik = useFormik({
    initialValues: {
      salaryEstimate: 0,
      workCultureRating: 0,
      workLifeBalanceRating: 0,
      careerGrowthRating: 0,
      facilitiesRating: 0,
      comment: "",
    },
    validationSchema: CreateCompanyReviewSchema,
    onSubmit: async (values) => {
      await createCompanyReview(values);
      onClose();
    },
  });

  const handleRatingClick = (field: string, value: number) => {
    formik.setFieldValue(field, value);
  };

  const ratingCategories = [
    {
      name: "workCultureRating",
      label: "Work Culture Rating",
      icon: <BookOpen className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "workLifeBalanceRating",
      label: "Work-Life Balance Rating",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "careerGrowthRating",
      label: "Career Growth Rating",
      icon: <Award className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "facilitiesRating",
      label: "Facilities Rating",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-0 shadow-xl dark:bg-gray-900 sm:max-w-xl">
        <div className="bg-blue-600 p-6 text-white">
          <DialogHeader className="mb-2 space-y-1">
            <DialogTitle className="text-2xl font-bold tracking-tight text-white">
              Create Review
            </DialogTitle>
            <p className="text-sm text-blue-100">
              Fill in the details below to create a review
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6">
          <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-gray-800">
            <div className="space-y-2">
              <Label
                htmlFor="salaryEstimate"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Salary Estimate
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
                  Rp
                </span>
                <Input
                  id="salaryEstimate"
                  name="salaryEstimate"
                  type="number"
                  value={formik.values.salaryEstimate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter salary estimate"
                  className="pl-8"
                />
              </div>

              {formik.touched.salaryEstimate &&
                formik.errors.salaryEstimate && (
                  <p className="text-xs text-red-500">
                    {formik.errors.salaryEstimate}
                  </p>
                )}
            </div>
          </div>

          <div className="mb-6 space-y-5">
            {ratingCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category.label}
                  </Label>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`h-6 w-6 cursor-pointer transition-all ${
                        Number(
                          formik.values[
                            category.name as keyof typeof formik.values
                          ],
                        ) >= value
                          ? "text-blue-500"
                          : "text-gray-200 hover:text-gray-300"
                      }`}
                      fill={
                        Number(
                          formik.values[
                            category.name as keyof typeof formik.values
                          ],
                        ) >= value
                          ? "currentColor"
                          : "none"
                      }
                      onClick={() => handleRatingClick(category.name, value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 space-y-2">
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your review here..."
              className="resize-none"
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="text-xs text-red-500">{formik.errors.comment}</p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-300 font-medium text-gray-700 sm:w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || isPending}
              className="w-full bg-blue-600 font-medium text-white hover:bg-blue-700 sm:w-32"
            >
              {isPending ? "Submitting..." : "Create Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
