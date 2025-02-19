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
import useUpdateSubscriptionCategory from "@/hooks/api/subscription-categories/useUpdateSubscriptionCategories";
import { SubscriptionCategory } from "@/types/subscription";
import { useFormik } from "formik";
import { Trash2, DollarSign, FileText, List, PlusCircle } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

interface SubscriptionCategoryDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: SubscriptionCategory;
}

export function SubscriptionCategoryDetailsDialog({
  isOpen,
  onClose,
  category,
}: SubscriptionCategoryDetailsDialogProps) {
  const [features, setFeatures] = useState<string[]>(category.features || []);

  const { mutateAsync: updateSubscriptionCategory, isPending } =
    useUpdateSubscriptionCategory();

  const formik = useFormik({
    initialValues: {
      price: category.price || 0,
      description: category.description || "",
    },
    validationSchema: Yup.object({
      price: Yup.number().required("Price is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const id = category.id;
        const updatedData = { ...values, id, features };
        await updateSubscriptionCategory(updatedData);
        onClose();
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
  });

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Edit Subscription Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="price"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Price (Rp)
              </div>
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-xs text-red-500">{formik.errors.price}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Description
              </div>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              <div className="flex items-center">
                <List className="mr-2 h-4 w-4" />
                Features
              </div>
            </Label>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="px-2 py-1 text-red-500 hover:text-red-600"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full text-blue-600"
              onClick={addFeature}
            >
              <div className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Feature
              </div>
            </Button>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
