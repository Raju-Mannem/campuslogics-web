import type { Metadata } from "next";
import { Inter, Montserrat } from 'next/font/google';
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper"
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { LoaderProvider } from "@/context/LoaderContext";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://campuslogics.org"
  ),
  title: 'Campuslogics',
  description: 'Campuslogics for jobs, internships, scholarships,admissions, exam preparation and news',
  icons: {
    icon: '/cicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: "website",
    siteName: "CampusLogics",
    images: [
      {
        url: '/campuslogics.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/campuslogics.jpg"],
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ApolloWrapper>
          <LoaderProvider>
            <Header />
            <div className="fixed inset-0 -z-10 h-full w-full bg-[#fafafa]" />
            <div 
              className="fixed inset-0 -z-10 h-full w-full opacity-50 pointer-events-none" 
              style={{ backgroundImage: "url('/grain.png')", backgroundRepeat: 'repeat' }}
            />
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
