import type { LegalSlug } from "@/lib/site";

/* Legal copy lives here rather than inside the route component so lib/site.ts
   LEGAL_SLUGS, app/sitemap.ts and generateStaticParams all read one list.

   v1 rendered only privacy | terms | security | dpa, while SCREENS.md page 84
   also specifies refunds and dpdp. Those two are added here; without them the
   sitemap would advertise URLs that fall through to the 404.

   Not legal advice. These are operational drafts describing what the software
   actually does. Have counsel review before launch - flagged in LEARNING.md. */

export type LegalDoc = {
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

const UPDATED = "3 September 2026";

export const LEGAL_CONTENT: Record<LegalSlug, LegalDoc> = {
  terms: {
    title: "Terms of Service",
    summary:
      "The operating agreement between Kynvelo and the gyms and athletes using it.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Who this covers",
        body: "These terms apply to gym operators subscribing to Kynvelo for Gyms, to individual athletes on Kynvelo Direct, and to referral partners. Where a gym subscribes on behalf of its members, the gym is responsible for its own staff's use of the platform.",
      },
      {
        heading: "2. Hardware and physical safety",
        body: "Kynvelo sends an access signal to turnstile hardware you own and maintain. Ensuring that hardware meets local electrical and fire safety codes, and that gates fail safe in an emergency, remains entirely your responsibility. We provide the software signalling layer and make no warranty about the mechanical behaviour or endurance of third-party gates.",
      },
      {
        heading: "3. Subscriptions and renewal",
        body: "Gym subscriptions renew on the monthly or annual cycle selected at signup. Capacity blocks are billed from the point they are added, prorated, with no retroactive charge for prior months. Athlete subscriptions can be cancelled at any time and continue until the end of the paid period.",
      },
      {
        heading: "4. No lifetime licences",
        body: "Kynvelo does not sell perpetual or lifetime access. Hosting, payment gateway integration and support are recurring costs and cannot be funded by a one-time fee.",
      },
      {
        heading: "5. What the software does not promise",
        body: "Kynvelo surfaces attendance patterns and automates reminders and billing. It cannot retain a member on its own. Facility quality, equipment, coaching and staff conduct sit outside the software, and any revenue outcome depends on your team acting on what the system shows them.",
      },
      {
        heading: "6. Acceptable use",
        body: "You may not use Kynvelo to process data for individuals who have not consented, to send promotional messages to members who have opted out, or to attempt access to another tenant's records. Accounts found doing so may be suspended.",
      },
      {
        heading: "7. Suspension and termination",
        body: "Either party may terminate with 30 days' notice. On termination you may export your member, attendance and transaction records. We retain financial records for the period required by Indian tax law and delete the remainder within 90 days.",
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    summary:
      "What Kynvelo collects, why, where it is stored, and how to get it removed.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Our role",
        body: "For gym members, the gym is the Data Fiduciary and Kynvelo is a Data Processor acting on its instructions. For Kynvelo Direct athletes who sign up without a gym, Kynvelo is the Data Fiduciary. This distinction determines who you direct a data request to — for gym members, your gym; for direct athletes, us.",
      },
      {
        heading: "2. What we collect",
        body: "Account details (name, phone, email), membership and payment records, attendance timestamps with the gate used, and whatever training and nutrition data you choose to log. Progress photos and meal photos are collected only when you take them.",
      },
      {
        heading: "3. Camera and image handling",
        body: "Barcode scanning is decoded on your device; the video stream never leaves it and only the decoded digits are sent. Meal photos are uploaded, processed to identify food items, and matched against USDA FoodData Central. They are not used to train models unless you explicitly opt in, and that setting is off by default.",
      },
      {
        heading: "4. What we never do",
        body: "We do not sell personal data. We do not share training, weight, body-composition or nutrition data with advertisers, insurers or employers. We do not use your health data to target advertising, because we do not run advertising.",
      },
      {
        heading: "5. Storage and retention",
        body: "Data is stored in India. Media (progress photos, meal photos, receipts) sits in object storage behind time-limited signed URLs rather than on a public path. Financial and attendance records are retained for audit purposes and soft-deleted rather than erased, so a payment dispute can still be resolved.",
      },
      {
        heading: "6. Your rights",
        body: "You can export everything we hold about you, correct inaccurate records, and request erasure of your training, body and nutrition history from your account settings. Erasure requests covering financial records are honoured to the extent Indian tax law permits retention.",
      },
      {
        heading: "7. Consent separation",
        body: "Transactional messages (check-in confirmations, payment receipts, renewal reminders) and promotional messages carry separate consent flags. Withdrawing marketing consent does not stop payment receipts, because those are part of the service you paid for.",
      },
    ],
  },

  refunds: {
    title: "Refund & Cancellation Policy",
    summary:
      "When money comes back, when it does not, and how membership freezes work.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Gym subscriptions",
        body: "Monthly gym subscriptions can be cancelled at any time and run to the end of the paid month; we do not refund partial months. Annual prepayments are refundable pro rata within the first 30 days, less the setup fee where onboarding work has already been performed.",
      },
      {
        heading: "2. Setup fees",
        body: "The one-time setup fee covers branding configuration, staff training and member data migration. Once that work has started it is non-refundable, because it is labour already spent. If you cancel before onboarding begins, it is refunded in full.",
      },
      {
        heading: "3. Athlete subscriptions",
        body: "Cancel at any time from account settings. Access continues to the end of the paid period. We do not charge a cancellation fee and do not require a reason. Accidental duplicate charges are refunded in full on request.",
      },
      {
        heading: "4. Failed and duplicate payments",
        body: "If a payment gateway charges you twice for one renewal, the duplicate is refunded automatically once reconciliation detects it, typically within three working days. You do not need to raise a ticket, though you can.",
      },
      {
        heading: "5. Member-to-gym payments",
        body: "Membership fees a member pays to a gym through Kynvelo are the gym's revenue, not ours. Refunds for those are set by the gym's own policy and processed by the gym. Kynvelo records the reversal and issues a credit note so the ledger stays auditable.",
      },
      {
        heading: "6. Membership freezes",
        body: "Where a gym's plan allows it, a membership can be frozen for a set number of days and the expiry date extends by the frozen period. Frozen members are excluded from no-show alerts so nobody gets a recovery call while travelling or injured.",
      },
    ],
  },

  dpdp: {
    title: "DPDP Act 2023 Compliance",
    summary:
      "How Kynvelo is built to meet India's Digital Personal Data Protection Act.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Fiduciary and Processor roles",
        body: "Under the DPDP Act 2023, a gym subscribing to Kynvelo is the Data Fiduciary for its members and Kynvelo is the Data Processor. For Kynvelo Direct users with no gym affiliation, Kynvelo is the Data Fiduciary. Each gym's Data Processing Addendum records this allocation formally.",
      },
      {
        heading: "2. Purpose limitation",
        body: "Attendance data is processed to verify membership and detect drop-off risk. Payment data is processed to collect and reconcile fees. Training and nutrition data is processed to render it back to the member. None of it is repurposed for advertising or sold on.",
      },
      {
        heading: "3. Consent architecture",
        body: "Consent for transactional communication is separate from consent for promotional communication, and both are recorded with a timestamp. Members can withdraw promotional consent without losing the service. Consent notices are presented in plain language at the point of collection.",
      },
      {
        heading: "4. Data principal rights",
        body: "Members can access and export their data, request correction, and request erasure — all self-service, without contacting support. Where a gym is the Fiduciary, requests are routed to the gym with Kynvelo executing them as Processor.",
      },
      {
        heading: "5. Breach notification",
        body: "In the event of a personal data breach we notify the Data Protection Board of India and affected Data Principals without undue delay, including what was affected and what we have done about it.",
      },
      {
        heading: "6. Children's data",
        body: "Accounts for members under 18 require verifiable parental consent, and behavioural tracking and targeted advertising are not performed on them. Since we do not run advertising at all, the second condition is satisfied structurally.",
      },
    ],
  },

  security: {
    title: "Security & Architecture",
    summary:
      "Tenant isolation, payment integrity and how the system behaves when the internet drops.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Tenant isolation",
        body: "Every database model carrying gym data inherits from a base model whose default manager scopes every query to the authenticated gym. Isolation is enforced at the ORM layer rather than relying on each developer remembering a filter, so a missing clause in a new view cannot leak another gym's records.",
      },
      {
        heading: "2. Tenant identity is never taken from the client",
        body: "A tenant identifier supplied in a request header is never trusted. The tenant is resolved from the authenticated session, so forging a header does not grant cross-tenant access.",
      },
      {
        heading: "3. Payment integrity",
        body: "A payment moving to 'initiated' is not a payment. Memberships extend only after a cryptographically verified webhook from the gateway. Webhooks are consumed idempotently, so a gateway retry cannot double-extend a membership or duplicate a ledger entry.",
      },
      {
        heading: "4. Access token design",
        body: "Check-in codes are HMAC tokens that regenerate every 15 seconds, so a screenshot shared with someone else is worthless by the time they reach the gate. Repeat scans inside a configurable window are rejected to prevent pass-back.",
      },
      {
        heading: "5. Offline behaviour",
        body: "Reception terminals hold an encrypted local queue. If connectivity drops, members can still be admitted against a cached allowlist and the real timestamps sync on reconnection — the audit trail reflects when entry actually happened, not when it uploaded.",
      },
      {
        heading: "6. No hard deletes on money or attendance",
        body: "Financial transactions, attendance corrections and red-list contact history are soft-deleted with the acting user and timestamp recorded. Nothing that could be disputed later is destroyed.",
      },
      {
        heading: "7. Module isolation",
        body: "Background work runs on separate queues per module. A backlog in AI meal-photo processing cannot stall payment webhook handling or turnstile check-ins.",
      },
    ],
  },

  dpa: {
    title: "Data Processing Addendum",
    summary:
      "Contractual terms governing Kynvelo's processing of member data on a gym's behalf.",
    updated: UPDATED,
    sections: [
      {
        heading: "1. Subject matter",
        body: "This addendum forms part of the subscription agreement between the gym (Data Fiduciary) and Kynvelo Technologies (Data Processor) and governs processing of member personal data under the DPDP Act 2023.",
      },
      {
        heading: "2. Scope of processing",
        body: "Member identity and contact details, membership and plan records, attendance timestamps and gate identifiers, payment and invoice records, and any training or nutrition data members choose to log.",
      },
      {
        heading: "3. Processor obligations",
        body: "Kynvelo processes personal data only on the gym's documented instructions, applies the technical measures described in the Security document, ensures personnel are bound by confidentiality, and assists with data principal requests.",
      },
      {
        heading: "4. Sub-processors",
        body: "We use sub-processors for hosting, object storage, payment processing and messaging delivery. A current list is available on request. Sub-processors are bound to equivalent obligations, and we remain accountable for their performance.",
      },
      {
        heading: "5. Return and deletion",
        body: "On termination the gym may export all member, attendance and transaction records. Kynvelo deletes remaining personal data within 90 days, except records retained to satisfy statutory financial obligations.",
      },
      {
        heading: "6. Audit",
        body: "On reasonable notice, and no more than once a year unless a breach has occurred, the gym may request documentation demonstrating compliance with this addendum.",
      },
    ],
  },
};
