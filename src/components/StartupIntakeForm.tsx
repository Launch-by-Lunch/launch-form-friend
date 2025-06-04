
import React from 'react';
import { useStartupForm } from "@/hooks/useStartupForm";
import FormProgress from "./startup-form/FormProgress";
import FormContainer from "./startup-form/FormContainer";
import FormStepRenderer from "./startup-form/FormStepRenderer";
import FormNavigation from "./startup-form/FormNavigation";

const StartupIntakeForm = () => {
  const {
    currentStep,
    isSubmitting,
    formData,
    additionalContacts,
    showAdditionalContacts,
    uploadedDocument,
    handleInputChange,
    handleAdditionalContactChange,
    toggleAdditionalContact,
    handleDocumentUpload,
    removeDocument,
    handleNext,
    handlePrevious,
    handleSubmit
  } = useStartupForm();

  const totalSteps = 5;
  const stepTitles = [
    "Company Information",
    "Contact Details", 
    "Project Overview",
    "Launch Goals",
    "Final Details"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      <FormContainer currentStep={currentStep} stepTitles={stepTitles}>
        <FormStepRenderer
          currentStep={currentStep}
          formData={formData}
          additionalContacts={additionalContacts}
          showAdditionalContacts={showAdditionalContacts}
          uploadedDocument={uploadedDocument}
          onInputChange={handleInputChange}
          onAdditionalContactChange={handleAdditionalContactChange}
          onToggleAdditionalContact={toggleAdditionalContact}
          onDocumentUpload={handleDocumentUpload}
          onRemoveDocument={removeDocument}
        />

        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </FormContainer>
    </div>
  );
};

export default StartupIntakeForm;
