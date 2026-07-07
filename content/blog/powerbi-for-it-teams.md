---
title: "PowerBI for IT Teams: Build Dashboards That Actually Get Used"
date: "2026-03-05"
excerpt: "Most IT teams have data everywhere — ServiceNow, Active Directory, asset systems — but no way to see it clearly. Here's how I built PowerBI dashboards that IT leadership actually read every week, and the design principles behind them."
tags: ["PowerBI", "Data Analytics", "IT Operations", "SharePoint", "Reporting"]
author: "Syed Waqas Tayyab"
readTime: "8 min read"
featured: false
---

## The Dashboard Graveyard Problem

Every IT organisation has a dashboard graveyard. Reports that took weeks to build, that someone looked at three times, and that now sit forgotten in a SharePoint folder.

I built my first IT dashboard in 2018. By 2020, it was in the graveyard. I rebuilt it in 2022 with a different approach — this time anchored in the questions IT leadership actually asked, not the metrics I thought they should care about.

The second dashboard gets reviewed every Monday.

## Start With the Question, Not the Data

The most common dashboard mistake: building from available data outward. You have SNOW data, you have asset data, you have AD data — so you build charts from all of it.

**The right approach:** Start by asking every person who will use the dashboard: *"What questions do you need answered each week to do your job?"*

At SAP Saudi Arabia, the answers were:
1. Country MD: "Are we meeting our SLAs? Any big issues this week?"
2. IT Manager: "Where are tickets backing up? Which engineer is overloaded?"
3. CFO (quarterly): "What are we spending on IT? What's the asset refresh bill?"
4. IT Team: "What's open and due today?"

Four users, four different dashboards — or four pages in one dashboard with the right navigation.

## The IT Operations Dashboard Architecture

<div style="margin: 2rem 0; background: #0f172a; border: 1px solid rgba(245,158,11,0.2); border-radius: 12px; padding: 1.5rem;">
<p style="color:#94a3b8; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">📊 IT Dashboard Page Structure (SAP Saudi Arabia)</p>
<div style="display:flex; flex-direction:column; gap:0.5rem;">
<div style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25); border-radius:8px; padding:12px 16px;">
  <p style="color:#fbbf24; font-weight:700; font-size:0.85rem; margin:0;">Page 1: Executive Summary — SLA %, open tickets, critical issues</p>
  <p style="color:#475569; font-size:0.77rem; margin:2px 0 0;">Audience: Country MD, SVP. Updated: daily. KPIs only, no details.</p>
</div>
<div style="background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.25); border-radius:8px; padding:12px 16px;">
  <p style="color:#60a5fa; font-weight:700; font-size:0.85rem; margin:0;">Page 2: Ticket Operations — volume, by category, by engineer, aging</p>
  <p style="color:#475569; font-size:0.77rem; margin:2px 0 0;">Audience: IT Manager. Updated: daily. Drill-down to individual tickets.</p>
</div>
<div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:12px 16px;">
  <p style="color:#34d399; font-weight:700; font-size:0.85rem; margin:0;">Page 3: Asset Health — stock levels, warranty expiry, refresh planning</p>
  <p style="color:#475569; font-size:0.77rem; margin:2px 0 0;">Audience: IT Admin. Updated: weekly. Colour-coded by status.</p>
</div>
<div style="background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.25); border-radius:8px; padding:12px 16px;">
  <p style="color:#a78bfa; font-weight:700; font-size:0.85rem; margin:0;">Page 4: Procurement Spend — monthly, vendor breakdown, YTD</p>
  <p style="color:#475569; font-size:0.77rem; margin:2px 0 0;">Audience: CFO (quarterly review). Updated: monthly.</p>
</div>
<div style="background:rgba(6,182,212,0.12); border:1px solid rgba(6,182,212,0.25); border-radius:8px; padding:12px 16px;">
  <p style="color:#22d3ee; font-weight:700; font-size:0.85rem; margin:0;">Page 5: Onboarding KPIs — new hires, IT readiness on Day 1, offboarding</p>
  <p style="color:#475569; font-size:0.77rem; margin:2px 0 0;">Audience: HR + IT Manager. Updated: per event.</p>
</div>
</div>
</div>

## Connecting PowerBI to Real IT Data Sources

### ServiceNow → PowerBI

ServiceNow has a REST API that PowerBI can connect to directly:

```
Source: REST API
URL: https://yourinstance.service-now.com/api/now/table/incident
Authentication: Basic (service account)
Parameters: ?sysparm_query=assigned_to=<your_group>&sysparm_fields=number,state,priority,opened_at,resolved_at
```

Set refresh to every hour for operational dashboards. Daily for trend reports.

### SharePoint Lists → PowerBI

For IT asset data maintained in SharePoint:
1. Get Data → SharePoint Online List
2. Authenticate with M365 credentials
3. Transform: filter out system columns, parse dates, create calculated columns

SharePoint lists are ideal for small-to-medium asset registers (< 50,000 rows) — the query performance is excellent.

### SAP Work Zone → PowerBI

For SAP environments, SAP Work Zone can push metrics to SharePoint or expose OData APIs. Connect PowerBI via:
- OData endpoint if available (preferred)
- SharePoint export if OData isn't configured
- CSV export as last resort (loses real-time capability)

## The 5 Charts Every IT Operations Dashboard Needs

### 1. SLA Compliance Rate (Line Chart, Rolling 30 Days)

Shows trend, not just current state. Everyone can see if it's improving or degrading.

### 2. Ticket Volume by Category (Stacked Bar, Monthly)

Reveals patterns — seasonal spikes, category growth, the impact of KB articles on volume.

### 3. Mean Time to Resolution by Priority (Card + Gauge)

The CEO's first question: "How fast do we fix things?" This answers it clearly.

### 4. Asset Warranty Expiry Timeline (Timeline/Calendar)

Shows the next 12 months of warranty expirations. Prevents budget surprises. Colour-code: green (>12 months), amber (6–12 months), red (<6 months).

### 5. Open Tickets Aging (Heat Map or Matrix)

Which tickets are oldest? By engineer? By category? This one prevents SLA breaches by making aged tickets visible before they breach.

## Design Principles That Make Dashboards Readable

| Principle | Wrong | Right |
|-----------|-------|-------|
| Colour | Every chart has 8 colours | 3 consistent colours (green/amber/red) |
| Numbers | Showing 6 decimal places | Rounded, prefixed: 94%, 4.2 hrs |
| Charts | 12 charts on one page | 4–5 charts maximum per page |
| Labels | Showing all data labels | Only outliers and totals labelled |
| Titles | "Chart 1" | "SLA Compliance Rate — Last 30 Days" |

**The rule I live by:** If the chart needs a legend to understand it, simplify the chart.

## Getting Buy-In: How to Make People Actually Use Your Dashboard

The best dashboard in the world fails if people don't open it. Adoption tactics that worked for me:

1. **Include it in Monday's IT meeting** — pull it up on screen, walk through it. Creates the habit.
2. **Email the executive summary page every Monday morning** — one screenshot, three bullet points, no login required.
3. **Ask for feedback in week 2** — "Is there anything you're not finding on here?" People will tell you exactly what they need.
4. **Name it after the audience** — "IT Operations Dashboard - KSA" is for IT. "IT Service Report - MD View" is for leadership. Different names signal different purposes.

The goal is to become *the source of truth* for IT metrics. Once your dashboard is the thing people reference in meetings, it will always be maintained because there's a clear cost to letting it go stale.
