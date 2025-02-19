import React from "react";
import { UserCircle2, Upload, Search, CheckCircle } from "lucide-react";

interface WorkflowStepProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  isActive?: boolean;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  icon: Icon,
  title,
  description,
  isActive = false,
}) => (
  <div className="group relative rounded-lg p-8 text-center transition-all duration-300 hover:bg-white hover:shadow-lg">
    <div className="flex flex-col items-center">
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 ${isActive ? "bg-[#0062FF]" : "border-2 border-gray-100 bg-white group-hover:bg-[#0062FF]"}`}
      >
        <Icon
          className={`h-8 w-8 transition-colors duration-300 ${isActive ? "text-white" : "text-[#0062FF] group-hover:text-white"}`}
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const SupajobWorkflow = () => {
  const steps = [
    {
      icon: UserCircle2,
      title: "Create account",
      description:
        "Sign up in minutes with your email or social media accounts to start your job search journey.",
    },
    {
      icon: Upload,
      title: "Upload CV/Resume",
      description:
        "Upload your CV or create one using our CV generator. We'll match your skills with the right opportunities.",
      isActive: true,
    },
    {
      icon: Search,
      title: "Find suitable job",
      description:
        "Browse through personalized job recommendations based on your skills, experience, and preferences.",
    },
    {
      icon: CheckCircle,
      title: "Apply job",
      description:
        "Submit applications with one click and track your application status in real-time.",
    },
  ];

  return (
    <div className="bg-[#f7f7f8]">
      <div className="container mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <h2 className="mb-16 text-center text-3xl font-semibold">
          How supajob work
        </h2>

        <div className="relative">
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <WorkflowStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isActive={step.isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupajobWorkflow;
