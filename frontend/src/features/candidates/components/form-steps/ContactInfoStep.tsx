import React from "react";
import { Input } from "../../../../shared/ui/Input";
import { CandidateAddress } from "../../../../shared/types/candidate";

interface ContactInfoData {
  phone: string;
  address: CandidateAddress;
}

interface ContactInfoStepProps {
  data: ContactInfoData;
  onChange: (data: Partial<ContactInfoData>) => void;
  errors: Record<string, string>;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  const updateAddress = (field: keyof CandidateAddress, value: string) => {
    onChange({
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Contact Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Provide contact details and address information.
        </p>
      </div>

      <Input
        label="Phone Number"
        type="tel"
        value={data.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        error={errors.phone}
        placeholder="+1 (555) 123-4567"
        helperText="Include country code if applicable"
      />

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">
          Address (Optional)
        </h4>

        <div className="space-y-4">
          <Input
            label="Street Address"
            value={data.address.street || ""}
            onChange={(e) => updateAddress("street", e.target.value)}
            placeholder="123 Main Street"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              value={data.address.city || ""}
              onChange={(e) => updateAddress("city", e.target.value)}
              placeholder="New York"
            />

            <Input
              label="State/Province"
              value={data.address.state || ""}
              onChange={(e) => updateAddress("state", e.target.value)}
              placeholder="NY"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="ZIP/Postal Code"
              value={data.address.zipCode || ""}
              onChange={(e) => updateAddress("zipCode", e.target.value)}
              placeholder="10001"
            />

            <Input
              label="Country"
              value={data.address.country || ""}
              onChange={(e) => updateAddress("country", e.target.value)}
              placeholder="United States"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
