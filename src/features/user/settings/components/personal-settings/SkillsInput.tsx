import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserRoundCog } from "lucide-react";
import React, { useState } from "react";

interface SkillsInputProps {
  label: string;
  placeholder?: string;
  value: string;
  formik: any;
  onChange: (skills: string) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({
  label,
  placeholder = "e.g. JavaScript, React, Node.js",
  value,
  formik,
  onChange,
}) => {
  const [skillInput, setSkillInput] = useState("");

  const skillsArray = value
    ? value.split(",").map((skill) => skill.trim())
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.endsWith(",")) {
      const newSkill = inputValue.slice(0, -1).trim();
      if (newSkill && !skillsArray.includes(newSkill)) {
        const updatedSkills = [...skillsArray, newSkill].join(", ");
        onChange(updatedSkills);
      }
      setSkillInput("");
    } else {
      setSkillInput(inputValue);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skillsArray
      .filter((skill) => skill !== skillToRemove)
      .join(", ");
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 font-semibold text-gray-700">
        <UserRoundCog size={18} />
        {label}
        <span className="text-red-600">*</span>
      </label>

      <div
        className={`flex flex-wrap gap-2 py-2 ${
          skillsArray.length === 0 ? "hidden" : ""
        }`}
      >
        {skillsArray.map((skill, index) => (
          <Badge
            key={index}
            className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-red-200 hover:text-red-700"
            onClick={() => removeSkill(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>

      <Input
        id="skills"
        name="skills"
        value={skillInput}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        className="border-gray-200 focus:border-blue-500 focus:ring-purple-200"
      />

      {!!formik.touched["skills"] && !!formik.errors["skills"] && (
        <p className="text-sm text-red-500">{formik.errors["skills"]}</p>
      )}

      <p className="text-sm italic text-gray-600">
        <span className="text-blue-600">*</span> Press comma (,) button on your
        keyboard to add a skill.
      </p>
    </div>
  );
};

export default SkillsInput;
