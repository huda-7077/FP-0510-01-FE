import { FC } from "react";
import { CreatePreAssessmentTestForm } from "./components/form/CreatePreAssessmentTestForm";

interface PreTestAssessmentComponentProps {
  jobId: string;
}

const PreTestAssessmentComponent: FC<PreTestAssessmentComponentProps> = ({
  jobId,
}) => {
  return <CreatePreAssessmentTestForm jobId={jobId} />;
};

export default PreTestAssessmentComponent;
