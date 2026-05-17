import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configure optimized Google Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "DomainCompare | Real-Time Domain Price Comparison Engine",
  description: "Search and compare domain names across Porkbun, Namecheap, GoDaddy, and Hostinger in real-time. Find the absolute cheapest registration and renewal rates for .com, .net, .org, .io, .co, and .ai.",
  metadataBase: new URL("https://domain-compare.vercel.app"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "DomainCompare - Instant Domain Price Comparison",
    description: "Find the absolute cheapest registrar for your next domain in real-time. Compare registration & renewal rates instantly.",
    url: "https://domain-compare.vercel.app",
    siteName: "DomainCompare",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DomainCompare - Instant Domain Price Comparison",
    description: "Compare first-year and renewal domain prices across all top registrars instantly."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
