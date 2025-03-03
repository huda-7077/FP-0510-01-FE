"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { useFormik } from "formik";
import { ChevronLeft, ChevronRight, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useApplicationForm } from "../context/ApplicationFormContext";
import { applicationSchema } from "../schemas";

interface DocumentUploadProps {
  onNext: () => void;
  onBack: () => void;
}

const DocumentUpload = ({ onNext, onBack }: DocumentUploadProps) => {
  const { data: profile } = useGetProfile();
  const { formData, updateFormData } = useApplicationForm();
  const [fileError, setFileError] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      expectedSalary: "",
      useExistingCV: formData.useExistingCV || Boolean(profile?.cvUrl),
      cvFile: formData.cvFile || null,
      attachment: formData.attachment || null,
    },
    validationSchema: applicationSchema,
    onSubmit: (values) => {
      const finalData = {
        ...values,
        cvFile: values.useExistingCV ? null : values.cvFile,
        useExistingCV: values.useExistingCV,
      };
      updateFormData(finalData);
      onNext();
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFileError(null);

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          setFileError("File is larger than 1MB");
        } else if (error.code === "file-invalid-type") {
          setFileError("Only PDF files are allowed");
        }
        return;
      }

      formik.setFieldValue("cvFile", acceptedFiles[0]);
      formik.setFieldValue("useExistingCV", false);
    },
  });

  const {
    getRootProps: getAttachmentRootProps,
    getInputProps: getAttachmentInputProps,
    isDragActive: isAttachmentDragActive,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setAttachmentError(null);

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          setAttachmentError("File is larger than 1MB");
        } else if (error.code === "file-invalid-type") {
          setAttachmentError("Only PDF files are allowed");
        }
        return;
      }

      formik.setFieldValue("attachment", acceptedFiles[0]);
    },
  });

  const handleUseExistingCV = (checked: boolean) => {
    formik.setFieldValue("useExistingCV", checked);
    formik.setFieldValue("cvFile", null);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mx-auto space-y-6 p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-800 md:text-2xl">
          Documents & Details
        </h2>
        <p className="text-gray-600">
          Upload your CV and provide additional information
        </p>
      </div>

      {profile?.cvUrl && (
        <div className="space-y-2 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formik.values.useExistingCV}
              onCheckedChange={handleUseExistingCV}
              className="data-[state=checked]:bg-blue-600"
            />
            <Label className="font-medium text-blue-800">
              Use existing CV from profile
            </Label>
          </div>
          {formik.values.useExistingCV && (
            <div className="mt-2 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span className="text-sm text-blue-700">
                    Current CV from profile
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(profile.cvUrl, "_blank")}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  View PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {!formik.values.useExistingCV && (
        <div className="space-y-2">
          <Label className="font-medium text-gray-800">Upload New CV</Label>
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
            } ${fileError ? "border-red-500 bg-red-50" : ""}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 h-10 w-10 text-blue-500" />
            {isDragActive ? (
              <p className="font-medium text-blue-700">Drop your PDF here</p>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-700">
                  Drag & drop your CV here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  PDF format only (Max 1MB)
                </p>
              </div>
            )}
          </div>
          {fileError && <p className="text-xs text-red-500">{fileError}</p>}
          {formik.values.cvFile && (
            <div className="mt-2 flex items-center gap-2 rounded-md bg-blue-50 p-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                {formik.values.cvFile.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formik.setFieldValue("cvFile", null)}
                className="ml-auto text-red-500 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2 rounded-lg bg-gray-50 p-4">
        <Label htmlFor="expectedSalary" className="font-medium text-gray-800">
          Expected Salary (IDR)
        </Label>
        <Input
          id="expectedSalary"
          type="number"
          placeholder="Enter expected salary"
          className="focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          {...formik.getFieldProps("expectedSalary")}
        />
        {formik.touched.expectedSalary && formik.errors.expectedSalary && (
          <div className="mt-1 text-sm text-red-500">
            {formik.errors.expectedSalary}
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4">
        <Label className="font-medium text-gray-800">
          Additional Attachments (Optional)
        </Label>
        <div
          {...getAttachmentRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isAttachmentDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
          } ${attachmentError ? "border-red-500 bg-red-50" : ""}`}
        >
          <input {...getAttachmentInputProps()} />
          <Upload className="mx-auto mb-4 h-10 w-10 text-blue-500" />
          {isAttachmentDragActive ? (
            <p className="font-medium text-blue-700">Drop your PDF here</p>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700">
                Drag & drop additional documents here, or click to select
              </p>
              <p className="text-sm text-gray-500">PDF format only (Max 1MB)</p>
            </div>
          )}
        </div>
        {attachmentError && (
          <p className="text-xs text-red-500">{attachmentError}</p>
        )}
        {formik.values.attachment && (
          <div className="mt-2 flex items-center gap-2 rounded-md bg-blue-50 p-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              {formik.values.attachment.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => formik.setFieldValue("attachment", null)}
              className="ml-auto text-red-500 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between border-t border-gray-100 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-1 border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          type="submit"
          className="flex items-center gap-1 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default DocumentUpload;
