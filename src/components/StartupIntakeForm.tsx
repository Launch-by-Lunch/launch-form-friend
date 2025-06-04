
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FormData, AdditionalContact } from "@/types/startup-form";
import { supabase } from "@/integrations/supabase/client";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    role: '',
    superpower: '',
    
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare the submission data
      const submissionData = {
        // Company Information
        company_name: formData.companyName,
        industry: formData.industry,
        stage: formData.stage,
        location: formData.location,
        website: formData.website,
        
        // Contact Information
        founder_name: formData.founderName,
        email: formData.email,
        phone: formData.phone,
        linkedin_profile: formData.linkedinProfile,
        role: formData.role,
        superpower: formData.superpower,
        
        // Additional contacts (only include those that are shown and have data)
        additional_contacts: additionalContacts.filter((contact, index) => 
          showAdditionalContacts[index] && (contact.name || contact.email)
        ),
        
        // Project Details
        project_description: formData.projectDescription,
        target_audience: formData.targetAudience,
        unique_value_proposition: formData.uniqueValueProposition,
        competitors: formData.competitors,
        
        // Launch Goals
        short_term_goals: formData.shortTermGoals,
        longer_term_goals: formData.longerTermGoals,
        current_tech_stack: formData.currentTechStack,
        using_ai_tools: formData.usingAiTools,
        which_ai_tool: formData.whichAiTool,
        current_resistance: formData.currentResistance,
        
        // Additional Information
        success_metrics: formData.successMetrics,
        additional_comments: formData.additionalComments,
        
        // Document info
        uploaded_document: uploadedDocument ? {
          name: uploadedDocument.name,
          size: uploadedDocument.size,
          type: uploadedDocument.type
        } : null
      };

      console.log('Submitting form data:', submissionData);

      // Insert the data into Supabase
      const { data, error } = await supabase
        .from('startup_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your form. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Form submitted successfully:', data);
      
      toast({
        title: "Form Submitted Successfully!",
        description: "We'll review your information and get back to you within 24 hours.",
      });

      // Reset form after successful submission
      setCurrentStep(1);
      setFormData({
        companyName: '',
        industry: '',
        stage: '',
        location: '',
        website: '',
        founderName: '',
        email: '',
        phone: '',
        linkedinProfile: '',
        role: '',
        superpower: '',
        projectDescription: '',
        targetAudience: '',
        uniqueValueProposition: '',
        competitors: '',
        shortTermGoals: '',
        longerTermGoals: '',
        currentTechStack: '',
        usingAiTools: '',
        whichAiTool: '',
        currentResistance: '',
        successMetrics: '',
        additionalComments: ''
      });
      setAdditionalContacts([
        { name: '', email: '', phone: '', role: '', linkedinProfile: '', superpower: '' },
        { name: '', email: '', phone: '', role: '', linkedinProfile: '', superpower: '' }
      ]);
      setShowAdditionalContacts([false, false]);
      setUploadedDocument(null);

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupIntakeForm;
