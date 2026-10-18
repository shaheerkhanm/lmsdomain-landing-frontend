# Open Issues & Product Disclosures

**Date:** 2026-10-18  
**Branch:** `feature/redesign-v2`  
**Compliance Context:** Specification §6.2 ("Do not ship invented testimonials")

---

## 1. Testimonial Placeholders (Wall of Love - A20/A21)

In strict adherence to specification §6.2:
- All previously generated individual names ("Elena Rostova", "Marcus Chen", "Dr. Sophia Ramirez") have been removed across `CustomerSection.tsx` and `StackedAcademyDeck.tsx`.
- All invented learner metrics (e.g. "10,000+ learners", "14,000+ learners") and absolute claims ("100% Anti-Piracy") have been eradicated.
- The misleading "VERIFIED" badge has been completely removed from all cards.
- Cards now render clean, designated partner spotlight capability statements:
  - **Card 1:** "Enterprise Academy Partner" / "Custom Domain Architecture"
  - **Card 2:** "Professional Training Partner" / "Accredited Clinical Training"
  - **Card 3:** "Your Academy Story" / "White-Label Sovereign LMS"

**Action Required Prior to Production Deployment:**
Replace placeholder cards with real, consented client quotes, verified enterprise logos, and authorized case studies once customer marketing agreements are formally executed.

---

## 2. Product Claims & Technical Capabilities Checklist

Before initiating production marketing deployment, confirm product, infrastructure, and legal sign-off on the following technical features highlighted across the landing page:

1. **Enterprise Single Sign-On (SSO):**
   - Confirm SAML 2.0 and OpenID Connect (OIDC) identity provider integrations (e.g. Okta, Azure AD, Google Workspace, Ping Identity) are operational for enterprise multi-tenant routing.
2. **4K Video Transcoding & Adaptive HLS:**
   - Confirm media processing pipeline capacity for 4K video ingestion, multi-bitrate H.264/HEVC encoding profiles, and CDN edge-caching SLA commitments.
3. **WebRTC Ultra-Low Latency Live Classrooms:**
   - Confirm SFU/MCU infrastructure, maximum concurrent video/audio participants per lecture, breakout pod scaling, and session recording pipelines.
4. **Hardware L1 DRM Video Protection:**
   - Confirm Widevine Modular L1 (Android/Chrome OS) and Apple FairPlay Streaming (macOS/iOS Safari) license key exchange (KSM) endpoints are configured in production.
5. **Single-Tenant Custom Domains & Wildcard SSL:**
   - Confirm automated DNS verification and Let's Encrypt / Cloudflare wildcard SSL certificate issuance pipelines for tenant custom domains.
6. **SCORM 2004 & LMS Interoperability:**
   - Confirm SCORM 2004 4th Edition manifest parser, CMI datamodel runtime API, and LMS tracking compatibility.
7. **Domie AI Curriculum Copilot:**
   - Confirm LLM API latency, quota allocation per tenant, and prompt privacy guarantees (zero training on customer course materials).
8. **Dynamic Forensic Watermarking:**
   - Confirm canvas-level overlay of encrypted session telemetry (Learner ID, tenant ID, timestamp, and IP hash) to prevent analog camera recording leaks.


