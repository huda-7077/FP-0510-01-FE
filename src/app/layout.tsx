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
  title: "FINPRO",
  description: "NO DESC",
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
