import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CVData } from "@/types/cv";
import { Building, Calendar, MapPin, Plus, Trash, User } from "lucide-react";
import { ChangeEvent } from "react";

interface OrganizationInputProps {
  organizations: CVData["organizations"];
  setOrganizations: React.Dispatch<
    React.SetStateAction<CVData["organizations"]>
  >;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function OrganizationInput({
  organizations,
  setOrganizations,
  onBlur,
  errors,
  touched,
}: OrganizationInputProps) {
  const addOrganization = () => {
    setOrganizations([
      ...organizations,
      {
        name: "",
        position: "",
        location: "",
        duration: "",
        descriptions: [],
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateOrganization = (
    index: number,
    field: keyof CVData["organizations"][number],
    value: string,
  ) => {
    const updatedOrganizations = [...organizations];
    if (field !== "descriptions") {
      updatedOrganizations[index][field] = value;
    }
    setOrganizations(updatedOrganizations);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["organizations"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateOrganization(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeOrganization = (index: number) => {
    setOrganizations(organizations.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  const updateDescription = (
    organizationIndex: number,
    descriptionIndex: number,
    field: "details",
    value: string,
  ) => {
    const updatedOrganizations = [...organizations];
    const organization = updatedOrganizations[organizationIndex];

    if (organization.descriptions) {
      organization.descriptions[descriptionIndex][field] = value;
    }

    setOrganizations(updatedOrganizations);
  };

  const handleDescriptionChange = (
    organizationIndex: number,
    descriptionIndex: number,
    field: "details",
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateDescription(
      organizationIndex,
      descriptionIndex,
      field,
      e.target.value,
    );
    if (onBlur) onBlur();
  };

  const addDescription = (organizationIndex: number) => {
    const updatedOrganizations = [...organizations];
    const organization = updatedOrganizations[organizationIndex];

    if (!organization.descriptions) {
      organization.descriptions = [];
    }
    organization.descriptions.push({ details: "" });
    setOrganizations(updatedOrganizations);
  };

  const removeDescription = (
    organizationIndex: number,
    descriptionIndex: number,
  ) => {
    const updatedOrganizations = [...organizations];
    const organization = updatedOrganizations[organizationIndex];

    if (organization.descriptions) {
      organization.descriptions = organization.descriptions.filter(
        (_, i) => i !== descriptionIndex,
      );
    }

    setOrganizations(updatedOrganizations);
  };

  return (
    <div className="space-y-4">
      {organizations.map((org, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Building className="mr-2 h-5 w-5" />
              Organization {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeOrganization(index)}
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
                    value={org.name}
                    onChange={(e) => handleInputChange(index, "name", e)}
                    placeholder="Organization Name"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.organizations?.[index]?.name &&
                  errors?.organizations?.[index]?.name && (
                    <p className="text-xs text-red-500">
                      {errors.organizations[index].name}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={org.position}
                    onChange={(e) => handleInputChange(index, "position", e)}
                    placeholder="Position"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.organizations?.[index]?.position &&
                  errors?.organizations?.[index]?.position && (
                    <p className="text-xs text-red-500">
                      {errors.organizations[index].position}
                    </p>
                  )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={org.location}
                    onChange={(e) => handleInputChange(index, "location", e)}
                    placeholder="Location"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.organizations?.[index]?.location &&
                  errors?.organizations?.[index]?.location && (
                    <p className="text-xs text-red-500">
                      {errors.organizations[index].location}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={org.duration}
                    onChange={(e) => handleInputChange(index, "duration", e)}
                    placeholder="Duration"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.organizations?.[index]?.duration &&
                  errors?.organizations?.[index]?.duration && (
                    <p className="text-xs text-red-500">
                      {errors.organizations[index].duration}
                    </p>
                  )}
              </div>
            </div>

            {org.descriptions?.length > 0 && (
              <>
                <Separator className="my-4" />
                <Label className="text-sm font-medium text-gray-500">
                  Descriptions
                </Label>
              </>
            )}

            <div className="space-y-3">
              {org.descriptions?.map((description, descriptionIndex) => (
                <Card key={descriptionIndex} className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex-1 space-y-2">
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
                          className="bg-white"
                        />
                        {touched?.organizations?.[index]?.descriptions?.[
                          descriptionIndex
                        ]?.details &&
                          errors?.organizations?.[index]?.descriptions?.[
                            descriptionIndex
                          ]?.details && (
                            <p className="text-xs text-red-500">
                              {
                                errors.organizations[index].descriptions[
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
        onClick={addOrganization}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Organization
      </Button>
    </div>
  );
}
