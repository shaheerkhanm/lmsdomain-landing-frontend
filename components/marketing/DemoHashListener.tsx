"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

const DEMO_HASHES = ["#demo", "#cta-enquiry"];

export function DemoHashListener() {
  const [isOpen, setIsOpen] = useState(false);

  const checkHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash?.toLowerCase();
    if (DEMO_HASHES.includes(hash)) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, [checkHash]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const hash = window.location.hash?.toLowerCase();
      if (DEMO_HASHES.includes(hash)) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
        else setIsOpen(true);
      }}
    >
      <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
        <EnquiryForm onClose={handleClose} initialSubject="Demo request from site link" />
      </DialogContent>
    </Dialog>
  );
}

export default DemoHashListener;
