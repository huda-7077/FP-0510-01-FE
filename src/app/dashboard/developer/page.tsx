import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const Developer = () => {
  return <div>DeveloperPage</div>;
};

export default DeveloperAuthGuard(Developer);
