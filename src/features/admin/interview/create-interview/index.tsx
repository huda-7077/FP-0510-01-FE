import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { FC } from "react";
import CreateInterviewForm from "./components/CreateInterviewForm";

interface CreateInterviewComponentProps {
  jobApplicationId: number;
}

const CreateInterviewComponent: FC<CreateInterviewComponentProps> = ({
  jobApplicationId,
}) => {
  return (
    <DashboardLayout>
      <CreateInterviewForm jobApplicationId={jobApplicationId} />
    </DashboardLayout>
  );
};

export default CreateInterviewComponent;
