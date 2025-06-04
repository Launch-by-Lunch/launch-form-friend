
import { useState } from 'react';
import { FormData, AdditionalContact } from "@/types/startup-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useStartupForm = () => {
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
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        company_name: formData.companyName,
        industry: formData.industry,
        stage: formData.stage,
        location: formData.location,
        website: formData.website,
        founder_name: formData.founderName,
        email: formData.email,
        phone: formData.phone,
        linkedin_profile: formData.linkedinProfile,
        role: formData.role,
        superpower: formData.superpower,
        additional_contacts: additionalContacts.filter((contact, index) => 
          showAdditionalContacts[index] && (contact.name || contact.email)
        ) as any,
        project_description: formData.projectDescription,
        target_audience: formData.targetAudience,
        unique_value_proposition: formData.uniqueValueProposition,
        competitors: formData.competitors,
        short_term_goals: formData.shortTermGoals,
        longer_term_goals: formData.longerTermGoals,
        current_tech_stack: formData.currentTechStack,
        using_ai_tools: formData.usingAiTools,
        which_ai_tool: formData.whichAiTool,
        current_resistance: formData.currentResistance,
        success_metrics: formData.successMetrics,
        additional_comments: formData.additionalComments,
        uploaded_document: uploadedDocument ? {
          name: uploadedDocument.name,
          size: uploadedDocument.size,
          type: uploadedDocument.type
        } : null
      };

      console.log('Submitting form data:', submissionData);

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

      resetForm();

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

  return {
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
  };
};
