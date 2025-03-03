"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmitConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
  isPending: boolean;
}

export const SubmitConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
  isPending,
}: SubmitConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to submit your application for {jobTitle}?
            Please ensure all information is correct before proceeding.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800"
          >
            {isPending ? "Submitting..." : "Confirm Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
