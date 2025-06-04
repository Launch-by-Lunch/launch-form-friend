
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/startup-form";

interface LaunchGoalsStepProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const LaunchGoalsStep: React.FC<LaunchGoalsStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="shortTermGoals" className="text-white">What are your short term goals (1-6 months)?</Label>
        <Textarea
          id="shortTermGoals"
          value={formData.shortTermGoals}
          onChange={(e) => onInputChange('shortTermGoals', e.target.value)}
          placeholder="Describe your short term goals for the next 1-6 months..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="longerTermGoals" className="text-white">What are your longer term goals (6 - 12 months)?</Label>
        <Textarea
          id="longerTermGoals"
          value={formData.longerTermGoals}
          onChange={(e) => onInputChange('longerTermGoals', e.target.value)}
          placeholder="Describe your longer term goals for 6-12 months..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="currentTechStack" className="text-white">What is your current tech stack?</Label>
        <Textarea
          id="currentTechStack"
          value={formData.currentTechStack}
          onChange={(e) => onInputChange('currentTechStack', e.target.value)}
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
          onChange={(e) => onInputChange('usingAiTools', e.target.value)}
          placeholder="Tell us about your current use of AI tools..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      
      <div>
        <Label htmlFor="whichAiTool" className="text-white">If so, which AI tool are you using?</Label>
        <Textarea
          id="whichAiTool"
          value={formData.whichAiTool}
          onChange={(e) => onInputChange('whichAiTool', e.target.value)}
          placeholder="Specify which AI tools you're currently using..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      
      <div>
        <Label htmlFor="currentResistance" className="text-white">What is the current resistance you're facing or will face soon?</Label>
        <Textarea
          id="currentResistance"
          value={formData.currentResistance}
          onChange={(e) => onInputChange('currentResistance', e.target.value)}
          placeholder="Describe the challenges, obstacles, or resistance you're currently facing or anticipate..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default LaunchGoalsStep;
