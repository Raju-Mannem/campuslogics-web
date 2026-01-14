import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper"
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { LoaderProvider } from "@/context/LoaderContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Campuslogics',
  description: 'Campuslogics is a jobboard sharing information of latest job notifications and skill development oppotunities',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <ApolloWrapper>
          <LoaderProvider>
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </LoaderProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
