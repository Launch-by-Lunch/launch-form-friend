
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/startup-form";

interface FinalDetailsStepProps {
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="successMetrics" className="text-white">How Will You Measure Success?</Label>
        <Textarea
          id="successMetrics"
          value={formData.successMetrics}
          onChange={(e) => onInputChange('successMetrics', e.target.value)}
          placeholder="What metrics will indicate that your launch was successful?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      
      <div>
        <Label htmlFor="additionalComments" className="text-white">Additional Comments</Label>
        <Textarea
          id="additionalComments"
          value={formData.additionalComments}
          onChange={(e) => onInputChange('additionalComments', e.target.value)}
          placeholder="Anything else you'd like us to know about your startup or specific requirements?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
    </div>
  );
};

export default FinalDetailsStep;
