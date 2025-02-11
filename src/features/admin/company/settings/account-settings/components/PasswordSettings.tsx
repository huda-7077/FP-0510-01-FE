"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import useChangePassword from "@/hooks/api/account/useChangePassword";
import { passwordSchema } from "../schemas";

const PasswordSettings = () => {
  const { mutate: changePassword, isPending } = useChangePassword();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      changePassword({
        password: values.password,
        newPassword: values.newPassword,
      });
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Password Settings
        </Label>
        <p className="text-gray-500">Update your password</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col justify-evenly gap-4 md:flex-row">
          <div className="flex-grow">
            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Current password"
                className={`w-full pe-9 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : ""
                }`}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
              >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="flex-grow">
            <div className="relative">
              <Input
                type={isNewPasswordVisible ? "text" : "password"}
                placeholder="New password"
                className={`w-full pe-9 ${
                  formik.errors.newPassword && formik.touched.newPassword
                    ? "border-red-500"
                    : ""
                }`}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
              >
                {isNewPasswordVisible ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <div className="flex-grow">
            <div className="relative">
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                className={`w-full pe-9 ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#0a65cc] hover:bg-[#254e7e] md:w-fit"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing password
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PasswordSettings;
