"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SkillAssessment } from "@/types/skillAssessments";
import { AlertTriangle, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import InfoCard from "./InfoCard";

interface ConfirmStartSkillAssessmentProps {
  skillAssessment: SkillAssessment;
  onStart: () => void;
  isPending: boolean;
}

const ConfirmStartSkillAssessment: FC<ConfirmStartSkillAssessmentProps> = ({
  skillAssessment,
  onStart,
  isPending,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const descriptionElement = descriptionRef.current;

      descriptionElement.classList.add("line-clamp-4");
      const clampedHeight = descriptionElement.clientHeight;
      descriptionElement.classList.remove("line-clamp-4");

      if (descriptionElement.scrollHeight > clampedHeight) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }

      if (!isExpanded) {
        descriptionElement.classList.add("line-clamp-4");
      }
    }
  }, [skillAssessment.description, isExpanded]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-16">
        <div className="flex justify-center md:justify-start">
          <Link href="/skill-assessments" className="flex items-center">
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src="/logo.svg"
                alt="Platform Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold">Skill Assessment Platform</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl space-y-6">
            <h1 className="text-3xl font-bold text-blue-600 md:text-4xl">
              {skillAssessment.title}
            </h1>
            <div>
              <div
                ref={descriptionRef}
                className={isExpanded ? "" : "line-clamp-4"}
              >
                <p className="mb-1 text-justify text-gray-600">
                  {skillAssessment.description}
                </p>
              </div>
              {showMoreButton && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:underline"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div className="space-y-4">
              <InfoCard
                icon={<AlertTriangle className="text-amber-600" size={20} />}
                title="Internet Connection"
                description="Ensure a stable internet connection. Progress is only saved upon final submission. Refreshing the page will reset your answers but not the timer."
                iconClass="text-amber-600"
                bgColor="bg-amber-50"
                textColor="text-amber-700"
                borderColor="border-amber-400"
              />
              <InfoCard
                icon={<Clock className="text-blue-600" size={20} />}
                title="Assessment Overview"
                description="25 multiple-choice questions, 30-minute time limit, Automatic submission at time expiry"
                iconClass="text-blue-600"
                bgColor="bg-blue-50"
                textColor="text-blue-700"
                borderColor="border-blue-400"
              />
              <InfoCard
                icon={<ShieldCheck className="text-green-600" size={20} />}
                title="Important Notes"
                description="This is an individual assessment. No external resources or assistance is permitted. Academic integrity is strictly enforced."
                iconClass="text-green-600"
                bgColor="bg-green-50"
                textColor="text-green-700"
                borderColor="border-green-400"
              />
            </div>

            <div className="mt-6 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isPending}
                    className="w-full bg-blue-600 px-8 py-3 text-white transition-colors duration-300 hover:bg-blue-700 md:w-auto"
                  >
                    Begin Assessment
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirm Assessment Start
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you ready to begin? Once started, you cannot pause or
                      retake the assessment. Ensure you have a stable internet
                      connection and are in a quiet environment.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="mr-2">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onStart}
                      disabled={isPending}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Start Assessment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-white lg:block">
        <Image
          src="/Exams-bro.svg"
          alt="Assessment Illustration"
          fill
          className="object-contain object-center p-12"
          priority
        />
      </div>
    </div>
  );
};

export default ConfirmStartSkillAssessment;
