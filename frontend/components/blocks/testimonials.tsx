"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Replacing Hevy and MyFitnessPal with Kynvelo was a game changer. The barbell plate math alone saves me 2 minutes every bench session, and the 2-stage AI food scan never hallucinates calories like other apps.",
      author: "Devendra Rathore",
      role: "Competitive Powerlifter & Athlete",
      location: "Bangalore",
      badge: "ATHLETE",
      stars: 5,
    },
    {
      quote:
        "We plugged the Kynvelo relay into our tripod turnstile in 20 minutes. But the real game-changer was Flow CRM: we recovered 19 inactive members in our first 3 weeks. That's ₹76,000 we would have silently lost.",
      author: "Karan Johar",
      role: "Founder, Titan Iron Gym (3 Locations)",
      location: "Mumbai",
      badge: "GYM OWNER",
      stars: 5,
    },
    {
      quote:
        "Our front desk used to be a madhouse with paper registers and WhatsApp manual renewal chasing. Kynvelo's 15s rotating QR scan and auto-generated GST tax receipts freed our staff to actually train members.",
      author: "Ananya Sharma",
      role: "Managing Director, Pulse Fitness Club",
      location: "Delhi NCR",
      badge: "CLUB DIRECTOR",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            VERIFIED PROOF & REPUTATION
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Trusted by Elite Athletes & Modern Gym Founders
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted">
            Hear why thousands of lifters and hundreds of facilities rely on Kynvelo every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(item.stars)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Badge variant="primary" className="text-[10px]">
                    {item.badge}
                  </Badge>
                </div>

                <Quote className="w-8 h-8 text-ink-subtle/30 mb-2" />
                <p className="text-sm text-ink-muted leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-hairline flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-ink">{item.author}</h4>
                  <p className="text-xs text-ink-subtle">{item.role}</p>
                </div>
                <span className="text-xs font-mono text-ink-subtle">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
