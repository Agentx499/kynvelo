import type { Metadata } from "next";
import { AuthShell, V } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Kynvelo athlete account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      title={
        <>
          Welcome <V>back</V>.
        </>
      }
      lede="Sign in with the mobile number on your account. We'll send a one-time code."
      points={[
        {
          heading: "Gym staff sign in elsewhere",
          body: "Reception terminals and owner dashboards use a separate login at /business/login, so a member device can never reach the billing ledger.",
        },
        {
          heading: "Your session is device-bound",
          body: "Opening the billing ledger or changing staff permissions triggers a fresh biometric or PIN check, so an unattended tablet at the front desk isn't an open door.",
        },
      ]}
      footNote="Trouble signing in? Your gym's front desk can verify your number and resend the code."
    >
      <AuthForm mode="signin" audience="athlete" />
    </AuthShell>
  );
}
