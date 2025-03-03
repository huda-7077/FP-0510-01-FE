"use client";

import { Loader2 } from "lucide-react";

export const SubmissionLoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex items-center gap-3 rounded-lg bg-white p-6">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-lg">Submitting your application...</p>
      </div>
    </div>
  );
};
