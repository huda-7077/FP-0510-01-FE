import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CVData } from "@/types/cv";
import { Code, List, Plus, Trash } from "lucide-react";
import { ChangeEvent } from "react";

interface SkillInputProps {
  skills: CVData["skills"];
  setSkills: React.Dispatch<React.SetStateAction<CVData["skills"]>>;
  onBlur?: () => void;
  errors?: any;
  touched?: any;
}

export function SkillInput({
  skills,
  setSkills,
  onBlur,
  errors,
  touched,
}: SkillInputProps) {
  const addSkill = () => {
    setSkills([
      ...skills,
      {
        type: "",
        details: "",
      },
    ]);
    if (onBlur) onBlur();
  };

  const updateSkill = (
    index: number,
    field: keyof CVData["skills"][number],
    value: string,
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleInputChange = (
    index: number,
    field: keyof CVData["skills"][number],
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    updateSkill(index, field, e.target.value);
    if (onBlur) onBlur();
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
    if (onBlur) onBlur();
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Code className="mr-2 h-5 w-5" />
              Skill {index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              type="button"
              size="sm"
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" /> Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <Code className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={skill.type}
                    onChange={(e) => handleInputChange(index, "type", e)}
                    placeholder="Skill Type (e.g., Programming, Hard Skills, Soft Skills)"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.skills?.[index]?.type &&
                  errors?.skills?.[index]?.type && (
                    <p className="text-xs text-red-500">
                      {errors.skills[index].type}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <List className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={skill.details}
                    onChange={(e) => handleInputChange(index, "details", e)}
                    placeholder="Skill Details (e.g., C++, Python, React, Node.js)"
                    className="pl-10"
                    onBlur={onBlur}
                  />
                </div>
                {touched?.skills?.[index]?.details &&
                  errors?.skills?.[index]?.details && (
                    <p className="text-xs text-red-500">
                      {errors.skills[index].details}
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
        onClick={addSkill}
        className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Plus className="mr-2 h-5 w-5" /> Add New Skill
      </Button>
    </div>
  );
}
