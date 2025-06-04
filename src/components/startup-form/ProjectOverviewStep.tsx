
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, File } from "lucide-react";
import { FormData } from "@/types/startup-form";

interface ProjectOverviewStepProps {
  formData: FormData;
  uploadedDocument: File | null;
  onInputChange: (field: string, value: any) => void;
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveDocument: () => void;
}

const ProjectOverviewStep: React.FC<ProjectOverviewStepProps> = ({
  formData,
  uploadedDocument,
  onInputChange,
  onDocumentUpload,
  onRemoveDocument
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="projectDescription" className="text-white">Project Description *</Label>
        <Textarea
          id="projectDescription"
          value={formData.projectDescription}
          onChange={(e) => onInputChange('projectDescription', e.target.value)}
          placeholder="Describe your startup idea, product, or service in detail..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
        />
      </div>
      
      <div>
        <Label htmlFor="targetAudience" className="text-white">Target Audience *</Label>
        <Textarea
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => onInputChange('targetAudience', e.target.value)}
          placeholder="Who are your ideal customers? Demographics, pain points, etc."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      
      <div>
        <Label htmlFor="uniqueValueProposition" className="text-white">Unique Value Proposition *</Label>
        <Textarea
          id="uniqueValueProposition"
          value={formData.uniqueValueProposition}
          onChange={(e) => onInputChange('uniqueValueProposition', e.target.value)}
          placeholder="What makes your startup unique? How do you solve problems differently?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>
      
      <div>
        <Label htmlFor="competitors" className="text-white">Main Competitors</Label>
        <Textarea
          id="competitors"
          value={formData.competitors}
          onChange={(e) => onInputChange('competitors', e.target.value)}
          placeholder="List your main competitors and how you differentiate from them"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        <Label className="text-white">Project Document (Optional)</Label>
        <p className="text-white/70 text-sm">Upload a project overview, pitch deck, or business plan (JPG or PDF only, max 10MB)</p>
        
        {!uploadedDocument ? (
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-white/80">Drag and drop your document here, or</p>
              <label htmlFor="document-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => document.getElementById('document-upload')?.click()}
                >
                  Choose File
                </Button>
              </label>
              <input
                id="document-upload"
                type="file"
                accept=".jpg,.jpeg,.pdf"
                onChange={onDocumentUpload}
                className="hidden"
              />
            </div>
            <p className="text-white/60 text-xs mt-2">Supported formats: JPG, PDF (max 10MB)</p>
          </div>
        ) : (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {uploadedDocument.type === 'application/pdf' ? (
                <File className="w-8 h-8 text-red-400" />
              ) : (
                <FileImage className="w-8 h-8 text-blue-400" />
              )}
              <div>
                <p className="text-white font-medium">{uploadedDocument.name}</p>
                <p className="text-white/60 text-sm">
                  {(uploadedDocument.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              type="button"
              onClick={onRemoveDocument}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOverviewStep;
