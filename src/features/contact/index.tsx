"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Contact Us
          </h1>
          <div className="mx-auto mb-6 h-1 w-20 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have questions or feedback about our platform? We'd love to hear
            from you. Fill out the form below or use our contact information.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Our Location</h3>
                    <p className="mt-1 text-gray-600">
                      Jl. Anggajaya 2, Sanggrahan, Condongcatur, Kec. Depok,
                      <br />
                      Kabupaten Sleman, Daerah Istimewa Yogyakarta, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">(319) 555-0xxx</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">contact@supajob.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Business Hours
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Monday-Friday: 9am - 5pm
                      <br />
                      Saturday-Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                    <h3 className="mb-2 text-xl font-semibold text-green-800">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        required
                        className="min-h-[150px] w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "How can I post a job?",
                answer:
                  "To post a job, you need to register for a company account and complete your company profile. Once verified, you can create and publish job postings through your dashboard.",
              },
              {
                question: "Is the skill assessment feature free?",
                answer:
                  "Basic skill assessments are available with our standard subscription plan. For unlimited access to all assessments, you can upgrade to our Professional subscription.",
              },
              {
                question: "How do I update my CV?",
                answer:
                  "You can update your CV by logging into your account, navigating to your profile page, and using our CV Generator tool to create or update your existing resume.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time through your account settings. Your subscription benefits will remain active until the end of your current billing period.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
