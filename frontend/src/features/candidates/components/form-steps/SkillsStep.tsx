import React, { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { Select } from "../../../../shared/ui/Select";
import { CandidateSkill } from "../../../../shared/types/candidate";
import { SKILL_LEVELS } from "../../../../shared/constants/api";

interface SkillsStepProps {
  data: CandidateSkill[];
  onChange: (skills: CandidateSkill[]) => void;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState<CandidateSkill>({
    name: "",
    level: "BEGINNER",
    category: "",
  });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      // Check if skill already exists
      const existingSkill = data.find(
        (skill) => skill.name.toLowerCase() === newSkill.name.toLowerCase()
      );

      if (!existingSkill) {
        onChange([...data, { ...newSkill, id: Date.now().toString() }]);
        setNewSkill({
          name: "",
          level: "BEGINNER",
          category: "",
        });
      }
    }
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (
    index: number,
    field: keyof CandidateSkill,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-gray-100 text-gray-800";
      case "INTERMEDIATE":
        return "bg-blue-100 text-blue-800";
      case "ADVANCED":
        return "bg-green-100 text-green-800";
      case "EXPERT":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Skills</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add the candidate's technical and professional skills.
        </p>
      </div>

      {/* Existing Skills */}
      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Added Skills</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((skill, index) => (
              <div
                key={skill.id || index}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-medium text-gray-900">
                        {skill.name}
                      </h5>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSkillLevelColor(
                          skill.level
                        )}`}
                      >
                        {
                          SKILL_LEVELS.find(
                            (level) => level.value === skill.level
                          )?.label
                        }
                      </span>
                    </div>
                    {skill.category && (
                      <p className="text-sm text-gray-500">
                        Category: {skill.category}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-3">
                  <Input
                    label="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    placeholder="React"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                      label="Level"
                      value={skill.level}
                      onChange={(e) =>
                        updateSkill(index, "level", e.target.value)
                      }
                      options={SKILL_LEVELS}
                    />

                    <Input
                      label="Category"
                      value={skill.category || ""}
                      onChange={(e) =>
                        updateSkill(index, "category", e.target.value)
                      }
                      placeholder="Frontend Development"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Skill */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Add Skill</h4>

        <div className="space-y-4">
          <Input
            label="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Project Management, Data Analysis"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Skill Level"
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({ ...newSkill, level: e.target.value as any })
              }
              options={SKILL_LEVELS}
            />

            <Input
              label="Category (Optional)"
              value={newSkill.category || ""}
              onChange={(e) =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
              placeholder="e.g., Programming, Design, Management"
            />
          </div>

          <Button
            onClick={addSkill}
            disabled={!newSkill.name.trim()}
            variant="outline"
          >
            Add Skill
          </Button>
        </div>
      </div>

      {/* Quick Add Common Skills */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">
          Quick Add Common Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "Python",
            "React",
            "Node.js",
            "SQL",
            "Git",
            "Project Management",
            "Leadership",
            "Communication",
            "Problem Solving",
          ].map((skillName) => (
            <button
              key={skillName}
              onClick={() => {
                const exists = data.find(
                  (skill) =>
                    skill.name.toLowerCase() === skillName.toLowerCase()
                );
                if (!exists) {
                  onChange([
                    ...data,
                    {
                      id: Date.now().toString(),
                      name: skillName,
                      level: "INTERMEDIATE",
                      category: "",
                    },
                  ]);
                }
              }}
              disabled={data.some(
                (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
              )}
              className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + {skillName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
