"use client";

import { FileText, FileUser, Replace, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FormValues {
  fullName: string;
  headline: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "";
  educationLevel: string;
  currentAddress: string;
  phoneNumber: string;
  cvUrl: File | null;
  cvUrlPreview?: string | "";
  profilePicture: File | null;
  profilePicturePreview?: string;
  skills: string;
  provinceId: string;
  regencyId: string;
  cvFileName?: string;
}

interface CvDropzoneProps {
  formik: FormikProps<FormValues>;
}

const CvDropzone = ({ formik }: CvDropzoneProps) => {
  const [fileError, setFileError] = useState<string | null>(null);

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

      formik.setFieldValue("cvUrl", acceptedFiles[0]);
      formik.setFieldValue(
        "cvUrlPreview",
        URL.createObjectURL(acceptedFiles[0]),
      );
    },
  });

  return (
    <div className="space-y-2">
      <Label
        htmlFor="cvUrl"
        className="flex items-center gap-2 font-semibold text-gray-700"
      >
        <FileUser size={18} />
        CV / Resume
      </Label>
      {formik.values.cvUrlPreview ? (
        <div className="rounded-lg border-2 border-dashed bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-sm">
                {formik.values.cvUrl?.name || "Current CV"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(formik.values.cvUrlPreview, "_blank")
                }
              >
                View PDF
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  formik.setFieldValue("cvUrl", null);
                  formik.setFieldValue("cvUrlPreview", "");
                }}
              >
                <Replace className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300"} ${formik.errors.cvUrl && formik.touched.cvUrl ? "border-red-500" : ""}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-4 h-10 w-10 text-gray-400" />
          {isDragActive ? (
            <p>Drop your PDF here</p>
          ) : (
            <div className="space-y-2">
              <p>Drag & drop your CV here, or click to select</p>
              <p className="text-sm text-gray-500">PDF format only (Max 1MB)</p>
            </div>
          )}
        </div>
      )}
      {fileError && <p className="text-xs text-red-500">{fileError}</p>}
    </div>
  );
};

export default CvDropzone;
