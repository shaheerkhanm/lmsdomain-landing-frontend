"use client";

// Google reCAPTCHA v2 checkbox, rendered explicitly (central admin login and
// forgot password). The token is read from the widget at submit time and never
// kept anywhere else.

import { useCallback, useEffect, useRef, useState } from "react";

const RECAPTCHA_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";
const READY_TIMEOUT_MS = 15_000;

interface Grecaptcha {
  ready(callback: () => void): void;
  render(container: HTMLElement, params: { sitekey: string }): number;
  reset(widgetId?: number): void;
  getResponse(widgetId?: number): string;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export type RecaptchaState = "loading" | "ready" | "error";

/**
 * Render <Script {...scriptProps} /> and <div ref={containerRef} />.
 * onFailure runs when the script fails to load or isn't ready in 15 seconds.
 */
export function useRecaptcha(siteKey: string, onFailure: () => void) {
  const [state, setState] = useState<RecaptchaState>("loading");
  const widgetId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  const failed = useCallback(() => {
    setState("error");
    onFailureRef.current();
  }, []);

  const onScript = useCallback(() => {
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha?.ready) return failed();
    grecaptcha.ready(() => {
      if (widgetId.current !== null || !containerRef.current) {
        setState("ready");
        return;
      }
      try {
        widgetId.current = grecaptcha.render(containerRef.current, { sitekey: siteKey });
        setState("ready");
      } catch {
        failed();
      }
    });
  }, [siteKey, failed]);

  useEffect(() => {
    if (state !== "loading") return;
    const timer = setTimeout(failed, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [state, failed]);

  const reset = useCallback(() => {
    if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
  }, []);

  /** The current token, or "" when the box isn't ticked (or the widget isn't ready). */
  const getToken = useCallback((): string => {
    if (widgetId.current === null) return "";
    return window.grecaptcha?.getResponse(widgetId.current) ?? "";
  }, []);

  const scriptProps = {
    src: RECAPTCHA_SRC,
    strategy: "afterInteractive" as const,
    onReady: onScript,
    onError: failed,
  };

  return { state, containerRef, reset, getToken, scriptProps };
}
