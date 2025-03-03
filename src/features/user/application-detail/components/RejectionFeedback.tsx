import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface RejectionFeedbackProps {
  notes: string;
}

export function RejectionFeedback({ notes }: RejectionFeedbackProps) {
  return (
    <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
      <h2 className="mb-2 flex items-center text-lg font-semibold text-red-800">
        <AlertCircle className="mr-2 h-5 w-5" />
        Application Feedback
      </h2>

      {notes && (
        <div className="mt-4 rounded-lg border border-red-200 bg-white p-4">
          <h3 className="font-medium text-red-800">
            Feedback from the hiring team:
          </h3>
          <p className="mt-1 text-red-700">{notes}</p>
        </div>
      )}

      <br />

      <div className="mt-4">
        <h3 className="text-red-800">Message from Supajob team:</h3>
        <p className="mt-1 text-sm text-red-700">
          Don’t be discouraged—there are plenty of great opportunities waiting
          for you! Keep going and explore more jobs that match your skills.
        </p>
      </div>

      <div className="mt-4">
        <Link href="/jobs">
          <Button variant="destructive">Explore Jobs</Button>
        </Link>
      </div>
    </div>
  );
}
