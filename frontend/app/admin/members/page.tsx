"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  Plus,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const members = [
    {
      id: "MB-101",
      name: "Rahul Sharma",
      phone: "+91 98201 44550",
      plan: "Gold Annual Pass",
      joinDate: "14 Nov 2025",
      daysRemaining: 24,
      status: "active",
    },
    {
      id: "MB-102",
      name: "Priya Patel",
      phone: "+91 98192 11200",
      plan: "Monthly Morning Pass",
      joinDate: "02 Feb 2026",
      daysRemaining: 18,
      status: "active",
    },
    {
      id: "MB-103",
      name: "Amit Roy",
      phone: "+91 98330 45520",
      plan: "Quarterly Pass",
      joinDate: "10 May 2026",
      daysRemaining: -4,
      status: "expired",
    },
    {
      id: "MB-104",
      name: "Karan Johar",
      phone: "+91 98200 99810",
      plan: "Gold Annual Pass",
      joinDate: "15 Jan 2026",
      daysRemaining: 140,
      status: "frozen",
    },
  ];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Phone,Plan,JoinDate,DaysRemaining,Status"]
        .concat(
          members.map(
            (m) =>
              `${m.id},${m.name},${m.phone},${m.plan},${m.joinDate},${m.daysRemaining},${m.status}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `olympic-gym-members-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs font-mono text-primary font-bold flex items-center gap-1.5">
              <Users className="w-4 h-4" /> MEMBER MANAGEMENT
            </span>
            <h1 className="text-2xl font-bold text-ink mt-0.5">
              Member Directory & Passes
            </h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="text-xs gap-1.5 font-mono border-hairline-strong"
            >
              <Download className="w-3.5 h-3.5 text-primary" /> Export GST CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert("Open New Member Registration Wizard")}
              className="text-xs gap-1.5 font-mono"
            >
              <Plus className="w-3.5 h-3.5" /> Add Member
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by member name, phone number, or Member ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-1 border border-hairline focus:border-primary text-ink outline-none text-xs"
            />
          </div>

          <div className="flex gap-2 font-mono text-xs">
            {["all", "active", "expired", "frozen"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-2 rounded-xl border uppercase transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-primary/20 border-primary text-primary font-bold"
                    : "bg-surface-1 border-hairline text-ink-muted hover:text-ink"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Member Table */}
        <div className="rounded-2xl bg-surface-1 border border-hairline overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline bg-surface-2 text-ink-subtle">
                  <th className="py-3 px-4">MEMBER ID</th>
                  <th className="py-3 px-4">NAME & PHONE</th>
                  <th className="py-3 px-4">PASS PLAN</th>
                  <th className="py-3 px-4">JOINED</th>
                  <th className="py-3 px-4">EXPIRY</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-ink-subtle">{m.id}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink text-sm block font-sans">
                        {m.name}
                      </span>
                      <span className="text-ink-subtle text-[11px]">{m.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">{m.plan}</td>
                    <td className="py-3.5 px-4 text-ink-subtle">{m.joinDate}</td>
                    <td className="py-3.5 px-4">
                      {m.daysRemaining > 0 ? (
                        <span className="text-ink font-semibold">
                          {m.daysRemaining} Days Left
                        </span>
                      ) : (
                        <span className="text-danger font-bold">
                          Expired ({Math.abs(m.daysRemaining)}d ago)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Badge
                        variant={
                          m.status === "active"
                            ? "success"
                            : m.status === "expired"
                            ? "danger"
                            : "warning"
                        }
                        className="uppercase text-[10px]"
                      >
                        {m.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
