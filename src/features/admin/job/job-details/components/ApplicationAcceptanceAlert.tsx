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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { FC, useState } from "react";

interface ApplicationAcceptanceAlertProps {
  applicantName: string;
  buttonIcon: any;
  color: string;
  isDisabled: boolean;
  status: string;
  updatedStatus: string;
  handleClick: (status: string, notes?: string) => void;
}

const ApplicationAcceptanceAlert: FC<ApplicationAcceptanceAlertProps> = ({
  applicantName,
  buttonIcon,
  color,
  isDisabled,
  status,
  updatedStatus,
  handleClick,
}) => {
  const [notes, setNotes] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`bg-${color}-600 p-3 text-white shadow-none hover:bg-${color}-700`}
          disabled={
            isDisabled ||
            (status === "IN_REVIEW" && updatedStatus !== "REJECTED")
          }
        >
          {buttonIcon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will permanently update{" "}
            <span className="font-semibold">{applicantName}</span>'s application
            status to{" "}
            <span className={`font-semibold text-${color}-600`}>
              {updatedStatus}
            </span>
            .
          </AlertDialogDescription>
          {updatedStatus === "REJECTED" && (
            <Textarea
              placeholder="Add notes (optional)"
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDisabled}
            onClick={() => handleClick(updatedStatus, notes)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApplicationAcceptanceAlert;
