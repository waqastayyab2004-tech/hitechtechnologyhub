---
title: "Real-Time WhatsApp Alerts for ServiceNow Tickets: A Python + Twilio Implementation"
date: "2026-07-13"
excerpt: "I was missing critical P1 ticket assignments because I wasn't watching the right browser tab. So I automated it — a Python daemon that polls ServiceNow every 5 minutes and fires a WhatsApp message before any SLA breach. Here's the full implementation."
tags: ["Python", "ServiceNow", "Twilio", "WhatsApp", "Automation", "SLA Management"]
author: "Waqas Syed"
readTime: "7 min read"
featured: false
---

<div style="margin: 1.5rem 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
<img src="/waqas-ai-never-stops.jpg" alt="Syed Waqas Tayyab — IT Expert & AI Engineer" style="width:100%; height:320px; object-fit:cover; object-position:center top; display:block;"/>
<p style="background:#0f172a; color:#475569; font-size:0.72rem; padding:6px 12px; margin:0; text-align:right;">Syed Waqas Tayyab · IT Expert & AI Engineer · HiTecH Technology HUB</p>
</div>

# Real-Time WhatsApp Alerts for ServiceNow Tickets: A Python + Twilio Implementation

SLA breaches don't announce themselves. They happen quietly, in the background, while you're in a meeting or focused on something else. By the time you see the red indicator in ServiceNow, the breach has already happened.

I got tired of being reactive. So I built a system that tells me about a breach before it happens — on WhatsApp.

---

## The Problem With Browser-Based Monitoring

Managing 50–60 ServiceNow tickets per month across three offices means the ticket queue is always moving. New assignments arrive without warning. Priority changes happen. SLA clocks tick whether you're watching or not.

The typical IT approach is to keep ServiceNow open in a tab and refresh periodically. This has two failure modes:

1. **You forget to check.** It happens — especially in a busy day with meetings, onboarding tasks, and hardware issues competing for attention.
2. **You check too late.** A ticket assigned at 11:47 AM with a 2-hour P2 response SLA needs action by 1:47 PM. If you next check at 2:00 PM, you've already breached.

The solution: remove the human dependency entirely. Make the system alert you.

---

## Architecture: The SNOW Alert Pipeline

```
┌─────────────────────────────────────────────────┐
│           Cron (every 5 minutes)                 │
│           snow_whatsapp_monitor.py              │
├─────────────────────────────────────────────────┤
│  1. Poll ServiceNow REST API                    │
│     GET /api/now/table/incident                 │
│     ?assigned_to=<sys_id>&state=1,2             │
│                                                  │
│  2. For each ticket:                             │
│     - Get assigned time                          │
│     - Get SLA target (by priority)               │
│     - Calculate minutes remaining                │
│                                                  │
│  3. If minutes_remaining <= 30:                  │
│     - Format alert message                       │
│     - POST to Twilio WhatsApp API               │
│                                                  │
│  4. Output JSON for dashboard                    │
└─────────────────────────────────────────────────┘
```

---

## Step 1: ServiceNow REST API Authentication

ServiceNow at enterprise level presents an authentication challenge. The standard API key approach isn't available in all configurations. The pragmatic solution: session cookies from an authenticated browser session.

```python
import requests

class SNOWClient:
    def __init__(self, base_url: str, cookies: dict):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.cookies.update(cookies)
    
    def get_my_incidents(self, sys_id: str) -> list:
        url = f"{self.base_url}/api/now/table/incident"
        params = {
            "assigned_to": sys_id,
            "state": "1,2",           # Open and In Progress
            "sysparm_fields": "number,short_description,priority,sys_created_on,due_date",
            "sysparm_limit": 50,
        }
        response = self.session.get(url, params=params)
        response.raise_for_status()
        return response.json().get("result", [])
```

Cookies are obtained from Safari DevTools (Application → Cookies → your SNOW domain) and stored in a local JSON file. They typically last 24 hours.

---

## Step 2: SLA Calculation

ServiceNow tickets have a `due_date` field when SLA rules are active. If not, you calculate it from creation time and the priority matrix.

```python
from datetime import datetime, timezone

SLA_MINUTES = {
    "1": 15,   # P1 Critical — 15 min response
    "2": 30,   # P2 High — 30 min response
    "3": 120,  # P3 Medium — 2 hour response
    "4": 480,  # P4 Low — 8 hour response
}

def calculate_minutes_remaining(ticket: dict) -> int:
    priority = ticket.get("priority", "4")
    
    # Use due_date if set by ServiceNow SLA engine
    if ticket.get("due_date"):
        due = datetime.fromisoformat(ticket["due_date"].replace("Z", "+00:00"))
        remaining = (due - datetime.now(timezone.utc)).total_seconds() / 60
        return int(remaining)
    
    # Fall back to manual calculation
    created_str = ticket["sys_created_on"]
    created = datetime.strptime(created_str, "%Y-%m-%d %H:%M:%S")
    created = created.replace(tzinfo=timezone.utc)
    
    sla_limit = SLA_MINUTES.get(priority, 480)
    deadline = created.timestamp() + (sla_limit * 60)
    remaining = (deadline - datetime.now(timezone.utc).timestamp()) / 60
    return int(remaining)
```

---

## Step 3: Twilio WhatsApp Integration

This is where I hit the most debugging pain — worth documenting in detail.

### The Setup

Twilio's WhatsApp sandbox requires a one-time opt-in from the recipient. Send `join [your-word]` from WhatsApp to `+14155238886`. After that, messages arrive instantly.

```python
from twilio.rest import Client

def send_whatsapp_alert(message: str, to_number: str):
    client = Client(
        TWILIO_API_KEY_SID,      # SK... not AC...
        TWILIO_API_KEY_SECRET,
        account_sid=TWILIO_ACCOUNT_SID  # AC...
    )
    
    client.messages.create(
        from_="whatsapp:+14155238886",
        to=f"whatsapp:{to_number}",
        body=message
    )
```

### The Debugging Traps

**Error 63015 — Message not delivered:**
The recipient hadn't sent the join code to opt in to the sandbox. Every Twilio sandbox number requires this before first use. Solution: send `join [word]` from your WhatsApp to the Twilio sandbox number.

**Error 401 — Authentication failed:**
Twilio has two types of credentials: Account SID (`AC...`) and API Key SID (`SK...`). They're used differently. With an API Key, the Key SID goes in the username field and the Key Secret in the password field — but the Account SID must still be passed separately as a parameter. Missing any one of these gives a cryptic 401.

**Error 21211 — Invalid phone number:**
The `to` parameter must include the `whatsapp:` prefix. `+966505803073` fails. `whatsapp:+966505803073` works.

---

## Step 4: The Alert Message Format

The message needs to communicate urgency without noise. After a few iterations, this format works:

```python
def format_alert(ticket: dict, minutes_remaining: int) -> str:
    priority_labels = {"1": "🔴 P1 CRITICAL", "2": "🟠 P2 HIGH", "3": "🟡 P3 MEDIUM"}
    priority = ticket.get("priority", "4")
    label = priority_labels.get(priority, "🔵 P4 LOW")
    
    if minutes_remaining <= 0:
        urgency = "⚠️ SLA BREACHED"
    elif minutes_remaining <= 15:
        urgency = f"🚨 {minutes_remaining} MIN TO BREACH"
    else:
        urgency = f"⏰ {minutes_remaining} min remaining"
    
    return (
        f"{label} — {urgency}\n"
        f"Ticket: {ticket['number']}\n"
        f"{ticket['short_description'][:100]}\n"
        f"Action required immediately"
    )
```

---

## Deploying as a Background Daemon

The script runs continuously with a 5-minute sleep loop:

```python
import time
import sys

def main():
    if "--daemon" in sys.argv:
        print(f"[{datetime.now()}] SNOW monitor started")
        while True:
            try:
                check_and_alert()
            except Exception as e:
                print(f"[{datetime.now()}] Error: {e}")
            time.sleep(300)  # 5 minutes
    else:
        # Single run — used by cron for scheduled checks
        check_and_alert()

if __name__ == "__main__":
    main()
```

For production, a macOS LaunchAgent handles auto-restart on login and crash recovery — more reliable than a raw while loop.

---

## Results

Six consecutive months. Zero SLA breaches.

Not because the workload dropped — ticket volumes stayed consistent at 50–60/month. Because every at-risk ticket sent a WhatsApp alert with enough time to act.

The total infrastructure cost for this system: **zero**. Twilio sandbox is free. Python runs on the existing Mac. No cloud, no subscriptions, no vendor dependency.

---

## What to Build Next

The current system alerts on individual ticket SLA. The natural evolution is **SLA trend prediction** — using historical ticket data to predict which categories of issues are most likely to breach in a given week, so capacity can be pre-adjusted rather than reactively managed.

That's the ML engineering project this work is pointing toward.

---

*Waqas Syed is a Senior IT System Engineer at SAP Saudi Arabia. This alert system is part of a larger set of AI automation tools built for daily IT operations management.*
