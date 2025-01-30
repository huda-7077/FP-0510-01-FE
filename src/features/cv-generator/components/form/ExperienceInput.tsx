import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/types/cv";
import {
  Briefcase,
  Building2,
  Calendar,
  ListPlus,
  MapPin,
  Plus,
  Trash,
} from "lucide-react";
import { ChangeEvent } from "react";

interface ExperienceInputProps {
  experiences: CVData["experiences"];
  setExperiences: React.Dispatch<React.SetStateAction<CVData["experiences"]>>;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function ExperienceInput({
  experiences,
  setExperiences,
  onBlur,
  errors,
  touched,
}: ExperienceInputProps) {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        position: "",
        location: "",
        duration: "",
        descriptions: [],
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateExperience = (
    index: number,
    field: keyof CVData["experiences"][number],
    value: string,
  ) => {
    const updatedExperiences = [...experiences];
    if (field !== "descriptions") {
      updatedExperiences[index][field] = value;
    }
    setExperiences(updatedExperiences);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["experiences"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateExperience(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  const updateDescription = (
    experienceIndex: number,
    descriptionIndex: number,
    field: "details",
    value: string,
  ) => {
    const updatedExperiences = [...experiences];
    const experience = updatedExperiences[experienceIndex];

    if (experience.descriptions) {
      experience.descriptions[descriptionIndex][field] = value;
    }

    setExperiences(updatedExperiences);
  };

  const handleDescriptionChange = (
    experienceIndex: number,
    descriptionIndex: number,
    field: "details",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateDescription(experienceIndex, descriptionIndex, field, e.target.value);
    if (onBlur) onBlur();
  };

  const addDescription = (experienceIndex: number) => {
    const updatedExperiences = [...experiences];
    const experience = updatedExperiences[experienceIndex];

    if (!experience.descriptions) {
      experience.descriptions = [];
    }
    experience.descriptions.push({ details: "" });
    setExperiences(updatedExperiences);
  };

  const removeDescription = (
    experienceIndex: number,
    descriptionIndex: number,
  ) => {
    const updatedExperiences = [...experiences];
    const experience = updatedExperiences[experienceIndex];

    if (experience.descriptions) {
      experience.descriptions = experience.descriptions.filter(
        (_, i) => i !== descriptionIndex,
      );
    }

    setExperiences(updatedExperiences);
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Briefcase className="mr-2 h-5 w-5" />
              Experience {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" /> Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={exp.company}
                    onChange={(e) => handleInputChange(index, "company", e)}
                    placeholder="Company Name"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.experiences?.[index]?.company &&
                  errors?.experiences?.[index]?.company && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index].company}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={exp.position}
                    onChange={(e) => handleInputChange(index, "position", e)}
                    placeholder="Position"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.experiences?.[index]?.position &&
                  errors?.experiences?.[index]?.position && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index].position}
                    </p>
                  )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={exp.location}
                    onChange={(e) => handleInputChange(index, "location", e)}
                    placeholder="Location"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.experiences?.[index]?.location &&
                  errors?.experiences?.[index]?.location && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index].location}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={exp.duration}
                    onChange={(e) => handleInputChange(index, "duration", e)}
                    placeholder="Duration"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.experiences?.[index]?.duration &&
                  errors?.experiences?.[index]?.duration && (
                    <p className="text-xs text-red-500">
                      {errors.experiences[index].duration}
                    </p>
                  )}
              </div>
            </div>

            {exp.descriptions?.length > 0 && (
              <>
                <Separator className="my-4" />
                <Label className="text-sm font-medium text-gray-500">
                  Key Responsibilities
                </Label>
              </>
            )}

            <div className="space-y-3">
              {exp.descriptions?.map((description, descriptionIndex) => (
                <Card key={descriptionIndex} className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex-1 space-y-2">
                        <div className="relative">
                          <ListPlus className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            value={description.details}
                            onChange={(e) =>
                              handleDescriptionChange(
                                index,
                                descriptionIndex,
                                "details",
                                e,
                              )
                            }
                            placeholder="Description Details"
                            className="bg-white pl-10"
                            onBlur={onBlur}
                          />
                        </div>
                        {touched?.experiences?.[index]?.descriptions?.[
                          descriptionIndex
                        ]?.details &&
                          errors?.experiences?.[index]?.descriptions?.[
                            descriptionIndex
                          ]?.details && (
                            <p className="text-xs text-red-500">
                              {
                                errors.experiences[index].descriptions[
                                  descriptionIndex
                                ].details
                              }
                            </p>
                          )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() =>
                          removeDescription(index, descriptionIndex)
                        }
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
              onClick={() => addDescription(index)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Description
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        type="button"
        size="lg"
        onClick={addExperience}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Experience
      </Button>
    </div>
  );
}
