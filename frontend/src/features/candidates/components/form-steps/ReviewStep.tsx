import React from "react";
import {
  CandidateAddress,
  CandidateEducation,
  CandidateWorkExperience,
  CandidateSkill,
} from "../../../../shared/types/candidate";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: CandidateAddress;
  educations: CandidateEducation[];
  workExperiences: CandidateWorkExperience[];
  skills: CandidateSkill[];
  resume: File | null;
  notes: string;
}

interface ReviewStepProps {
  data: FormData;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
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

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "Beginner";
      case "INTERMEDIATE":
        return "Intermediate";
      case "ADVANCED":
        return "Advanced";
      case "EXPERT":
        return "Expert";
      default:
        return level;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Review Candidate Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the information before creating the candidate
          profile.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {data.firstName} {data.lastName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{data.email}</p>
          </div>
          {data.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Address */}
      {(data.address.street ||
        data.address.city ||
        data.address.state ||
        data.address.country) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Address</h4>
          <div className="text-sm text-gray-900">
            {data.address.street && <p>{data.address.street}</p>}
            <p>
              {[data.address.city, data.address.state, data.address.zipCode]
                .filter(Boolean)
                .join(", ")}
            </p>
            {data.address.country && <p>{data.address.country}</p>}
          </div>
        </div>
      )}

      {/* Education */}
      {data.educations.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Education
          </h4>
          <div className="space-y-4">
            {data.educations.map((education, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-medium text-gray-900">
                  {education.degree}
                </h5>
                <p className="text-sm text-gray-600">{education.institution}</p>
                {education.fieldOfStudy && (
                  <p className="text-sm text-gray-500">
                    {education.fieldOfStudy}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  {education.startDate && (
                    <span>{formatDate(education.startDate)}</span>
                  )}
                  {education.startDate &&
                    (education.endDate || education.isCurrent) && (
                      <span>-</span>
                    )}
                  {education.isCurrent ? (
                    <span>Present</span>
                  ) : education.endDate ? (
                    <span>{formatDate(education.endDate)}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperiences.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Work Experience
          </h4>
          <div className="space-y-4">
            {data.workExperiences.map((experience, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <h5 className="font-medium text-gray-900">
                  {experience.position}
                </h5>
                <p className="text-sm text-gray-600">{experience.company}</p>
                {experience.description && (
                  <p className="text-sm text-gray-700 mt-2">
                    {experience.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  {experience.startDate && (
                    <span>{formatDate(experience.startDate)}</span>
                  )}
                  {experience.startDate &&
                    (experience.endDate || experience.isCurrent) && (
                      <span>-</span>
                    )}
                  {experience.isCurrent ? (
                    <span>Present</span>
                  ) : experience.endDate ? (
                    <span>{formatDate(experience.endDate)}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-gray-100 rounded-full">
                  {skill.name}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getSkillLevelColor(
                    skill.level
                  )}`}
                >
                  {getSkillLevelLabel(skill.level)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {data.resume && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Documents
          </h4>
          <div className="flex items-center space-x-3">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {data.resume.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(data.resume.size)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {data.notes && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Additional Notes
          </h4>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {data.notes}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Ready to Create Candidate Profile
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                You are about to create a new candidate profile for{" "}
                <strong>
                  {data.firstName} {data.lastName}
                </strong>
                . This will add them to your talent pipeline where you can track
                their application progress, schedule interviews, and manage
                their recruitment journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
