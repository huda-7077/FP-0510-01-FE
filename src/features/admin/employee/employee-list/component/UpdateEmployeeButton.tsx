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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useUpdateEmployee from "@/hooks/api/employee/useUpdateEmployee";
import useFormatTitleCase from "@/hooks/useFormatTitleCase";
import { Employee } from "@/types/employee";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface RegisterEmployeeButtonProps {
  employee: Employee;
}

const RegisterEmployeeButton: FC<RegisterEmployeeButtonProps> = ({
  employee,
}) => {
  const [position, setPosition] = useState(employee.position);
  const [isEmployee, setIsEmployee] = useState(employee.isEmployee);
  const { formatTitleCase } = useFormatTitleCase();
  const { mutateAsync: updateEmployee, isPending: isUpdateEmployeePending } =
    useUpdateEmployee();

  const handleRegisterEmployee = async (userId: number, position: string) => {
    try {
      await updateEmployee({
        id: employee.id,
        userId,
        position: formatTitleCase(position),
        isEmployee,
      });
      setPosition(employee.position);
      setIsEmployee(employee.isEmployee);
      toast.success("Employee Updated Successfully");
    } catch (error) {
      toast.error("Failed to register this applicant as employee");
    }
  };

  const handleCancelEdit = () => {
    setPosition(employee.position);
    setIsEmployee(employee.isEmployee);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-blue-600 p-3 text-white shadow-none hover:bg-blue-700"
          disabled={isUpdateEmployeePending}
        >
          {isUpdateEmployeePending ? "Editting..." : "Edit Employee"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Employee</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-red-600">*</span> Once you set status to "Not
            Employeed", it cannot be changed
          </AlertDialogDescription>
          <div className="space-y-3">
            <div>
              <Label className="font-semibold">Name</Label>
              <p className="text-sm">{employee.user.fullName}</p>
            </div>
            <div>
              <Label className="font-semibold">Position</Label>
              <Textarea
                placeholder="Add position for this employee"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is-employeed"
                checked={isEmployee}
                onCheckedChange={setIsEmployee}
                disabled={isUpdateEmployeePending}
              />
              <Label htmlFor="is-employeed">
                {isEmployee ? "Employeed" : "Not Employeed"}
              </Label>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelEdit}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isUpdateEmployeePending || position === ""}
            onClick={() => handleRegisterEmployee(employee.userId, position)}
          >
            {isUpdateEmployeePending ? "Editting..." : "Edit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegisterEmployeeButton;
