
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface FormContainerProps {
  children: React.ReactNode;
  currentStep: number;
  stepTitles: string[];
}

const FormContainer: React.FC<FormContainerProps> = ({ 
  children, 
  currentStep, 
  stepTitles 
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {stepTitles[currentStep - 1]}
          </h2>
          <p className="text-white/70">
            Step {currentStep} of {stepTitles.length}
          </p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormContainer;
