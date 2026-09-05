import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Display face. Condensed grotesque chosen to match the logo wordmark, which
   is heavy, condensed and wide-tracked. Replaces Plus Jakarta Sans. */
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* Body face. Same superfamily as the display face, so the pairing shares
   skeleton and differs on width - contrast without discord. */
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Numerals only: set weights, reps, rest timers, rupee amounts, timestamps. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE = "https://kynvelo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Kynvelo — The Operating System for Modern Fitness",
    template: "%s · Kynvelo",
  },
  description:
    "One system for the gym floor and the people on it. Turnstile access, no-show recovery and automated renewals for owners. Workout logging, USDA-verified nutrition and plate math for athletes.",
  applicationName: "Kynvelo",
  authors: [{ name: "Kynvelo Technologies" }],
  keywords: [
    "gym management software India",
    "gym member retention",
    "turnstile access control gym",
    "workout tracker",
    "calorie tracker USDA",
    "gym billing GST",
  ],
  /* icons, manifest and the OG/Twitter images are supplied by file
     conventions - app/icon.svg, app/apple-icon.tsx, app/manifest.ts and
     app/opengraph-image.tsx - so they are deliberately absent here. Declaring
     them in both places emits duplicate tags. */
  openGraph: {
    type: "website",
    siteName: "Kynvelo",
    locale: "en_IN",
    url: SITE,
    title: "Kynvelo — The Operating System for Modern Fitness",
    description:
      "Attendance you can act on. Renewals that collect themselves. Training that actually gets logged.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kynvelo — The Operating System for Modern Fitness",
    description:
      "Attendance you can act on. Renewals that collect themselves. Training that actually gets logged.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:text-sm focus:font-semibold focus:text-on-primary"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
