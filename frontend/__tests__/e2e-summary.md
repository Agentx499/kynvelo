# Kynvelo End-to-End Test Suite Execution Report

**Date:** 2026-09-03  
**Testing Tool:** Playwright MCP (`@playwright/mcp`)  
**Target Environment:** `http://localhost:3000` (Next.js 15 Turbopack Production Build)  
**Status:** ALL TESTS PASSED (6 of 6 Verified)  

---

## 1. Test Suite Results Breakdown

| Test ID | Test Scenario | Steps Executed | Expected Outcome | Actual Result | Status |
|---|---|---|---|---|---|
| **E2E-01** | Dual-Audience Mode-Switcher | 1. Navigate to `/`<br>2. Click `For Gym Owners & Clubs` | Headline morphs to "Stop Member Drop-Out"<br>3D flight-deck updates to reception kiosk | Passed (Verified via Playwright screenshot & snapshot) | **PASS** |
| **E2E-02** | Member Daily Pulse & QR | 1. Navigate to `/app/pulse`<br>2. Inspect QR code token | 15s rotating HMAC code regenerates<br>Streak (5 days) and water buttons work | Passed (Timer auto-rotates, water increases) | **PASS** |
| **E2E-03** | Barbell Plate Calculator | 1. Navigate to `/app/workout/active`<br>2. Click `Plate Math` modal | Olympic barbell sleeve calculates exact plates (25kg, 5kg, 1.25kg) for 82.5kg target | Passed (Visual plates rendered and closed) | **PASS** |
| **E2E-04** | Haptic Rest Timer Drawer | 1. In active workout, check Set 3 | Set checks with green mark<br>Bottom drawer opens counting down from 01:30 | Passed (Rest countdown timer active at 01:28) | **PASS** |
| **E2E-05** | Reception Turnstile Kiosk | 1. Navigate to `/admin/terminal`<br>2. Click `Simulate Turnstile QR Scan` | Real-time entry log prepends new member entry with "Access Granted" | Passed (Entry stream appended live in real time) | **PASS** |
| **E2E-06** | No-Show Red-List CRM | 1. Navigate to `/admin/red-list`<br>2. Filter by risk<br>3. Open `Log Outcome` | Filter toggles 10-14, 15-21, 22+ days<br>Modal logs outcome and saves to table | Passed (Outcome logged for Vikram Singh) | **PASS** |

---

## 2. Playwright Verification Artifacts

- **Homepage Screenshot:** `.playwright-mcp/page-2026-09-03T08-44-45-175Z.png`
- **Gym Owner Mode Screenshot:** `.playwright-mcp/page-2026-09-03T08-45-11-740Z.png`
- **Daily Pulse PWA Screenshot:** `.playwright-mcp/page-2026-09-03T08-45-21-863Z.png`
- **Barbell Plate Math Modal Screenshot:** `.playwright-mcp/page-2026-09-03T08-45-37-802Z.png`
- **Rest Timer Active Screenshot:** `.playwright-mcp/page-2026-09-03T08-45-52-629Z.png`
- **Reception Terminal Stream Screenshot:** `.playwright-mcp/page-2026-09-03T08-46-13-285Z.png`
- **Red-List Follow-Up Modal Screenshot:** `.playwright-mcp/page-2026-09-03T08-46-40-032Z.png`
