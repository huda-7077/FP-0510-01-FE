import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const TermsOfServicePage = () => {
  const termsItems = [
    {
      id: "1",
      title: "User Agreement",
      sub: "Terms for Job Seekers",
      content: `By using SupaJob, you agree to:
• Provide accurate and truthful information in your profile and job applications
• Not create multiple accounts or share account credentials  
• Respect intellectual property rights and not copy or distribute job postings
• Use the platform for legitimate job seeking purposes only
• Maintain professional conduct in all interactions`,
    },
    {
      id: "2",
      title: "Company Terms",
      sub: "Terms for Employers and Administrators",
      content: `Company administrators must:
• Post legitimate job opportunities with accurate descriptions
• Maintain confidentiality of applicant information
• Process applications in a timely manner
• Comply with all applicable employment laws
• Use assessment tools fairly and without discrimination`,
    },
    {
      id: "3",
      title: "Subscription Services",
      sub: "Premium Features and Payment Terms",
      content: `Subscription terms include:
• Standard Plan (IDR 25,000/month): CV Generator, 2 Skill Assessments
• Professional Plan (IDR 100,000/month): Unlimited features, Priority Review
• 30-day subscription period with automatic renewal notice
• Refund policy applies within first 7 days of subscription`,
    },
    {
      id: "4",
      title: "Privacy & Data",
      sub: "Information Collection and Usage",
      content: `We protect your data by:
• Encrypting sensitive information
• Using data only for specified purposes
• Allowing users to control their data sharing preferences
• Maintaining strict access controls for admin users
• Regular security audits and updates`,
    },
    {
      id: "5",
      title: "Platform Rules",
      sub: "General Guidelines and Prohibited Actions",
      content: `The following are prohibited:
• Posting fake jobs or companies
• Harassment or discrimination
• Sharing confidential information
• Attempting to bypass platform fees
• Using automated tools without permission`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-10">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-4xl">
          Supajob Terms of Service
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4 rounded-lg bg-background/60 p-6 backdrop-blur-sm"
          defaultValue="3"
        >
          {termsItems.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="rounded-md border px-4 transition-colors hover:bg-muted/50"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-180">
                  <div className="flex flex-col space-y-1">
                    <span className="text-lg font-semibold">{item.title}</span>
                    {item.sub && (
                      <span className="text-sm text-muted-foreground">
                        {item.sub}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-muted-foreground transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="whitespace-pre-line pb-4 pt-1 leading-relaxed text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
