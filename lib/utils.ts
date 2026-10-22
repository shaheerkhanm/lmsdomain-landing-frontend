import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPlaceholderPhone(phone?: string | null): boolean {
  if (!phone) return true;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return true;
  if (digits === "1234567890" || digits === "123456789" || digits === "0123456789") return true;
  if ("0123456789012345".includes(digits) || "9876543210987654".includes(digits)) return true;
  if (/^(\d)\1+$/.test(digits)) return true;
  return false;
}
