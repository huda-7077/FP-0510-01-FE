import UpdateInterviewComponent from "@/features/admin/interview/update-interview";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const UpdateInterview = ({ params }: { params: { id: string } }) => {
  return <UpdateInterviewComponent id={Number(params.id)} />;
};

export default AdminAuthGuard(UpdateInterview);
