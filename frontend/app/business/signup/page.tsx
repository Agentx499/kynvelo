import type { Metadata } from "next";
import { AuthShell, V } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Start a gym trial",
  description:
    "Fourteen days, no card. Set up your plans, import your members and put a code on the door.",
  alternates: { canonical: "/business/signup" },
  robots: { index: true, follow: true },
};

export default function BusinessSignupPage() {
  return (
    <AuthShell
      title={
        <>
          Start with <V>one gate</V>.
        </>
      }
      lede="Fourteen days, no card. Import your member list and the red list will show you within a day how many are already drifting."
      points={[
        {
          heading: "You'll know the answer in 24 hours",
          body: "Import your members with their last visit dates and the red list populates immediately. You'll see exactly how many people have quietly stopped coming.",
        },
        {
          heading: "Keep your existing turnstiles",
          body: "We drive the gate over the same dry-contact relay your current access panel uses. No hardware purchase to evaluate us.",
        },
        {
          heading: "GST handled from day one",
          body: "CGST and SGST split automatically under SAC 999723, sequential invoice numbers, your GSTIN on every document.",
        },
        {
          heading: "No setup fee during the trial",
          body: "The onboarding fee only applies when you convert, and it's waived entirely if you prepay annually.",
        },
      ]}
      footNote="We approve gym accounts manually, usually within one working day, so we can confirm your turnstile model is one we can actually drive."
    >
      <AuthForm mode="signup" audience="gym" />
    </AuthShell>
  );
}
