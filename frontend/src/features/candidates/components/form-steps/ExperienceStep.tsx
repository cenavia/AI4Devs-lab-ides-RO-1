import React, { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { TextArea } from "../../../../shared/ui/TextArea";
import { CandidateWorkExperience } from "../../../../shared/types/candidate";

interface ExperienceStepProps {
  data: CandidateWorkExperience[];
  onChange: (workExperiences: CandidateWorkExperience[]) => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  data,
  onChange,
}) => {
  const [newExperience, setNewExperience] = useState<CandidateWorkExperience>({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      onChange([...data, { ...newExperience, id: Date.now().toString() }]);
      setNewExperience({
        company: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      });
    }
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (
    index: number,
    field: keyof CandidateWorkExperience,
    value: string | boolean
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Work Experience
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Add the candidate's professional work experience.
        </p>
      </div>

      {/* Existing Experience */}
      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Added Experience</h4>
          {data.map((experience, index) => (
            <div
              key={experience.id || index}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {experience.position}
                  </h5>
                  <p className="text-sm text-gray-600">{experience.company}</p>
                  {experience.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {experience.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={experience.startDate || ""}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                />

                <Input
                  label="End Date"
                  type="date"
                  value={experience.endDate || ""}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                  disabled={experience.isCurrent}
                />
              </div>

              <div className="mt-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.isCurrent}
                    onChange={(e) =>
                      updateExperience(index, "isCurrent", e.target.checked)
                    }
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Currently working here
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Add Work Experience</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              placeholder="Acme Corp"
            />

            <Input
              label="Position"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
              placeholder="Software Engineer"
            />
          </div>

          <TextArea
            label="Description"
            value={newExperience.description || ""}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            placeholder="Describe responsibilities, achievements, and key projects..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={newExperience.startDate || ""}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  startDate: e.target.value,
                })
              }
            />

            <Input
              label="End Date"
              type="date"
              value={newExperience.endDate || ""}
              onChange={(e) =>
                setNewExperience({ ...newExperience, endDate: e.target.value })
              }
              disabled={newExperience.isCurrent}
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newExperience.isCurrent}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    isCurrent: e.target.checked,
                  })
                }
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Currently working here
              </span>
            </label>
          </div>

          <Button
            onClick={addExperience}
            disabled={!newExperience.company || !newExperience.position}
            variant="outline"
          >
            Add Experience
          </Button>
        </div>
      </div>
    </div>
  );
};
