"use client";

import React from "react";
import AppShell from "../AppShell";
import { MOCKUP_PAYMENTS, MOCKUP_IDENTITY } from "@/content/mockup-data";
import { CreditCard, Download, Filter, CheckCircle2, Clock, Check, MoreHorizontal } from "lucide-react";

export function PaymentsScreen() {
  return (
    <AppShell activeMenuItem="Payment Report" title="Payment Reports & GST">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 shrink-0">
          <div className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs">
            <div className="text-[10px] text-[#717684]">This Month Total</div>
            <div className="text-[15px] font-bold text-[#161616] mt-0.5">₹4,86,200</div>
            <div className="text-[9px] text-[#059669] font-medium">▲ 14.2% vs last month</div>
          </div>
          <div className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs">
            <div className="text-[10px] text-[#717684]">GST Invoiced (18%)</div>
            <div className="text-[15px] font-bold text-[#161616] mt-0.5">₹74,166</div>
            <div className="text-[9px] text-[#717684]">Compliant tax invoices</div>
          </div>
          <div className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs">
            <div className="text-[10px] text-[#717684]">Pending Offline Review</div>
            <div className="text-[15px] font-bold text-[#D97706] mt-0.5">2 transfers</div>
            <div className="text-[9px] text-[#D97706]">Bank receipts waiting</div>
          </div>
          <div className="bg-white rounded-xl border border-[#EAE8E2] p-2.5 shadow-2xs">
            <div className="text-[10px] text-[#717684]">Active Gateways</div>
            <div className="text-[13px] font-bold text-[#161616] mt-0.5 flex items-center gap-1.5">
              <span>Razorpay</span>
              <span className="text-[#8F94A0]">·</span>
              <span>Stripe</span>
              <span className="text-[#8F94A0]">·</span>
              <span>Paytm</span>
            </div>
            <div className="text-[9px] text-[#059669]">Direct merchant payout</div>
          </div>
        </div>

        {/* Transactions Table Card */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EFEA] shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#161616]">Recent Transactions</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F5F6F8] text-[#525866] font-medium">
                Live Settlements
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-lg border border-[#EAE8E2] text-[10px] font-medium text-[#525866] flex items-center gap-1.5 hover:bg-[#F5F6F8]">
                <Download className="size-3 text-[#8F94A0]" />
                <span>Export GST CSV</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden min-h-0">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-[#F0EFEA] text-[9px] font-bold text-[#8F94A0] uppercase">
                  <th className="pb-1.5 font-medium">Txn Ref</th>
                  <th className="pb-1.5 font-medium">Student</th>
                  <th className="pb-1.5 font-medium">Course / Enrollment</th>
                  <th className="pb-1.5 font-medium text-right">Amount</th>
                  <th className="pb-1.5 font-medium text-right">GST (18%)</th>
                  <th className="pb-1.5 font-medium text-center">Gateway</th>
                  <th className="pb-1.5 font-medium text-center">Status</th>
                  <th className="pb-1.5 font-medium text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F7F5]">
                {MOCKUP_PAYMENTS.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-2 font-mono text-[9px] text-[#717684]">
                      {txn.txnRef}
                    </td>
                    <td className="py-2 font-semibold text-[#161616]">
                      {txn.studentName}
                    </td>
                    <td className="py-2 text-[#525866] truncate max-w-[170px]">
                      {txn.courseTitle}
                    </td>
                    <td className="py-2 text-right font-bold text-[#161616]">
                      {txn.amount}
                    </td>
                    <td className="py-2 text-right text-[#717684]">
                      {txn.gstAmount}
                    </td>
                    <td className="py-2 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-[#F5F6F8] text-[9px] text-[#525866] font-medium border border-[#EAE8E2]/60">
                        {txn.gateway}
                      </span>
                    </td>
                    <td className="py-2 text-center">
                      {txn.status === "Success" ? (
                        <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.5 rounded-full">
                          <CheckCircle2 className="size-2.5" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-[#D97706] bg-[#FFFBEB] border border-[#FDE68A] px-1.5 py-0.5 rounded-full">
                          <Clock className="size-2.5" />
                          Review Required
                        </span>
                      )}
                    </td>
                    <td className="py-2 text-right text-[9px] text-[#8F94A0]">
                      {txn.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[9px] text-[#8F94A0]">
            <span>{MOCKUP_IDENTITY.timeZoneText} · GST invoices</span>
            <span className="font-medium text-[#161616]">Settled directly to your bank account</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default PaymentsScreen;

