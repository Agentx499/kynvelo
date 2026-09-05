import type { Metadata } from "next";
import { AuthShell, V } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Staff sign in",
  description: "Sign in to the Kynvelo reception terminal or owner dashboard.",
  alternates: { canonical: "/business/login" },
  robots: { index: false, follow: true },
};

export default function BusinessLoginPage() {
  return (
    <AuthShell
      title={
        <>
          Staff <V>sign in</V>.
        </>
      }
      lede="For gym owners, receptionists, trainers and dietitians. Members sign in on the athlete site."
      points={[
        {
          heading: "Your role decides what you see",
          body: "Receptionists get the check-in terminal and the red list. Financial ledgers and staff permissions are owner-only, and that's enforced on every API request — not by hiding buttons.",
        },
        {
          heading: "Sensitive screens re-authenticate",
          body: "Opening billing or changing permissions asks for a biometric or PIN again, because front-desk tablets get left unlocked.",
        },
        {
          heading: "The terminal keeps working offline",
          body: "If the connection drops mid-shift, check-ins queue locally against a cached allowlist and sync with their real timestamps when it returns.",
        },
      ]}
      footNote="Locked out? Your gym owner can reset staff access from the members and staff screen."
    >
      <AuthForm mode="signin" audience="gym" />
    </AuthShell>
  );
}
