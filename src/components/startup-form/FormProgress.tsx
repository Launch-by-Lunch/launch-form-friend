
import React from 'react';
import { Building2, User, Target, DollarSign, Lightbulb } from "lucide-react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps, stepTitles }) => {
  const stepIcons = [Building2, User, Target, DollarSign, Lightbulb];

  return (
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
  );
};

export default FormProgress;
