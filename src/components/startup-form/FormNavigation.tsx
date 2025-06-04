
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        onClick={onPrevious}
        disabled={currentStep === 1}
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
      >
        Previous
      </Button>
      
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
