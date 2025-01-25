import { Building2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({
  message = "Please wait a moment",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-full w-full animate-[ping_2s_infinite] rounded-full bg-blue-200 opacity-20"></div>
          <div className="absolute h-full w-full animate-[ping_2s_0.5s_infinite] rounded-full bg-blue-200 opacity-20"></div>
          <div className="relative">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-gray-700">{message}</p>
          <p className="mt-1 text-xs text-gray-500">
            We're preparing your content
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
