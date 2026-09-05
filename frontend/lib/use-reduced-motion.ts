"use client";

import { useSyncExternalStore } from "react";

/* Reads prefers-reduced-motion as an external store rather than mirroring it
   into state inside an effect.

   The setState-in-effect version tripped react-hooks/set-state-in-effect and
   caused a cascading render on every mount. useSyncExternalStore is the
   intended API for subscribing to a platform value like this.

   The server snapshot is `true` - assume reduced motion until proven
   otherwise. That means the first paint is always the settled, fully-visible
   state, so content is never gated behind an animation that may not run. */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
