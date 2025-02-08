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
const SubscriptionAlertDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  action,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  action: "ACCEPTED" | "REJECTED";
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "ACCEPTED" ? "Accept Payment" : "Reject Payment"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to{" "}
            {action === "ACCEPTED" ? "accept" : "reject"} this payment? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onConfirm}
          >
            {action === "ACCEPTED" ? "Accept" : "Reject"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscriptionAlertDialog;
