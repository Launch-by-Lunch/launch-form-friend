
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/types/startup-form";

interface CompanyInformationStepProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const CompanyInformationStep: React.FC<CompanyInformationStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="companyName" className="text-white">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => onInputChange('companyName', e.target.value)}
            placeholder="Enter your company name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
        <div>
          <Label htmlFor="industry" className="text-white">Industry *</Label>
          <Select onValueChange={(value) => onInputChange('industry', value)}>
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
          <Select onValueChange={(value) => onInputChange('stage', value)}>
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
            onChange={(e) => onInputChange('location', e.target.value)}
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
          onChange={(e) => onInputChange('website', e.target.value)}
          placeholder="https://yourwebsite.com"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
    </div>
  );
};

export default CompanyInformationStep;
