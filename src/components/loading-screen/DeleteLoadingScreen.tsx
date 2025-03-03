import { Trash2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export function DeleteLoadingScreen({
  message = "Please wait a moment",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-full w-full animate-[ping_2s_infinite] rounded-full bg-red-200 opacity-20"></div>
          <div className="absolute h-full w-full animate-[ping_2s_0.5s_infinite] rounded-full bg-red-200 opacity-20"></div>
          <div className="relative">
            <Trash2 className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-gray-700">{message}</p>
          <p className="mt-1 text-xs text-gray-500">
            We're deleting the content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeleteLoadingScreen;
