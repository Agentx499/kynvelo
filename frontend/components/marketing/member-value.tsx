import { Check, Minus } from "lucide-react";
import { Figure } from "@/components/ui/section";
import { formatCurrency } from "@/lib/utils";
import { memberValueComparison } from "@/lib/pricing";

/* The argument /business was missing entirely.

   Reading the previous page end to end, there was no occurrence of "member
   app", "nutrition", "workout", "trainer" or "marketplace". So the whole
   ₹2,999 → ₹5,999 upgrade rested on two grey check marks in a comparison table
   on a different page. This states the arithmetic instead.

   The multiple is derived from lib/pricing.ts, not hardcoded, so it moves if
   either price does. */

const BEFORE_AFTER: [string, string][] = [
  ["Paper logbook, or nothing", "Every set logged, with last week pre-filled"],
  ["Members guess their calories", "USDA-verified scan, no invented numbers"],
  ["No idea what's recovered", "Per-muscle readiness across 72 hours"],
  ["Queue at the desk to renew", "Renewed on their phone over UPI in 15 seconds"],
  ["PT session count disputed", "Both sides see 8 of 12 remaining"],
  ["Nothing to show for 3 months", "Dated photos, side by side"],
  ["Your gym's name on nothing", "Your logo and colour in their app"],
];

export function MemberValue() {
  const v = memberValueComparison();

  return (
    <div className="space-y-14">
      {/* --- The arithmetic --- */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="space-y-5 lg:col-span-6">
          <p className="prose-measure text-[17px] leading-relaxed text-ink-muted">
            Growth includes the full athlete app for{" "}
            <span className="text-ink">{v.memberCount} of your members</span>.
            Bought individually at our Pro tier, that same access costs{" "}
            <span className="text-ink">
              {formatCurrency(v.perMember)} per member per month
            </span>
            .
          </p>
          <p className="prose-measure text-[15px] leading-relaxed text-ink-subtle">
            We are not claiming your members would each pay that. The point is
            narrower: the member-facing half of Growth is not a rounding error on
            top of the CRM, it is the larger half of what you are buying.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-6">
          <Figure
            value={formatCurrency(v.individualTotal)}
            label={`${v.memberCount} members × ${formatCurrency(v.perMember)} on Pro, per month`}
          />
          <Figure
            value={formatCurrency(v.planCost)}
            label="Growth plan, per month, all of it included"
            accent
          />
        </dl>
      </div>

      {/* --- Before / after --- */}
      <div>
        <h3 className="font-display text-2xl font-semibold text-ink">
          What changes for the person on the floor
        </h3>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <caption className="sr-only">
              Member experience before and after Kynvelo
            </caption>
            <thead>
              <tr className="border-b border-line-strong">
                <th
                  scope="col"
                  className="w-1/2 py-4 pr-6 text-[14px] font-medium text-ink-subtle"
                >
                  Most gyms today
                </th>
                <th
                  scope="col"
                  className="py-4 text-[14px] font-medium text-primary"
                >
                  Your gym on Kynvelo
                </th>
              </tr>
            </thead>
            <tbody>
              {BEFORE_AFTER.map(([before, after]) => (
                <tr key={after} className="border-b border-line align-top">
                  <td className="py-3.5 pr-6">
                    <span className="flex gap-2.5 text-[15px] text-ink-subtle">
                      <Minus
                        className="mt-1 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      {before}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="flex gap-2.5 text-[15px] text-ink-muted">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {after}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[13px] text-ink-subtle">
          Every row on the right is a shipped feature, not a roadmap item.
        </p>
      </div>
    </div>
  );
}
