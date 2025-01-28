import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CVData } from "@/types/cv";
import { Award, Calendar, Hash, Plus, Trash } from "lucide-react";
import { ChangeEvent } from "react";

interface CertificationInputProps {
  certifications?: CVData["certifications"];
  setCertifications: React.Dispatch<
    React.SetStateAction<CVData["certifications"]>
  >;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function CertificationInput({
  certifications,
  setCertifications,
  onBlur,
  errors,
  touched,
}: CertificationInputProps) {
  const addCertification = () => {
    setCertifications([
      ...(certifications || []),
      {
        name: "",
        nomor: "",
        year: "",
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateCertification = (
    index: number,
    field: keyof CVData["certifications"][number],
    value: string,
  ) => {
    if (!certifications) return;
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["certifications"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateCertification(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeCertification = (index: number) => {
    if (!certifications) return;
    setCertifications(certifications.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  return (
    <div className="space-y-4">
      {certifications?.map((certification, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Award className="mr-2 h-5 w-5" />
              Certification {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeCertification(index)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" /> Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={certification.name}
                    onChange={(e) => handleInputChange(index, "name", e)}
                    placeholder="Certificate Name"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.certifications?.[index]?.name &&
                  errors?.certifications?.[index]?.name && (
                    <p className="text-xs text-red-500">
                      {errors.certifications[index].name}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={certification.nomor}
                    onChange={(e) => handleInputChange(index, "nomor", e)}
                    placeholder="Certificate Number"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.certifications?.[index]?.nomor &&
                  errors?.certifications?.[index]?.nomor && (
                    <p className="text-xs text-red-500">
                      {errors.certifications[index].nomor}
                    </p>
                  )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={certification.year}
                    onChange={(e) => handleInputChange(index, "year", e)}
                    placeholder="Certificate Year"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.certifications?.[index]?.year &&
                  errors?.certifications?.[index]?.year && (
                    <p className="text-xs text-red-500">
                      {errors.certifications[index].year}
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        type="button"
        size="lg"
        onClick={addCertification}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Certification
      </Button>
    </div>
  );
}
