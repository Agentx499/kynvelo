"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Dumbbell,
  Plus,
  Calculator,
  Timer,
  ArrowLeft,
  X,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SetRecord {
  id: number;
  prev: string;
  weight: number;
  reps: number;
  done: boolean;
}

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [showPlateModal, setShowPlateModal] = useState(false);
  const [targetWeight, setTargetWeight] = useState(82.5);

  const [sets, setSets] = useState<SetRecord[]>([
    { id: 1, prev: "80kg × 10", weight: 82.5, reps: 10, done: true },
    { id: 2, prev: "80kg × 8", weight: 82.5, reps: 8, done: true },
    { id: 3, prev: "80kg × 8", weight: 82.5, reps: 8, done: false },
  ]);

  // Workout Session Timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Rest Timer Countdown
  useEffect(() => {
    if (restTimer === null) return;
    if (restTimer <= 0) {
      // Buzz simulation
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      setRestTimer(null);
      return;
    }
    const timer = setInterval(() => setRestTimer((r) => (r !== null ? r - 1 : null)), 1000);
    return () => clearInterval(timer);
  }, [restTimer]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleSet = (id: number) => {
    setSets((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newDone = !s.done;
          if (newDone) {
            // Auto start 90-second rest timer
            setRestTimer(90);
          }
          return { ...s, done: newDone };
        }
        return s;
      })
    );
  };

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1];
    setSets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        prev: `${lastSet.weight}kg × ${lastSet.reps}`,
        weight: lastSet.weight,
        reps: lastSet.reps,
        done: false,
      },
    ]);
  };

  // Barbell Plate Math (Standard 20kg Olympic Bar)
  const calculatePlates = (totalWeight: number) => {
    let perSide = (totalWeight - 20) / 2;
    if (perSide < 0) return [];
    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const platesUsed: { plate: number; count: number }[] = [];

    for (const p of availablePlates) {
      const count = Math.floor(perSide / p);
      if (count > 0) {
        platesUsed.push({ plate: p, count });
        perSide -= count * p;
      }
    }
    return platesUsed;
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface-1 border-x border-hairline relative pb-28">
        {/* Active Workout Header */}
        <header className="sticky top-0 z-40 h-14 border-b border-hairline bg-surface-1/95 backdrop-blur-md px-4 flex items-center justify-between">
          <Link href="/app/workout" className="text-ink-muted hover:text-ink">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-ink">
            <Clock className="w-4 h-4 text-primary animate-pulse" />
            <span>{formatTime(seconds)}</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              alert("Workout Complete! +350 Reps Logged. Streak maintained!");
              router.push("/app/pulse");
            }}
            className="h-8 text-xs font-bold"
          >
            Finish
          </Button>
        </header>

        {/* Workout Content */}
        <main className="p-4 space-y-6">
          {/* Exercise 1: Barbell Bench Press */}
          <div className="p-5 rounded-2xl bg-surface-2 border border-hairline space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-primary flex items-center gap-1 font-bold">
                  <Dumbbell className="w-3.5 h-3.5" /> EXERCISE 1 OF 4
                </span>
                <h2 className="text-lg font-bold text-ink mt-0.5">
                  Barbell Bench Press
                </h2>
                <p className="text-xs text-ink-muted">Chest, Anterior Deltoids</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPlateModal(true)}
                className="gap-1 text-xs h-7 py-1 px-2 border-hairline-strong font-mono"
              >
                <Calculator className="w-3.5 h-3.5 text-primary" /> Plate Math
              </Button>
            </div>

            {/* Set Table */}
            <div className="space-y-2 font-mono text-xs">
              <div className="grid grid-cols-12 text-ink-subtle px-3 py-1 bg-surface-3/50 rounded">
                <span className="col-span-2">SET</span>
                <span className="col-span-4">PREVIOUS</span>
                <span className="col-span-3">KG</span>
                <span className="col-span-2">REPS</span>
                <span className="col-span-1 text-center">DONE</span>
              </div>

              {sets.map((set) => (
                <div
                  key={set.id}
                  className={`grid grid-cols-12 items-center px-3 py-2 rounded-lg border transition-all ${
                    set.done
                      ? "bg-primary/5 border-primary/25 text-ink"
                      : "bg-surface-3 border-hairline text-ink-muted"
                  }`}
                >
                  <span className="col-span-2 font-bold text-ink">{set.id}</span>
                  <span className="col-span-4 text-ink-subtle">{set.prev}</span>
                  <div className="col-span-3">
                    <input
                      type="number"
                      step="0.5"
                      value={set.weight}
                      onChange={(e) =>
                        setSets((prev) =>
                          prev.map((s) =>
                            s.id === set.id ? { ...s, weight: Number(e.target.value) } : s
                          )
                        )
                      }
                      className="w-16 bg-surface-2 border border-hairline rounded px-1.5 py-0.5 text-ink font-bold focus:border-primary outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        setSets((prev) =>
                          prev.map((s) =>
                            s.id === set.id ? { ...s, reps: Number(e.target.value) } : s
                          )
                        )
                      }
                      className="w-12 bg-surface-2 border border-hairline rounded px-1.5 py-0.5 text-ink font-bold focus:border-primary outline-none"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleToggleSet(set.id)}
                      className="cursor-pointer"
                    >
                      {set.done ? (
                        <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                      ) : (
                        <div className="w-5 h-5 rounded border border-hairline-strong hover:border-primary" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSet}
              className="w-full text-xs gap-1 border-dashed"
            >
              <Plus className="w-3.5 h-3.5" /> Add Set
            </Button>
          </div>
        </main>

        {/* Floating Rest Timer Drawer */}
        {restTimer !== null && (
          <div className="fixed bottom-0 z-50 w-full max-w-md p-4 bg-surface-2 border-t border-hairline shadow-2xl flex items-center justify-between font-mono animate-in slide-in-from-bottom">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                <Timer className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-ink-subtle uppercase block">REST TIMER</span>
                <span className="text-xl font-bold text-primary font-mono">
                  {formatTime(restTimer)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRestTimer((r) => (r !== null ? r + 30 : 30))}
                className="text-xs h-8"
              >
                +30s
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRestTimer(null)}
                className="h-8 w-8 text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Barbell Plate Math Modal */}
        {showPlateModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-surface-1 border border-hairline p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-ink flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-primary" />
                  Barbell Plate Calculator
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPlateModal(false)}
                  className="text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="text-xs font-mono text-ink-subtle block mb-1">
                  TOTAL WEIGHT (INCLUDES 20KG BARBELL)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="2.5"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-surface-2 border border-hairline font-mono font-bold text-lg text-primary outline-none focus:border-primary"
                  />
                  <span className="font-mono text-sm text-ink-muted font-bold">KG</span>
                </div>
              </div>

              {/* Plate Visual Breakdown */}
              <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-2">
                <span className="text-[11px] font-mono text-ink-subtle uppercase block">
                  RACK PER SIDE:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {calculatePlates(targetWeight).length > 0 ? (
                    calculatePlates(targetWeight).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-primary/20 text-primary border border-primary/40 font-bold"
                      >
                        {item.count} × {item.plate}kg
                      </span>
                    ))
                  ) : (
                    <span className="text-ink-subtle">Empty 20kg bar</span>
                  )}
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowPlateModal(false)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
