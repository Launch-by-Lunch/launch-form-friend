
import React from 'react';
import { FormData, AdditionalContact } from "@/types/startup-form";
import CompanyInformationStep from "./CompanyInformationStep";
import ContactDetailsStep from "./ContactDetailsStep";
import ProjectOverviewStep from "./ProjectOverviewStep";
import LaunchGoalsStep from "./LaunchGoalsStep";
import FinalDetailsStep from "./FinalDetailsStep";

interface FormStepRendererProps {
  currentStep: number;
  formData: FormData;
  additionalContacts: AdditionalContact[];
  showAdditionalContacts: boolean[];
  uploadedDocument: File | null;
  onInputChange: (field: string, value: any) => void;
  onAdditionalContactChange: (index: number, field: string, value: string) => void;
  onToggleAdditionalContact: (index: number) => void;
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveDocument: () => void;
}

const FormStepRenderer: React.FC<FormStepRendererProps> = ({
  currentStep,
  formData,
  additionalContacts,
  showAdditionalContacts,
  uploadedDocument,
  onInputChange,
  onAdditionalContactChange,
  onToggleAdditionalContact,
  onDocumentUpload,
  onRemoveDocument
}) => {
  switch (currentStep) {
    case 1:
      return (
        <CompanyInformationStep
          formData={formData}
          onInputChange={onInputChange}
        />
      );
    case 2:
      return (
        <ContactDetailsStep
          formData={formData}
          additionalContacts={additionalContacts}
          showAdditionalContacts={showAdditionalContacts}
          onInputChange={onInputChange}
          onAdditionalContactChange={onAdditionalContactChange}
          onToggleAdditionalContact={onToggleAdditionalContact}
        />
      );
    case 3:
      return (
        <ProjectOverviewStep
          formData={formData}
          uploadedDocument={uploadedDocument}
          onInputChange={onInputChange}
          onDocumentUpload={onDocumentUpload}
          onRemoveDocument={onRemoveDocument}
        />
      );
    case 4:
      return (
        <LaunchGoalsStep
          formData={formData}
          onInputChange={onInputChange}
        />
      );
    case 5:
      return (
        <FinalDetailsStep
          formData={formData}
          onInputChange={onInputChange}
        />
      );
    default:
      return null;
  }
};

export default FormStepRenderer;
