import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataNotFoundProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function DataNotFound({
  title = "No Data Found",
  message = "We couldn't find what you're looking for",
  actionLabel,
  onAction,
}: DataNotFoundProps) {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-4 py-12">
      <div className="relative flex flex-col items-center text-center">
        <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-red-50">
          <FileQuestion className="h-10 w-10 text-red-600" />
        </div>

        <div className="mt-6 max-w-[280px]">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="mt-6 bg-red-600 text-white hover:bg-red-700"
          >
            {actionLabel}
          </Button>
        )}

        <div className="absolute -z-10">
          <div className="h-[200px] w-[200px] animate-pulse rounded-full bg-red-100/50 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
