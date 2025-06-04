
export interface FormData {
  // Company Information
  companyName: string;
  industry: string;
  stage: string;
  location: string;
  website: string;
  
  // Contact Information
  founderName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  
  // Project Details
  projectDescription: string;
  targetAudience: string;
  uniqueValueProposition: string;
  competitors: string;
  
  // Launch Goals
  shortTermGoals: string;
  longerTermGoals: string;
  currentTechStack: string;
  usingAiTools: string;
  whichAiTool: string;
  currentResistance: string;
  
  // Additional Information
  successMetrics: string;
  additionalComments: string;
}

export interface AdditionalContact {
  name: string;
  email: string;
  phone: string;
  role: string;
  linkedinProfile: string;
  superpower: string;
}

export interface SubmissionData extends FormData {
  additionalContacts: AdditionalContact[];
  uploadedDocument: {
    name: string;
    size: number;
    type: string;
  } | null;
}
