"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* One form for all four auth routes.

   NOT WIRED TO A BACKEND. The Django API exists (backend/apps/*) but no auth
   endpoints are exposed yet, so submit is intercepted and shows an explicit
   notice rather than silently doing nothing - a form that appears to accept a
   password and then discards it is worse than one that admits it is a stub.

   Client-side validation here is for keyboard and screen-reader ergonomics
   only. Every field is validated again server-side; frontend validation is
   never a security boundary. */

type Mode = "signin" | "signup";

export function AuthForm({
  mode,
  audience,
  defaultRole,
}: {
  mode: Mode;
  audience: "athlete" | "gym";
  defaultRole?: string | null;
}) {
  const [role, setRole] = useState<string>(
    defaultRole === "partner" ? "partner" : audience === "gym" ? "owner" : "athlete"
  );
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const passId = useId();
  const gymId = useId();
  const refId = useId();

  const isSignup = mode === "signup";
  const altHref = isSignup
    ? audience === "gym"
      ? "/business/login"
      : "/login"
    : audience === "gym"
      ? "/business/signup"
      : "/signup";

  const ROLES =
    audience === "gym"
      ? [
          { key: "owner", label: "Gym owner" },
          { key: "staff", label: "Staff member" },
        ]
      : [
          { key: "athlete", label: "I train" },
          { key: "partner", label: "I refer gyms" },
        ];

  return (
    <div className="max-w-md">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const next: Record<string, string> = {};

          /* Validate by field name rather than by generated id, so the rules
             survive the useId values changing between renders. */
          const phone = String(data.get("phone") ?? "").replace(/\s+/g, "");
          if (!phone) next.phone = "Enter your mobile number.";
          else if (!/^(\+91)?[6-9]\d{9}$/.test(phone))
            next.phone = "That doesn't look like an Indian mobile number.";

          if (isSignup) {
            if (!String(data.get("name") ?? "").trim())
              next.name = "Enter your name.";

            const email = String(data.get("email") ?? "").trim();
            if (!email) next.email = "Enter your email.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
              next.email = "Check the email address.";

            if (audience === "gym" && role === "owner" && !String(data.get("gym") ?? "").trim())
              next.gym = "Enter your gym's name.";

            const code = String(data.get("code") ?? "").trim();
            if (code && !/^[A-Za-z0-9]{6}$/.test(code))
              next.code = "Codes are exactly six letters or digits.";
          } else {
            if (!String(data.get("password") ?? ""))
              next.password = "Enter your password.";
          }

          setErrors(next);
          setSubmitted(Object.keys(next).length === 0);
        }}
        className="space-y-5"
      >
        {isSignup && (
          <fieldset>
            <legend className="text-[14px] text-ink">
              {audience === "gym" ? "Your role" : "What brings you here"}
            </legend>
            <div className="mt-2.5 inline-flex rounded-md border border-line p-0.5">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  aria-pressed={role === r.key}
                  className={`k-seg ${
                    role === r.key
                      ? "bg-primary font-semibold text-on-primary"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {isSignup && (
          <Field
            id={nameId}
            name="name"
            label={audience === "gym" ? "Your name" : "Name"}
            type="text"
            autoComplete="name"
            error={errors.name}
            required
          />
        )}

        {isSignup && audience === "gym" && role === "owner" && (
          <Field
            id={gymId}
            name="gym"
            label="Gym name"
            type="text"
            autoComplete="organization"
            error={errors.gym}
            required
          />
        )}

        <Field
          id={phoneId}
          name="phone"
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          hint="We send a one-time code to verify it."
          error={errors.phone}
          required
        />

        {isSignup && (
          <Field
            id={emailId}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            required
          />
        )}

        {!isSignup && (
          <Field
            id={passId}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password}
            required
          />
        )}

        {isSignup && role !== "partner" && (
          <Field
            id={refId}
            name="code"
            label={audience === "gym" ? "Referral code" : "Gym code"}
            type="text"
            autoComplete="off"
            maxLength={6}
            error={errors.code}
            hint={
              audience === "gym"
                ? "Optional. Six characters, from whoever referred you."
                : "Optional. Links your account to your gym so your pass works at their gate."
            }
          />
        )}

        {/* Summary for screen readers and for anyone who submitted a long form
            and needs to know what failed without hunting for red borders. */}
        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-[14px] text-danger"
          >
            <p className="font-semibold">
              {Object.keys(errors).length === 1
                ? "One field needs attention"
                : `${Object.keys(errors).length} fields need attention`}
            </p>
            <ul className="mt-1.5 list-inside list-disc space-y-0.5">
              {Object.values(errors).map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" className="w-full">
          {isSignup ? "Create account" : "Send code"}
        </Button>

        {submitted && (
          <p
            role="status"
            className="rounded-md border border-warning/30 bg-warning/12 px-4 py-3 text-[14px] leading-relaxed text-warning"
          >
            Authentication isn&apos;t connected yet. The backend models are in
            place but the auth endpoints aren&apos;t exposed, so nothing was
            submitted and no data was stored.
          </p>
        )}
      </form>

      <p className="mt-6 text-[14px] text-ink-muted">
        {isSignup ? "Already have an account? " : "Need an account? "}
        <Link
          href={altHref}
          className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
        >
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>

      {isSignup && (
        <p className="mt-4 text-[13px] leading-relaxed text-ink-subtle">
          Creating an account means you accept our{" "}
          <Link
            href="/legal/terms"
            className="underline decoration-line underline-offset-4 hover:text-primary"
          >
            terms
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="underline decoration-line underline-offset-4 hover:text-primary"
          >
            privacy policy
          </Link>
          . Marketing messages are a separate opt-in you can decline.
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-ink">
        {label}
        {!rest.required && (
          <span className="ml-1.5 text-ink-subtle">(optional)</span>
        )}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        /* Error first so screen readers announce the problem before the hint. */
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={`mt-2 h-11 w-full rounded-md border bg-surface px-3.5 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none ${
          error
            ? "border-danger focus:border-danger"
            : "border-line focus:border-line-strong"
        }`}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[13px] text-ink-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}
