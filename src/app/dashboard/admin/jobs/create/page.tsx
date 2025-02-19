import CreateJobComponent from "@/features/admin/job/create-job";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const CreateJob = () => {
  return <CreateJobComponent />;
};

export default AdminAuthGuard(CreateJob);
