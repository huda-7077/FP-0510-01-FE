"use client";

import { ApplicationSteps } from "./ApplicationSteps";
import { ApplicationFormProvider } from "./context/ApplicationFormContext";

export default function JobApplicationClient({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <ApplicationFormProvider initialJobSlug={params.slug}>
      <div>
        <ApplicationSteps slug={params.slug} />
      </div>
    </ApplicationFormProvider>
  );
}
