"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm, { DEMO_DIALOG_CLASS } from "@/components/layout/common/EnquiryForm";

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
      <DialogContent className={DEMO_DIALOG_CLASS}>
        <EnquiryForm onClose={handleClose} initialSubject="Demo request from site link" />
      </DialogContent>
    </Dialog>
  );
}

export default DemoHashListener;
