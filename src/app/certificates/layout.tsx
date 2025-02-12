import { Navbar } from "@/components/Navbar";

const Certificates = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Certificates;
