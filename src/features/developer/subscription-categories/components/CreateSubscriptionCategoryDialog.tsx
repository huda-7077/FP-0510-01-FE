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
import useCreateSubscriptionCategory from "@/hooks/api/subscription-categories/useCreataSubscriptionCategories";
import { useFormik } from "formik";
import {
  Captions,
  PlusCircle,
  Trash2,
  Tag,
  DollarSign,
  FileText,
  List,
} from "lucide-react";
import { useState } from "react";
import { CreateSubscriptionCategorySchema } from "../schemas";

interface CreateSubscriptionCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSubscriptionCategoryDialog({
  isOpen,
  onClose,
}: CreateSubscriptionCategoryDialogProps) {
  const [features, setFeatures] = useState<string[]>([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { mutateAsync: createSubscriptionCategory, isPending } =
    useCreateSubscriptionCategory();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      features: [],
    },
    validationSchema: CreateSubscriptionCategorySchema,
    onSubmit: async (values) => {
      try {
        await createSubscriptionCategory(values);
        onClose();
      } catch (error) {
        console.error("Creation failed:", error);
      }
    },
  });

  const addFeature = () => {
    setFeatures([...features, ""]);
    formik.setFieldValue("features", [...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
    formik.setFieldValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
    formik.setFieldValue("features", updatedFeatures);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900 sm:p-8">
          <DialogHeader className="mb-6 space-y-1">
            <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Create Subscription Category
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details below to create a new subscription category
            </p>
          </DialogHeader>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Name <span className="text-red-500">*</span>
                </div>
              </Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter category name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Description <span className="text-red-500">*</span>
                </div>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter category description"
                rows={4}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Price (Rp) <span className="text-red-500">*</span>
                </div>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter price in Rupiah"
                min="0"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-xs text-red-500">{formik.errors.price}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  Features
                </div>
              </Label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 transition-all"
                  >
                    <Input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      className="h-10 w-10 rounded-md border-gray-300 text-gray-500 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addFeature}
                className="w-full gap-2 rounded-md border-dashed border-gray-300 py-6 text-blue-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <PlusCircle className="h-5 w-5" />
                Add Feature
              </Button>
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
        <AlertDialogContent className="max-w-lg rounded-lg">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-xl font-semibold">
              Confirm Submission
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-400">
              Are you sure you want to create this subscription category? Once
              created, this data cannot be deleted through the UI. Please ensure
              you understand the consequences before proceeding
              <div className="mt-4 rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                <p className="font-semibold text-amber-800 dark:text-amber-200">
                  Type <span className="font-bold">CONFIRM</span> below to
                  proceed
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input
            id="confirm-text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-2"
            placeholder="Type CONFIRM here"
          />

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                formik.handleSubmit();
                setIsAlertDialogOpen(false);
              }}
              disabled={isPending || confirmText !== "CONFIRM"}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isPending ? "Creating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
