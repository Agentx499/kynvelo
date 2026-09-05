"use client";

import { useEffect, useState } from "react";
import { CloudOff } from "lucide-react";

/* Screen 87. Ambient, non-blocking. Going offline must never hide the QR pass
   or the workout logger - both work from cache and sync on reconnect, so a
   modal here would break check-in at exactly the moment it matters.

   Starts as online rather than reading navigator.onLine during render, which
   would desync server and client HTML. The effect settles the real value. */
export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-[20] flex items-center justify-center gap-2 border-b border-warning/30 bg-warning/12 px-4 py-2 text-[13px] text-warning"
    >
      <CloudOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Working offline — your check-in and sets are queued and will sync
        automatically.
      </span>
    </div>
  );
}
