import { CheckCircle2, Clock, XCircle } from "lucide-react"

interface ApplicationTimelineProps {
  application: {
    status: string
    createdAt: Date
    updatedAt: Date
    interviews?: {
      scheduledDate: Date
    }[]
  }
}

export function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  const steps = [
    { status: "PENDING", description: "Application submitted" },
    { status: "IN_REVIEW", description: "Application in review" },
    { status: "INTERVIEW_SCHEDULED", description: "Interview scheduled" },
    { status: "FINAL_DECISION", description: "Final decision" },
  ]

  const getCurrentStepIndex = () => {
    if (application.status === "ACCEPTED" || application.status === "REJECTED") {
      return steps.length - 1
    }
    return steps.findIndex((step) => step.status === application.status)
  }

  const currentStepIndex = getCurrentStepIndex()

  const getStepIcon = (index: number) => {
    if (application.status === "CANCELLED") {
      return <XCircle className="h-5 w-5 text-gray-600" />
    }

    if (index < currentStepIndex || (index === currentStepIndex && application.status !== "REJECTED")) {
      return <CheckCircle2 className="h-5 w-5 text-blue-600" />
    }
    if (index === currentStepIndex && application.status === "REJECTED") {
      return <XCircle className="h-5 w-5 text-red-600" />
    }
    return <Clock className="h-5 w-5 text-gray-400" />
  }

  const getStepDescription = (step: { status: string; description: string }, index: number) => {
    if (index === steps.length - 1) {
      if (application.status === "ACCEPTED") return "Application accepted"
      if (application.status === "REJECTED") return "Application not selected"
    }
    return step.description
  }

  const getProgressPercentage = () => {
    if (application.status === "CANCELLED") return 100
    return (currentStepIndex + 1) * 25
  }

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${getProgressPercentage()}%` }}></div>
      </div>
      <p className="text-sm font-medium text-gray-500 mb-4">Progress: {getProgressPercentage()}%</p>
      {application.status === "CANCELLED" ? (
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">{new Date(application.updatedAt).toLocaleString()}</p>
            <p className="font-medium">Application cancelled</p>
          </div>
        </div>
      ) : (
        steps.map((step, index) => {
          const isCurrent = index === currentStepIndex
          return (
            <div key={step.status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStepIndex ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {getStepIcon(index)}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-full ${index < currentStepIndex ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="pb-4">
                {isCurrent && (
                  <p className="text-sm text-gray-500">{new Date(application.updatedAt).toLocaleString()}</p>
                )}
                <p
                  className={`font-medium ${
                    isCurrent ? "text-blue-600" : index < currentStepIndex ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {getStepDescription(step, index)}
                </p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

