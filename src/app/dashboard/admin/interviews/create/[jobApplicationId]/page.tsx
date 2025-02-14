import CreateInterviewComponent from "@/features/admin/interview/create-interview";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const CreateInterview = ({
  params,
}: {
  params: { jobApplicationId: string };
}) => {
  return (
    <CreateInterviewComponent
      jobApplicationId={Number(params.jobApplicationId)}
    />
  );
};

export default AdminAuthGuard(CreateInterview);
