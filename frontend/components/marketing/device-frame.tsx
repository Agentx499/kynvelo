import { cn } from "@/lib/utils";

/* Phone bezel for product imagery.

   The 28px radius is deliberate and is not the banned over-rounded-card
   pattern: this is a depiction of a physical object, and phones are round.
   UI panels inside it still use the 8px system radius. */
export function DeviceFrame({
  className,
  label,
  children,
}: {
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[320px] rounded-[28px] border border-line-strong bg-surface p-2.5",
        className
      )}
    >
      {/* Speaker slot. One flat shape, no gradient, no gloss. */}
      <div
        aria-hidden="true"
        className="mx-auto mb-2 h-1 w-14 rounded-full bg-line-strong"
      />
      <div className="overflow-hidden rounded-[20px] border border-line bg-canvas">
        {children}
      </div>
      {label && (
        <p className="mt-3 text-center text-[13px] text-ink-subtle">{label}</p>
      )}
    </div>
  );
}

/* Landscape counterpart for the reception terminal, which runs on a tablet or
   a desk monitor rather than a phone. */
export function ScreenFrame({
  className,
  label,
  children,
}: {
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-lg border border-line-strong bg-surface p-2">
        <div className="overflow-hidden rounded-md border border-line bg-canvas">
          {children}
        </div>
      </div>
      {label && (
        <p className="mt-3 text-[13px] text-ink-subtle">{label}</p>
      )}
    </div>
  );
}
