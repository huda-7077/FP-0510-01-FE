"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CVData } from "@/types/cv";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CVPreviewDialog from "./CVPreviewDialog";
import { CertificationInput } from "./form/CertificationInput";
import { DetailInput } from "./form/DetailInput";
import { EducationInput } from "./form/EducationInput";
import { ExperienceInput } from "./form/ExperienceInput";
import { NonFormalEducationInput } from "./form/NonFormalEducationInput";
import { OrganizationInput } from "./form/OrganizationInput";
import { SkillInput } from "./form/SkillInput";
import CVSchema from "./schemas";
import useGetProfile from "@/hooks/api/account/useGetProfile";

const CVGenerator = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data } = useGetProfile();

  useEffect(() => {
    setIsClient(true);
    if (data) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        fullName: data.fullName || "",
        details: [
          data.email || "",
          ...(data.phoneNumber ? [data.phoneNumber] : []),
          ...(data.currentAddress ? [data.currentAddress] : []),
        ],
      }));
    }
  }, [data]);

  const formik = useFormik<CVData>({
    initialValues: {
      fullName: "",
      aboutMe: "",
      details: [],
      skills: [],
      educations: [],
      experiences: [],
      organizations: [],
      nonFormalEducations: [],
      certifications: [],
    },
    validationSchema: CVSchema,
    onSubmit: (values) => {
      setShowPDF(true);
    },
    validateOnMount: true,
    validateOnChange: true,
  });

  const handleBlur = () => {
    formik.validateForm();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto w-full space-y-3 bg-white p-2 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CV Generator</h1>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700" htmlFor="fullName">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                placeholder="John Doe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-50"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-red-500">{formik.errors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700" htmlFor="aboutMe">
                About Me
              </Label>
              <Textarea
                id="aboutMe"
                name="aboutMe"
                value={formik.values.aboutMe}
                rows={4}
                placeholder="Me in a few words"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-50"
              />
              {formik.touched.aboutMe && formik.errors.aboutMe && (
                <p className="text-sm text-red-500">{formik.errors.aboutMe}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">
                User Details
              </Label>
              <DetailInput
                details={formik.values.details}
                setDetails={(details) =>
                  formik.setFieldValue("details", details)
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.details &&
                formik.errors.details &&
                typeof formik.errors.details === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.details}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">Skills</Label>
              <SkillInput
                skills={formik.values.skills}
                setSkills={(skills) => formik.setFieldValue("skills", skills)}
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.skills &&
                formik.errors.skills &&
                typeof formik.errors.skills === "string" && (
                  <p className="text-sm text-red-500">{formik.errors.skills}</p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">Education</Label>
              <EducationInput
                educations={formik.values.educations}
                setEducations={(educations) =>
                  formik.setFieldValue("educations", educations)
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.educations &&
                formik.errors.educations &&
                typeof formik.errors.educations === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.educations}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">Experiences</Label>
              <ExperienceInput
                experiences={formik.values.experiences}
                setExperiences={(experiences) =>
                  formik.setFieldValue("experiences", experiences)
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.experiences &&
                formik.errors.experiences &&
                typeof formik.errors.experiences === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.experiences}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">
                Organizations (Optional)
              </Label>
              <OrganizationInput
                organizations={formik.values.organizations}
                setOrganizations={(organizations) =>
                  formik.setFieldValue("organizations", organizations)
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.organizations &&
                formik.errors.organizations &&
                typeof formik.errors.organizations === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.organizations}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">
                Non Formal Educations (Optional)
              </Label>
              <NonFormalEducationInput
                nonFormalEducations={formik.values.nonFormalEducations}
                setNonFormalEducations={(nonFormalEducations) =>
                  formik.setFieldValue(
                    "nonFormalEducations",
                    nonFormalEducations,
                  )
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.nonFormalEducations &&
                formik.errors.nonFormalEducations &&
                typeof formik.errors.nonFormalEducations === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.nonFormalEducations}
                  </p>
                )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">
                Certifications (Optional)
              </Label>
              <CertificationInput
                certifications={formik.values.certifications}
                setCertifications={(certifications) =>
                  formik.setFieldValue("certifications", certifications)
                }
                onBlur={handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
              {formik.touched.certifications &&
                formik.errors.certifications &&
                typeof formik.errors.certifications === "string" && (
                  <p className="text-sm text-red-500">
                    {formik.errors.certifications}
                  </p>
                )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Generate CV
            </Button>
          </div>
        </div>
      </form>
      {showPDF && isClient && (
        <CVPreviewDialog
          cvData={formik.values}
          showPDF={showPDF}
          setShowPDF={setShowPDF}
        />
      )}
    </div>
  );
};

export default CVGenerator;
