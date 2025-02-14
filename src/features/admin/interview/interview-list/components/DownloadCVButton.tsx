import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FC } from "react";

interface DownloadCVButtonProps {
  url: string;
  className?: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  text: string;
  icon: any;
}

const DownloadCVButton: FC<DownloadCVButtonProps> = ({
  url,
  className,
  variant,
  text,
  icon,
}) => {
  return (
    <Button
      variant={variant}
      onClick={() => window.open(url, "_blank")}
      className={className}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Button>
  );
};

export default DownloadCVButton;
