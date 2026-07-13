---
title: "Zero Trust in Practice: How We Took Microsoft Secure Score from 41% to 78%"
date: "2026-07-13"
excerpt: "Zero Trust isn't a product you buy — it's a series of decisions you implement. Here's the exact playbook we used to raise Microsoft Secure Score from 41% to 78% in 12 months, with every Conditional Access policy, MFA configuration, and endpoint compliance step explained."
tags: ["Cybersecurity", "Zero Trust", "Azure Security", "Microsoft 365", "Conditional Access", "MFA"]
author: "Waqas Syed"
readTime: "10 min read"
featured: false
---

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
<img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop" alt="Zero Trust cybersecurity enterprise" style="width:100%; height:280px; object-fit:cover; display:block;"/>
<p style="background:#0f172a; color:#475569; font-size:0.72rem; padding:6px 12px; margin:0; text-align:right;">Photo: Unsplash</p>
</div>

# Zero Trust in Practice: How We Took Microsoft Secure Score from 41% to 78%

When I started this project, our Microsoft Secure Score was 41%. Not catastrophically bad, but well below where a multinational enterprise with sensitive data and executive users should be.

Twelve months later: 78%. Zero security incidents attributed to identity compromise. No legacy authentication attacks succeeding. All admin access governed through PIM with full audit trails.

Here's exactly what we did — and the order we did it in.

---

## What Is Microsoft Secure Score?

Secure Score is Microsoft's measurement of your security posture across Microsoft 365 and Azure AD. It scores you on hundreds of control points and gives you a prioritised list of improvements with estimated score impact.

Think of it less as a report card and more as a backlog. Every item is something you can actually fix.

Starting at 41% means roughly half of the recommended controls weren't in place. Some were complex, some were a single toggle. We started with the toggles.

---

## Phase 1: The Quick Wins (Weeks 1–4)

These are changes that take under 30 minutes to implement and give significant Secure Score points. Start here.

### 1. Block Legacy Authentication

Legacy authentication protocols (Basic Auth, SMTP AUTH, POP3, IMAP without modern auth) bypass MFA entirely. According to Microsoft, over 99% of password spray attacks use legacy authentication.

**Action:** Create a Conditional Access policy that blocks all legacy authentication across all users and all cloud apps.

```
Policy: Block Legacy Authentication
- Assignments: All users
- Cloud apps: All cloud apps
- Conditions: Client apps → Legacy authentication clients (check all)
- Grant: Block access
```

**Caveat:** Run in report-only mode for 2 weeks first. Find any printers, scanners, or old applications using SMTP AUTH. Migrate them before enforcing.

**Score impact:** +8 to +12 points depending on tenant size.

### 2. Require MFA for All Users

The single highest-ROI security control in Microsoft 365.

```
Policy: Require MFA — All Users
- Assignments: All users (exclude break-glass accounts)
- Cloud apps: All cloud apps
- Grant: Require multi-factor authentication
```

Add a named location for your office network IP ranges and exclude it from the MFA requirement for users already on a trusted corporate network. This reduces friction without reducing security for external access.

**Score impact:** +10 to +15 points.

### 3. Enable Self-Service Password Reset (SSPR)

Reduce helpdesk load and eliminate a social engineering attack vector (calling IT to reset passwords).

Require at least 2 authentication methods for SSPR registration. Enable the combined MFA + SSPR registration experience so users complete both in one session.

---

## Phase 2: Device Compliance (Weeks 4–8)

### 4. Require Compliant Device for Corporate Resource Access

Once MFA is in place, add device compliance as a second condition.

```
Policy: Require Compliant Device
- Assignments: All users
- Cloud apps: All cloud apps
- Conditions: Device platforms → Windows, macOS, iOS, Android
- Grant: Require device to be marked as compliant
  (require one of the selected controls)
```

A non-compliant device triggers a Conditional Access failure — the user sees a page telling them to enrol in Intune or fix their compliance issues.

This is where Intune compliance policies matter. Define what "compliant" means:
- Windows 11 with BitLocker enabled
- Microsoft Defender running with current signatures
- No jailbreak or root detection (iOS/Android)
- Minimum OS version enforced

**The result:** A compromised credential is worthless without a compliant device. Credential theft attacks stop at the Conditional Access gate.

### 5. BitLocker Enforcement

BitLocker (XTS-AES 256-bit) on all Windows endpoints with recovery keys escrowed to Azure AD.

```powershell
# Intune compliance policy — require BitLocker
Set-MgDeviceManagementDeviceCompliancePolicy -BitLockerEnabled $true
```

Recovery keys in Azure AD Admin Center → Devices → [device] → Recovery Keys. Never stored locally, never emailed.

**Rollout approach:** 3-month phased enforcement. Start with report-only compliance status, no blocking. This surfaces non-compliant devices without disrupting anyone. Move to enforcement after the 3-month window closes.

---

## Phase 3: Privileged Access (Weeks 8–12)

### 6. Eliminate Permanent Global Admin Accounts

Permanent Global Admin access is a standing invitation for privilege abuse. Every privileged action should be time-bounded and approved.

**Implement Privileged Identity Management (PIM):**

1. Identify all permanent Global Admin, Exchange Admin, and Intune Admin role assignments
2. Convert them to eligible assignments in PIM
3. Set activation requirements: MFA + justification + maximum 4-hour duration
4. Configure approval for Global Admin (IT Manager approval required)
5. Enable alerts for admin role assignments outside PIM

```
PIM Configuration:
- Global Admin: Eligible, requires approval, max 4 hours, MFA required
- Exchange Admin: Eligible, no approval, max 8 hours, MFA required
- Intune Admin: Eligible, no approval, max 8 hours, MFA required
```

**Score impact:** +15 to +20 points. One of the highest-impact individual controls.

The audit trail alone is worth it — every privileged action is logged with who requested it, who approved it, and when it expired.

---

## Phase 4: Endpoint Security (Weeks 12–24)

### 7. Microsoft Defender for Endpoint

Enable EDR (Endpoint Detection and Response) across all managed devices. In Microsoft 365, Defender for Endpoint integrates directly with Intune for device risk scoring.

Configure a Conditional Access policy that blocks sign-in from devices with high Defender risk scores:

```
Policy: Block High-Risk Devices
- Conditions: Device filters → DeviceRiskScore = High
- Grant: Block access
```

This creates a feedback loop: Defender detects a threat on a device → device gets a high risk score → Conditional Access blocks all corporate resource access → forces IT investigation before access is restored.

### 8. CyberArk EPAM: Remove Local Admin Without Removing Productivity

Removing local admin from all endpoint users is the right security decision. It's also the decision most likely to generate helpdesk tickets.

CyberArk Endpoint Privilege Manager solves this gracefully. Instead of removing admin entirely, users get a "Privileges" app. When they need to install something, they request elevation through the app. The request is logged, time-limited (15 minutes), and auditable.

Users accept this because the friction is low — one click, a 15-minute window. IT accepts it because every elevation is logged with a business justification.

---

## The DLP Layer

Data Loss Prevention policies are Secure Score's most underrated improvement category.

Start with three policies:

1. **Credit card and financial data** — block external email containing card numbers
2. **Sensitive keyword policy** — flag emails containing terms like "confidential," "board," "salary" going to external recipients
3. **SharePoint external sharing** — block sharing with anyone outside approved domains

The first few weeks will surface false positives. Tune the policies with exceptions before moving to enforcement mode.

---

## Results After 12 Months

| Metric | Start | End |
|--------|-------|-----|
| Microsoft Secure Score | 41% | 78% |
| Legacy auth attacks blocked | Baseline | Eliminated |
| Permanent admin accounts | Multiple | Zero |
| MFA coverage | Partial | 100% |
| Encrypted endpoints | ~60% | 100% |
| Security incidents (identity) | — | Zero |

The improvement from 41% to 78% didn't require a security vendor, a consultant, or any additional budget. It required time, a clear prioritisation framework, and willingness to enforce controls gradually rather than all at once.

---

## The Most Important Lesson

**Deploy in report-only mode first. Always.**

Conditional Access report-only mode lets you see exactly what a policy would block before it blocks anything. We saved at least three major incidents by discovering in report-only that a policy would have blocked our own IT service account or a critical printer relay.

One week in report-only mode for every blocking policy. Non-negotiable.

---

*Waqas Syed is a Microsoft Azure Security Engineer certified IT professional with 15+ years at SAP Saudi Arabia. He has implemented Zero Trust architecture for 200+ users across three offices in MENA.*
