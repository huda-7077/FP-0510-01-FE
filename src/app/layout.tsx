import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import TokenProvider from "@/providers/TokenProvider";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { PathTracker } from "./path-tracker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Supajob: Your Career, Your Future, Supersized.",
  description:
    "Supajob is the ultimate job board designed to connect top talent with exciting career opportunities. Whether you're searching for a full-time position, freelance gig, or your next big challenge, Supajob is here to simplify your job hunt. With an intuitive interface, personalized job recommendations, and a vast network of companies, Supajob makes it easier than ever to take your career to new heights. Explore, apply, and succeed — all in one place!",
  keywords: [
    "Job board",
    "career opportunities",
    "job search",
    "job listings",
    "job portal",
    "freelance jobs",
    "remote work",
    "job seekers",
    "career growth",
    "talent connection",
    "professional network",
    "job opportunities",
    "work-life balance",
    "career advancement",
    "recruitment platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthProvider>
              <TokenProvider>
                <NuqsProvider>
                  <StoreProvider>
                    <ReactQueryProvider>
                      <PathTracker>{children}</PathTracker>
                    </ReactQueryProvider>
                    <ToastContainer />
                  </StoreProvider>
                </NuqsProvider>
              </TokenProvider>
            </NextAuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
