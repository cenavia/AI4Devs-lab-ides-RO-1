import React from "react";
import { FileUpload } from "../../../../shared/ui/FileUpload";
import { TextArea } from "../../../../shared/ui/TextArea";

interface DocumentsData {
  resume: File | null;
  notes: string;
}

interface DocumentsStepProps {
  data: DocumentsData;
  onChange: (data: Partial<DocumentsData>) => void;
}

export const DocumentsStep: React.FC<DocumentsStepProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Documents & Notes
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Upload the candidate's resume and add any additional notes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <FileUpload
            label="Resume"
            value={data.resume}
            onChange={(file) => onChange({ resume: file })}
            accept=".pdf,.doc,.docx"
            helperText="Upload PDF or DOCX files (max 10MB). This will be visible to hiring managers."
            maxSize={10 * 1024 * 1024} // 10MB
          />
        </div>

        {/* Notes */}
        <div>
          <TextArea
            label="Additional Notes"
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Add any additional information about the candidate, such as:
- Referral source
- Interview availability
- Special requirements
- Compensation expectations
- Notable achievements not in resume
- Cultural fit observations
- Technical assessment results"
            rows={8}
            helperText="These notes will be visible to other recruiters and hiring managers."
          />
        </div>

        {/* File Upload Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                Resume Upload Guidelines
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Accepted formats: PDF, DOC, DOCX</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Ensure the resume is recent and relevant</li>
                  <li>
                    Remove any sensitive personal information if necessary
                  </li>
                  <li>
                    Files are stored securely and only accessible to authorized
                    personnel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">
                Privacy & Data Protection
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  All candidate information is handled in accordance with our
                  privacy policy and applicable data protection regulations.
                  Documents and personal information are stored securely and
                  accessed only by authorized personnel for recruitment
                  purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
