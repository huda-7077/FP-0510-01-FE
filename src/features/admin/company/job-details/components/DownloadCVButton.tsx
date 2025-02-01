import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FC } from "react";

interface DownloadCVButtonProps {
  cvUrl: string;
  clasName?: string;
}

const DownloadCVButton: FC<DownloadCVButtonProps> = ({ cvUrl, clasName }) => {
  return (
    <Button
      variant="outline"
      onClick={() => window.open(cvUrl, "_blank")}
      className={clasName}
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
      <span className="font-medium">Download CV</span>
    </Button>
  );
};

export default DownloadCVButton;
