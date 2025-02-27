"use client";

import { ApplicationSteps } from "./ApplicationSteps";
import { ApplicationFormProvider } from "./context/ApplicationFormContext";

export default function JobApplicationClient({ params }: { params: { id: string } }) {
    return (
      <ApplicationFormProvider initialJobId={params.id}>
        <div>
          <ApplicationSteps jobId={params.id} />
        </div>
      </ApplicationFormProvider>
    );
  }
