
import StartupIntakeForm from "@/components/StartupIntakeForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/f3afdd62-2a8a-445b-960f-c6479c98367e.png" 
            alt="Launch by Lunch Logo" 
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Startup Intake Form
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Let's get your startup launched! Fill out this form so we can understand your vision and create the perfect strategy for your rapid launch.
          </p>
        </div>
        <StartupIntakeForm />
      </div>
    </div>
  );
};

export default Index;
