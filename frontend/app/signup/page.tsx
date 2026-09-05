import type { Metadata } from "next";
import { AuthShell, V } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create your athlete account",
  description:
    "Free forever for workout logging, plate math and personal records. Works with or without a gym on Kynvelo.",
  alternates: { canonical: "/signup" },
  robots: { index: true, follow: true },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  return (
    <AuthShell
      title={
        <>
          Start logging <V>properly</V>.
        </>
      }
      lede="Free permanently for workout logging, the plate calculator and personal records. No card, no trial clock."
      points={[
        {
          heading: "Nothing is paywalled that shouldn't be",
          body: "Logging sets, plate math, PRs and 1RM estimates stay free. The paid tier exists for the AI meal scan and unlimited history, because those cost us money per user.",
        },
        {
          heading: "No ads, ever",
          body: "We don't run advertising, so we have no reason to profile you. Your training and health data is not shared with advertisers, insurers or employers.",
        },
        {
          heading: "Works without your gym",
          body: "You don't need your gym to use Kynvelo. If they join later, your account links to them without losing any history.",
        },
        {
          heading: "You can take your data out",
          body: "Full export from account settings, whenever you want, in a format you can actually read.",
        },
      ]}
    >
      <AuthForm mode="signup" audience="athlete" defaultRole={role ?? null} />
    </AuthShell>
  );
}
