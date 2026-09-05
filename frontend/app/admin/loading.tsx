/* Admin CRM skeleton. Shaped like the sidebar + data-grid layout rather than
   the root marketing skeleton, which would have caused a full-page layout shift
   on every navigation inside the command centre. */
export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-canvas" role="status" aria-label="Loading">
      {/* Header bar */}
      <div className="h-16 border-b border-hairline bg-surface-1" />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-60 shrink-0 border-r border-hairline p-4 lg:block">
          <div className="animate-pulse space-y-2.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded-md bg-surface-2" />
            ))}
          </div>
        </div>

        {/* Data surface */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded bg-surface-2" />

            {/* KPI row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-lg bg-surface-2" />
              ))}
            </div>

            {/* Table */}
            <div className="space-y-px overflow-hidden rounded-lg bg-hairline">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-surface-1" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading the command centre</span>
    </div>
  );
}
