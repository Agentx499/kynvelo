"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  TrendingUp,
  Receipt,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function BillingPage() {
  const transactions = [
    {
      id: "TXN-9841",
      date: "Today, 10:30 AM",
      member: "Rahul Sharma",
      type: "Annual Pass Renewal",
      method: "UPI (Google Pay)",
      ref: "UTR-2026-981014",
      base: 22000,
      gst: 3960,
      total: 25960,
      status: "paid",
    },
    {
      id: "TXN-9840",
      date: "Yesterday, 06:15 PM",
      member: "Priya Patel",
      type: "Monthly Morning Pass",
      method: "UPI (PhonePe)",
      ref: "UTR-2026-884120",
      base: 2800,
      gst: 504,
      total: 3304,
      status: "paid",
    },
    {
      id: "TXN-9839",
      date: "01 Sep 2026",
      member: "Siddharth Malhotra",
      type: "12-Session PT Package",
      method: "Credit Card (POS)",
      ref: "POS-CARD-5541",
      base: 14500,
      gst: 2610,
      total: 17110,
      status: "paid",
    },
  ];

  const totalCollectedThisMonth = 485000;
  const gstLiabilityThisMonth = Math.round(totalCollectedThisMonth * 0.18);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs font-mono text-primary font-bold flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" /> FINANCIAL RECONCILIATION
            </span>
            <h1 className="text-2xl font-bold text-ink mt-0.5">
              Billing Ledger & 18% GST Summary
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Downloading Monthly GST-1 Return JSON for Chartered Accountant...")}
            className="text-xs gap-1.5 font-mono border-hairline-strong"
          >
            <Download className="w-3.5 h-3.5 text-primary" /> Download GST-1 Summary
          </Button>
        </div>

        {/* Aggregate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline">
            <span className="text-xs font-mono text-ink-subtle uppercase block mb-1">
              GROSS COLLECTIONS (SEP 2026)
            </span>
            <div className="font-mono text-2xl font-bold text-primary">
              {formatCurrency(totalCollectedThisMonth)}
            </div>
            <p className="text-xs text-ink-muted mt-1">94% via digital UPI deep-link</p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline">
            <span className="text-xs font-mono text-ink-subtle uppercase block mb-1">
              18% GST COLLECTED (CGST + SGST)
            </span>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatCurrency(gstLiabilityThisMonth)}
            </div>
            <p className="text-xs text-ink-muted mt-1">HSN/SAC 999723 Fitness Services</p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-1 border border-hairline">
            <span className="text-xs font-mono text-ink-subtle uppercase block mb-1">
              NET FACILITY DEPOSIT
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {formatCurrency(totalCollectedThisMonth - gstLiabilityThisMonth)}
            </div>
            <p className="text-xs text-ink-muted mt-1">Direct Bank Settled (T+1)</p>
          </div>
        </div>

        {/* Transaction Ledger Table */}
        <div className="rounded-2xl bg-surface-1 border border-hairline overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline bg-surface-2 text-ink-subtle">
                  <th className="py-3 px-4">TXN ID & DATE</th>
                  <th className="py-3 px-4">MEMBER</th>
                  <th className="py-3 px-4">PAYMENT METHOD</th>
                  <th className="py-3 px-4">BASE FEE</th>
                  <th className="py-3 px-4">GST (18%)</th>
                  <th className="py-3 px-4">TOTAL</th>
                  <th className="py-3 px-4 text-right">RECEIPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink block">{t.id}</span>
                      <span className="text-ink-subtle text-[10px]">{t.date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ink font-sans block">{t.member}</span>
                      <span className="text-ink-subtle text-[10px]">{t.type}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-ink">{t.method}</span>
                      <span className="text-ink-subtle text-[10px] block">{t.ref}</span>
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">{formatCurrency(t.base)}</td>
                    <td className="py-3.5 px-4 text-ink-muted">{formatCurrency(t.gst)}</td>
                    <td className="py-3.5 px-4 font-bold text-primary">{formatCurrency(t.total)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading PDF invoice for ${t.id}`)}
                        className="p-1.5 rounded bg-surface-2 hover:bg-surface-3 text-ink-muted hover:text-ink cursor-pointer border border-hairline"
                        title="Download Tax Invoice"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>
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
