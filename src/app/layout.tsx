import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";

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
  title: "Finance Tracker",
  description: "Track your finances, investments, and net worth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/50">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#18181b",
                color: "#fafafa",
                borderRadius: "12px",
              },
            }}
          />
          <Navbar />
          <main className="max-w-6xl mx-auto min-h-[calc(100vh-3.5rem)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
