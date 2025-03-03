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
import useCheckEmployeeExistance from "@/hooks/api/employee/useCheckEmployeeExistance";
import useRegisterEmployee from "@/hooks/api/employee/useRegisterEmployee";
import useFormatTitleCase from "@/hooks/useFormatTitleCase";
import { JobApplication } from "@/types/jobApplication";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

interface RegisterEmployeeButtonProps {
  application: JobApplication;
}

const RegisterEmployeeButton: FC<RegisterEmployeeButtonProps> = ({
  application,
}) => {
  const [position, setPosition] = useState("");
  const { formatTitleCase } = useFormatTitleCase();
  const {
    mutateAsync: registerEmployee,
    isPending: isRegisterEmployeePending,
  } = useRegisterEmployee();

  const {
    data: isEmployeeExist,
    isLoading: isCheckEmployeeExistanceLoading,
    refetch: refetchEmployeeExistance,
  } = useCheckEmployeeExistance(application.userId);

  const handleRegisterEmployee = async (userId: number, position: string) => {
    try {
      await registerEmployee({
        userId,
        position: formatTitleCase(position),
      });
      toast.success("Employee Registered Successfully");

      await refetchEmployeeExistance();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-blue-600 p-3 text-white shadow-none hover:bg-blue-700"
          disabled={
            isRegisterEmployeePending ||
            isEmployeeExist?.isExist ||
            isCheckEmployeeExistanceLoading
          }
        >
          {isRegisterEmployeePending
            ? "Registering..."
            : isEmployeeExist?.isExist
              ? "Registered As Employee"
              : isCheckEmployeeExistanceLoading
                ? "Checking..."
                : "Register as Employee"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will register{" "}
            <span className="font-semibold">{application.user.fullName}</span>{" "}
            as an employee at your company.
          </AlertDialogDescription>
          <Textarea
            placeholder="Add position for this employee"
            onChange={(e) => setPosition(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isRegisterEmployeePending || position === ""}
            onClick={() => handleRegisterEmployee(application.userId, position)}
          >
            {isRegisterEmployeePending ? "Registering..." : "Register"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegisterEmployeeButton;
