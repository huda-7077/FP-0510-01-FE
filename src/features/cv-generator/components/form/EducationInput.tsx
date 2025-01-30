import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/types/cv";
import {
  Award,
  Building,
  Calendar,
  GraduationCap,
  MapPin,
  Plus,
  Trash,
} from "lucide-react";
import { ChangeEvent } from "react";

interface EducationInputProps {
  educations: CVData["educations"];
  setEducations: React.Dispatch<React.SetStateAction<CVData["educations"]>>;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function EducationInput({
  educations,
  setEducations,
  onBlur,
  errors,
  touched,
}: EducationInputProps) {
  const addEducation = () => {
    setEducations([
      ...educations,
      {
        institution: "",
        degree: "",
        location: "",
        year: "",
        gpa: "",
        experiences: [],
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateEducation = (
    index: number,
    field: keyof CVData["educations"][number],
    value: string,
  ) => {
    const updatedEducations = [...educations];
    if (field !== "experiences") {
      updatedEducations[index][field] = value;
    }
    setEducations(updatedEducations);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["educations"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateEducation(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  const updateExperience = (
    educationIndex: number,
    experienceIndex: number,
    field: "details" | "year",
    value: string,
  ) => {
    const updatedEducations = [...educations];
    const education = updatedEducations[educationIndex];

    if (education.experiences) {
      education.experiences[experienceIndex][field] = value;
    }

    setEducations(updatedEducations);
  };

  const handleExperienceChange = (
    educationIndex: number,
    experienceIndex: number,
    field: "details" | "year",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateExperience(educationIndex, experienceIndex, field, e.target.value);
    if (onBlur) onBlur();
  };

  const addExperience = (educationIndex: number) => {
    const updatedEducations = [...educations];
    const education = updatedEducations[educationIndex];

    if (!education.experiences) {
      education.experiences = [];
    }
    education.experiences.push({ details: "", year: "" });
    setEducations(updatedEducations);
  };

  const removeExperience = (
    educationIndex: number,
    experienceIndex: number,
  ) => {
    const updatedEducations = [...educations];
    const education = updatedEducations[educationIndex];

    if (education.experiences) {
      education.experiences = education.experiences.filter(
        (_, i) => i !== experienceIndex,
      );
    }

    setEducations(updatedEducations);
  };

  return (
    <div className="space-y-4">
      {educations.map((edu, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <GraduationCap className="mr-2 h-5 w-5" />
              Education {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" /> Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleInputChange(index, "institution", e)}
                    placeholder="Institution Name"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.educations?.[index]?.institution &&
                  errors?.educations?.[index]?.institution && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index].institution}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.degree}
                    onChange={(e) => handleInputChange(index, "degree", e)}
                    placeholder="Degree (optional)"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.educations?.[index]?.degree &&
                  errors?.educations?.[index]?.degree && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index].degree}
                    </p>
                  )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.location}
                    onChange={(e) => handleInputChange(index, "location", e)}
                    placeholder="Location"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.educations?.[index]?.location &&
                  errors?.educations?.[index]?.location && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index].location}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.year}
                    onChange={(e) => handleInputChange(index, "year", e)}
                    placeholder="Graduation Year"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.educations?.[index]?.year &&
                  errors?.educations?.[index]?.year && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index].year}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.gpa}
                    onChange={(e) => handleInputChange(index, "gpa", e)}
                    placeholder="GPA"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.educations?.[index]?.gpa &&
                  errors?.educations?.[index]?.gpa && (
                    <p className="text-xs text-red-500">
                      {errors.educations[index].gpa}
                    </p>
                  )}
              </div>
            </div>

            {edu.experiences?.length > 0 && (
              <>
                <Separator className="my-4" />
                <Label className="text-sm font-medium text-gray-500">
                  Experiences
                </Label>
              </>
            )}

            <div className="space-y-3">
              {edu.experiences?.map((exp, expIndex) => (
                <Card key={expIndex} className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex-1 space-y-2">
                        <Input
                          value={(exp as { details: string }).details}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              expIndex,
                              "details",
                              e,
                            )
                          }
                          onBlur={onBlur}
                          placeholder="Experience Details"
                          className="bg-white"
                        />
                        {touched?.educations?.[index]?.experiences?.[expIndex]
                          ?.details &&
                          errors?.educations?.[index]?.experiences?.[expIndex]
                            ?.details && (
                            <p className="text-xs text-red-500">
                              {
                                errors.educations[index].experiences[expIndex]
                                  .details
                              }
                            </p>
                          )}
                      </div>
                      <div className="space-y-2 md:w-1/3">
                        <Input
                          value={exp.year}
                          onChange={(e) =>
                            handleExperienceChange(index, expIndex, "year", e)
                          }
                          onBlur={onBlur}
                          placeholder="Duration"
                          className="bg-white"
                        />
                        {touched?.educations?.[index]?.experiences?.[expIndex]
                          ?.year &&
                          errors?.educations?.[index]?.experiences?.[expIndex]
                            ?.year && (
                            <p className="text-xs text-red-500">
                              {
                                errors.educations[index].experiences[expIndex]
                                  .year
                              }
                            </p>
                          )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeExperience(index, expIndex)}
                        className="h-10 w-10 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              type="button"
              size="sm"
              className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => addExperience(index)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        type="button"
        size="lg"
        onClick={addEducation}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Education
      </Button>
    </div>
  );
}
