"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Terms of Service
          </h1>
          <div className="mx-auto mb-6 h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Please read these terms carefully before using our platform. By
            accessing or using our services, you agree to be bound by these
            terms and conditions.
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Our Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 rounded-md border p-4">
                <div className="space-y-6">
                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      1. Introduction
                    </h2>
                    <p className="mb-2 text-gray-600">
                      Welcome to our job board platform. These Terms of Service
                      ("Terms") govern your use of our website, services, and
                      applications (collectively, the "Platform"). Our Platform
                      provides job search, application, and recruitment
                      services, connecting job seekers with potential employers.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      2. Account Registration
                    </h2>
                    <p className="mb-2 text-gray-600">
                      To use certain features of our Platform, you must register
                      for an account. You may register as either a Job Seeker or
                      a Company. You agree to provide accurate, current, and
                      complete information during the registration process.
                    </p>
                    <p className="mb-2 text-gray-600">
                      After registration, we will send a verification email to
                      the address you provided. You must verify your account
                      within one hour of receiving this email. Unverified
                      accounts have limited access to Platform features.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      3. Platform Usage
                    </h2>
                    <p className="mb-2 text-gray-600">
                      You may use our Platform to search for jobs or candidates,
                      create and manage job postings, apply to job positions,
                      manage applications and interviews, take skill
                      assessments, create and manage user profiles, and share
                      job postings on social media platforms.
                    </p>
                    <p className="mb-2 text-gray-600">
                      You may not use our Platform to post false, inaccurate,
                      misleading, defamatory, or offensive content; impersonate
                      any person or entity; post discriminatory job listings; or
                      engage in any activity that violates applicable laws or
                      regulations.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      4. Content and Submissions
                    </h2>
                    <p className="mb-2 text-gray-600">
                      By posting or uploading Content to the Platform, you grant
                      us a worldwide, non-exclusive, royalty-free license to
                      use, copy, modify, and display that Content in connection
                      with the services we provide.
                    </p>
                    <p className="mb-2 text-gray-600">
                      All job postings must accurately describe the position and
                      requirements, comply with all applicable employment laws,
                      and not discriminate on any legally protected basis.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      5. Subscriptions and Payments
                    </h2>
                    <p className="mb-2 text-gray-600">
                      We offer subscription plans for enhanced Platform
                      features:
                    </p>
                    <ul className="mb-2 list-disc pl-5 text-gray-600">
                      <li className="mb-1">
                        <strong>Standard Subscription:</strong> IDR 25,000 per
                        month - Includes CV Generator, limited skill assessments
                        (2 per month)
                      </li>
                      <li>
                        <strong>Professional Subscription:</strong> IDR 100,000
                        per month - Includes CV Generator, unlimited skill
                        assessments, priority review for job applications
                      </li>
                    </ul>
                    <p className="mb-2 text-gray-600">
                      All subscriptions are billed monthly, payments are
                      non-refundable, and subscriptions automatically renew
                      unless cancelled.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      6. Pre-Selection Tests and Skill Assessments
                    </h2>
                    <p className="mb-2 text-gray-600">
                      Companies may require job applicants to complete
                      pre-selection tests as part of the application process.
                      Job Seekers with appropriate subscriptions may take skill
                      assessments to demonstrate their proficiency in specific
                      areas.
                    </p>
                    <p className="mb-2 text-gray-600">
                      Upon successful completion (score of 75% or higher), Job
                      Seekers will receive digital badges and certificates.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      7. Privacy and Data Protection
                    </h2>
                    <p className="mb-2 text-gray-600">
                      We collect and process personal data as described in our
                      Privacy Policy. By using our Platform, you consent to such
                      collection and processing.
                    </p>
                    <p className="mb-2 text-gray-600">
                      Some Platform features use location data to provide
                      location-based services. You can opt-out of location
                      sharing through your device settings, but this may limit
                      certain Platform functionalities.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      8. Intellectual Property Rights
                    </h2>
                    <p className="mb-2 text-gray-600">
                      The Platform, including its content, features, and
                      functionality, are owned by us and are protected by
                      copyright, trademark, and other intellectual property
                      laws.
                    </p>
                    <p className="mb-2 text-gray-600">
                      We grant you a limited, non-exclusive, non-transferable,
                      and revocable license to access and use the Platform for
                      its intended purposes.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      9. Limitation of Liability
                    </h2>
                    <p className="mb-2 text-gray-600">
                      To the maximum extent permitted by law, we shall not be
                      liable for any indirect, incidental, special,
                      consequential, or punitive damages, or any loss of profits
                      or revenues, whether incurred directly or indirectly.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      10. Changes to Terms
                    </h2>
                    <p className="mb-2 text-gray-600">
                      We may modify these Terms at any time. We will provide
                      notice of significant changes by posting the new Terms on
                      the Platform and updating the "Last Updated" date. Your
                      continued use of the Platform after such changes
                      constitutes your acceptance of the new Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                      11. Contact Information
                    </h2>
                    <p className="mb-2 text-gray-600">
                      If you have any questions about these Terms, please
                      contact us at{" "}
                      <a
                        href="mailto:legal@supajobapp.com"
                        className="text-blue-600 hover:underline"
                      >
                        legal@supajobapp.com
                      </a>{" "}
                      or visit our{" "}
                      <a
                        href="/contact"
                        className="text-blue-600 hover:underline"
                      >
                        Contact Us
                      </a>{" "}
                      page.
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-gray-600">
            <p>Last Updated: March 1, 2025</p>
          </div>
        </div>

        <div className="text-center">
          <div className="rounded-lg bg-blue-600 p-10 text-white">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to join our platform?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100">
              Create an account today and start connecting with opportunities or
              finding talent for your company.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/register/user">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Register as Job Seeker
                </Button>
              </Link>
              <Link href="/register/admin">
                <Button className="bg-blue-700 hover:bg-blue-800">
                  Register as Company
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
