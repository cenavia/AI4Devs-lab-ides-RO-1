import React from "react";
import { Input } from "../../../../shared/ui/Input";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: Partial<PersonalInfoData>) => void;
  errors: Record<string, string>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Enter the candidate's basic personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          required
          value={data.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          error={errors.firstName}
          placeholder="John"
        />

        <Input
          label="Last Name"
          required
          value={data.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          error={errors.lastName}
          placeholder="Doe"
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        required
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        error={errors.email}
        placeholder="john.doe@example.com"
        helperText="This will be used for all communications with the candidate"
      />
    </div>
  );
};
