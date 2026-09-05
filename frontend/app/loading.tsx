/* Skeleton, not a spinner. Blocks match the shape of a marketing page so the
   layout doesn't shift when content arrives. Uses animate-pulse only, which
   the reduced-motion block in globals.css clamps. */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
      role="status"
      aria-label="Loading"
    >
      <div className="animate-pulse space-y-10">
        <div className="space-y-4">
          <div className="h-14 w-[85%] rounded bg-surface-2 sm:h-20 sm:w-[70%]" />
          <div className="h-14 w-[60%] rounded bg-surface-2 sm:h-20 sm:w-[45%]" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-full max-w-xl rounded bg-surface" />
          <div className="h-4 w-4/5 max-w-lg rounded bg-surface" />
        </div>
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-md bg-surface-2" />
          <div className="h-11 w-32 rounded-md bg-surface" />
        </div>
        <div className="grid gap-4 border-t border-line pt-10 sm:grid-cols-3">
          <div className="h-28 rounded-lg bg-surface" />
          <div className="h-28 rounded-lg bg-surface" />
          <div className="h-28 rounded-lg bg-surface" />
        </div>
      </div>
      <span className="sr-only">Loading page content</span>
    </div>
  );
}
