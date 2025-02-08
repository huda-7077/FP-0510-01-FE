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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

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
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      description: Yup.string().required("Description is required"),
      features: Yup.array()
        .of(Yup.string().required("Feature is required"))
        .min(1, "At least one feature is required"),
    }),
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
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Create Subscription Category
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price (Rp)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-xs text-red-500">{formik.errors.price}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div>
              <Label>Features</Label>
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
                + Add Feature
              </Button>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!formik.isValid || !formik.dirty}
                onClick={() => setIsAlertDialogOpen(true)}
              >
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create this subscription category? Once
              created, this data cannot be deleted through the UI. Please ensure
              you understand the consequences before proceeding. Type{" "}
              <strong>CONFIRM</strong> below to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input
            id="confirm-text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-2"
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
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
