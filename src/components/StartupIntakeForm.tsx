
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FormData, AdditionalContact } from "@/types/startup-form";
import FormProgress from "./startup-form/FormProgress";
import CompanyInformationStep from "./startup-form/CompanyInformationStep";
import ContactDetailsStep from "./startup-form/ContactDetailsStep";
import ProjectOverviewStep from "./startup-form/ProjectOverviewStep";
import LaunchGoalsStep from "./startup-form/LaunchGoalsStep";
import FinalDetailsStep from "./startup-form/FinalDetailsStep";
import FormNavigation from "./startup-form/FormNavigation";

const StartupIntakeForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [additionalContacts, setAdditionalContacts] = useState<AdditionalContact[]>([
    { name: '', email: '', phone: '', role: '', linkedinProfile: '', superpower: '' },
    { name: '', email: '', phone: '', role: '', linkedinProfile: '', superpower: '' }
  ]);
  const [showAdditionalContacts, setShowAdditionalContacts] = useState([false, false]);
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    // Company Information
    companyName: '',
    industry: '',
    stage: '',
    location: '',
    website: '',
    
    // Contact Information
    founderName: '',
    email: '',
    phone: '',
    linkedinProfile: '',
    
    // Project Details
    projectDescription: '',
    targetAudience: '',
    uniqueValueProposition: '',
    competitors: '',
    
    // Launch Goals
    shortTermGoals: '',
    longerTermGoals: '',
    currentTechStack: '',
    usingAiTools: '',
    whichAiTool: '',
    currentResistance: '',
    
    // Additional Information
    successMetrics: '',
    additionalComments: ''
  });

  const totalSteps = 5;
  const stepTitles = [
    "Company Information",
    "Contact Details", 
    "Project Overview",
    "Launch Goals",
    "Final Details"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdditionalContactChange = (index: number, field: string, value: string) => {
    setAdditionalContacts(prev => 
      prev.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };

  const toggleAdditionalContact = (index: number) => {
    setShowAdditionalContacts(prev => 
      prev.map((show, i) => i === index ? !show : show)
    );
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'application/pdf'];
      if (allowedTypes.includes(file.type)) {
        setUploadedDocument(file);
        toast({
          title: "Document Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG or PDF file only.",
          variant: "destructive"
        });
      }
    }
  };

  const removeDocument = () => {
    setUploadedDocument(null);
    toast({
      title: "Document Removed",
      description: "The uploaded document has been removed.",
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      additionalContacts: additionalContacts.filter((_, index) => showAdditionalContacts[index]),
      uploadedDocument: uploadedDocument ? {
        name: uploadedDocument.name,
        size: uploadedDocument.size,
        type: uploadedDocument.type
      } : null
    };
    console.log('Form submitted:', submissionData);
    toast({
      title: "Form Submitted Successfully!",
      description: "We'll review your information and get back to you within 24 hours.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInformationStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ContactDetailsStep
            formData={formData}
            additionalContacts={additionalContacts}
            showAdditionalContacts={showAdditionalContacts}
            onInputChange={handleInputChange}
            onAdditionalContactChange={handleAdditionalContactChange}
            onToggleAdditionalContact={toggleAdditionalContact}
          />
        );
      case 3:
        return (
          <ProjectOverviewStep
            formData={formData}
            uploadedDocument={uploadedDocument}
            onInputChange={handleInputChange}
            onDocumentUpload={handleDocumentUpload}
            onRemoveDocument={removeDocument}
          />
        );
      case 4:
        return (
          <LaunchGoalsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <FinalDetailsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {stepTitles[currentStep - 1]}
            </h2>
            <p className="text-white/70">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {renderStep()}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupIntakeForm;
