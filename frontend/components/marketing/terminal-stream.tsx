"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { ScreenFrame } from "@/components/marketing/device-frame";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* Gym-owner hero visual. Replaces Turnstile3DScene.

   The 3D turnstile modelled the hardware, which the owner already owns and
   does not need shown to them. What they have never seen is the screen their
   receptionist will stare at all day. This is that screen: the live access
   stream from /admin/terminal.

   It demonstrates three features at once - rotating QR validation (1.1),
   relay actuation (1.2), and the assisted-entry reason audit (1.3) - including
   the denial case, which is the whole point of access control. */

type Entry = {
  name: string;
  plan: string;
  method: "QR" | "Assisted" | "Scanner";
  granted: boolean;
  note?: string;
  time: string;
};

const STREAM: Entry[] = [
  { name: "Rahul Mehta", plan: "12-month · expires 18 Mar", method: "QR", granted: true, time: "06:412" },
  { name: "Anjali Rao", plan: "3-month · expires 02 Oct", method: "Scanner", granted: true, time: "06:418" },
  { name: "Imran Shaikh", plan: "Expired 29 Sep", method: "QR", granted: false, note: "Renewal due — member notified", time: "06:423" },
  { name: "Neha Kulkarni", plan: "12-month · expires 11 Dec", method: "Assisted", granted: true, note: "Forgot phone — logged by Priya", time: "06:431" },
  { name: "Vikram Desai", plan: "6-month · expires 07 Nov", method: "QR", granted: true, time: "06:437" },
];

export function TerminalStream() {
  const reduced = useReducedMotion();
  const [ticks, setTicks] = useState(1);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setTicks((c) => (c >= STREAM.length ? 1 : c + 1));
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  /* Derived, not mirrored into state: under reduced motion the full stream
     renders immediately with no setState in the effect at all. */
  const count = reduced ? STREAM.length : ticks;

  /* Newest first, which is how the real terminal prepends. */
  const visible = STREAM.slice(0, count).reverse();

  return (
    <ScreenFrame label="Reception terminal. Every entry carries a timestamp and a reason.">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="k-live-dot h-2 w-2 rounded-full bg-primary"
          />
          <span className="text-[14px] text-ink">Lanes 01 &amp; 02 online</span>
        </div>
        <span className="tnum text-[13px] text-ink-subtle">24 ms relay</span>
      </div>

      {/* Access stream. Fixed min-height so the hero never reflows as rows
          arrive - layout shift in a hero is a Core Web Vitals penalty. */}
      <ul
        aria-live="off"
        className="min-h-[268px] divide-y divide-line sm:min-h-[300px]"
      >
        {visible.map((e) => (
          <li key={e.time} className="k-rise flex items-start gap-3 px-4 py-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm ${
                e.granted
                  ? "bg-primary text-on-primary"
                  : "bg-danger/15 text-danger"
              }`}
            >
              {e.granted ? (
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                <X className="h-3.5 w-3.5" strokeWidth={3} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-[14px] text-ink">{e.name}</p>
                <span className="tnum shrink-0 text-[12px] text-ink-subtle">
                  {e.time}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-ink-subtle">
                {e.plan} · {e.method}
              </p>
              {e.note && (
                <p
                  className={`mt-1 text-[12px] ${
                    e.granted ? "text-ink-muted" : "text-danger"
                  }`}
                >
                  {e.note}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-line bg-surface px-4 py-2.5 text-[12px] text-ink-subtle">
        Expired members are turned away by the gate, not by your receptionist.
      </div>
    </ScreenFrame>
  );
}
