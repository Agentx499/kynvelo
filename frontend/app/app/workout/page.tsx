"use client";

import React from "react";
import Link from "next/link";
import {
  Dumbbell,
  Plus,
  Play,
  Award,
  ChevronRight,
  Flame,
  Clock,
  TrendingUp,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WorkoutHubPage() {
  const routines = [
    {
      title: "Push Day (Hypertrophy)",
      exercises: "Bench Press, Incline DB, Lateral Raises, Tricep Pushdown",
      duration: "55 mins",
      lastDone: "3 days ago",
      target: "Chest, Shoulders & Triceps",
    },
    {
      title: "Pull Day (Back & Biceps)",
      exercises: "Barbell Rows, Lat Pulldown, Facepulls, Hammer Curls",
      duration: "50 mins",
      lastDone: "5 days ago",
      target: "Lats, Rhomboids & Biceps",
    },
    {
      title: "Leg Day (Squat & Quads)",
      exercises: "Barbell Back Squat, Romanian Deadlift, Leg Press, Calves",
      duration: "65 mins",
      lastDone: "7 days ago",
      target: "Quads, Hamstrings & Glutes",
    },
  ];

  const prs = [
    { exercise: "Barbell Bench Press", weight: "110.0 kg", date: "Aug 2026" },
    { exercise: "Barbell Back Squat", weight: "145.0 kg", date: "Jul 2026" },
    { exercise: "Conventional Deadlift", weight: "185.0 kg", date: "Aug 2026" },
  ];

  return (
    <MobileShell>
      <div className="space-y-6">
        {/* Top Action */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-ink">Workout Routines</h1>
            <p className="text-xs text-ink-muted">Choose a template or start logging</p>
          </div>
          <Link href="/app/workout/active">
            <Button variant="primary" size="sm" className="gap-1 text-xs">
              <Play className="w-3.5 h-3.5 fill-on-primary" /> Start Workout
            </Button>
          </Link>
        </div>

        {/* PR Trophy Vault */}
        <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
              <Award className="w-4 h-4" /> PERSONAL RECORD VAULT
            </span>
            <Badge variant="primary" className="text-[10px]">ALL-TIME BESTS</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            {prs.map((pr, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-surface-3/60 border border-hairline">
                <span className="text-sm font-bold text-ink block">{pr.weight}</span>
                <span className="text-[10px] text-ink-subtle block truncate">{pr.exercise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Routine List */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-ink-subtle uppercase tracking-wider block">
            SAVED ROUTINES
          </span>
          {routines.map((routine, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-surface-2 border border-hairline hover:border-primary/40 transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-ink">{routine.title}</h3>
                  <p className="text-xs text-ink-muted mt-0.5">{routine.target}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {routine.duration}
                </Badge>
              </div>

              <p className="text-xs text-ink-subtle line-clamp-1 font-mono">
                {routine.exercises}
              </p>

              <div className="flex justify-between items-center pt-2 border-t border-hairline/60 text-xs">
                <span className="text-[11px] text-ink-subtle">Last done: {routine.lastDone}</span>
                <Link href="/app/workout/active">
                  <Button variant="primary" size="sm" className="h-7 text-xs py-1 px-3">
                    Start Routine
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
