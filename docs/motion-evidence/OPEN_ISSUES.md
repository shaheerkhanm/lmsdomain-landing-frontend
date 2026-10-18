# Open Issues & Product Disclosures

**Date:** 2026-10-18  
**Branch:** `feature/redesign-v2`  
**Compliance Context:** Specification §6.2 ("Do not ship invented testimonials")

---

## 1. Testimonial Placeholders (Wall of Love - A20/A21)

Per specification §6.2, previously generated names ("Elena Rostova", "Marcus Chen", "Dr. Sophia Ramirez") with specific unsanctioned learner counts have been replaced with clearly marked placeholders:
- **Card 1:** "Enterprise Academy Partner" / "Global Technical Certification Program"
- **Card 2:** "Medical Training Institute" / "Clinical Board Prep Cohort"
- **Card 3:** "Your Academy Story Here" / "Modern Multi-Tenant Learning Platform"

**Action Required Prior to Production Deployment:**
Replace placeholder cards with real, consented quotes, verified academy names, and approved logos/avatars once customer agreements are executed.

---

## 2. Product Claims to Verify Before Production Launch

The marketing website showcases several deep technical capabilities. Ensure product and legal sign-off on:
1. **Hardware L1 DRM Video Protection:** Confirm Widevine L1 and Apple FairPlay license key exchange endpoints are live in staging/production.
2. **Single-Tenant Custom Domains:** Confirm wildcard SSL provisioning via Let's Encrypt / Cloudflare for tenant subdomains is automated.
3. **SCORM 2004:** Confirm SCORM 2004 4th Edition manifest parser and CMI runtime datamodel support in the core player engine.
4. **Domie AI Copilot:** Confirm model integration, rate limits, and latency benchmarks for multi-week curriculum and syllabus generation.

