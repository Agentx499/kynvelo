"use client";

import React, { useState } from "react";
import {
  Camera,
  Barcode,
  Plus,
  Flame,
  CheckCircle2,
  Trash2,
  Sparkles,
  Utensils,
  Layers,
  X,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FoodItem {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function NutritionPage() {
  const [showScanModal, setShowScanModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null);

  const [meals, setMeals] = useState<{
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
  }>({
    breakfast: [
      { id: 1, name: "3 Whole Eggs (Boiled)", kcal: 215, protein: 18, carbs: 1.5, fat: 15 },
      { id: 2, name: "2 Slices Sourdough Toast", kcal: 180, protein: 6, carbs: 34, fat: 1 },
      { id: 3, name: "Black Espresso", kcal: 5, protein: 0, carbs: 1, fat: 0 },
    ],
    lunch: [
      { id: 4, name: "Grilled Chicken Breast (200g)", kcal: 330, protein: 62, carbs: 0, fat: 7 },
      { id: 5, name: "Steamed White Basmati (150g)", kcal: 195, protein: 4, carbs: 43, fat: 0.5 },
      { id: 6, name: "Mixed Green Salad with Olive Oil", kcal: 120, protein: 2, carbs: 6, fat: 10 },
    ],
    dinner: [
      { id: 7, name: "Paneer / Whey Protein Shake (1 Scoop)", kcal: 130, protein: 25, carbs: 2, fat: 1.5 },
    ],
  });

  // Calculate Aggregates
  const allItems = [...meals.breakfast, ...meals.lunch, ...meals.dinner];
  const totalKcal = allItems.reduce((acc, i) => acc + i.kcal, 0);
  const totalProtein = allItems.reduce((acc, i) => acc + i.protein, 0);
  const totalCarbs = allItems.reduce((acc, i) => acc + i.carbs, 0);
  const totalFat = Math.round(allItems.reduce((acc, i) => acc + i.fat, 0));

  const targetKcal = 2400;
  const targetProtein = 160;

  // 2-Stage AI Scanner Simulation
  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDetectedFood({
        id: Date.now(),
        name: "Grilled Salmon with Asparagus (Verified USDA)",
        kcal: 380,
        protein: 34,
        carbs: 4,
        fat: 22,
      });
    }, 1500);
  };

  const handleAddDetectedFood = () => {
    if (!detectedFood) return;
    setMeals((prev) => ({
      ...prev,
      dinner: [...prev.dinner, detectedFood],
    }));
    setDetectedFood(null);
    setShowScanModal(false);
  };

  return (
    <MobileShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-ink">Fuel & Nutrition</h1>
            <p className="text-xs text-ink-muted">Two-stage zero-hallucination tracking</p>
          </div>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBatchModal(true)}
              className="text-xs h-8 px-2.5 font-mono gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-primary" /> Batch
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowScanModal(true)}
              className="text-xs h-8 px-2.5 gap-1"
            >
              <Camera className="w-3.5 h-3.5" /> Scan Food
            </Button>
          </div>
        </div>

        {/* Concentric Macro Rings Card */}
        <div className="p-5 rounded-2xl bg-surface-2 border border-hairline shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-ink-subtle">DAILY ENERGY BALANCE</span>
            <Badge variant="primary" className="text-[10px]">
              {targetKcal - totalKcal} KCAL REMAINING
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            {/* Concentric SVG Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="var(--kynvelo-hairline)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Calories Ring */}
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="var(--kynvelo-primary)"
                  strokeWidth="8"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * Math.min(totalKcal, targetKcal)) / targetKcal}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-mono text-base font-bold text-ink">{totalKcal}</span>
                <span className="block text-[10px] text-ink-subtle">/ {targetKcal} kcal</span>
              </div>
            </div>

            {/* Macro Bars */}
            <div className="space-y-2 flex-1 font-mono text-xs">
              <div>
                <div className="flex justify-between text-ink mb-1">
                  <span className="text-cyan-400 font-bold">Protein</span>
                  <span>{totalProtein}g / {targetProtein}g</span>
                </div>
                <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${Math.min((totalProtein / targetProtein) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ink mb-1">
                  <span className="text-amber-400 font-bold">Carbs</span>
                  <span>{totalCarbs}g / 220g</span>
                </div>
                <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${Math.min((totalCarbs / 220) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ink mb-1">
                  <span className="text-rose-400 font-bold">Fats</span>
                  <span>{totalFat}g / 70g</span>
                </div>
                <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full"
                    style={{ width: `${Math.min((totalFat / 70) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Timeline */}
        <div className="space-y-4">
          {[
            { title: "Breakfast", items: meals.breakfast, color: "text-amber-400" },
            { title: "Lunch", items: meals.lunch, color: "text-emerald-400" },
            { title: "Dinner", items: meals.dinner, color: "text-primary" },
          ].map((section, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-ink">{section.title}</h3>
                <span className="font-mono text-xs text-ink-subtle">
                  {section.items.reduce((a, b) => a + b.kcal, 0)} kcal • {section.items.reduce((a, b) => a + b.protein, 0)}g P
                </span>
              </div>

              <div className="divide-y divide-hairline/60">
                {section.items.map((item) => (
                  <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-ink font-medium block">{item.name}</span>
                      <span className="font-mono text-[10px] text-ink-subtle">
                        {item.kcal} kcal • {item.protein}g P • {item.carbs}g C • {item.fat}g F
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scan Modal */}
        {showScanModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-surface-1 border border-hairline p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-ink flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-primary" /> Two-Stage Food Recognition
                </h3>
                <button
                  type="button"
                  onClick={() => setShowScanModal(false)}
                  className="text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Camera Reticle Viewport */}
              <div className="relative w-full h-44 rounded-xl bg-surface-3 border border-hairline-strong flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-primary/40 rounded-lg pointer-events-none" />
                {scanning ? (
                  <div className="text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <span className="text-xs font-mono text-primary font-bold block">
                      VERIFYING WITH USDA DATABASE...
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Camera className="w-8 h-8 text-ink-subtle mx-auto" />
                    <span className="text-xs text-ink-muted">Point camera at food or barcode</span>
                  </div>
                )}
              </div>

              {detectedFood && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 space-y-1 text-xs">
                  <span className="font-bold text-ink block">{detectedFood.name}</span>
                  <div className="font-mono text-[11px] text-primary">
                    {detectedFood.kcal} kcal • {detectedFood.protein}g Protein • {detectedFood.carbs}g Carbs
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {!detectedFood ? (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleSimulateScan}
                    disabled={scanning}
                  >
                    Capture & Verify
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleAddDetectedFood}
                  >
                    Add to Log
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meal Prep Batch Modal */}
        {showBatchModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-2xl bg-surface-1 border border-hairline p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-ink flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-primary" /> Meal Prep Batch Splitter
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBatchModal(false)}
                  className="text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-ink-muted">
                Cooked 1kg chicken + 500g rice? Enter the total cooked macros and divide into containers automatically.
              </p>

              <div className="p-3 rounded-lg bg-surface-2 border border-hairline space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-subtle">Container Count:</span>
                  <span className="text-primary font-bold">4 Meals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-subtle">Per Container:</span>
                  <span className="text-ink font-bold">485 kcal • 48g Protein</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  alert("4 Meal Prep containers logged to Meal History!");
                  setShowBatchModal(false);
                }}
              >
                Log 4 Containers
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
