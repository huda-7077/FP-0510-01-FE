import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/types/cv";
import {
  Award,
  Building2,
  Calendar,
  GraduationCap,
  ListPlus,
  MapPin,
  Plus,
  Trash,
} from "lucide-react";
import { ChangeEvent } from "react";

interface NonFormalEducationInputProps {
  nonFormalEducations?: CVData["nonFormalEducations"];
  setNonFormalEducations: React.Dispatch<
    React.SetStateAction<CVData["nonFormalEducations"]>
  >;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function NonFormalEducationInput({
  nonFormalEducations,
  setNonFormalEducations,
  onBlur,
  errors,
  touched,
}: NonFormalEducationInputProps) {
  const addNonFormalEducation = () => {
    setNonFormalEducations([
      ...(nonFormalEducations || []),
      {
        institution: "",
        position: "",
        location: "",
        duration: "",
        descriptions: [],
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateNonFormalEducation = (
    index: number,
    field: keyof CVData["nonFormalEducations"][number],
    value: string,
  ) => {
    if (!nonFormalEducations) return;
    const updatedNonFormalEducations = [...nonFormalEducations];
    if (field !== "descriptions") {
      updatedNonFormalEducations[index][field] = value;
    }
    setNonFormalEducations(updatedNonFormalEducations);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["nonFormalEducations"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateNonFormalEducation(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeNonFormalEducation = (index: number) => {
    if (!nonFormalEducations) return;
    setNonFormalEducations(nonFormalEducations.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  const updateDescription = (
    nonFormalEducationIndex: number,
    descriptionIndex: number,
    field: "details",
    value: string,
  ) => {
    if (!nonFormalEducations) return;
    const updatedNonFormalEducations = [...nonFormalEducations];
    const nonFormalEducation =
      updatedNonFormalEducations[nonFormalEducationIndex];

    if (nonFormalEducation.descriptions) {
      nonFormalEducation.descriptions[descriptionIndex][field] = value;
    }

    setNonFormalEducations(updatedNonFormalEducations);
  };

  const handleDescriptionChange = (
    nonFormalEducationIndex: number,
    descriptionIndex: number,
    field: "details",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateDescription(
      nonFormalEducationIndex,
      descriptionIndex,
      field,
      e.target.value,
    );
    if (onBlur) onBlur();
  };

  const addDescription = (nonFormalEducationIndex: number) => {
    if (!nonFormalEducations) return;
    const updatedNonFormalEducations = [...nonFormalEducations];
    const nonFormalEducation =
      updatedNonFormalEducations[nonFormalEducationIndex];

    if (!nonFormalEducation.descriptions) {
      nonFormalEducation.descriptions = [];
    }
    nonFormalEducation.descriptions.push({ details: "" });
    setNonFormalEducations(updatedNonFormalEducations);
  };

  const removeDescription = (
    nonFormalEducationIndex: number,
    descriptionIndex: number,
  ) => {
    if (!nonFormalEducations) return;
    const updatedNonFormalEducations = [...nonFormalEducations];
    const nonFormalEducation =
      updatedNonFormalEducations[nonFormalEducationIndex];

    if (nonFormalEducation.descriptions) {
      nonFormalEducation.descriptions = nonFormalEducation.descriptions.filter(
        (_, i) => i !== descriptionIndex,
      );
    }

    setNonFormalEducations(updatedNonFormalEducations);
  };

  return (
    <div className="space-y-4">
      {nonFormalEducations?.map((edu, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <GraduationCap className="mr-2 h-5 w-5" />
              Certificate/Training {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeNonFormalEducation(index)}
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
                    value={edu.institution}
                    onChange={(e) => handleInputChange(index, "institution", e)}
                    onBlur={onBlur}
                    placeholder="Institution Name"
                    className="pl-10"
                  />
                </div>
                {touched?.nonFormalEducations?.[index]?.institution &&
                  errors?.nonFormalEducations?.[index]?.institution && (
                    <p className="text-xs text-red-500">
                      {errors.nonFormalEducations[index].institution}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.position}
                    onChange={(e) => handleInputChange(index, "position", e)}
                    onBlur={onBlur}
                    placeholder="Certificate/Training Name"
                    className="pl-10"
                  />
                </div>
                {touched?.nonFormalEducations?.[index]?.position &&
                  errors?.nonFormalEducations?.[index]?.position && (
                    <p className="text-xs text-red-500">
                      {errors.nonFormalEducations[index].position}
                    </p>
                  )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.location}
                    onChange={(e) => handleInputChange(index, "location", e)}
                    onBlur={onBlur}
                    placeholder="Location"
                    className="pl-10"
                  />
                </div>
                {touched?.nonFormalEducations?.[index]?.location &&
                  errors?.nonFormalEducations?.[index]?.location && (
                    <p className="text-xs text-red-500">
                      {errors.nonFormalEducations[index].location}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={edu.duration}
                    onChange={(e) => handleInputChange(index, "duration", e)}
                    onBlur={onBlur}
                    placeholder="Duration"
                    className="pl-10"
                  />
                </div>
                {touched?.nonFormalEducations?.[index]?.duration &&
                  errors?.nonFormalEducations?.[index]?.duration && (
                    <p className="text-xs text-red-500">
                      {errors.nonFormalEducations[index].duration}
                    </p>
                  )}
              </div>
            </div>

            {edu.descriptions?.length > 0 && (
              <>
                <Separator className="my-4" />
                <Label className="text-sm font-medium text-gray-500">
                  Description & Achievements
                </Label>
              </>
            )}

            <div className="space-y-3">
              {edu.descriptions?.map((description, descriptionIndex) => (
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
                            onBlur={onBlur}
                            placeholder="Description Details"
                            className="bg-white pl-10"
                          />
                        </div>
                        {touched?.nonFormalEducations?.[index]?.descriptions?.[
                          descriptionIndex
                        ]?.details &&
                          errors?.nonFormalEducations?.[index]?.descriptions?.[
                            descriptionIndex
                          ]?.details && (
                            <p className="text-xs text-red-500">
                              {
                                errors.nonFormalEducations[index].descriptions[
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
        onClick={addNonFormalEducation}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Certificate/Training
      </Button>
    </div>
  );
}
