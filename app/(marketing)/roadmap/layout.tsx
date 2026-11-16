import type { ReactNode } from "react";
import { guardPage } from "@/lib/pages";

// Hidden in Admin > Pages: redirect home or 404 (see lib/pages.ts).
export default async function Layout({ children }: { children: ReactNode }) {
  await guardPage("roadmap");
  return children;
}
