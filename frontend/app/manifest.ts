import type { MetadataRoute } from "next";

/* PWA manifest. The member app is installable and runs an offline check-in
   queue, so this is functional rather than boilerplate.
   `start_url` points at the member hub, not `/`, because anyone installing
   to their home screen is an athlete, not a prospect reading marketing. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kynvelo — Fitness Operating System",
    short_name: "Kynvelo",
    description:
      "Workout logging, USDA-verified nutrition, gym check-in and renewals in one app.",
    start_url: "/app/pulse",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050608",
    theme_color: "#050608",
    categories: ["health", "fitness", "productivity"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180", purpose: "maskable" },
    ],
  };
}
