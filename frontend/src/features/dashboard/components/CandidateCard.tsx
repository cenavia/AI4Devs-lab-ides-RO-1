import React from "react";
import { Candidate } from "../../../shared/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  onRefresh?: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "HIRED":
        return "bg-purple-100 text-purple-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Active";
      case "HIRED":
        return "Hired";
      case "INACTIVE":
        return "Inactive";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (candidate.resumeUrl) {
      window.open(`http://localhost:8000${candidate.resumeUrl}`, "_blank");
    }
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getInitials(candidate.firstName, candidate.lastName)}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Name and Status */}
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {candidate.fullName}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    candidate.status
                  )}`}
                >
                  {getStatusLabel(candidate.status)}
                </span>
              </div>

              {/* Contact Info */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <span className="flex items-center">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">{candidate.email}</span>
                </span>

                {candidate.phone && (
                  <span className="flex items-center">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{candidate.phone}</span>
                  </span>
                )}

                <span className="flex items-center">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 6l6 6m0 0l6-6m-6 6V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Added {formatDate(candidate.createdAt)}</span>
                </span>
              </div>

              {/* Skills Preview */}
              {candidate.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Experience Summary */}
              {candidate.workExperiences.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg
                      className="flex-shrink-0 mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 112 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 112-2V6"
                      />
                    </svg>
                    {candidate.workExperiences[0].position} at{" "}
                    {candidate.workExperiences[0].company}
                    {candidate.workExperiences.length > 1 &&
                      ` (+${candidate.workExperiences.length - 1} more)`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {candidate.resumeUrl && (
            <button
              onClick={handleResumeClick}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
              title="View Resume"
            >
              <svg
                className="h-5 w-5"
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
            </button>
          )}

          <button
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors"
            title="More actions"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Education/Notes Preview */}
      {(candidate.educations.length > 0 || candidate.notes) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            {candidate.educations.length > 0 && (
              <span className="flex items-center">
                <svg
                  className="flex-shrink-0 mr-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                {candidate.educations[0].degree} from{" "}
                {candidate.educations[0].institution}
              </span>
            )}

            {candidate.notes && (
              <span className="flex items-center text-blue-600">
                <svg
                  className="flex-shrink-0 mr-1 h-3 w-3"
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
                Has notes
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
