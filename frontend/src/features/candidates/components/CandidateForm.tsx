import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../shared/ui/Button";
import { PersonalInfoStep } from "./form-steps/PersonalInfoStep";
import { ContactInfoStep } from "./form-steps/ContactInfoStep";
import { EducationStep } from "./form-steps/EducationStep";
import { ExperienceStep } from "./form-steps/ExperienceStep";
import { SkillsStep } from "./form-steps/SkillsStep";
import { DocumentsStep } from "./form-steps/DocumentsStep";
import { ReviewStep } from "./form-steps/ReviewStep";
import { CandidateService } from "../../../shared/services/candidateService";
import {
  CreateCandidateRequest,
  CandidateAddress,
  CandidateEducation,
  CandidateWorkExperience,
  CandidateSkill,
} from "../../../shared/types/candidate";

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Address
  address: CandidateAddress;

  // Education
  educations: CandidateEducation[];

  // Work Experience
  workExperiences: CandidateWorkExperience[];

  // Skills
  skills: CandidateSkill[];

  // Documents & Notes
  resume: File | null;
  notes: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {},
  educations: [],
  workExperiences: [],
  skills: [],
  resume: null,
  notes: "",
};

const steps = [
  { id: 1, name: "Personal Info", component: "personal" },
  { id: 2, name: "Contact Info", component: "contact" },
  { id: 3, name: "Education", component: "education" },
  { id: 4, name: "Experience", component: "experience" },
  { id: 5, name: "Skills", component: "skills" },
  { id: 6, name: "Documents", component: "documents" },
  { id: 7, name: "Review", component: "review" },
];

export const CandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(updates);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedFields.forEach((field) => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Info
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
      case 2: // Contact Info
        if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
        break;
      // Other steps are optional or have their own validation
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      setIsSubmitting(true);

      const candidateData: CreateCandidateRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        address:
          Object.keys(formData.address).length > 0
            ? formData.address
            : undefined,
        educations: formData.educations,
        workExperiences: formData.workExperiences,
        skills: formData.skills,
        resume: formData.resume || undefined,
        notes: formData.notes || undefined,
        createdById: "temp-recruiter-id", // TODO: Get from auth context
      };

      await CandidateService.createCandidate(candidateData);

      toast.success("Candidate added successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error creating candidate:", error);
      toast.error(error.response?.data?.error || "Failed to create candidate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
            }}
            onChange={(data) => updateFormData(data)}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            data={{ phone: formData.phone, address: formData.address }}
            onChange={(data) => updateFormData(data)}
            errors={errors}
          />
        );
      case 3:
        return (
          <EducationStep
            data={formData.educations}
            onChange={(educations) => updateFormData({ educations })}
          />
        );
      case 4:
        return (
          <ExperienceStep
            data={formData.workExperiences}
            onChange={(workExperiences) => updateFormData({ workExperiences })}
          />
        );
      case 5:
        return (
          <SkillsStep
            data={formData.skills}
            onChange={(skills) => updateFormData({ skills })}
          />
        );
      case 6:
        return (
          <DocumentsStep
            data={{ resume: formData.resume, notes: formData.notes }}
            onChange={(data) => updateFormData(data)}
          />
        );
      case 7:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Candidate
              </h1>
              <p className="text-gray-600">
                Fill out the information below to add a candidate to the system
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {steps.map((step, stepIdx) => (
                  <li
                    key={step.id}
                    className={`${
                      stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
                    } relative`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                        relative flex h-8 w-8 items-center justify-center rounded-full
                        ${
                          currentStep > step.id
                            ? "bg-blue-600"
                            : currentStep === step.id
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }
                      `}
                      >
                        {currentStep > step.id ? (
                          <svg
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span
                            className={`text-sm font-medium ${
                              currentStep === step.id
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            {step.id}
                          </span>
                        )}
                      </div>
                      <span
                        className={`ml-4 text-sm font-medium ${
                          currentStep >= step.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={`
                        absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-8 sm:w-20
                        ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}
                      `}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-8">{renderStep()}</div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < steps.length ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Candidate..." : "Create Candidate"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
