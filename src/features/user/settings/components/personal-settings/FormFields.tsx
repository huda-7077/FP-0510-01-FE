import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormikProps } from "formik";

interface FormValues {
  fullName: string;
  headline: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "";
  educationLevel: string;
  currentAddress: string;
  phoneNumber: string;
  cvUrl: File | null;
  cvUrlPreview?: string;
  profilePicture: File | null;
  profilePicturePreview?: string;
  skills: string;
  provinceId: string;
  regencyId: string;
}

interface FormFieldsProps {
  formik: FormikProps<FormValues>;
}

export const FormFields = ({ formik }: FormFieldsProps) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className={
              formik.errors.fullName && formik.touched.fullName
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className="text-xs text-red-500">{formik.errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline</Label>
          <Input
            id="headline"
            name="headline"
            placeholder="e.g. Full Stack Developer with 3 years experience"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.headline}
            className={
              formik.errors.headline && formik.touched.headline
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.headline && formik.touched.headline && (
            <p className="text-xs text-red-500">{formik.errors.headline}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            className={
              formik.errors.dateOfBirth && formik.touched.dateOfBirth
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
            <p className="text-xs text-red-500">{formik.errors.dateOfBirth}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            name="gender"
            value={formik.values.gender}
            onValueChange={(value) => formik.setFieldValue("gender", value)}
          >
            <SelectTrigger
              className={
                formik.errors.gender && formik.touched.gender
                  ? "border-red-500"
                  : ""
              }
            >
              {formik.values.gender ? (
                <SelectValue
                  placeholder={
                    formik.values.gender === "MALE" ? "Male" : "Female"
                  }
                />
              ) : (
                <SelectValue placeholder="Select gender" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.gender && formik.touched.gender && (
            <p className="text-xs text-red-500">{formik.errors.gender}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="educationLevel">Education Level</Label>
          <Select
            name="educationLevel"
            value={formik.values.educationLevel}
            onValueChange={(value) =>
              formik.setFieldValue("educationLevel", value)
            }
          >
            <SelectTrigger
              className={
                formik.errors.educationLevel && formik.touched.educationLevel
                  ? "border-red-500"
                  : ""
              }
            >
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
              <SelectItem value="DIPLOMA">Diploma</SelectItem>
              <SelectItem value="ASSOCIATE_DEGREE">Associate Degree</SelectItem>
              <SelectItem value="BACHELOR_DEGREE">Bachelor's Degree</SelectItem>
              <SelectItem value="MASTER_DEGREE">Master's Degree</SelectItem>
              <SelectItem value="DOCTORATE">Doctorate</SelectItem>
              <SelectItem value="PROFESSIONAL_CERTIFICATION">
                Professional Certification
              </SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.educationLevel && formik.touched.educationLevel && (
            <p className="text-xs text-red-500">
              {formik.errors.educationLevel}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? "border-red-500"
                : ""
            }
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input
          id="skills"
          name="skills"
          placeholder="e.g. JavaScript, React, Node.js (separate with commas)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.skills}
          className={
            formik.errors.skills && formik.touched.skills
              ? "border-red-500"
              : ""
          }
        />
        <p className="text-xs text-gray-500">
          Please separate each skill with a comma.
        </p>
        {formik.errors.skills && formik.touched.skills && (
          <p className="text-xs text-red-500">{formik.errors.skills}</p>
        )}
      </div>
    </>
  );
};
