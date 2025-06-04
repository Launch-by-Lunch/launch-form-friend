
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { FormData, AdditionalContact } from "@/types/startup-form";

interface ContactDetailsStepProps {
  formData: FormData;
  additionalContacts: AdditionalContact[];
  showAdditionalContacts: boolean[];
  onInputChange: (field: string, value: any) => void;
  onAdditionalContactChange: (index: number, field: string, value: string) => void;
  onToggleAdditionalContact: (index: number) => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({
  formData,
  additionalContacts,
  showAdditionalContacts,
  onInputChange,
  onAdditionalContactChange,
  onToggleAdditionalContact
}) => {
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
              onChange={(e) => onInputChange('founderName', e.target.value)}
              placeholder="Your full name"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-white">Role/Title</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => onInputChange('role', e.target.value)}
              placeholder="Founder, CEO, etc."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-white">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="linkedinProfile" className="text-white">LinkedIn Profile</Label>
            <Input
              id="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={(e) => onInputChange('linkedinProfile', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div>
            <Label htmlFor="superpower" className="text-white">What is your superpower?</Label>
            <Input
              id="superpower"
              value={formData.superpower}
              onChange={(e) => onInputChange('superpower', e.target.value)}
              placeholder="What makes you unique?"
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
                onClick={() => onToggleAdditionalContact(index)}
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
                      onChange={(e) => onAdditionalContactChange(index, 'name', e.target.value)}
                      placeholder="Full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`additionalRole${index}`} className="text-white">Role/Title</Label>
                    <Input
                      id={`additionalRole${index}`}
                      value={additionalContacts[index].role}
                      onChange={(e) => onAdditionalContactChange(index, 'role', e.target.value)}
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
                      onChange={(e) => onAdditionalContactChange(index, 'email', e.target.value)}
                      placeholder="email@example.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`additionalPhone${index}`} className="text-white">Phone Number</Label>
                    <Input
                      id={`additionalPhone${index}`}
                      value={additionalContacts[index].phone}
                      onChange={(e) => onAdditionalContactChange(index, 'phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`additionalLinkedin${index}`} className="text-white">LinkedIn Profile</Label>
                    <Input
                      id={`additionalLinkedin${index}`}
                      value={additionalContacts[index].linkedinProfile}
                      onChange={(e) => onAdditionalContactChange(index, 'linkedinProfile', e.target.value)}
                      placeholder="https://linkedin.com/in/profile"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`additionalSuperpower${index}`} className="text-white">What is your superpower?</Label>
                    <Input
                      id={`additionalSuperpower${index}`}
                      value={additionalContacts[index].superpower}
                      onChange={(e) => onAdditionalContactChange(index, 'superpower', e.target.value)}
                      placeholder="What makes you unique?"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetailsStep;
