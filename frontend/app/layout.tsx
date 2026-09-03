import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kynvelo — The Fitness Business & Athlete Operating System",
  description:
    "Unifying athlete workout logging, zero-hallucination AI nutrition, turnstile access automation, and no-show member retention CRM into one athletic OS.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/kynvelo-logo-master.jpg",
  },
  openGraph: {
    title: "Kynvelo — The Fitness Business & Athlete Operating System",
    description:
      "For Lifters: Train with precision, track workouts & macros. For Gyms: Stop member dropout with turnstile access & WhatsApp retention CRM.",
    url: "https://kynvelo.com",
    siteName: "Kynvelo",
    images: [
      {
        url: "/kynvelo-hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Kynvelo Fitness Business & Athlete Operating System",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
