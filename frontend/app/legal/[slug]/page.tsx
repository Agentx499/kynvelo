import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export function generateStaticParams() {
  return [
    { slug: "privacy" },
    { slug: "terms" },
    { slug: "security" },
    { slug: "dpa" },
  ];
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const contentMap: Record<
    string,
    { title: string; badge: string; description: string; sections: { heading: string; body: string }[] }
  > = {
    privacy: {
      title: "Privacy Policy & DPDP Act 2023 Compliance",
      badge: "DATA PRIVACY GOVERNANCE",
      description:
        "How Kynvelo Technologies Inc. collects, protects, processes, and respects athlete and gym member personal telemetry under Indian and international law.",
      sections: [
        {
          heading: "1. Digital Personal Data Protection (DPDP) Act 2023 Adherence",
          body: "Under the India DPDP Act 2023, Kynvelo operates strictly as a Data Processor for gym facilities (Data Fiduciaries) and as a direct Data Fiduciary for Kynvelo Direct B2C consumers. We do not sell, broker, or monetize your biometric, workout, or nutritional telemetry to third-party advertisers.",
        },
        {
          heading: "2. Camera & Image Processing Invariants",
          body: "When you use the AI Food Scanner or Barcode Camera reader, video frames are decoded directly on your client device. Captured food photos are processed exclusively for nutritional extraction against USDA and local databases and are never retained for model re-training without explicit opt-in consent.",
        },
        {
          heading: "3. Turnstile Access & Attendance Telemetry",
          body: "Dynamic QR check-in codes use HMAC cryptographic tokens that rotate every 15 seconds. Attendance records (timestamps, gate ID, facility ID) are maintained for audit trails and membership verification only.",
        },
        {
          heading: "4. Your Data Rights (Section 11, 12, 13 DPDP)",
          body: "You have the right to access your personal fitness history, request correction of inaccurate data, and demand total erasure of your workout, weight, and nutritional records via our automated self-service data export portal.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      badge: "SERVICE AGREEMENT",
      description: "Operating rules and contractual expectations for gym facilities and individual athletes.",
      sections: [
        {
          heading: "1. Account Responsibilities",
          body: "Facility operators are responsible for ensuring physical turnstile relays and hardware safety meet local electrical and fire codes. Kynvelo provides the software signaling layer and does not guarantee mechanical turnstile endurance.",
        },
        {
          heading: "2. Subscription & Renewal Billing",
          body: "Gym SaaS subscriptions renew on the designated monthly or annual cycle. Capacity block overages are calculated dynamically without retroactive billing penalties.",
        },
      ],
    },
    security: {
      title: "Security & Multi-Tenant Architecture",
      badge: "INFRASTRUCTURE SECURITY",
      description: "Deep tenant isolation, encrypted relays, and SOC2-aligned development standards.",
      sections: [
        {
          heading: "1. Strict Tenant Isolation (TenantBaseModel)",
          body: "Every database query is scoped strictly to the authenticated gym tenant_id. Cross-tenant leakage is prevented at both the ORM model manager layer and API serializer layer.",
        },
        {
          heading: "2. Offline Resilience",
          body: "Our reception kiosks maintain an offline SQLite/IndexedDB encrypted buffer. If local internet drops, members can still pass turnstiles using offline-verified credentials, with automatic background sync upon reconnection.",
        },
      ],
    },
    dpa: {
      title: "Data Processing Addendum (DPA)",
      badge: "LEGAL DPA",
      description: "Standard contractual clauses between gym facilities and Kynvelo Technologies.",
      sections: [
        {
          heading: "1. Scope of Data Processing",
          body: "Covers athlete personal details, contact information, attendance timestamps, and membership transaction records processed on behalf of subscribing fitness centers.",
        },
      ],
    },
  };

  const pageData = contentMap[slug] || contentMap.privacy;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <header className="border-b border-hairline bg-surface-1/80 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="font-mono font-extrabold text-base text-ink flex items-center gap-2">
          <span>KYNVELO</span>
          <span className="text-xs text-ink-subtle font-normal">/ LEGAL & TRUST</span>
        </Link>
        <Link href="/" className="text-xs text-primary font-semibold hover:underline">
          Return to Home
        </Link>
      </header>

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="primary" className="mb-3">
            {pageData.badge}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {pageData.title}
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-10 pb-6 border-b border-hairline">
            {pageData.description}
          </p>

          <div className="space-y-8">
            {pageData.sections.map((sec, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-lg font-bold text-ink">{sec.heading}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
