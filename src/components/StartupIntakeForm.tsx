import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building2, User, Target, DollarSign, Clock, Lightbulb, Plus, Minus } from "lucide-react";

const StartupIntakeForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [additionalContacts, setAdditionalContacts] = useState([
    { name: '', email: '', phone: '', role: '', linkedinProfile: '' },
    { name: '', email: '', phone: '', role: '', linkedinProfile: '' }
  ]);
  const [showAdditionalContacts, setShowAdditionalContacts] = useState([false, false]);
  const [formData, setFormData] = useState({
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
    
    // Technical Requirements
    platformNeeds: [],
    
    // Additional Information
    successMetrics: '',
    additionalComments: ''
  });

  const totalSteps = 6;

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

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
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
      additionalContacts: additionalContacts.filter((_, index) => showAdditionalContacts[index])
    };
    console.log('Form submitted:', submissionData);
    toast({
      title: "Form Submitted Successfully!",
      description: "We'll review your information and get back to you within 24 hours.",
    });
  };

  const stepTitles = [
    "Company Information",
    "Contact Details", 
    "Project Overview",
    "Launch Goals",
    "Technical Requirements",
    "Final Details"
  ];

  const stepIcons = [Building2, User, Target, DollarSign, Clock, Lightbulb];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <Label htmlFor="industry" className="text-white">Industry *</Label>
                <Select onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="stage" className="text-white">Company Stage *</Label>
                <Select onValueChange={(value) => handleInputChange('stage', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP/Prototype</SelectItem>
                    <SelectItem value="early">Early Stage</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="scale">Scale Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location" className="text-white">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State/Country"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="website" className="text-white">Website (if exists)</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Primary Contact */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">Primary Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="founderName" className="text-white">Full Name *</Label>
                  <Input
                    id="founderName"
                    value={formData.founderName}
                    onChange={(e) => handleInputChange('founderName', e.target.value)}
                    placeholder="Your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinProfile" className="text-white">LinkedIn Profile</Label>
                  <Input
                    id="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </div>

            {/* Additional Contacts */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">Additional Contacts</h3>
              <p className="text-white/70 text-sm">Add team members, co-founders, or other key contacts for your startup.</p>
              
              {[0, 1].map((index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-white">Contact {index + 2}</h4>
                    <Button
                      type="button"
                      onClick={() => toggleAdditionalContact(index)}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      {showAdditionalContacts[index] ? (
                        <>
                          <Minus className="w-4 h-4 mr-2" />
                          Remove
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Contact
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {showAdditionalContacts[index] && (
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`additionalName${index}`} className="text-white">Full Name</Label>
                          <Input
                            id={`additionalName${index}`}
                            value={additionalContacts[index].name}
                            onChange={(e) => handleAdditionalContactChange(index, 'name', e.target.value)}
                            placeholder="Full name"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`additionalRole${index}`} className="text-white">Role/Title</Label>
                          <Input
                            id={`additionalRole${index}`}
                            value={additionalContacts[index].role}
                            onChange={(e) => handleAdditionalContactChange(index, 'role', e.target.value)}
                            placeholder="Co-founder, CTO, etc."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`additionalEmail${index}`} className="text-white">Email Address</Label>
                          <Input
                            id={`additionalEmail${index}`}
                            type="email"
                            value={additionalContacts[index].email}
                            onChange={(e) => handleAdditionalContactChange(index, 'email', e.target.value)}
                            placeholder="email@example.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`additionalPhone${index}`} className="text-white">Phone Number</Label>
                          <Input
                            id={`additionalPhone${index}`}
                            value={additionalContacts[index].phone}
                            onChange={(e) => handleAdditionalContactChange(index, 'phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`additionalLinkedin${index}`} className="text-white">LinkedIn Profile</Label>
                        <Input
                          id={`additionalLinkedin${index}`}
                          value={additionalContacts[index].linkedinProfile}
                          onChange={(e) => handleAdditionalContactChange(index, 'linkedinProfile', e.target.value)}
                          placeholder="https://linkedin.com/in/profile"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="projectDescription" className="text-white">Project Description *</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                placeholder="Describe your startup idea, product, or service in detail..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
              />
            </div>
            
            <div>
              <Label htmlFor="targetAudience" className="text-white">Target Audience *</Label>
              <Textarea
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Who are your ideal customers? Demographics, pain points, etc."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="uniqueValueProposition" className="text-white">Unique Value Proposition *</Label>
              <Textarea
                id="uniqueValueProposition"
                value={formData.uniqueValueProposition}
                onChange={(e) => handleInputChange('uniqueValueProposition', e.target.value)}
                placeholder="What makes your startup unique? How do you solve problems differently?"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="competitors" className="text-white">Main Competitors</Label>
              <Textarea
                id="competitors"
                value={formData.competitors}
                onChange={(e) => handleInputChange('competitors', e.target.value)}
                placeholder="List your main competitors and how you differentiate from them"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="shortTermGoals" className="text-white">What are your short term goals (1-6 months)?</Label>
              <Textarea
                id="shortTermGoals"
                value={formData.shortTermGoals}
                onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
                placeholder="Describe your short term goals for the next 1-6 months..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="longerTermGoals" className="text-white">What are your longer term goals (6 - 12 months)?</Label>
              <Textarea
                id="longerTermGoals"
                value={formData.longerTermGoals}
                onChange={(e) => handleInputChange('longerTermGoals', e.target.value)}
                placeholder="Describe your longer term goals for 6-12 months..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="currentTechStack" className="text-white">What is your current tech stack?</Label>
              <Textarea
                id="currentTechStack"
                value={formData.currentTechStack}
                onChange={(e) => handleInputChange('currentTechStack', e.target.value)}
                placeholder="Include everything from your email provider, CRM, newsletter, front end, back end, authentication, or AI tools..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
              />
              <p className="text-sm text-white/60 mt-1">This should include everything from your email provider, CRM, newsletter, front end, back end, authentication, or AI tools.</p>
            </div>
            
            <div>
              <Label htmlFor="usingAiTools" className="text-white">Are you currently using AI tools to build your product?</Label>
              <Textarea
                id="usingAiTools"
                value={formData.usingAiTools}
                onChange={(e) => handleInputChange('usingAiTools', e.target.value)}
                placeholder="Tell us about your current use of AI tools..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="whichAiTool" className="text-white">If so, which AI tool are you using?</Label>
              <Textarea
                id="whichAiTool"
                value={formData.whichAiTool}
                onChange={(e) => handleInputChange('whichAiTool', e.target.value)}
                placeholder="Specify which AI tools you're currently using..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="currentResistance" className="text-white">What is the current resistance you're facing or will face soon?</Label>
              <Textarea
                id="currentResistance"
                value={formData.currentResistance}
                onChange={(e) => handleInputChange('currentResistance', e.target.value)}
                placeholder="Describe the challenges, obstacles, or resistance you're currently facing or anticipate..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-white">Platform Needs (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {[
                  'Website/Landing page',
                  'Mobile app (iOS)',
                  'Mobile app (Android)',
                  'Web application',
                  'E-commerce platform',
                  'CRM system',
                  'Analytics setup',
                  'Social media presence'
                ].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.platformNeeds.includes(platform)}
                      onCheckedChange={(checked) => handleArrayChange('platformNeeds', platform, checked as boolean)}
                    />
                    <Label htmlFor={platform} className="text-white">{platform}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="successMetrics" className="text-white">How Will You Measure Success?</Label>
              <Textarea
                id="successMetrics"
                value={formData.successMetrics}
                onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                placeholder="What metrics will indicate that your launch was successful?"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div>
              <Label htmlFor="additionalComments" className="text-white">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                placeholder="Anything else you'd like us to know about your startup or specific requirements?"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {stepTitles.map((title, index) => {
            const IconComponent = stepIcons[index];
            return (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index + 1 <= currentStep ? 'text-orange-400' : 'text-white/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? 'border-orange-400 bg-orange-400/20'
                      : 'border-white/40'
                  }`}
                >
                  <IconComponent size={20} />
                </div>
                <span className="text-xs mt-1 text-center hidden md:block">{title}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
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

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              Previous
            </Button>
            
            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Submit Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupIntakeForm;
