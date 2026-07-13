---
title: "How I Replaced 5 Daily IT Tools With One AI Dashboard — Built From Scratch"
date: "2026-07-13"
excerpt: "I was switching between SAP Outlook, ServiceNow, Gmail, OneDrive, and a terminal every single day. I missed SLA breaches. I missed ticket assignments. So I built a unified AI command-centre dashboard — and it changed everything."
tags: ["AI Automation", "Python", "FastAPI", "Microsoft Graph API", "ServiceNow", "Productivity"]
author: "Waqas Syed"
readTime: "9 min read"
featured: true
---

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
<img src="/waqas-ai-ops-lab.jpg" alt="Syed Waqas Tayyab — IT Expert & AI Engineer" style="width:100%; max-height:420px; object-fit:cover; object-position:center center; display:block;"/>
<p style="background:#0f172a; color:#475569; font-size:0.72rem; padding:6px 12px; margin:0; text-align:right;">Syed Waqas Tayyab · IT Expert & AI Engineer · HiTecH Technology HUB</p>
</div>

# How I Replaced 5 Daily IT Tools With One AI Dashboard — Built From Scratch

Every morning started the same way. Open SAP Outlook for emails. Switch to ServiceNow to check ticket assignments. Open Gmail for personal mail. Jump to OneDrive for files. Run a terminal command to check SLA status. Repeat all day.

Five tools. Constant context-switching. And the worst part? I was still missing things — a P1 ticket assigned at 2 PM, an SLA approaching breach at 4 PM, an urgent email buried in a 200-message inbox.

So I built one app that does everything. Here's how.

---

## The Problem: Too Many Tabs, Too Many Misses

As a Senior IT System Engineer managing 200+ users across three offices in Riyadh, my daily workflow depended entirely on remembering to check the right browser tab at the right moment. That's not a system — that's hope.

The specific pain points:

- **SLA breaches** were reactive. I only found out when a manager escalated. By then, the ticket had already breached P2 response time.
- **New ticket assignments** required me to keep ServiceNow open and refresh it manually. Miss a refresh, miss a critical P1.
- **Email action items** were buried. Reading 40–80 emails a day to extract 3–4 items that actually needed action was a 20-minute daily tax.
- **Tool fatigue** was real. 5 apps × context-switching overhead = lost focus every 20 minutes.

The solution wasn't to work harder. It was to build something smarter.

---

## The Solution: Waqas AI Hub

The idea was simple: one app that surfaces everything I need to know, proactively, without me asking.

**What I built:**
- A Python FastAPI backend with 15+ REST API endpoints
- A single-page web dashboard with 9 integrated services
- A native macOS `.app` built in Swift + WebKit — it launches like any desktop app
- Four background AI agents running on cron every 5 minutes
- Real-time WhatsApp alerts via Twilio

The result: one click in the morning opens everything. Alerts come to my phone before I even check the dashboard.

---

## Architecture: How It All Connects

```
┌─────────────────────────────────────────────┐
│              Waqas AI Hub (.app)             │
│         Swift + WebKit wrapper               │
├─────────────────────────────────────────────┤
│          FastAPI Backend (Python)            │
│         http://127.0.0.1:8080               │
├──────────┬──────────┬───────────┬───────────┤
│ SAP Mail │  Gmail   │ Calendar  │  OneDrive │
│ Graph API│ Gmail API│ Graph API │ Graph API │
├──────────┴──────────┴───────────┴───────────┤
│     ServiceNow REST API (session cookies)    │
├─────────────────────────────────────────────┤
│     Cron Agents → JSON → Dashboard Cards    │
├─────────────────────────────────────────────┤
│     Twilio WhatsApp → +966505803073          │
└─────────────────────────────────────────────┘
```

---

## The Technical Challenges (And How I Solved Them)

### Challenge 1: SAP Conditional Access Blocks OAuth on Non-Managed Macs

SAP's Conditional Access policy blocks the device-code OAuth flow on any Mac not enrolled in Intune. That's the standard way to authenticate Microsoft Graph API on a personal device — and it simply doesn't work.

**Solution:** Register a `localhost:8080` redirect URI in Azure AD. Use the authorization code flow instead of device code. When the user authenticates, the browser redirects back to `localhost:8080/callback`, where FastAPI catches the code and exchanges it for tokens.

This works because `localhost` is explicitly permitted as a redirect URI for public clients, even on non-managed devices.

```python
# FastAPI OAuth callback handler
@app.get("/callback")
async def oauth_callback(code: str):
    token = exchange_code_for_token(code, redirect_uri="http://localhost:8080/callback")
    save_token(token)
    return RedirectResponse("/")
```

### Challenge 2: The macOS `.app` That Wouldn't Launch

My first attempt at packaging the dashboard as a macOS app was a shell script wrapper. It opened a terminal briefly, then nothing — the app silently died.

The problem: macOS kills child processes when the parent shell script exits. The FastAPI server was the child. Shell script exits → server dies → WebView has nothing to connect to.

**Solution:** Rewrite the app in Swift using `WKWebView`. The Swift process stays alive independently, manages the Python server as a subprocess with `nohup` and `disown`, and presents the web UI in a proper native window.

```swift
// Launch Python server from Swift
let process = Process()
process.executableURL = URL(fileURLWithPath: "/usr/bin/python3")
process.arguments = [serverPath]
try process.run()
// Process continues running — not killed when Swift launches
```

### Challenge 3: ServiceNow Authentication

ServiceNow at enterprise level doesn't offer a simple API key. Session cookies from Safari DevTools are the pragmatic solution — paste them once, they last ~24 hours.

The dashboard includes a "SNOW Connect" panel where I paste fresh cookies. A Python utility stores them and injects them into every ServiceNow REST API request.

---

## The WhatsApp Alert System

This is the feature that actually changed my workday.

Every 5 minutes, a Python daemon:
1. Polls ServiceNow REST API for tickets assigned to my queue
2. Calculates time-to-SLA-breach for each ticket
3. If any ticket is within 30 minutes of breach — sends a WhatsApp message

```python
# SLA breach alert logic
for ticket in my_tickets:
    minutes_remaining = calculate_sla_remaining(ticket)
    if minutes_remaining <= 30:
        send_whatsapp(
            f"⚠️ SLA ALERT: {ticket['number']} - {ticket['short_description']}\n"
            f"Priority: {ticket['priority']} | {minutes_remaining} min remaining"
        )
```

Using Twilio's sandbox (free tier): total cost = **zero**.

---

## The Results

Before vs. after, measured over 6 months of daily use:

| Metric | Before | After |
|--------|--------|-------|
| Tool switching | 5+ apps open daily | 1 unified dashboard |
| SLA awareness | Reactive — saw it when escalated | Proactive — WhatsApp 30 min before breach |
| Email triage | ~20 min manual scan daily | AI summary at 9 AM — action items surfaced |
| Ticket assignment | Browser tab refresh | Real-time WhatsApp notification |
| SLA compliance | Good but manual | 100% — zero breaches in 6 months |
| Infrastructure cost | — | Zero — runs locally on existing hardware |

---

## What I'd Do Differently

1. **Build the Swift wrapper first, not last.** The shell script `.app` cost me two days of debugging. Start native.
2. **Design the JSON pipeline from day one.** Early versions sent email notifications from the agents. Switching to JSON output and displaying results as dashboard cards was a much better architecture — but required rewriting all 5 scripts.
3. **Auto-refresh ServiceNow cookies.** The current 24-hour manual paste is the only manual step left in the entire system. A Playwright automation that refreshes cookies on a schedule would complete the automation.

---

## The Bigger Picture

This project proved something I now believe firmly: **enterprise IT professionals can build production-grade tools for themselves, with AI assistance, in weeks — not months.**

I had no prior Swift experience. I learned the OAuth2 flow by reading Microsoft docs and asking Claude. I debugged the Twilio authentication by reading error messages carefully.

The barrier to building your own productivity tools is lower than it's ever been. The question isn't whether you can — it's whether you'll start.

---

*Waqas Syed is a Senior IT System Engineer at SAP Saudi Arabia with 15+ years of enterprise IT experience. He builds AI automation tools for daily IT operations and shares everything at HiTecH Technology HUB.*
