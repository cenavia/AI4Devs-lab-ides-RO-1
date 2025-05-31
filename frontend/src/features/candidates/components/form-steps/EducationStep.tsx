import React, { useState } from "react";
import { Button } from "../../../../shared/ui/Button";
import { Input } from "../../../../shared/ui/Input";
import { CandidateEducation } from "../../../../shared/types/candidate";

interface EducationStepProps {
  data: CandidateEducation[];
  onChange: (educations: CandidateEducation[]) => void;
}

export const EducationStep: React.FC<EducationStepProps> = ({
  data,
  onChange,
}) => {
  const [newEducation, setNewEducation] = useState<CandidateEducation>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      onChange([...data, { ...newEducation, id: Date.now().toString() }]);
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      });
    }
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (
    index: number,
    field: keyof CandidateEducation,
    value: string | boolean
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Education</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add the candidate's educational background.
        </p>
      </div>

      {/* Existing Education */}
      {data.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Added Education</h4>
          {data.map((education, index) => (
            <div
              key={education.id || index}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {education.degree}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {education.institution}
                  </p>
                  {education.fieldOfStudy && (
                    <p className="text-sm text-gray-500">
                      {education.fieldOfStudy}
                    </p>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={education.startDate || ""}
                  onChange={(e) =>
                    updateEducation(index, "startDate", e.target.value)
                  }
                />

                <Input
                  label="End Date"
                  type="date"
                  value={education.endDate || ""}
                  onChange={(e) =>
                    updateEducation(index, "endDate", e.target.value)
                  }
                  disabled={education.isCurrent}
                />
              </div>

              <div className="mt-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={education.isCurrent}
                    onChange={(e) =>
                      updateEducation(index, "isCurrent", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Currently studying here
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Education */}
      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Add Education</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Institution"
              value={newEducation.institution}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  institution: e.target.value,
                })
              }
              placeholder="University of Example"
            />

            <Input
              label="Degree"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
              placeholder="Bachelor of Science"
            />
          </div>

          <Input
            label="Field of Study"
            value={newEducation.fieldOfStudy || ""}
            onChange={(e) =>
              setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
            }
            placeholder="Computer Science"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={newEducation.startDate || ""}
              onChange={(e) =>
                setNewEducation({ ...newEducation, startDate: e.target.value })
              }
            />

            <Input
              label="End Date"
              type="date"
              value={newEducation.endDate || ""}
              onChange={(e) =>
                setNewEducation({ ...newEducation, endDate: e.target.value })
              }
              disabled={newEducation.isCurrent}
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newEducation.isCurrent}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    isCurrent: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Currently studying here
              </span>
            </label>
          </div>

          <Button
            onClick={addEducation}
            disabled={!newEducation.institution || !newEducation.degree}
            variant="outline"
          >
            Add Education
          </Button>
        </div>
      </div>
    </div>
  );
};
