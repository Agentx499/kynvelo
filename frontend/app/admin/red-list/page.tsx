"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  MessageSquare,
  Phone,
  Lock,
  CheckCircle2,
  Calendar,
  X,
  FileText,
  Filter,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RedMember {
  id: number;
  name: string;
  phone: string;
  daysAbsent: number;
  plan: string;
  lastOutcome: string;
  lastOutcomeDate: string;
  lockedBy?: string;
}

export default function RedListPage() {
  const [filter, setFilter] = useState<"all" | "10-14" | "15-21" | "22+">("all");
  const [activeModalMember, setActiveModalMember] = useState<RedMember | null>(null);
  const [outcomeStatus, setOutcomeStatus] = useState("Will return tomorrow");
  const [outcomeNotes, setOutcomeNotes] = useState("");

  const [members, setMembers] = useState<RedMember[]>([
    {
      id: 1,
      name: "Vikram Singh",
      phone: "+91 98201 55420",
      daysAbsent: 14,
      plan: "Gold 6-Month Pass",
      lastOutcome: "Left Voicemail",
      lastOutcomeDate: "2 days ago",
      lockedBy: "Coach Dev",
    },
    {
      id: 2,
      name: "Anita Desai",
      phone: "+91 98192 44310",
      daysAbsent: 11,
      plan: "Annual Pass",
      lastOutcome: "No previous contact",
      lastOutcomeDate: "Never",
    },
    {
      id: 3,
      name: "Rohan Kapoor",
      phone: "+91 97690 12890",
      daysAbsent: 23,
      plan: "Quarterly Pass",
      lastOutcome: "Said travelling to Delhi",
      lastOutcomeDate: "8 days ago",
    },
    {
      id: 4,
      name: "Kavita Nair",
      phone: "+91 98330 98112",
      daysAbsent: 16,
      plan: "Gold Annual Pass",
      lastOutcome: "Wrist sprain, resting",
      lastOutcomeDate: "5 days ago",
    },
  ]);

  const filteredMembers = members.filter((m) => {
    if (filter === "10-14") return m.daysAbsent >= 10 && m.daysAbsent <= 14;
    if (filter === "15-21") return m.daysAbsent >= 15 && m.daysAbsent <= 21;
    if (filter === "22+") return m.daysAbsent >= 22;
    return true;
  });

  const handleSaveOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalMember) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === activeModalMember.id
          ? {
              ...m,
              lastOutcome: outcomeStatus,
              lastOutcomeDate: "Just now",
              lockedBy: "You",
            }
          : m
      )
    );

    alert(`Outcome logged for ${activeModalMember.name}: "${outcomeStatus}"`);
    setActiveModalMember(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs font-mono text-danger font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> FLOW RETENTION ENGINE
            </span>
            <h1 className="text-2xl font-bold text-ink mt-0.5">
              No-Show Red-List CRM
            </h1>
          </div>

          <Badge variant="danger" className="text-xs py-1 px-3">
            24 MEMBERS INACTIVE 10+ DAYS • ₹68,000 AT RISK
          </Badge>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {/* `as const` narrows tab.id to the RiskFilter union, so setFilter
              type-checks without an `any` cast. */}
          {([
            { id: "all", label: "All Cases (24)" },
            { id: "10-14", label: "10–14 Days Absent (12)" },
            { id: "15-21", label: "15–21 Days Absent (8)" },
            { id: "22+", label: "22+ Days Critical (4)" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                filter === tab.id
                  ? "bg-danger/20 border-danger text-danger font-bold"
                  : "bg-surface-2 border-hairline text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* High-Density Action Table */}
        <div className="rounded-2xl bg-surface-1 border border-hairline overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline bg-surface-2 text-ink-subtle">
                  <th className="py-3 px-4">MEMBER</th>
                  <th className="py-3 px-4">DAYS ABSENT</th>
                  <th className="py-3 px-4">MEMBERSHIP</th>
                  <th className="py-3 px-4">LAST LOGGED OUTCOME</th>
                  <th className="py-3 px-4 text-right">ONE-TAP ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-bold text-ink text-sm block font-sans">
                            {m.name}
                          </span>
                          <span className="text-ink-subtle text-[11px]">{m.phone}</span>
                        </div>
                        {m.lockedBy && (
                          <span
                            title={`Locked by ${m.lockedBy} (Anti-collision protocol active)`}
                            className="p-1 rounded bg-surface-3 text-warning border border-hairline"
                          >
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded font-bold ${
                          m.daysAbsent >= 22
                            ? "bg-danger/20 text-danger"
                            : m.daysAbsent >= 15
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {m.daysAbsent} Days
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-ink-muted">{m.plan}</td>

                    <td className="py-3.5 px-4">
                      <span className="text-ink block">{m.lastOutcome}</span>
                      <span className="text-ink-subtle text-[10px] block">
                        {m.lastOutcomeDate}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Tap WhatsApp */}
                        <a
                          href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                            m.name
                          )},%20we%20noticed%20you%20haven't%20been%20to%20Olympic%20Gym%20for%20a%20few%20days.%20Is%20everything%20okay%20with%20your%20routine?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold hover:bg-emerald-500/30 flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3" /> WhatsApp
                        </a>

                        {/* 1-Tap Call */}
                        <a
                          href={`tel:${m.phone}`}
                          className="px-2 py-1 rounded bg-surface-2 text-ink border border-hairline hover:bg-surface-3 flex items-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Call
                        </a>

                        {/* Log Outcome */}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setActiveModalMember(m)}
                          className="h-7 text-xs py-1 px-2.5"
                        >
                          Log Outcome
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outcome Logger Modal */}
        {activeModalMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-surface-1 border border-hairline p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-ink flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Log Follow-up for{" "}
                  {activeModalMember.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModalMember(null)}
                  className="text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOutcome} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-mono text-ink-subtle mb-1">
                    OUTCOME CLASSIFICATION
                  </label>
                  <select
                    value={outcomeStatus}
                    onChange={(e) => setOutcomeStatus(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-xs"
                  >
                    <option>Will return tomorrow / this week</option>
                    <option>Travelling out of town (Frozen pass)</option>
                    <option>Injured / medical recovery</option>
                    <option>Considering dropping out (Offered coach review)</option>
                    <option>Unreachable / Left voicemail</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-ink-subtle mb-1">
                    INTERNAL NOTES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={outcomeNotes}
                    onChange={(e) => setOutcomeNotes(e.target.value)}
                    placeholder="e.g. Member had fever last week, excited to resume chest workout."
                    className="w-full p-2.5 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveModalMember(null)}
                    className="w-1/3"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-2/3">
                    Save Outcome & Update CRM
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
