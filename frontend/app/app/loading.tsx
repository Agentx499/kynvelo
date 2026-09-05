/* Member PWA skeleton. Shaped like the mobile shell, not like a marketing page.

   The root app/loading.tsx renders wide display headings and a 3-up card row,
   which would have flashed a full-width marketing layout inside the 448px phone
   shell on every navigation. */
export default function AppLoading() {
  return (
    <div className="flex min-h-screen justify-center bg-canvas">
      <div
        className="w-full max-w-md border-x border-hairline bg-surface-1 p-4"
        role="status"
        aria-label="Loading"
      >
        <div className="animate-pulse space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-surface-2" />
            <div className="h-6 w-16 rounded-full bg-surface-2" />
          </div>

          {/* Primary card */}
          <div className="h-40 rounded-lg bg-surface-2" />

          {/* Action pills */}
          <div className="flex gap-2">
            <div className="h-9 w-28 rounded-full bg-surface-2" />
            <div className="h-9 w-24 rounded-full bg-surface-2" />
            <div className="h-9 w-20 rounded-full bg-surface-2" />
          </div>

          {/* List rows */}
          <div className="space-y-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-surface-2" />
            ))}
          </div>
        </div>
        <span className="sr-only">Loading your dashboard</span>
      </div>
    </div>
  );
}
