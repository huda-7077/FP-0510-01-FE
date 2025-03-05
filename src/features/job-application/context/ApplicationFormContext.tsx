"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createContext, useContext, useState, ReactNode } from "react";

interface ApplicationFormData {
  slug: string;
  useExistingCV: boolean;
  cvFile: File | null;
  expectedSalary: string;
  notes?: string;
  attachment: File | null;
}

interface ApplicationFormContextType {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  resetForm: () => void;
}

const initialFormData: ApplicationFormData = {
  slug: "",
  useExistingCV: false,
  cvFile: null,
  expectedSalary: "",
  notes: "",
  attachment: null,
};

const ApplicationFormContext = createContext<
  ApplicationFormContextType | undefined
>(undefined);

export function ApplicationFormProvider({
  children,
  initialJobSlug,
}: {
  children: ReactNode;
  initialJobSlug: string;
}) {
  const [formData, setFormData] = useState<ApplicationFormData>(() => ({
    ...initialFormData,
    slug: initialJobSlug,
  }));

  const updateFormData = (newData: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const resetForm = () => {
    setFormData({ ...initialFormData, slug: initialJobSlug });
  };

  return (
    <ApplicationFormContext.Provider
      value={{ formData, updateFormData, resetForm }}
    >
      <Navbar />
      {children}
      <Footer />
    </ApplicationFormContext.Provider>
  );
}

export function useApplicationForm() {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationForm must be used within an ApplicationFormProvider",
    );
  }
  return context;
}
