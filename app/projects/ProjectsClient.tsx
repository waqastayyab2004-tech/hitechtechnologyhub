'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { CheckCircle, X, ExternalLink, Github, ArrowRight, Target, Users, Clock, TrendingUp, FileText, Search } from 'lucide-react'

/* ── TYPES ─────────────────────────────────────────────────────── */
interface Project {
  emoji: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  tags: string[]
  status: 'Live' | 'In Development' | 'Completed'
  category: string
  group: string
  github?: string
  demo?: string
  pmDetails: {
    scope: string
    objectives: string[]
    stakeholders: string
    timeline: string
    outcomes: string[]
    skillsApplied: string[]
    toolsUsed: string[]
    learnings: string[]
  }
}

/* ── DATA ─────────────────────────────────────────────────────── */
const projects: Project[] = [

  // ── GROUP 0: Daily IT Operations ───────────────────────────────
  {
    emoji: '📦', group: 'Daily IT Operations',
    title: 'IT Asset Lifecycle Management', subtitle: 'Hardware Tracking · Procurement · Compliance · 1,500–2,000+ Assets',
    status: 'Live', category: 'Asset Management · ITSM',
    description: 'Full lifecycle management of enterprise IT hardware — procurement, assignment, tracking, return, and disposal. Maintains 100% asset accuracy for compliance audits and management reporting across a large multi-office environment.',
    highlights: ['End-to-end hardware lifecycle: procurement request → delivery → assignment → return → disposal', 'Asset records maintained in enterprise ERP — zero duplicate serial numbers', 'Device inactivity monitoring — flags assets inactive 6+ months for review', 'Lost/stolen device workflow: security escalation triggered within 1 hour', 'Offboarding device return: tracked, inspected, re-imaged, and redeployed', 'MDM compliance dashboards: amber/red status flags actioned daily'],
    tags: ['Asset Management', 'MDM Compliance', 'Enterprise ERP', 'Hardware Lifecycle', 'Procurement', 'Audit Trail'],
    pmDetails: { scope: 'Manage complete hardware asset lifecycle for a large enterprise — from procurement through assignment, health monitoring, return, and decommission.', objectives: ['Maintain 100% accuracy of asset records at all times', 'Ensure all returned devices are inspected and redeployed within SLA', 'Flag inactive assets for cost recovery', 'Support compliance audits with full audit trail'], stakeholders: 'IT Manager, Finance (procurement), HR (onboarding/offboarding), end users, C-level (asset cost visibility)', timeline: 'Ongoing daily operations', outcomes: ['1,500–2,000+ assets tracked with 100% accuracy', 'Zero duplicate serial numbers since process standardisation', 'Offboarding device recovery rate: 95%+', 'Compliance audits passed with full documentation'], skillsApplied: ['Asset Lifecycle Management', 'Inventory Control', 'MDM Administration', 'Compliance Reporting', 'Vendor Coordination'], toolsUsed: ['Enterprise Asset Management ERP', 'Microsoft Intune', 'Jamf MDM', 'ITSM Ticketing System', 'Power BI', 'Microsoft Excel'], learnings: ['Asset accuracy degrades rapidly without daily MDM compliance checks', 'Inactivity monitoring prevents thousands of dollars of idle hardware from being forgotten', 'Digital audit trails are the difference between passing and failing a compliance audit'] },
  },
  {
    emoji: '📧', group: 'Daily IT Operations',
    title: 'Email Platform & Identity Administration', subtitle: 'Exchange Online · Mailbox Admin · MFA · Password Governance',
    status: 'Live', category: 'M365 Administration · Identity',
    description: 'Daily administration of enterprise email platform and identity services — mailbox management, security policy enforcement, MFA configuration, password governance, and shared mailbox lifecycle across a 200+ user environment.',
    highlights: ['Mailbox quota management: 100 GB per user, 50 GB shared, 1 TB auto-expanding archive', 'Shared mailbox lifecycle: create, grant access, add aliases, set cost allocation, retire', 'Mass mailing permissions: temporary (28-day) and permanent — risk-assessed before approval', 'MFA enforcement: authenticator app, SMS, RSA SecurID — zero exceptions for privileged accounts', 'Password governance: 2-year expiry, 15-char minimum (20 for admins) — enforced via policy', 'Phishing triage: user-reported emails reviewed, malicious senders blocked within 1 hour'],
    tags: ['Exchange Online', 'Microsoft 365', 'MFA', 'Azure AD', 'Email Security', 'Identity Management'],
    pmDetails: { scope: 'Administer enterprise email and identity services for 200+ users — covering mailbox management, security policy enforcement, and MFA governance.', objectives: ['Maintain zero email delivery failures due to quota issues', 'Enforce MFA for all user accounts with zero exceptions', 'Process mailbox requests within agreed SLA', 'Respond to phishing reports within 1 hour'], stakeholders: 'All 200+ employees, IT Manager, Finance (shared mailbox cost allocation), Security team', timeline: 'Ongoing daily operations', outcomes: ['Zero email delivery failures due to mailbox mismanagement', '100% MFA coverage across all user accounts', 'Phishing response time: under 1 hour consistently', 'Shared mailbox lifecycle fully documented and auditable'], skillsApplied: ['Exchange Online Administration', 'Identity & Access Management', 'Email Security', 'MFA Configuration', 'Password Policy Enforcement'], toolsUsed: ['Microsoft Exchange Online', 'Azure AD / Entra ID', 'Microsoft 365 Admin Centre', 'RSA SecurID', 'Microsoft Authenticator', 'Outlook (Win/Mac/Web)'], learnings: ['Proactive quota alerts at 80% prevent user-reported delivery failures entirely', 'MFA with named locations strikes the right balance — secure without frustrating VPN users', 'A shared mailbox review every 6 months prevents ghost accounts accumulating licence costs'] },
  },
  {
    emoji: '🛡️', group: 'Daily IT Operations',
    title: 'Endpoint Security & Compliance Monitoring', subtitle: 'Intune · Defender · BitLocker · CyberArk · Device Health',
    status: 'Live', category: 'Cybersecurity · Endpoint Management',
    description: 'Daily monitoring and remediation of endpoint security posture across Windows and macOS devices — antivirus health, BitLocker encryption compliance, endpoint privilege management, DLP policy enforcement, and Conditional Access remediation.',
    highlights: ['Antivirus DAT update compliance checked daily — non-compliant devices escalated within 24 hours', 'BitLocker (XTS-AES 256-bit): recovery key escrow verified; non-compliant devices remediated within 3 months', 'CyberArk EPAM: privilege requests reviewed, agent health monitored, 30-day data retention enforced', 'DLP violations reviewed and actioned: user education or policy escalation within same day', 'Conditional Access failures: compliance remediation workflow run — device unblocked within grace period', 'Microsoft Defender for Endpoint: EDR alerts triaged, Secure Score improvement tracked weekly'],
    tags: ['Microsoft Defender', 'BitLocker', 'CyberArk EPAM', 'Microsoft Intune', 'DLP', 'Conditional Access', 'Endpoint Security'],
    pmDetails: { scope: 'Maintain endpoint security compliance across all managed devices — proactive monitoring, daily remediation, and escalation of security policy violations.', objectives: ['Maintain 95%+ endpoint compliance at all times', 'Ensure zero unencrypted devices in the estate', 'Respond to DLP violations within the same business day', 'Keep Microsoft Secure Score trending upward'], stakeholders: 'Security/CISO (compliance requirements), IT Manager (reporting), all device users (remediation), Audit (evidence)', timeline: 'Ongoing daily operations', outcomes: ['Endpoint compliance: maintained at 94%+', 'Secure Score: 41% → 78% over 12 months', 'Zero unencrypted devices in estate since BitLocker rollout', 'DLP violation response time: same-day consistently'], skillsApplied: ['Endpoint Security Management', 'Compliance Monitoring', 'Vulnerability Remediation', 'Privilege Management', 'Security Reporting'], toolsUsed: ['Microsoft Intune', 'Microsoft Defender for Endpoint', 'Trellix / McAfee', 'CyberArk EPAM', 'BitLocker', 'Azure AD Conditional Access'], learnings: ['Daily compliance dashboards catch drift before it becomes an audit finding', 'CyberArk EPAM reduces privilege-related incidents to near zero — the audit trail alone is worth it', 'Secure Score gamification motivates the team — weekly score reviews drive consistent improvement'] },
  },
  {
    emoji: '🍎', group: 'Daily IT Operations',
    title: 'macOS Corporate Enrolment, Jamf MDM & Daily Mac Support', subtitle: 'Apple ADE · Jamf Pro · FileVault · SSO · Self Service · 50+ Mac Fleet',
    status: 'Live', category: 'macOS Support · Jamf MDM',
    description: 'End-to-end corporate macOS management — from Automated Device Enrolment (ADE) and Jamf Pro administration through daily support: FileVault encryption, Kerberos SSO, VPN configuration, Self Service app portal, compliance monitoring, and troubleshooting. Approximately 95% of corporate Macs are enrolled via ADE (zero-touch); remaining 5% use manual Device Enrolment (DE) process. BYOD personal Macs are not permitted on corporate systems.',
    highlights: [
      'ADE (Automated Device Enrolment): ~95% of corporate Macs — MDM profile auto-pushed on first boot, no IT touch required',
      'Manual Device Enrolment (DE): ~5% of Macs in exception cases — guided step-by-step enrolment process with user and IT support',
      'Jamf Pro: centralised MDM server — policy management, app deployment, compliance monitoring, inventory for 50+ Mac fleet',
      'Setup Assistant: MFA/TAP required as pre-requisite — user account created with full name, corporate ID, and corporate password',
      'FileVault disk encryption: enforced via Jamf policy, recovery keys escrowed centrally — 100% encryption compliance',
      'Apple Kerberos SSO: certificates installed/renewed via Jamf, corporate password synced to local macOS account',
      'Conditional Access registration: GlobalProtect VPN and Microsoft 365 configured post-enrolment for full corporate access',
      'Self Service app portal: 40+ corporate apps available for user self-install — eliminates helpdesk software tickets',
      'Compliance: macOS mandatory update enforced within 30-day window post Apple release via Jamf policy',
      'Troubleshooting: Recovery Mode reinstall for failed upgrades, T2 chip Secure Boot handling, DEP/ADE exception cases',
    ],
    tags: ['Jamf Pro', 'Apple ADE', 'macOS', 'FileVault', 'Kerberos SSO', 'GlobalProtect VPN', 'Self Service', 'MFA/TAP', 'Conditional Access', 'Microsoft Intune'],
    pmDetails: {
      scope: 'Manage, enrol, secure, and support all corporate macOS devices using Jamf Pro — from ADE/DE enrolment through daily compliance, encryption, SSO, and user support.',
      objectives: [
        'Maintain 100% MDM enrolment for all corporate Macs via ADE (95%) and manual DE (5%)',
        'Enforce FileVault on all devices with recovery keys escrowed in Jamf',
        'Ensure all Macs have valid Kerberos SSO, VPN (GlobalProtect), and Conditional Access registration post-setup',
        'Resolve Mac enrolment and setup issues without requiring clean reinstall wherever possible',
        'Keep all Macs on current macOS within 30-day mandatory update window via Jamf policy',
      ],
      stakeholders: 'Mac users (50+ employees), IT Manager, Security (encryption/compliance), HR (new hire Mac setup), Apple (ADE)',
      timeline: 'Ongoing daily operations — new hire Mac setups, compliance checks, troubleshooting',
      outcomes: [
        '~95% of corporate Macs under ADE — zero-touch enrolment with no IT involvement on setup day',
        '100% FileVault compliance — zero unencrypted corporate Macs',
        'Self Service portal reduced Mac software helpdesk tickets by 40%',
        'macOS update compliance: 95%+ within 30-day window post Apple release',
        'Recovery Mode procedures documented — failed upgrade issues resolved without data loss',
      ],
      skillsApplied: [
        'Jamf Pro MDM Administration',
        'Apple ADE & Device Enrolment',
        'macOS Setup & Configuration (Setup Assistant)',
        'FileVault Encryption Management',
        'Apple Kerberos SSO Certificate Management',
        'GlobalProtect VPN Configuration',
        'Conditional Access Registration (Azure AD/Entra ID)',
        'Self Service App Portal Management',
        'macOS Troubleshooting (Recovery Mode, T2 chip, Secure Boot)',
      ],
      toolsUsed: [
        'Jamf Pro (MDM server — policy, compliance, inventory)',
        'Apple ADE (Automated Device Enrolment)',
        'FileVault (disk encryption)',
        'Apple Kerberos SSO extension',
        'Cisco GlobalProtect VPN',
        'Microsoft Authenticator / Temporary Access Pass (TAP)',
        'Azure AD / Entra ID (Conditional Access)',
        'macOS Self Service app portal',
        'Microsoft Intune (compliance integration)',
        'macOS Recovery Mode (reinstall/troubleshooting)',
      ],
      learnings: [
        'ADE zero-touch enrolment requires the device serial number to be registered in Jamf before first boot — this must be done at procurement, not at delivery',
        'MFA/TAP must be pre-configured before Mac setup begins — users who skip this step face a second appointment, wasting IT and user time',
        'T2-chip Macs (mid-2018+) cannot boot from external media by default — always use Recovery Mode for reinstalls, not USB drives',
        'Kerberos SSO password sync is the most common Mac ticket — ensuring it is set up correctly at initial enrolment prevents repeated helpdesk contacts',
      ],
    },
  },
  {
    emoji: '📱', group: 'Daily IT Operations',
    title: 'Mobile Device Management (iOS & Android)', subtitle: 'Jamf · Intune · ADE · Corporate & BYOD · 200+ Devices',
    status: 'Live', category: 'Mobile Device Management · MDM',
    description: 'Daily management of corporate and BYOD mobile devices — iOS, iPadOS, and Android — covering MDM enrolment, compliance enforcement, MFA bootstrapping, certificate management, and full decommission workflow.',
    highlights: ['Corporate iOS enrolment via Apple ADE — zero-touch, supervised mode, apps auto-pushed', 'BYOD Android enrolment via Intune Company Portal — work profile separates corporate/personal data', 'Temporary Access Pass (TAP) issued for new device MFA bootstrapping — no legacy auth workarounds', 'Mobile SSO certificates: 3-month validity, auto-renews via Jamf — zero certificate expiry incidents', 'Wi-Fi TLS authentication: 802.1X troubleshooting — certificate trust chain verified on each device', 'Decommission workflow: Find My disabled → MDM unenrolled → factory reset → asset record updated'],
    tags: ['Jamf', 'Microsoft Intune', 'Apple ADE', 'iOS MDM', 'Android MDM', 'MFA', 'BYOD'],
    pmDetails: { scope: 'Manage all corporate and BYOD mobile devices from enrolment through decommission — ensuring compliance, security, and seamless user experience.', objectives: ['Maintain 100% MDM enrolment for all corporate mobile devices', 'Enforce OS compliance (iOS latest, Android patches < 6 months)', 'Complete device enrolment in under 15 minutes per device', 'Ensure zero expired SSO certificates in the estate'], stakeholders: 'All mobile device users (200+), IT Manager, Security (compliance), HR (onboarding/offboarding)', timeline: 'Ongoing daily operations', outcomes: ['100% corporate mobile device MDM compliance', 'Enrolment time: 10–15 minutes per device', 'Zero SSO certificate expiry incidents since auto-renew policy', 'BYOD personal data fully isolated from corporate data'], skillsApplied: ['Mobile Device Management', 'iOS/Android Administration', 'MDM Policy Design', 'MFA Configuration', 'BYOD Programme Management'], toolsUsed: ['Jamf Pro (iOS/iPadOS)', 'Microsoft Intune (Android)', 'Apple ADE', 'Microsoft Authenticator', 'Cisco Security Connector', 'Azure AD / Entra ID'], learnings: ['Apple ADE supervised mode is non-negotiable for corporate iOS — it enables app management that BYOD cannot match', 'TAP-based MFA bootstrapping removes the last reason for legacy authentication on new devices', 'Certificate auto-renewal policies must be tested before rollout — silent expiry causes mass access failures'] },
  },
  {
    emoji: '💻', group: 'Daily IT Operations',
    title: 'Windows Endpoint Provisioning & Management', subtitle: 'Intune Autopilot · SCCM · Windows 11 · PC Migration',
    status: 'Live', category: 'Windows Management · Provisioning',
    description: 'Daily provisioning, migration, and management of Windows endpoints — from Autopilot zero-touch setup and SCCM software deployment through compliance remediation, PC-to-PC migrations, and multi-factor authentication setup.',
    highlights: ['Autopilot zero-touch: new device enrolled, corporate apps deployed, user ready in 45 min', 'PC-to-PC migration: OneDrive sync, email signatures, bookmarks, archive upload — 1-hour process', 'SCCM software deployment: licensed apps pushed to shared/pooled devices on request', 'Compliance remediation: MDM portal checks run daily — non-compliant devices remediated within 24 hours', 'Windows 11 upgrade management: feature updates staged, hardware compatibility verified before rollout', 'Device setup SLA: 1 hour standard, 30 min for executive devices with white-glove pre-staging'],
    tags: ['Microsoft Intune', 'Autopilot', 'SCCM', 'Windows 11', 'OneDrive', 'Endpoint Manager'],
    pmDetails: { scope: 'Provision, migrate, and manage all Windows endpoints — ensuring Day 1 readiness, compliance, and ongoing software management for 200+ users.', objectives: ['Achieve zero-touch device provisioning for all new hires', 'Complete PC migrations with zero data loss', 'Maintain 95%+ Windows compliance at all times', 'Deliver executive devices within 30-minute SLA'], stakeholders: 'All Windows users (200+), IT Manager, HR (new hire coordination), Finance (software licensing)', timeline: 'Ongoing daily operations', outcomes: ['New device setup: 3.5 hrs → 45 min with Autopilot', 'Zero data loss incidents during PC migrations', 'Windows compliance maintained at 94%+', 'Executive device SLA met: 100% of deliveries'], skillsApplied: ['Windows Endpoint Management', 'Intune/Autopilot Administration', 'SCCM/Endpoint Manager', 'Data Migration', 'Compliance Management'], toolsUsed: ['Microsoft Intune', 'Autopilot', 'SCCM / Microsoft Endpoint Manager', 'Windows 11', 'OneDrive', 'M365 Admin Centre', 'Lenovo/Dell/HP hardware'], learnings: ['Autopilot with pre-assigned user profiles eliminates the "IT waiting room" for new starters', 'OneDrive Known Folder Move means PC migration is just waiting for sync to complete', 'Compliance checks must run before executive device delivery — not after the user calls you'] },
  },
  {
    emoji: '☁️', group: 'Daily IT Operations',
    title: 'Microsoft 365 Cloud Collaboration Support', subtitle: 'Teams · SharePoint · OneDrive · Exchange · Daily Admin',
    status: 'Live', category: 'M365 Administration · Cloud',
    description: 'Daily administration and user support for the full Microsoft 365 collaboration suite — Teams, SharePoint Online, OneDrive, and Exchange — covering permissions, data recovery, licensing, and platform governance.',
    highlights: ['Teams administration: create, rename, archive, restore deleted teams (30-day recovery window)', 'SharePoint site provisioning via self-service portal — permissions, external sharing, library sync', 'OneDrive: 3 TB per user, Files On-Demand, 90-day recycle bin recovery — data loss prevention', 'Deleted file recovery: SharePoint (93 days) and OneDrive (90 days) — zero data loss requests failed', 'Cloud recording management: Teams and Zoom recordings retained 90 days, then auto-deleted', 'M365 licensing audit: quarterly review — unused licences reclaimed, cost optimised'],
    tags: ['Microsoft Teams', 'SharePoint Online', 'OneDrive', 'Exchange Online', 'M365 Admin', 'Power Automate'],
    pmDetails: { scope: 'Administer and support the full M365 collaboration platform for 200+ users — ensuring data protection, permissions governance, and platform reliability.', objectives: ['Zero data loss from SharePoint/OneDrive deletions within recovery window', 'Respond to Teams/SharePoint requests within agreed SLA', 'Maintain licence optimisation — zero unused licences after quarterly review', 'Enforce external sharing policies — no uncontrolled data leakage'], stakeholders: 'All 200+ users, IT Manager, Finance (licence costs), Security (data governance), Compliance', timeline: 'Ongoing daily operations', outcomes: ['Zero data loss incidents — 100% recovery success within recycle bin window', 'Licence costs reduced 12% through quarterly reclaim audits', 'External sharing governance enforced — zero policy violations in 12 months', 'Teams adoption: 100% of meetings via Teams — legacy VC decommissioned'], skillsApplied: ['Microsoft 365 Administration', 'SharePoint Online Management', 'Teams Administration', 'Data Governance', 'Licence Management'], toolsUsed: ['Microsoft Teams Admin Centre', 'SharePoint Admin Centre', 'OneDrive Admin Centre', 'M365 Admin Centre', 'Power Automate', 'Exchange Online'], learnings: ['93-day SharePoint recycle bin has saved multiple "accidental deletion" escalations', 'Quarterly licence audits pay for themselves — unused E5 licences are expensive', 'Self-service SharePoint provisioning portal reduces IT requests and empowers team owners'] },
  },
  {
    emoji: '🖨️', group: 'Printer Management',
    title: 'Print Infrastructure & Meeting Room AV', subtitle: 'HP MFP Fleet · Badge Printing · Teams Rooms · Crestron · Daily Ops',
    status: 'Live', category: 'Print Management · AV Operations',
    description: 'Daily management of enterprise print fleet and meeting room AV systems — toner monitoring, badge-secured pull-printing, Teams Room health checks, and reactive AV support across all office locations.',
    highlights: ['Toner fleet monitoring: auto-alert at 15%, delivery triggered at 5%, replacement at 1%', 'Badge pull-printing: users registered on HP MFP card readers — secure release only', 'Meeting room status updated daily via compliance dashboard — amber/red actioned within 2 hours', 'Reactive AV support via hotline and QR code in every room — response within 30 minutes', 'Teams Rooms health: nightly status check, firmware updates coordinated with maintenance windows', 'Scan-to-email configuration requests: completed same day — user verified before enabling'],
    tags: ['HP MFP', 'Badge Printing', 'Teams Rooms MTR', 'Crestron', 'AV Support', 'Surface Hub', 'Wolfvision'],
    pmDetails: { scope: 'Maintain enterprise print fleet and all meeting room AV systems — proactive monitoring, consumables management, and reactive support.', objectives: ['Zero print outages due to toner depletion', 'Meeting room AV availability: 99%+ at all times', 'Reactive AV response: 30 minutes from report', 'All Teams Rooms on current certified firmware'], stakeholders: 'All office users, IT Manager, Facilities (room booking), C-suite (boardroom AV reliability)', timeline: 'Ongoing daily operations', outcomes: ['Zero toner outage incidents since monitoring implementation', '99%+ meeting room AV availability maintained', 'C-suite boardroom: zero AV failures across 50+ executive events', 'Print fleet costs reduced via empty cartridge return programme'], skillsApplied: ['Print Fleet Management', 'AV Systems Administration', 'Teams Rooms Management', 'Reactive Support', 'Vendor Coordination'], toolsUsed: ['HP MFP + WebJet Admin', 'MS Teams Rooms Admin Centre', 'Crestron XiO Cloud', 'Wolfvision Cynap', 'Evoko booking panels', 'Surface Hub', 'SIPORT badge system'], learnings: ['Toner auto-ordering at 5% prevents the 9 AM "printer is out of toner" escalation', 'QR code on every room screen removes friction for AV issue reporting — incidents get raised faster', 'Nightly Teams Rooms health checks catch camera/audio failures before the first morning meeting'] },
  },
  {
    emoji: '📛', group: 'Printer Management',
    title: 'Zebra GX430t — QR Code Asset Tag Printing System', subtitle: 'Zebra GX430t · QR Code · Asset Tags · All IT Equipment · 3 Years Production',
    status: 'Live', category: 'IT Asset Management · Printer Management',
    description: 'Deployed the Zebra GX430t desktop label printer 3 years ago and built a complete QR code asset tagging workflow for all SAP IT equipment. Every device — laptops, iPhones, iPads, APs, network switches, server room hardware — is labelled before leaving the IT desk. QR codes are scanned by the CLEA mobile app, hand scanners, and direct QR readers to update asset records in real time.',
    highlights: [
      'Deployed Zebra GX430t desktop thermal printer — operational for 3+ years without failure',
      'QR code asset tags printed for ALL device types: laptops, phones, tablets, APs, switches, server room equipment',
      'CLEA mobile app integration: scan QR code → asset record opens instantly → status updated in seconds',
      'Hand scanner support for bulk stock operations — 50+ items scanned per session',
      'Label applied to every device before assignment — enforces 100% tracking compliance',
      'Labels printed for network infrastructure: APs, switches, patch panels, rack units — full visibility',
    ],
    tags: ['Zebra GX430t', 'QR Code', 'Asset Tagging', 'CLEA App', 'SAP IT', 'Label Printing', 'IT Asset Management'],
    pmDetails: {
      scope: 'Deploy and operationalise the Zebra GX430t label printer for QR code asset tagging across all SAP IT equipment — from end-user devices to server room infrastructure.',
      objectives: [
        'Print QR code asset tags for all IT hardware categories',
        'Enable mobile scanning via CLEA app for real-time asset updates',
        'Support bulk stock operations with hand scanner integration',
        'Achieve 100% asset tag coverage before any device is assigned',
      ],
      stakeholders: 'SAP IT RUH02, Asset Management Team, End Users, IT Manager',
      timeline: '2023 — ongoing (3+ years in production)',
      outcomes: [
        '100% of IT assets tagged before assignment — enforced by process',
        'CLEA mobile app scanning reduces asset update time from minutes to seconds',
        'All network devices (APs, switches, server room) labelled and tracked',
        'Zero lost assets since QR tagging implementation',
      ],
      skillsApplied: ['IT Asset Management', 'Label Printer Configuration', 'QR Code Systems', 'Process Design', 'Mobile Integration'],
      toolsUsed: ['Zebra GX430t', 'Zebra Setup Utilities', 'CLEA App', 'QR/Barcode Scanners', 'SAP IT Asset Management', 'ServiceNow'],
      learnings: [
        'QR codes outlast barcodes in real-world conditions — error correction keeps them scannable even when partially damaged',
        'Label roll alignment is critical — even 1mm shift causes QR codes to print off-centre and fail scans',
        'Labelling server room equipment (APs, switches) with the same workflow as end-user devices closed the biggest tracking gap',
        'Monthly printhead cleaning prevents the gradual print quality degradation that causes QR scan failures',
      ],
    },
  },
  {
    emoji: '🏷️', group: 'Printer Management',
    title: 'Zebra ZT411 RFID Printer — SAP IT Asset Tag Deployment', subtitle: 'Zebra ZT411 · RFID · Asset Tags · SAP IT Link Center · RUH02',
    status: 'Live', category: 'IT Asset Management · RFID',
    description: 'End-to-end deployment of the Zebra ZT411 industrial RFID printer at the SAP IT Link Center, Riyadh — from unboxing and hardware setup through RFID calibration, label media loading, and EU RED security activation. Used daily to print RFID-enabled asset tags for all IT hardware entering and leaving the office.',
    highlights: [
      'Unboxed and installed Zebra ZT411 industrial label printer at SAP IT Link Center RUH02',
      'Loaded RFID inlay media and ribbon — configured for SAP standard asset tag format',
      'Calibrated RFID encoder: verified read/write to RFID inlay before production use',
      'Activated EU RED security profile to comply with SAP global wireless regulations',
      'Integrated with SAP IT asset management workflow: every device tagged before assignment',
      'Followed SAP global KB articles: KB1349185 (printer setup), KB1349678 (label printing guide)',
    ],
    tags: ['Zebra ZT411', 'RFID', 'Asset Tagging', 'SAP IT', 'Label Printing', 'EU RED', 'ServiceNow'],
    pmDetails: {
      scope: 'Deploy and operationalise the Zebra ZT411 RFID printer for SAP IT asset tag printing at the Riyadh IT Link Center — covering hardware setup, RFID calibration, and daily operations.',
      objectives: [
        'Install and configure Zebra ZT411 at SAP IT Link Center RUH02',
        'Enable RFID asset tagging for all IT hardware',
        'Comply with SAP EU RED wireless security requirements',
        'Align with SAP global RFID KB documentation',
      ],
      stakeholders: 'SAP IT RUH02, SAP Global RFID Programme Team, IT Asset Management',
      timeline: 'July 2026',
      outcomes: [
        'Zebra ZT411 fully operational — printing SAP RFID asset tags in production',
        'EU RED security profile activated — compliant with SAP global wireless policy',
        'All new IT assets tagged before assignment — full RFID audit trail',
        'Process aligned with SAP KB1349185 and KB1349678',
      ],
      skillsApplied: ['RFID Technology', 'Hardware Deployment', 'IT Asset Management', 'Label Printer Configuration', 'Compliance & Security'],
      toolsUsed: ['Zebra ZT411 RFID Printer', 'Zebra Setup Utilities', 'SAP ServiceNow (SNOW)', 'RFID Inlay Media', 'EU RED Security Module'],
      learnings: [
        'RFID inlay alignment is the hardest part — 2mm off-centre causes consistent void tags; take time to align the inlay exactly over the antenna window',
        'Auto and manual calibration both fail if the media guides are slightly off — push guides firmly against label edges before every calibration attempt',
        'Register the MAC address and request a DHCP reservation before configuring any print queues — a DHCP change after reboot silently breaks all connected workstations',
        'EU RED must be activated before production use — non-compliant RF emissions violate SAP global wireless policy',
      ],
    },
  },
  {
    emoji: '🔐', group: 'Daily IT Operations',
    title: 'User Provisioning, Access Control & MFA', subtitle: 'Azure AD · Intune · Onboarding/Offboarding · 140+ Employees',
    status: 'Live', category: 'Identity & Access Management · IAM',
    description: 'Daily provisioning and deprovisioning of user accounts, device enrolments, and access rights across Azure AD, M365, and enterprise platforms — including MFA setup, Conditional Access remediation, and full offboarding within 2 hours.',
    highlights: ['T-14 day onboarding trigger: SNOW ticket raised on HR confirmation — device pre-staged before Day 1', 'Azure AD account provisioning: M365 licences, group memberships, Conditional Access policies applied automatically', 'Day 1 readiness: device enrolled, apps deployed, email active — user ready in 30 minutes', 'MFA setup: authenticator app, PIN, fingerprint, face recognition — all configured before first login', 'Offboarding: account disabled, device wiped, data backed up, DocuSign asset return — completed within 2 hours', '140+ onboardings completed including Country MD, CFO, COO — zero Day 1 failures'],
    tags: ['Azure AD / Entra ID', 'Microsoft Intune', 'Autopilot', 'MFA', 'DocuSign', 'ServiceNow', 'ITIL Onboarding'],
    pmDetails: { scope: 'Provision and deprovision all user accounts and devices — ensuring Day 1 readiness for joiners and secure, complete offboarding for leavers within SLA.', objectives: ['Day 1 IT readiness: account + device + MFA active before user arrives', 'Complete offboarding within 2 hours of last working day', 'Zero security gaps from incomplete offboarding', 'Executive onboarding: white-glove, 30-minute setup'], stakeholders: 'HR (process trigger), IT Manager (SLA owner), new hires (Day 1 experience), leavers, Security (offboarding compliance)', timeline: 'Ongoing daily operations', outcomes: ['Day 1 setup: 4 hours → 30 minutes', '140+ onboardings — zero Day 1 failures', 'Offboarding completed within 2 hours: 100% compliance', 'Zero security incidents from incomplete account deprovisioning'], skillsApplied: ['Identity & Access Management', 'Azure AD Administration', 'Intune Device Management', 'Onboarding/Offboarding Process Design', 'DocuSign Digital Workflows'], toolsUsed: ['Azure AD / Entra ID', 'Microsoft Intune/Autopilot', 'ServiceNow', 'DocuSign', 'Power Automate', 'CLEA App', 'M365 Admin Centre'], learnings: ['T-14 day pre-trigger is the most impactful single change in any onboarding process', 'DocuSign asset assignment removes paper entirely and creates a legally admissible audit trail', 'Offboarding is more security-critical than onboarding — a forgotten account is an open door'] },
  },
  {
    emoji: '🌐', group: 'Daily IT Operations',
    title: 'Network, VPN & Connectivity Support', subtitle: 'Cisco · Aruba · GlobalProtect · 802.1X · Daily Ops',
    status: 'Live', category: 'Network Administration · Connectivity',
    description: 'Daily network support and administration — VPN connectivity, Wi-Fi 802.1X certificate authentication, NAC compliance, switch/AP troubleshooting, and ISP circuit management across three office locations.',
    highlights: ['VPN support: GlobalProtect and F5 BIG-IP — certificate-based auth troubleshooting for 200+ users', '802.1X Wi-Fi authentication: TLS certificate chain verified per device — no open network access', 'Aruba wireless: AP health monitoring, rogue device detection, VLAN assignment per user group', 'NAC (ForeScout): non-compliant devices quarantined automatically — IT notified for remediation', 'ISP circuit monitoring: dual-path failover tested quarterly — RTO under 5 minutes', 'Switch management: VLAN changes, port assignments, PoE verification for AV and IP phones'],
    tags: ['Cisco Switches', 'Aruba Wireless', 'GlobalProtect VPN', 'F5 BIG-IP', '802.1X', 'NAC ForeScout', 'VLAN'],
    pmDetails: { scope: 'Maintain reliable network connectivity and security across three office locations — VPN, wireless, NAC, and core switching infrastructure.', objectives: ['99.9% network uptime across all office locations', 'Zero unauthorised device network access via NAC enforcement', 'VPN issues resolved within 30 minutes for business-critical users', 'ISP failover RTO: under 5 minutes'], stakeholders: 'All 200+ users (connectivity dependent), IT Manager, Security (NAC compliance), Facilities (physical infrastructure)', timeline: 'Ongoing daily operations', outcomes: ['99.9%+ network uptime across all three offices', 'Zero unauthorised device access since NAC deployment', 'VPN resolution time: under 30 minutes for business-critical users', 'ISP failover tested and confirmed: 4-minute RTO'], skillsApplied: ['Network Administration', 'Wireless Management', 'VPN Support', 'NAC Administration', 'VLAN Management', 'ISP Circuit Management'], toolsUsed: ['Cisco IOS Switches', 'Aruba APs / Aruba Central', 'GlobalProtect VPN', 'F5 BIG-IP', 'ForeScout NAC', '802.1X / RADIUS'], learnings: ['NAC quarantine for non-compliant devices enforces security policy better than any email reminder', 'Dual ISP failover only works if you test it quarterly — untested failover is not failover', '802.1X certificate-based Wi-Fi auth eliminates shared PSK vulnerabilities entirely'] },
  },

  // ── GROUP 1: Built Apps & Tools ──────────────────────────
  {
    emoji: '🤖', group: 'Built Apps & Tools',
    title: 'Waqas AI Hub', subtitle: 'AI-Powered macOS Desktop Dashboard',
    status: 'Live', category: 'AI Dashboard · macOS',
    description: 'A native macOS Swift app + FastAPI web dashboard replacing terminal commands for all daily IT work. Single click to view emails, calendar, ServiceNow tickets, OneDrive files, and WhatsApp SLA alerts in one Teams-style interface.',
    highlights: ['Native macOS Swift + WebKit wrapper — launches like any desktop app', 'FastAPI backend: Gmail, SAP O365 (Outlook, Calendar, OneDrive, SharePoint)', 'ServiceNow live ticket dashboard — auto-loads SNOW session from Safari', 'WhatsApp SLA breach alerts via Twilio — fires 30 min before breach', 'Email summarisation agent — runs every morning, condenses inbox to action list', '6 colour themes, collapsible sidebar, keyboard shortcuts (⌘1–9, ⌘R, ⌘K)'],
    tags: ['FastAPI', 'Python', 'Swift', 'SAP O365', 'ServiceNow', 'Twilio', 'macOS'],
    github: 'https://github.com/waqas-syed', demo: '#',
    pmDetails: { scope: 'Build a unified AI-powered dashboard replacing 6+ separate tools used daily for IT operations management.', objectives: ['Eliminate context-switching between 6+ tools', 'Automate daily email triage saving 35+ min/day', 'Surface SLA breach risks 30 minutes before breach', 'Create single pane of glass for all IT data sources'], stakeholders: 'Personal productivity tool for senior IT engineer managing daily operations', timeline: '3 months development, ongoing', outcomes: ['100+ minutes/day reclaimed from manual tasks', 'Zero SLA breaches for 6 consecutive months', 'Email triage time: 40 min → 5 min/day', 'All IT tools accessible via single interface'], skillsApplied: ['Python Development', 'REST API Integration', 'macOS App Development', 'System Architecture'], toolsUsed: ['Python 3.11', 'FastAPI', 'Swift/WebKit', 'Microsoft Graph API', 'Twilio API', 'LaunchAgent'], learnings: ['Integrating multiple enterprise APIs in a single dashboard reduces context-switching significantly', 'macOS Swift wrappers enable quick native-feel apps without full native development', 'Automation agents work best when triggered by schedules rather than manual execution'] },
  },
  {
    emoji: '📦', group: 'Built Apps & Tools',
    title: 'IT Asset Manager', subtitle: 'Enterprise Asset Tracking Web App',
    status: 'Live', category: 'Web Application · IT Tool',
    description: 'Full-stack Flask web app replacing Excel-based IT asset tracking. Manages 1,500–2,000+ active assets across MENA — modelled on SAP ISP ERP workflows. Includes AI chat widget for natural language queries.',
    highlights: ['KPI dashboard: Chart.js analytics, low-stock alerts, 6-month trend charts', 'Asset list with search, filter, sort, pagination — full detail on row click', 'Excel import (Add Only / Add+Update) with header garbage filtering', 'Multi-sheet colour-coded Excel export by asset status', 'Full audit log per asset — every change tracked with timestamp', 'Floating AI chat widget — natural language queries return card-format results'],
    tags: ['Python', 'Flask', 'SQLite', 'Chart.js', 'JavaScript'],
    github: 'https://github.com/waqas-syed', demo: '#',
    pmDetails: { scope: 'Replace a broken shared Excel file with a proper asset management web application aligned to enterprise ERP workflows.', objectives: ['Eliminate duplicate serial numbers and data conflicts', 'Reduce asset query time from 10 min to under 30 sec', 'Enable audit trail for every asset change', 'Support bulk operations and Excel import/export'], stakeholders: 'IT team and management requiring accurate asset inventory for procurement and compliance', timeline: '6 weeks development', outcomes: ['1,500+ assets tracked with 100% accuracy', 'Asset query time: 10 min → 10 sec (via AI chat)', 'Zero duplicate serial numbers since deployment', 'Full audit trail enables compliance reporting'], skillsApplied: ['Full-Stack Development', 'Database Design', 'AI Integration', 'Enterprise Process Design'], toolsUsed: ['Python/Flask', 'SQLite', 'Chart.js', 'JavaScript', 'OpenPyXL', 'HTML/CSS'], learnings: ['A simple database-backed tool outperforms the best Excel file every time', 'AI chat widgets dramatically reduce the learning curve for non-technical users', 'Audit logs are not optional — they become essential at the first compliance question'] },
  },
  {
    emoji: '🔔', group: 'Built Apps & Tools',
    title: 'SNOW SLA Automation Pipeline', subtitle: 'ServiceNow Monitoring & WhatsApp Alerts',
    status: 'Live', category: 'Automation · Monitoring',
    description: 'Python automation pipeline monitoring ServiceNow tickets 24/7 and firing WhatsApp messages before SLA breaches. Runs as background daemons via cron every 5 minutes.',
    highlights: ['Polls ServiceNow REST API every 5 minutes for new & at-risk tickets', 'Calculates SLA breach time — fires WhatsApp 30 minutes before breach via Twilio', 'Daily 9 AM email summariser — SAP Outlook inbox → prioritised action list', 'JSON output mode for live dashboard integration', 'Runs as background daemon — auto-restarts via macOS LaunchAgent', 'Full timestamp audit log for every alert fired'],
    tags: ['Python', 'ServiceNow', 'Twilio', 'REST API', 'Cron'],
    github: 'https://github.com/waqas-syed',
    pmDetails: { scope: 'Eliminate manual SLA monitoring by automating ticket surveillance and proactive breach alerts via WhatsApp.', objectives: ['Remove 45 min/day of manual SNOW monitoring', 'Alert engineers 30 min before any SLA breach', 'Create daily email summary of inbox priorities', 'Provide JSON feed for dashboard integration'], stakeholders: 'IT engineers responsible for SLA compliance, IT management reviewing metrics', timeline: '2 weeks development', outcomes: ['Zero SLA breaches for 6 months post-deployment', 'Daily monitoring time: 45 min → 0', '100% automated alert delivery via WhatsApp', 'Dual trigger: SNOW API + email scanning'], skillsApplied: ['Python Scripting', 'REST API Integration', 'Process Automation', 'SLA Management'], toolsUsed: ['Python 3.11', 'ServiceNow REST API', 'Twilio WhatsApp API', 'Microsoft Graph API', 'cron/LaunchAgent'], learnings: ['Proactive alerting at 70% SLA consumed is far more effective than alerting at breach', 'Dual-trigger systems (API + email) ensure coverage when one source fails', 'Automation daemons need watchdog processes — silent failures are the worst kind'] },
  },
  {
    emoji: '🌐', group: 'Built Apps & Tools',
    title: 'HiTecH AI HUB Website', subtitle: 'Personal Brand & Technology Platform',
    status: 'Live', category: 'Web Application · Personal Brand',
    description: 'Production-ready personal technology brand built with Next.js 14, TypeScript, Tailwind CSS. Live IT/AI news ticker, neural network skill map, animated hero, full blog, IT learning portal, and Cloudflare Pages deployment.',
    highlights: ['Next.js 14 App Router — static export on Cloudflare Pages (global CDN)', 'Live IT/AI news ticker: RSS feeds from TechCrunch, The Verge, Ars Technica', 'Animated neural network expertise diagram with 6 skill domains', '24 projects page, 16 blog posts, IT Learning portal with 12 courses', 'IT Services, Industries, Medical Billing, Digital Marketing pages', 'Fully responsive (mobile + desktop), SEO optimised'],
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'Framer Motion'],
    demo: 'https://www.hitechtechnologyhub.com', github: 'https://github.com/waqastayyab2004-tech/hitechtechnologyhub',
    pmDetails: { scope: 'Build a professional personal brand website serving dual purpose: senior IT role attraction and IT outsourcing/freelance client conversion.', objectives: ['Attract senior IT hiring managers and HR recruiters', 'Convert outsourcing and freelance project enquiries', 'Showcase 24 real projects with PMP documentation', 'Establish thought leadership via blog and IT Learning'], stakeholders: 'Hiring managers (MENA + global), IT outsourcing clients (UK/US/EU), students seeking IT training', timeline: '3 months build, ongoing enhancement', outcomes: ['Full professional brand site live on global CDN', '24 projects, 16 blog posts, 12 courses published', 'IT Services, Training, Industries pages driving enquiries', 'Mobile + desktop optimised, SEO ready'], skillsApplied: ['Next.js Development', 'UI/UX Design', 'SEO Optimisation', 'Content Strategy', 'Cloudflare Deployment'], toolsUsed: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Pages', 'RSS APIs'], learnings: ['Personal branding requires a clear dual audience strategy — job vs. consulting clearly separated', 'Static site deployment on Cloudflare Pages gives enterprise-grade performance for free', 'Live data features (news ticker, neural network) significantly increase engagement time'] },
  },
  {
    emoji: '📱', group: 'Built Apps & Tools',
    title: 'HiTecH Page Manager', subtitle: 'Facebook Content Manager · Post Generator · Affiliate Tracker',
    status: 'Live', category: 'Web App · Social Media',
    description: 'A full-stack Flask web app for managing the HiTecH Technology HUB Facebook page — content calendar, AI-powered post generator, affiliate link tracker with click analytics, and Facebook OAuth integration. Built to replace manual social media management with an automated, data-driven workflow.',
    highlights: [
      'Content Calendar: schedule, create, edit, delete posts with status tracking (draft/scheduled/posted)',
      'AI Post Generator: auto-generates social media captions and content ideas via API',
      'Post Image Generator: creates high-quality branded post images via HTML/CSS rendering',
      'Affiliate Link Tracker: add links, record clicks, track revenue — full CRUD with SQLite',
      'Facebook OAuth: connect page, list pages, manage posts via Facebook Graph API',
      'Dashboard: overview of upcoming posts, affiliate performance, and quick actions',
      'Full SQLite backend — config and data persist across sessions',
    ],
    tags: ['Python', 'Flask', 'SQLite', 'Facebook Graph API', 'OAuth', 'HTML/CSS Image Rendering', 'Content Marketing'],
    github: 'https://github.com/waqas-syed',
    pmDetails: {
      scope: 'Build a self-hosted social media management tool for the HiTecH Technology HUB Facebook page — replacing manual posting with a structured calendar, AI content generation, and affiliate tracking.',
      objectives: [
        'Replace manual post scheduling with a structured content calendar',
        'Auto-generate post content using AI to reduce writing time',
        'Track affiliate link performance with click counts and revenue data',
        'Connect to Facebook Graph API for direct page management',
        'Generate branded post images without a graphic design tool',
      ],
      stakeholders: 'Personal project — HiTecH Technology HUB Facebook page (1M+ community)',
      timeline: '3 weeks development',
      outcomes: [
        'Full content calendar live — posts scheduled weeks in advance',
        'AI post generator produces ready-to-publish captions instantly',
        'Affiliate tracker logging clicks per link with revenue attribution',
        'Post image generator producing branded social media graphics',
        'Facebook OAuth connected — direct page post management from the app',
      ],
      skillsApplied: ['Python Flask Development', 'SQLite Database Design', 'Facebook Graph API Integration', 'OAuth 2.0 Authentication', 'HTML/CSS Image Generation', 'Content Strategy Automation'],
      toolsUsed: ['Python 3', 'Flask', 'SQLite3', 'Facebook Graph API', 'OAuth 2.0', 'Jinja2 Templates', 'HTML/CSS renderer', 'Requests library'],
      learnings: [
        'Facebook Graph API requires careful scope management — page tokens vs user tokens have different expiry and permission levels',
        'HTML/CSS-to-image rendering is the fastest way to generate consistent branded graphics without Photoshop',
        'Content calendars with status tracking (draft → scheduled → posted) prevent duplicate posting and missed dates',
      ],
    },
  },
  {
    emoji: '🔗', group: 'Built Apps & Tools',
    title: 'SAP O365 MCP Server', subtitle: 'Claude AI ↔ Microsoft 365 Bridge',
    status: 'Live', category: 'AI Integration · MCP Server',
    description: 'Model Context Protocol server giving Claude AI direct access to SAP Outlook, Calendar, OneDrive, and SharePoint — enabling natural language control of enterprise M365 services from any Claude session.',
    highlights: ['OAuth2 authentication with Azure AD — bypasses Conditional Access on non-managed Mac', 'Read/search SAP Outlook emails — full content + attachment support', 'Query SAP Calendar — list, create, update meetings via Graph API', 'Browse OneDrive (49.87 GB) — list, download, upload documents', 'SharePoint site search across 10 internal sites', 'Token auto-refresh — stays connected without manual re-auth'],
    tags: ['Python', 'FastAPI', 'OAuth2', 'Microsoft Graph API', 'MCP', 'Azure AD'],
    github: 'https://github.com/waqas-syed',
    pmDetails: { scope: 'Enable natural language AI control of enterprise M365 services by building a Model Context Protocol integration layer.', objectives: ['Allow Claude AI to read and search corporate emails', 'Enable AI-assisted calendar management', 'Provide AI access to OneDrive and SharePoint documents', 'Bypass SAP Conditional Access on non-managed device'], stakeholders: 'Senior IT engineer using AI tools for daily operational efficiency', timeline: '3 weeks development', outcomes: ['Full M365 suite accessible via natural language', 'Used daily in Claude Code sessions and Waqas AI Hub', 'OAuth2 token refresh automated — zero manual re-auth', 'Enables AI-powered email and calendar management'], skillsApplied: ['OAuth2 Authentication', 'API Development', 'Microsoft Graph API', 'AI Tool Integration'], toolsUsed: ['Python/FastAPI', 'Microsoft Graph API', 'OAuth2/Azure AD', 'MCP Protocol', 'JSON/REST'], learnings: ['SAP Conditional Access can be bypassed legitimately using localhost redirect URIs', 'Token refresh automation is critical — expired tokens at 3 AM are not acceptable', 'MCP servers dramatically extend AI assistant capabilities beyond their training data'] },
  },
  {
    emoji: '🔐', group: 'Built Apps & Tools',
    title: 'Password Generator Pro', subtitle: 'Secure Password Tool · Python · macOS · Cybersecurity Compliant',
    status: 'Live', category: 'Cybersecurity · Desktop App',
    description: 'A native macOS desktop application that generates secure, cybersecurity-compliant passwords locally — no internet connection required. Supports three generation modes (Strong, Medium, Memorable), enforces best-practice password policies, stores history in a local encrypted SQLite database, and ships as a standalone .app bundle.',
    highlights: [
      'Three password modes: Strong (full charset), Medium (letters+digits), Memorable (word-based passphrase)',
      'User controls: configurable length, toggle digits/symbols, password type selector',
      'Cybersecurity compliant: meets 15-char minimum, uppercase+lowercase+digit+symbol requirements',
      'One-click clipboard copy — password never touches a server or network',
      'Password history stored locally in SQLite at ~/Library/Application Support — never in cloud',
      'Memorable mode: generates passphrases easy to remember yet cryptographically adequate',
      'Built as standalone macOS .app — no Python install required for end users',
      'Foundation project demonstrating Python, GUI development, and local data persistence',
    ],
    tags: ['Python 3.14', 'Tkinter', 'SQLite', 'PyInstaller', 'macOS', 'Cybersecurity', 'Password Policy'],
    github: 'https://github.com/waqas-syed',
    pmDetails: {
      scope: 'Build a secure, offline password generator that helps employees and users create strong, policy-compliant passwords that are easy to remember — packaged as a standalone macOS app.',
      objectives: [
        'Generate passwords meeting enterprise cybersecurity policy (length, complexity, entropy)',
        'Provide a Memorable mode so users adopt strong passwords without writing them down',
        'Store history locally — zero cloud or network exposure of generated passwords',
        'Package as a double-click macOS .app — no setup required for non-technical users',
        'Serve as a foundation Python project to build toward ML/AI engineering skills',
      ],
      stakeholders: 'Enterprise employees and IT professionals needing policy-compliant passwords; personal learning project for Python development',
      timeline: '2 weeks development + packaging',
      outcomes: [
        'Standalone macOS .app shipped — runs without Python installed',
        'All three generation modes working: Strong, Medium, Memorable',
        'SQLite history persists across app restarts in ~/Library/Application Support',
        'Clipboard copy works natively — no network calls at any point',
        'App branding: Password Generator Pro — IT Tools by Waqas',
      ],
      skillsApplied: [
        'Python 3.14 Development',
        'Tkinter GUI Development',
        'SQLite Database Design',
        'Password Policy & Cybersecurity Compliance',
        'macOS App Packaging with PyInstaller',
        'Entropy-based Password Design',
        'Passphrase / Memorable Password Techniques',
      ],
      toolsUsed: [
        'Python 3.14',
        'Tkinter / ttk (Aqua theme)',
        'SQLite3',
        'PyInstaller 6.x',
        'macOS .app bundle (arm64)',
        'string module (ascii_letters, digits, punctuation)',
        'random.choice() — character pool generation',
      ],
      learnings: [
        'Memorable passphrases (word combinations) are both user-friendly and cryptographically strong — better adoption than random strings',
        'Storing generated passwords locally in ~/Library/Application Support is the right pattern — never in the app bundle or a shared location',
        'PyInstaller packaging requires careful path handling — hardcoded paths break after distribution; os.path.expanduser() is essential',
      ],
    },
  },

  // ── GROUP 2: Enterprise IT Rollouts ──────────────────────
  {
    emoji: '🖥️', group: 'Enterprise IT Rollouts',
    title: 'Modern Workplace Migration', subtitle: 'SCCM → Intune/Autopilot · 200+ Users · 90 Days',
    status: 'Completed', category: 'Change Management · MDM',
    description: 'Led the full migration of 200+ users from legacy SCCM to Microsoft Intune/Autopilot zero-touch provisioning and Azure AD. Completed in 90 days across Windows, macOS (JamF), iOS, and Android — zero business disruption.',
    highlights: ['Phased rollout: IT pilot → low-risk → standard → executives', 'Zero-touch Autopilot: new device setup 3.5 hrs → 45 minutes', 'JamF for macOS: FileVault, app bundle, Defender — 15-min enrollment', 'Conditional Access: legacy auth blocked, MFA + named locations enforced', 'Device compliance: 62% → 94% within 90 days', 'Microsoft Secure Score: 41% → 71% post-deployment', 'Zero C-suite escalations during entire rollout'],
    tags: ['Intune', 'Autopilot', 'Azure AD', 'JamF', 'SCCM', 'Change Management'],
    pmDetails: { scope: 'Migrate 200+ users from on-premises SCCM legacy management to cloud-native Microsoft Intune/Autopilot across all device platforms.', objectives: ['Eliminate SCCM on-premises infrastructure dependency', 'Achieve zero-touch device provisioning for all new hires', 'Enforce device compliance from anywhere without VPN', 'Improve Secure Score by minimum 20 points'], stakeholders: 'IT team (delivery), 200+ end users (3 offices), IT Manager (sponsor), C-suite (executive users requiring white-glove)', timeline: '90 days (phased: 3 waves)', outcomes: ['Device compliance: 62% → 94%', 'New device setup: 3.5 hrs → 45 min', 'Remote device visibility: 30% → 100%', 'Secure Score: 41% → 71%'], skillsApplied: ['Change Management', 'Microsoft Intune MDM', 'Azure AD Administration', 'Project Management', 'User Adoption'], toolsUsed: ['Microsoft Intune', 'Autopilot', 'Azure AD / Entra ID', 'JamF', 'Microsoft Endpoint Manager', 'Conditional Access'], learnings: ['Pilot with IT team first — never with executives — you need 2 weeks to find edge cases', 'Report-only mode for Conditional Access before enforcement prevents major incidents', 'User communication explaining the WHY reduces helpdesk tickets by 40%+ during rollout'] },
  },
  {
    emoji: '🔐', group: 'Enterprise IT Rollouts',
    title: 'Zero Trust Security Architecture', subtitle: 'Azure Security · Secure Score 41% → 78%',
    status: 'Completed', category: 'Cybersecurity · Enterprise',
    description: 'Designed and deployed Zero Trust security architecture for a 200+ user multinational — Conditional Access, MFA, Defender for M365, PIM, DLP, and SIEM pilot. Secure Score raised from 41% to 78% over 12 months.',
    highlights: ['5 Conditional Access policies — legacy auth blocked, compliant devices enforced', 'MFA: named locations trusted, all external access requires MFA', 'Defender for M365: EDR enabled, Secure Score 41% → 78%', 'PIM: no permanent Global Admin accounts', 'DLP: sensitivity labels on SharePoint and email', 'Security awareness: 200+ users trained, phishing simulation completed'],
    tags: ['Azure Security', 'Zero Trust', 'Conditional Access', 'MFA', 'Defender', 'PIM', 'DLP'],
    pmDetails: { scope: 'Implement Zero Trust security architecture aligned to Microsoft best practices across the full Microsoft 365 and Azure AD tenant.', objectives: ['Eliminate all legacy authentication attack vectors', 'Enforce device compliance as condition for resource access', 'Achieve 75%+ Microsoft Secure Score', 'Implement privileged access governance via PIM'], stakeholders: 'IT Manager (sponsor), CISO/Security (requirement owner), 200+ end users, Microsoft (vendor support)', timeline: '12 months (phased implementation)', outcomes: ['Secure Score: 41% → 78%', 'Legacy auth attacks: eliminated', 'Zero security incidents attributed to identity compromise', 'All admin access PIM-governed with audit trail'], skillsApplied: ['Azure Security Engineering', 'Identity & Access Management', 'Security Architecture Design', 'Compliance Management'], toolsUsed: ['Azure AD / Entra ID', 'Microsoft Defender for M365', 'Intune Compliance Policies', 'PIM', 'DLP Policies', 'Microsoft Sentinel'], learnings: ['Named locations are the single highest-ROI Conditional Access configuration', 'PIM with approval workflows creates an audit trail that satisfies every compliance auditor', 'Secure Score is addictive once you start — gamification drives real security improvements'] },
  },
  {
    emoji: '🏢', group: 'Enterprise IT Rollouts',
    title: 'Riyadh HQ IT Infrastructure Rebuild', subtitle: '15 Meeting Rooms · 1.2M SAR · Zero Disruption',
    status: 'Completed', category: 'IT Infrastructure · Project Management',
    description: 'Led complete IT infrastructure rebuild for major head office renovation — 15 meeting rooms with full AV, Cisco/Aruba network rebuild, HP server room, and digital signage. Project value 1.2M SAR.',
    highlights: ['15 meeting rooms: Teams MTR, Logitech Rally, Poly Pano, Evoko booking', 'Cisco switch/router replacement: WAN, LAN, NAC, Aruba Wireless', 'HP server room: rack rebuild, cabling, SCCM deployment, UPS config', 'Digital signage (SVM/ITPP): all office floors deployed', 'Vendor management: Destiny and Beetra via SAP Ariba', '200+ users migrated — zero business disruption'],
    tags: ['Cisco', 'Aruba', 'HP Servers', 'Teams MTR', 'Crestron', 'SAP Ariba', 'Project Mgmt'],
    pmDetails: { scope: 'Full IT infrastructure design, procurement, and deployment for a major head office renovation — covering network, server room, meeting rooms, and digital signage.', objectives: ['Deploy 15 fully-equipped Teams-certified meeting rooms', 'Rebuild core network with current-generation Cisco/Aruba hardware', 'Migrate 200+ users to new infrastructure with zero productivity loss', 'Complete project on schedule aligned to renovation timeline'], stakeholders: 'Country MD (sponsor), Facilities (build partner), IT team (delivery), Vendors: Destiny/Beetra, 200+ end users', timeline: '6 months (phased with renovation schedule)', outcomes: ['15 meeting rooms delivered and signed off by C-level', 'Network fully modernised — zero connectivity incidents post-go-live', '200+ users migrated in single weekend cutover', 'Completed on time aligned to renovation schedule'], skillsApplied: ['IT Infrastructure Design', 'Project Management', 'Vendor Management', 'AV Systems Integration', 'Network Architecture'], toolsUsed: ['Cisco IOS', 'Aruba APs', 'HP ProLiant', 'MS Teams MTR', 'Crestron', 'SAP Ariba', 'Visio'], learnings: ['Pre-event AV testing 3 hours before (not 30 minutes) eliminates all discovery incidents', 'Vendor relationship investment pays dividends when you need emergency replacements', 'A complete network diagram in SharePoint saves days of troubleshooting in future'] },
  },
  {
    emoji: '🏗️', group: 'Enterprise IT Rollouts',
    title: 'New Office Build-Out: IT Planning & Installation', subtitle: 'Jeddah & Al-Khobar Branches · End-to-End Design',
    status: 'Completed', category: 'IT Infrastructure · Office Build-Out',
    description: 'Led full IT technology planning and installation for new branch office build-outs — requirements gathering, design, procurement, installation, testing, and handover covering network, AV, workstations, printing, and security.',
    highlights: ['IT requirements planning: floor plan review, network point layout, room AV design', 'Full BOM raised via SAP Ariba — approved before works began', 'Structured cabling: Cat6 to TIA-568 standard', 'Cisco switches and Aruba APs: VLANs configured, ISP circuit activated', 'Workstations Autopilot-enrolled on arrival — users operational Day 1', 'Handover: site acceptance testing, network diagram, admin guide delivered'],
    tags: ['Network Design', 'Structured Cabling', 'Cisco', 'Autopilot', 'AV', 'SAP Ariba'],
    pmDetails: { scope: 'Plan and deliver complete IT infrastructure for new branch office openings — from design through handover to local IT team.', objectives: ['Design IT infrastructure before construction begins', 'Ensure Day 1 operational readiness for all staff', 'Deliver structured cabling to professional standard', 'Provide complete documentation for ongoing support'], stakeholders: 'Office Manager (local sponsor), Facilities/Construction, IT Manager (sign-off), incoming branch staff', timeline: '8 weeks per location', outcomes: ['Branch offices fully operational on Day 1', 'Zero cabling or network rework required post-handover', 'All devices Autopilot-enrolled — zero IT setup required on arrival', 'Full documentation handed over to IT team'], skillsApplied: ['IT Infrastructure Planning', 'Structured Cabling', 'Network Design', 'Project Coordination', 'Vendor Management'], toolsUsed: ['Cisco Switches', 'Aruba APs', 'Autopilot/Intune', 'Visio', 'SAP Ariba', 'Cat6 structured cabling'], learnings: ['IT planning must start at floor plan stage — retrofitting network points is expensive', 'Full BOM approved before any contractor starts prevents scope creep', 'Site acceptance testing with sign-off sheet protects against future disputes'] },
  },
  {
    emoji: '🖧', group: 'Enterprise IT Rollouts',
    title: 'Server Room & Network Device Replacement', subtitle: 'HP Servers · Cisco · Aruba Wi-Fi 6 · Weekend Cutover',
    status: 'Completed', category: 'IT Infrastructure · Network Refresh',
    description: 'Led end-of-life server and network infrastructure replacement — HP server rack rebuild, Cisco switch replacement, Aruba Wi-Fi 6 APs, and NAC reconfiguration. Completed in a weekend maintenance window with zero production impact.',
    highlights: ['HP ProLiant server deployment: racking, cabling, RAID config, OS installation', 'Cisco 48-port PoE switch replacement: VLAN config migrated from legacy hardware', 'Aruba Wi-Fi 6 APs: coverage remapped, full wireless audit post-deployment', 'NAC Controllers: reconfigured for new hardware — 802.1X authentication verified', 'WAN/ISP failover tested: primary and secondary links verified post-cutover', 'Full network diagram updated and uploaded to SharePoint runbook'],
    tags: ['HP Servers', 'Cisco', 'Aruba Wi-Fi 6', 'NAC', 'VLAN', 'SCCM'],
    pmDetails: { scope: 'Replace end-of-life server and network infrastructure during planned maintenance window with zero business impact.', objectives: ['Decommission EOL hardware before warranty expiry', 'Deploy current-generation server and network equipment', 'Migrate all configurations with zero data loss', 'Complete within a single weekend maintenance window'], stakeholders: 'IT Manager (sponsor), Data Centre team, Network team, Business operations (impacted by downtime)', timeline: 'Friday 10 PM → Sunday 6 AM maintenance window', outcomes: ['100% hardware replacement completed in single weekend', 'Zero production incidents during or after cutover', 'Wi-Fi 6 upgrade: 40% improvement in wireless throughput', 'All VLAN configs and ACLs migrated without rework'], skillsApplied: ['Network Infrastructure', 'Server Administration', 'Change Management', 'Risk Management', 'Technical Documentation'], toolsUsed: ['HP ProLiant', 'Cisco IOS', 'Aruba Wi-Fi 6', 'SCCM', 'Visio', 'NAC / 802.1X'], learnings: ['A detailed cutover checklist reviewed 48 hours before is the difference between smooth and chaotic', 'Dual ISP failover testing must be done with real traffic, not just ping tests', 'Updated network documentation in SharePoint paid off within 6 months when a new engineer joined'] },
  },
  {
    emoji: '📊', group: 'Enterprise IT Rollouts',
    title: 'SAP PowerBI IT Operations Dashboard', subtitle: 'KPI Reporting · SAP Work Zone · C-Level Visibility',
    status: 'Live', category: 'Analytics · Enterprise IT',
    description: 'PowerBI dashboards for real-time IT KPIs — asset lifecycle, ServiceNow SLA stats, ticket volume trends, and procurement spend. Integrated with SharePoint and SAP Work Zone for live data feeds accessible by IT leadership.',
    highlights: ['Page 1: Executive Summary — SLA %, open tickets, critical issues (MD view)', 'Page 2: Ticket Operations — volume, by category, by engineer, aging', 'Page 3: Asset Health — stock levels, warranty expiry, refresh planning', 'Page 4: Procurement Spend — monthly, vendor breakdown, YTD', 'SAP Work Zone integration — published to all KSA IT team members', 'Replaced manual monthly Excel reports sent via email'],
    tags: ['PowerBI', 'SharePoint', 'SAP Work Zone', 'ServiceNow', 'REST API'],
    pmDetails: { scope: 'Replace manual Excel-based IT reporting with live PowerBI dashboards accessible by all stakeholders from SAP Work Zone.', objectives: ['Provide real-time SLA visibility to IT management', 'Eliminate manual monthly Excel report generation', 'Give C-level single-page IT health overview', 'Enable self-service reporting for IT team members'], stakeholders: 'Country MD (executive view), IT Manager (operational view), Finance (procurement data), IT Team (daily view)', timeline: '4 weeks build + ongoing', outcomes: ['Manual monthly reports eliminated — 3 hrs/month saved', 'C-level reads dashboard every Monday without IT input', 'SLA breach rate visible in real-time — faster intervention', 'Procurement spend tracked monthly — 0 budget surprises'], skillsApplied: ['PowerBI Development', 'Data Analytics', 'Dashboard Design', 'ServiceNow API Integration', 'Stakeholder Management'], toolsUsed: ['Microsoft PowerBI', 'ServiceNow REST API', 'SharePoint Online', 'SAP Work Zone', 'Microsoft Excel'], learnings: ['Start with the question your manager asks most — not the data you have available', 'Publishing to SAP Work Zone increases viewership 10x vs. emailing a PDF', 'A dashboard that nobody reads is worse than no dashboard — user testing is essential'] },
  },
  {
    emoji: '📱', group: 'Enterprise IT Rollouts',
    title: 'MENA Device Approval & Procurement Workflow', subtitle: 'Power Apps + SAP Ariba · 200–300K SAR/Month',
    status: 'Live', category: 'Process Automation · Procurement',
    description: 'Power Apps-based IT device approval system for MENA — replacing manual email chains. Handles employee requests, management approvals, and SAP Ariba PO creation. Processes 200–300K SAR/month in hardware approvals.',
    highlights: ['Power Apps front-end: employee device requests (laptops, mobiles, accessories)', 'Multi-level approval: user → IT manager → Country MD → SAP Ariba PO', 'SAP Ariba integration — approved requests auto-create PR/PO', 'Managed MENA device approvals: ~200–300K SAR/month, ~600K/year', 'Power Automate: notifications, escalations, approval reminders', 'Replaced 100% of manual email-based approval process'],
    tags: ['Power Apps', 'Power Automate', 'SAP Ariba', 'SharePoint', 'PR/PO Workflow'],
    pmDetails: { scope: 'Automate the IT device approval and procurement workflow for the MENA region — replacing manual email chains with a governed Power Apps process.', objectives: ['Eliminate untracked email approvals', 'Enforce multi-level approval governance', 'Auto-create SAP Ariba POs on approval', 'Provide audit trail for all device procurement'], stakeholders: 'IT Manager (process owner), Country MD (final approval), Procurement/Finance, 200+ MENA employees (requestors)', timeline: '6 weeks development + rollout', outcomes: ['100% of manual email approvals replaced', 'Large-volume device procurement managed through governed workflow', 'Average approval time: 5 days → 2 days', 'Full audit trail available for all procurement decisions'], skillsApplied: ['Power Apps Development', 'Process Design', 'SAP Ariba Integration', 'Workflow Automation', 'Change Management'], toolsUsed: ['Microsoft Power Apps', 'Power Automate', 'SAP Ariba', 'SharePoint', 'Microsoft Teams'], learnings: ['Multi-level approval workflows require careful escalation timeout rules to avoid stalling', 'Integrating Power Automate with SAP Ariba via REST API is more reliable than screen scraping', 'User adoption is faster when the new tool is visibly faster than the old email chain'] },
  },

  // ── GROUP 3: ITSM & Service Management ─────────────────────────
  {
    emoji: '🔄', group: 'IT Ticketing & ITSM',
    title: 'ServiceNow ITSM Migration: IT Direct → SNOW', subtitle: '200+ Users · SLA Redesign · Change Management',
    status: 'Completed', category: 'ITSM · Change Management',
    description: 'Managed full migration from legacy IT Direct to ServiceNow — ticket data migration, SLA framework redesign, auto-assignment rules, KB architecture, and adoption training for 200+ users across 3 offices.',
    highlights: ['SLA framework redesigned: P1–P4 matrix with executive override rules', 'Auto-assignment rules: category + location → correct team routing', '80+ KB articles migrated and quality-audited', 'ServiceNow dashboard: SLA %, volumes, aging A/R, FCR metrics', 'First Contact Resolution improved to 75%+ post-migration', 'Go-live completed with zero P1 tickets during cutover weekend'],
    tags: ['ServiceNow', 'IT Direct', 'ITIL v3', 'Migration', 'Change Management', 'SLA Design'],
    pmDetails: { scope: 'Migrate from legacy IT Direct ticketing system to ServiceNow with full ITIL v3 service design — including all historical data, KB articles, and user adoption.', objectives: ['Complete data migration from IT Direct with zero data loss', 'Redesign SLA framework aligned to ITIL v3 best practices', 'Train 200+ users across 3 office locations', 'Achieve go-live with zero P1 incidents during cutover'], stakeholders: 'IT Manager (sponsor), 200+ end users (3 offices), IT team (delivery), ServiceNow (platform)', timeline: '3 months (planning → go-live)', outcomes: ['Zero data loss during migration', 'FCR improved from <50% to 75%+', 'SLA compliance: 94%+ within 3 months of go-live', 'Monthly reporting fully automated via PowerBI + SNOW API'], skillsApplied: ['ITSM Implementation', 'Data Migration', 'SLA Design', 'Change Management', 'ITIL v3 Process Design'], toolsUsed: ['ServiceNow', 'IT Direct', 'PowerBI', 'ServiceNow REST API', 'Microsoft Excel'], learnings: ['SLA framework redesign should happen before migration, not during — retroactive changes cause confusion', 'Migrating KB articles requires a quality audit — bad articles transferred = bad knowledge base', 'Go-live on a Friday night with Monday morning review gives you the weekend to fix any issues'] },
  },
  {
    emoji: '🎫', group: 'IT Ticketing & ITSM',
    title: 'ServiceNow CSM/FSM Ticketing & Interaction Management', subtitle: '1,300+ Interactions · 65 SC Tasks/Month · CSM/FSM Workspace · HCSM CoPilot',
    status: 'Live', category: 'ITSM · ServiceNow CSM/FSM',
    description: 'Full daily operations using ServiceNow CSM/FSM Configurable Workspace — managing interactions, catalog tasks, incidents, service requests, and walk-up queue for an enterprise IT support team. Handles multiple ticket types (Interaction, Catalog Task, Incident, Problem, Service Request) with automated routing, SLA tracking, and AI-assisted resolution via HCSM CoPilot.',
    highlights: [
      'CSM/FSM Configurable Workspace: custom agent dashboard with live KPIs — IRT/MPT SLA breached, In Danger, Resolved',
      '1,300+ total interactions managed at single location — walk-up, chat, and remote channels',
      '65 SC Tasks closed per month — catalog tasks covering hardware, onboarding, lifecycle ops',
      '31 interactions closed per 30-day period — meeting room support, BYOD setup, MacBook setup, device issues',
      'HCSM CoPilot: AI-powered assistant for use case search and resolution suggestions within tickets',
      'Walk-up queue management: agent availability status (SAP IT / Chat / Calls / Walk-up), live interaction assignment',
      'Multiple ticket types handled: Interaction, Service Request, Problem, Incident, ProdSec Vulnerability',
      'Closing templates: standardised CPIT-CS closing messages with satisfaction survey links',
    ],
    tags: ['ServiceNow CSM/FSM', 'HCSM CoPilot', 'ITIL v3', 'SLA Management', 'Walk-up Queue', 'Catalog Tasks', 'Incident Management'],
    pmDetails: {
      scope: 'Daily operation of ServiceNow CSM/FSM Configurable Workspace for enterprise IT support — interaction management, catalog task handling, walk-up queue, and AI-assisted resolution.',
      objectives: [
        'Maintain zero breached IRT/MPT SLAs through proactive dashboard monitoring',
        'Process 60+ catalog tasks and 30+ interactions per month within SLA',
        'Manage walk-up queue availability across SAP IT, Chat, Calls, and Walk-up channels',
        'Use HCSM CoPilot AI to accelerate resolution and improve first-contact resolution rate',
        'Apply standardised closing templates for consistent user communication and satisfaction tracking',
      ],
      stakeholders: 'End users (200+ across 3 offices), IT Manager (SLA reporting), regional IT leadership (dashboard KPIs)',
      timeline: 'Ongoing daily operations',
      outcomes: [
        '1,300+ interactions handled at primary support location',
        '65 catalog tasks closed per 30-day period',
        '31 interactions closed per 30-day period',
        'Zero P1 incidents breaching IRT SLA in monitored period',
        'HCSM CoPilot integrated into daily resolution workflow',
        'Agent availability actively managed across 5 channel types',
      ],
      skillsApplied: [
        'ServiceNow CSM/FSM Workspace Administration',
        'ITSM Operations & SLA Management',
        'Walk-up Queue Management',
        'AI-Assisted ITSM (HCSM CoPilot)',
        'Interaction & Catalog Task Lifecycle Management',
        'IRT/MPT SLA Monitoring & Escalation',
        'ITIL v3 Incident, Problem & Request Handling',
      ],
      toolsUsed: [
        'ServiceNow CSM/FSM Configurable Workspace',
        'HCSM CoPilot (AI resolution assistant)',
        'ServiceNow Interaction Management',
        'ServiceNow Catalog Task (SCTASK)',
        'ServiceNow Incident Management',
        'ServiceNow Walk-up Module',
        'PowerBI (SLA KPI reporting)',
      ],
      learnings: [
        'CSM/FSM Configurable Workspace provides real-time visibility that a standard SNOW list view cannot — the custom KPI tiles surface breached and in-danger SLAs before managers escalate',
        'HCSM CoPilot reduces average handle time by surfacing relevant KB articles and use cases within the ticket — eliminating the search step that consumes 2–3 minutes per ticket',
        'Managing agent availability status across 5 channels (SAP IT, Chat, Calls, Walk-up, combined) requires a clear protocol — default to Walk-up when in the IT Link Center, Chat/Calls when remote',
      ],
    },
  },
  {
    emoji: '🤖', group: 'IT Ticketing & ITSM',
    title: 'ServiceNow HCSM AI Copilot — Daily IT Support Operations', subtitle: 'AI-Assisted ITSM · Walk-up Queue · 1,300+ Interactions · CSM/FSM Workspace',
    status: 'Live', category: 'AI-Assisted ITSM · ServiceNow',
    description: 'Daily use of ServiceNow HCSM AI Copilot integrated into the CSM/FSM Configurable Workspace — accelerating IT support resolution across walk-up interactions, catalog tasks, hardware lifecycle requests, and onboarding tickets. AI Copilot surfaces relevant use cases and KB articles within the ticket in real time, reducing resolution time and improving first-contact resolution for 1,300+ interactions at the Riyadh support location.',
    highlights: [
      'HCSM AI Copilot: live in daily operations — surfaces use cases and KB articles inside every ticket',
      'Walk-up queue management: agent availability managed across 5 channels (SAP IT, Chat, Calls, Walk-up)',
      '1,300+ interactions handled — walk-up, remote, and chat channels at primary support location',
      'Ticket types managed daily: Interaction, Catalog Task (SCTASK), Service Request, Incident, Problem, ProdSec Vulnerability',
      'Hardware lifecycle tasks: device return assistance (iPhone, MacBook, iPad, Android) via LifeCycle App integration',
      'New hire onboarding catalog tasks: IT setup, device provisioning, account activation — Day 1 readiness',
      'Meeting room support: dedicated service offering with standardised closing templates and satisfaction survey',
      'Live KPI dashboard: Incidents Resolved (30 days), SC Tasks closed, Open tasks, IRT/MPT SLA status — zero breach target',
    ],
    tags: ['HCSM AI Copilot', 'ServiceNow CSM/FSM', 'Walk-up Queue', 'ITIL v3', 'Catalog Tasks', 'Hardware Lifecycle', 'AI-Assisted ITSM'],
    pmDetails: {
      scope: 'Operate daily IT support using ServiceNow HCSM AI Copilot within the CSM/FSM workspace — managing the full range of IT support interactions, hardware lifecycle tasks, and onboarding workflows with AI assistance.',
      objectives: [
        'Use HCSM AI Copilot to accelerate every ticket resolution — zero manual KB search',
        'Manage walk-up queue availability across all 5 support channels',
        'Handle 60+ catalog tasks monthly: device lifecycle, hardware maintenance, onboarding',
        'Maintain zero P1/P2 SLA breaches through proactive dashboard monitoring',
        'Deliver consistent closing communication with standardised templates and satisfaction surveys',
      ],
      stakeholders: '200+ end users (IT support consumers), IT Manager (SLA and KPI reporting), regional IT leadership',
      timeline: 'Ongoing daily operations — live with AI Copilot since rollout',
      outcomes: [
        'HCSM AI Copilot actively used in every interaction — surfacing use cases in real time',
        '1,300+ interactions managed at single location with consistent quality',
        '65 catalog tasks closed per month — hardware lifecycle and onboarding',
        '31 interactions closed per 30-day period across all channels',
        'Agent availability optimised across 5 channel types throughout the working day',
        'Zero P1 IRT SLA breaches in actively monitored period',
      ],
      skillsApplied: [
        'AI-Assisted ITSM (HCSM CoPilot)',
        'ServiceNow CSM/FSM Workspace',
        'Walk-up Queue & Channel Management',
        'Hardware Lifecycle Task Management',
        'IT Onboarding Catalog Task Execution',
        'SLA/IRT/MPT Monitoring',
        'ITIL v3 Service Desk Operations',
      ],
      toolsUsed: [
        'ServiceNow HCSM AI Copilot',
        'ServiceNow CSM/FSM Configurable Workspace',
        'ServiceNow Walk-up Module',
        'ServiceNow Catalog Tasks (SCTASK)',
        'ServiceNow Interaction Management',
        'CLEA LifeCycle App (device return tasks)',
        'PowerBI (SLA KPI dashboard)',
      ],
      learnings: [
        'HCSM AI Copilot is most effective when the ticket description is specific — vague descriptions return generic results; training users to describe symptoms precisely improves AI suggestion quality',
        'Walk-up queue management requires a clear channel priority protocol — without it, agents drift between channels and response times suffer on the highest-priority walk-up channel',
        'Standardised closing templates with satisfaction survey links are essential — they create a feedback loop that identifies service quality gaps invisible in SLA metrics alone',
      ],
    },
  },
  {
    emoji: '📚', group: 'IT Ticketing & ITSM',
    title: 'ServiceNow Knowledge Base Programme', subtitle: '80+ Articles · FCR <50% → 75%+ · Self-Service',
    status: 'Live', category: 'Knowledge Management · ITSM',
    description: 'Built ServiceNow KB from scratch — migrated legacy documentation, created new articles, established quality standards, and ran quarterly review cycles. FCR improved from below 50% to 75%+ within 6 months.',
    highlights: ['KB template: symptom → cause → resolution → escalation path', '80+ articles migrated from IT Direct with quality review', 'Top-20 ticket types: dedicated KB articles covering 80% of recurring issues', 'Quarterly review cycle: outdated articles updated or retired', 'Self-service portal linked to KB — users guided before raising tickets', 'FCR: from <50% to 75%+ within 6 months of launch'],
    tags: ['ServiceNow KB', 'Knowledge Management', 'ITIL v3', 'FCR Improvement', 'Self-Service'],
    pmDetails: { scope: 'Build a high-quality ServiceNow Knowledge Base that empowers users to self-serve — reducing ticket volume and improving first-call resolution.', objectives: ['Create KB articles for top 20 recurring ticket types', 'Establish article quality standard and review process', 'Achieve 75%+ First Call Resolution within 6 months', 'Reduce repeat tickets on known issues by 40%+'], stakeholders: 'IT Manager (KB quality owner), IT engineers (article authors), 200+ end users (KB consumers)', timeline: '2 months initial build + quarterly ongoing maintenance', outcomes: ['80+ articles live and maintained', 'FCR: <50% → 75%+', 'Repeat tickets on known issues reduced by 45%', 'Quarterly review cycle embedded in IT operations calendar'], skillsApplied: ['Knowledge Management', 'Content Writing', 'ITIL v3 KCS', 'Self-Service Design', 'FCR Improvement'], toolsUsed: ['ServiceNow KB Module', 'ServiceNow Self-Service Portal', 'ITIL v3 Framework', 'ServiceNow Analytics'], learnings: ['80% of recurring tickets can be resolved by 20% of well-written KB articles', 'KB article quality declines rapidly without a quarterly review cycle — set it as a recurring calendar item', 'Self-service portal placement (before ticket form) is the single biggest FCR driver'] },
  },
  {
    emoji: '👥', group: 'IT Ticketing & ITSM',
    title: 'IT Onboarding/Offboarding Automation', subtitle: '140+ Executives & Staff · Day 1 Setup: 4hrs → 30min',
    status: 'Live', category: 'Process Automation · HR-IT',
    description: 'Designed and implemented standardised IT onboarding/offboarding for 140+ employees including C-level executives — reducing Day 1 IT setup from 4 hours to 30 minutes through automation, pre-staging, and DocuSign digital workflows.',
    highlights: ['Day 1 readiness: device pre-staged, accounts active, apps deployed before arrival', 'T-14 day trigger: IT request auto-raised in SNOW on HR confirmation', 'Azure AD provisioning: accounts, licenses, groups automated', 'DocuSign: asset assignment signed digitally — zero paper', 'Offboarding: account disable, device wipe, data backup within 2 hours', '140+ onboardings including Country MD, CFO, COO-level executives'],
    tags: ['Azure AD', 'ServiceNow', 'DocuSign', 'Intune Autopilot', 'M365', 'Process Automation'],
    pmDetails: { scope: 'Standardise and automate the IT onboarding/offboarding process to ensure Day 1 readiness for all employees and clean offboarding within the same day.', objectives: ['Reduce Day 1 IT setup time from 4 hours to under 45 minutes', 'Automate account provisioning via Azure AD', 'Eliminate paper-based asset assignment forms', 'Complete offboarding IT tasks within 2 hours of last day'], stakeholders: 'HR (process trigger), IT Manager (process owner), New employees (Day 1 experience), Managers (device requests), Finance (asset tracking)', timeline: '4 weeks design + implementation', outcomes: ['Day 1 setup: 4 hrs → 30 min', '140+ onboardings completed — zero Day 1 failures', 'IT offboarding ticket volume reduced 60%', 'Zero data exposure incidents during offboarding'], skillsApplied: ['Process Automation', 'Azure AD Administration', 'Intune Device Management', 'DocuSign Integration', 'HR-IT Collaboration'], toolsUsed: ['Azure AD / Entra ID', 'Microsoft Intune/Autopilot', 'ServiceNow', 'DocuSign', 'Power Automate', 'M365 Admin Center'], learnings: ['T-14 day pre-trigger is the key — Day 1 failures happen because IT finds out on Day 0', 'DocuSign replaces paper forms and creates a legally admissible audit trail simultaneously', 'Offboarding is more security-critical than onboarding — a forgotten account is a vulnerability'] },
  },
  {
    emoji: '🖥️', group: 'IT Ticketing & ITSM',
    title: 'IT Link Center (ITLC) Walk-up System Deployment', subtitle: '2 iPad Kiosks · Queue Monitor · ServiceNow Walk-up · Jamf MDM',
    status: 'Live', category: 'ITSM · ServiceNow · MDM',
    description: 'Designed, configured, and deployed a full IT Link Center Walk-up system for the Riyadh office — 2 iPad kiosks for user check-in, 1 large-screen queue monitor, and full backend integration with ServiceNow Walk-up module. Enables structured onsite and remote IT appointment management with a live agent dashboard.',
    highlights: [
      '2 iPad kiosks deployed: Apple ADE zero-touch enrolment via Jamf Cloud MDM',
      'Jamf ITLC Extension Attribute configured: iPads locked to Walk-up kiosk mode',
      '1 large-screen queue monitor: Digital Signage machine imaged via Microsoft Intune',
      'ServiceNow Walk-up backend: user check-in → agent queue → ticket auto-creation',
      'Agent dashboard: technicians process onsite walk-ups and remote appointments',
      'Naming convention applied: ITLC-[building code] — tracked in asset management',
      'Credentials managed via corporate PassVault — no hard-coded or printed passwords',
      'Queue display auto-refreshes every 15 min via ServiceNow Walk-up URL playlist',
    ],
    tags: ['ServiceNow Walk-up', 'Jamf MDM', 'Apple ADE', 'Microsoft Intune', 'Digital Signage', 'iPad', 'Queue Management', 'PassVault'],
    pmDetails: {
      scope: 'Deploy a fully functional IT Link Center Walk-up system for the Riyadh IT office — covering iPad kiosk setup, Jamf MDM configuration, ServiceNow Walk-up integration, and queue monitor installation.',
      objectives: [
        'Replace informal walk-up queue with structured ServiceNow-integrated check-in system',
        'Enable users to register onsite IT visits and track their queue position',
        'Give IT agents a live dashboard to manage walk-up and remote appointments',
        'Ensure secure credential management via PassVault — no printed passwords',
        'Deliver zero-touch iPad enrolment via Apple ADE and Jamf Cloud',
      ],
      stakeholders: 'IT Manager (sponsor), IT Link Center technicians (daily users), 200+ end users (walk-up visitors), Jamf Regional Mobile RDE (MDM config), ServiceNow platform team',
      timeline: '2 weeks (setup, enrolment, configuration, go-live)',
      outcomes: [
        '2 iPad kiosks live — users self-register and view queue status on arrival',
        '1 large-screen queue monitor displaying live ServiceNow walk-up queue',
        'ServiceNow tickets auto-created for every walk-up registration',
        'Agent dashboard enables onsite + remote appointment processing',
        'Zero credential exposure — all service account passwords in PassVault',
        'Jamf kiosk mode prevents iPad from being used for any other purpose',
      ],
      skillsApplied: [
        'Jamf MDM Administration',
        'Apple ADE (Automated Device Enrolment)',
        'ServiceNow Walk-up Module Configuration',
        'Microsoft Intune — Digital Signage Imaging',
        'Digital Signage Portal Configuration',
        'PassVault / Secret Management',
        'ITSM Queue Management Design',
        'IT Project Delivery',
      ],
      toolsUsed: [
        'Jamf Cloud MDM',
        'Apple ADE',
        'ServiceNow (Walk-up Module)',
        'Microsoft Intune',
        'Digital Signage Portal',
        'iPad (iPadOS 15+)',
        'Corporate PassVault',
        'Google Chrome (queue display)',
        'Safari (kiosk portal)',
      ],
      learnings: [
        'Setting the ITLC Extension Attribute in Jamf before going live is the single most important step — without it the iPad is not locked to kiosk mode',
        'Retrieving service account passwords from PassVault every time (not printing them) is essential — the .docx credential backup is a security risk to eliminate',
        'Setting queue display duration to 900 seconds prevents stale queue data while avoiding excessive ServiceNow API calls',
      ],
    },
  },
  {
    emoji: '📲', group: 'IT Ticketing & ITSM',
    title: 'CLEA — SAP Asset Lifecycle Operations (Daily Use)', subtitle: 'SAP BTP · QR Scanning · On/Offboarding · Pool Stock · Power BI',
    status: 'Live', category: 'IT Asset Management · SAP BTP',
    description: 'Daily operational use of CLEA (Client Lifecycle Enterprise Application) — SAP BTP-hosted internal web and mobile app for end-to-end IT hardware lifecycle management. Covers new hire device assignment (on-boarding), monthly pool stock QR scanning in the IT storage room, equipment returns from leavers (off-boarding), goods receipt, and live KPI reporting via Power BI. Used daily for managing 89+ pool devices across 6 categories at RUH-SR01 Riyadh.',
    highlights: [
      'Monthly IT Storage Room Inventory: scan 89 devices (laptops, MacBooks, iPhones, iPads, Android, monitors) using mobile CLEA app + camera/QR scanner',
      'On-boarding module: assign pre-staged devices to new joiners — links to ServiceNow ticket and SAP ISP ERP record',
      'Off-boarding module: calendar-driven equipment recovery from leavers — return receipt, device wipe, back to pool',
      'Goods Receipt: receive new hardware from SAP Ariba procurement, register in CLEA, ABC classification applied (S/N/R)',
      'Pool Stock: IT Storage Room RUH-SR01 — 8 laptops, 20 MacBooks, 30 iPhones, 21 iPads, 7 monitors live tracked',
      'IT Operational Dashboard: live KPIs — pending on-boardings, off-boardings in progress, missing device scan alerts',
      'Power BI integration: global asset inventory reports across 18+ countries, missing data flags, inventory cycle tracking',
      'Mass hardware pre-assignment: bulk assign devices to multiple users before Day 1 — reduces setup time to 30 min',
    ],
    tags: ['SAP BTP', 'CLEA App', 'QR Asset Scanning', 'SAP ISP', 'Power BI', 'Onboarding', 'Offboarding', 'IT Asset Management'],
    pmDetails: {
      scope: 'Daily operational management of IT hardware lifecycle using the CLEA SAP BTP application — covering on-boarding, pool stock management, off-boarding recovery, procurement intake, and Power BI KPI reporting.',
      objectives: [
        'Maintain 100% accurate pool stock records via monthly QR scan of all 89 devices in RUH-SR01',
        'Ensure Day 1 device readiness for new hires — assigned before arrival using CLEA on-boarding module',
        'Complete off-boarding hardware recovery within SLA — CLEA calendar triggers IT action on leaver confirmation',
        'Receive and register all new hardware from SAP Ariba procurement via CLEA Goods Receipt',
        'Surface missing device data and inventory KPIs via Power BI for management reporting',
      ],
      stakeholders: 'New hire employees (on-boarding), leaving employees (off-boarding), IT Manager (KPIs), Finance (asset cost tracking), Procurement (Goods Receipt), Global IT (Power BI reporting)',
      timeline: 'Ongoing daily operations — monthly scan cycle, event-driven on/off-boarding',
      outcomes: [
        '89 pool devices accurately tracked in RUH-SR01 storage room across 6 categories',
        'Monthly inventory scan completed within 5-day cycle window (2026-07-12 to 2026-07-17 cycle verified)',
        'Zero hardware discrepancies — QR scan confirms physical inventory matches SAP system records',
        'All on-boarding device assignments linked to SAP ISP, ServiceNow, and CLEA for full audit trail',
        'Power BI dashboard covers 18+ countries — global inventory visibility for senior IT leadership',
      ],
      skillsApplied: [
        'SAP BTP Application Administration',
        'IT Asset Lifecycle Management',
        'Mobile QR/Barcode Scanning Operations',
        'Employee Onboarding/Offboarding IT Workflow',
        'Goods Receipt & Procurement Integration (SAP Ariba)',
        'Power BI Reporting & KPI Tracking',
        'ABC Asset Classification (S/N/R)',
        'IT Storage Room Inventory Management',
      ],
      toolsUsed: [
        'CLEA (Client Lifecycle Enterprise Application) — SAP BTP',
        'Mobile CLEA App (iOS/Android) — QR/barcode scanner',
        'SAP ISP (IT asset ERP system)',
        'SAP Ariba (procurement — Goods Receipt source)',
        'ServiceNow ITSM (ticket integration)',
        'Microsoft Power BI (global inventory KPI dashboard)',
        'SAP BTP Cloud Foundry (eu10-004 region)',
      ],
      learnings: [
        'Monthly QR scanning with the mobile app is the only reliable way to verify physical inventory matches system records — automated MDM compliance data alone misses devices in storage',
        'CLEA\'s ABC classification (S=Standard, N=New, R=Repair/Return) is essential for procurement planning — without it, stock categories blur and refresh cycles become reactive',
        'Linking on-boarding device assignment in CLEA to the ServiceNow ticket creates a single audit trail from procurement to user to return — critical for compliance audits',
      ],
    },
  },

  // ── GROUP 4: AV, Events & Physical Security ─────────────────────
  {
    emoji: '📽️', group: 'AV, Events & Physical Security',
    title: 'Meeting Room Technology Rollout', subtitle: '15 Rooms · Teams MTR · Logitech Rally · Evoko',
    status: 'Completed', category: 'AV & Meeting Room Technology',
    description: 'Planned and delivered full meeting room technology upgrade across 15 rooms — legacy VC to Microsoft Teams Rooms standard with Logitech Rally, Poly Pano, Evoko booking, and Crestron boardroom systems. Zero business disruption.',
    highlights: ['15 rooms: small huddle (4-person) to large boardroom (30+ person)', 'Teams MTR: certified hardware — seamless Teams meeting join from any room', 'Logitech Rally: 4K camera, Rally Mic Pods — 8 standard meeting rooms', 'Poly Pano: panoramic bar — 4 open-plan collaboration spaces', 'Evoko booking panels: real-time availability, integrated with Exchange Online', 'Crestron: 5 boardrooms — wireless presentation, USB-C and HDMI switching'],
    tags: ['Teams MTR', 'Logitech Rally', 'Poly Pano', 'Evoko', 'Crestron', 'AV Integration'],
    pmDetails: { scope: 'Upgrade all 15 meeting rooms from legacy video conferencing to Microsoft Teams Rooms standard — enabling one-touch meeting join for all users.', objectives: ['Replace all legacy VC equipment with Teams-certified hardware', 'Deploy room booking system integrated with Exchange Online', 'Train 200+ users on new room technology', 'Complete rollout with zero meeting cancellations'], stakeholders: 'Country MD (sponsor), IT Manager (delivery), Facilities, 200+ end users, Vendors: Logitech/Poly/Crestron', timeline: '3 months (phased room-by-room)', outcomes: ['15 rooms upgraded — all Teams-certified', '200+ users trained — laminated guides in every room', 'Room booking via Evoko — zero scheduling conflicts', '5-year track record: zero AV failures at any executive event'], skillsApplied: ['AV Systems Integration', 'MS Teams MTR Administration', 'Project Management', 'User Training', 'Vendor Management'], toolsUsed: ['MS Teams Rooms', 'Logitech Rally', 'Poly Pano', 'Evoko Room Booking', 'Crestron', 'Exchange Online'], learnings: ['Room booking system integration with Exchange Online eliminates ghost bookings immediately', 'Laminated quick-start guides in every room reduce AV helpdesk tickets by 60%', 'Testing rooms with actual meeting participants (not just IT) reveals usability issues testing alone misses'] },
  },
  {
    emoji: '🎙️', group: 'AV, Events & Physical Security',
    title: 'C-Suite & Board-Level Event Delivery', subtitle: 'LEAP · Crown Plaza · Germany IBS · 5yr Zero Failures',
    status: 'Live', category: 'Event Management · VIP IT',
    description: 'Delivered AV and IT for 50+ high-stakes executive events — SAP Board meetings, CEO sessions at LEAP, Crown Plaza conferences, and live Germany IBS broadcasts. Supported SVPs, MDs, CFOs, COOs, and SAP AG board members.',
    highlights: ['LEAP 2023/2024: full AV setup and IT support for SAP sessions', 'Germany IBS live broadcast: dual-path network, Teams, synchronized delivery', 'Crown Plaza executive offsite: 300+ attendee AV — zero incidents', 'Pre-event protocol: 3-hour setup, rehearsal, backup hotspot, spare device', '5-year track record: zero AV failures at any executive event', 'Supported SAP EMEA President, Country MDs, Directors across MENA'],
    tags: ['AV Setup', 'MS Teams', 'Executive Support', 'Event Management', 'VIP IT'],
    pmDetails: { scope: 'Deliver reliable AV and IT infrastructure for all executive-level events — from weekly C-suite meetings to major external conferences and global broadcasts.', objectives: ['Ensure zero AV/IT failures at any C-suite or Board event', 'Deliver pre-event setup and testing 3 hours before every event', 'Maintain hot spare kit for immediate equipment swap', 'Support live broadcasts with dual-path redundancy'], stakeholders: 'Country MD, SVP MEA-North, CFO, COO, SAP AG Board members, Event coordinators', timeline: '50+ events over 5 years (ongoing)', outcomes: ['Zero AV/IT failures across 50+ executive events', '5-year consecutive perfect delivery record', 'Supported CEO-level meetings and SAP Board sessions', 'Germany IBS broadcasts delivered flawlessly on multiple occasions'], skillsApplied: ['VIP IT Support', 'AV Systems', 'Event Management', 'Executive Communication', 'Risk Management'], toolsUsed: ['MS Teams', 'Cisco AV', 'Logitech/Poly', 'Dual-path network setup', 'Hot spare device kit'], learnings: ['3-hour pre-event setup eliminates 100% of discovery incidents on the day', 'A hot spare kit (laptop + phone + hotspot) has saved C-suite presentations on multiple occasions', 'Silent IT support during executive events is the goal — the best IT is invisible IT'] },
  },
  {
    emoji: '🏦', group: 'AV, Events & Physical Security',
    title: 'Bank ATM & Branch Security System', subtitle: 'Banque Saudi Fransi · G4S MultiMax · Siecep · 24/7',
    status: 'Completed', category: 'Physical Security · Banking IT',
    description: 'Managed full ATM and branch physical security infrastructure for Banque Saudi Fransi — access control, CCTV, IoT sensors, and 24/7 monitoring across Riyadh HQ and multiple branches.',
    highlights: ['ATM security: Siecep management tool — full ATM network health monitoring', 'G4S MultiMax access control: employee badges for HQ and all branches', 'CCTV: installation, configuration, and 24/7 monitoring', 'IoT sensors: burglar alarms and fire systems — regular testing', 'BMC Remedy: ticket management and escalation processing', 'Banking platforms: Sicep, Vanguard, MultiMax, BMS — 24/7 continuity'],
    tags: ['Physical Security', 'Access Control', 'CCTV', 'BMC Remedy', 'Siecep', 'G4S MultiMax'],
    pmDetails: { scope: 'Manage complete physical security infrastructure for a banking institution — ATM systems, branch access control, CCTV, and alarm systems across all locations.', objectives: ['Ensure 24/7 ATM network health monitoring and alerting', 'Manage access control for HQ and all Saudi branches', 'Maintain CCTV coverage and incident recording capability', 'Ensure business continuity for all security platforms'], stakeholders: 'Branch Managers (access requests), Security Command Centre, IT Management, Regulatory Compliance', timeline: '3 years continuous operations (2012–2015)', outcomes: ['24/7 security operations maintained across all branches', 'Zero access control incidents during tenure', 'All CCTV evidence requests fulfilled within SLA', 'BMC Remedy ticket management established and optimised'], skillsApplied: ['Physical Security Management', 'Access Control Administration', 'Security Incident Response', 'CCTV Systems', 'BMC Remedy ITSM'], toolsUsed: ['Siecep ATM Security Tool', 'G4S MultiMax', 'BMC Remedy', 'Vanguard', 'CCTV Management Systems'], learnings: ['24/7 monitoring requires documented escalation paths — security incidents at 3 AM need clear procedures', 'Access card management requires strict joiner-mover-leaver processes to prevent privilege accumulation', 'Regular system testing (alarms, CCTV, access) is the only way to discover failures before incidents do'] },
  },

  {
    emoji: '🔑', group: 'Daily IT Operations',
    title: 'IT Locker Daily Operations — Smart Locker Management', subtitle: 'Locker Pickup Workflow · ITLC Overflow · 7-Day Expiry · Kiosk Inventory Reports',
    status: 'Live', category: 'Daily IT Ops · Smart Locker',
    description: 'Daily operation of the Signifi IT Pickup Point smart locker system — managing the full delivery lifecycle from technician drop-off through employee self-collection. Covers locker pickup creation, IT Link Center (ITLC) overflow management, 7-day expiry policy enforcement, kiosk inventory reporting, and emergency key procedures.',
    highlights: [
      'Daily locker pickup workflow: app entry → select compartment size → technician drop-off → employee auto-notified with QR/PIN',
      '7-day expiry enforcement: identify uncollected items, physically remove from locker, create new ITLC record, re-notify employee',
      'ITLC overflow management: items too large for lockers or uncollected after 7 days routed to IT Link Center for staff-assisted pickup',
      'Kiosk Inventory Status report: daily check of pending deliveries per site — exported to Excel for asset records',
      'Emergency key protocol: physical override key used when compartment stuck or wrong item placed — does not reset app status',
      'Delivery cancellation: entries cancelled before item is physically placed — Actions → Cancel workflow',
      'Multiple package handling: separate lockers per shipment with Description field used to differentiate same-PO deliveries',
    ],
    tags: ['Signifi Smart Locker', 'ITLC', 'IT Pickup Point', 'Daily IT Ops', 'Asset Distribution', 'Self-Service', 'Audit Trail'],
    pmDetails: {
      scope: 'Day-to-day operational management of the Signifi IT Pickup Point smart locker system — ensuring all hardware deliveries are processed through the correct channel, uncollected items are handled within policy, and records are maintained accurately.',
      objectives: [
        'Process all incoming IT hardware deliveries through the locker system same-day',
        'Enforce 7-day expiry policy — no items sitting in lockers beyond the policy window',
        'Maintain clean Manage Deliveries dashboard — zero stale "Pending" records',
        'Generate weekly kiosk inventory report and reconcile against asset management records',
        'Handle all edge cases: oversized items, wrong compartment, multiple boxes, emergency access',
      ],
      stakeholders: 'IT team (daily operations), employees (end users), IT Manager (audit and SLA)',
      timeline: 'Ongoing daily operations',
      outcomes: [
        'Zero manual handoffs for standard orders — employees self-collect via QR/PIN',
        'All items processed within 7-day policy window — no expired locker entries',
        'Full digital audit trail for every delivery — authenticated user, timestamp, compartment, asset',
        'Kiosk inventory reports generated and reconciled weekly',
        'Emergency key used successfully for stuck compartments — no delivery failures',
      ],
      skillsApplied: [
        'Signifi Smart Locker Operations',
        'Delivery Lifecycle Management',
        'IT Link Center (ITLC) Coordination',
        'Kiosk Inventory Reporting',
        'Asset Record Reconciliation',
        'Policy Enforcement (7-day expiry)',
      ],
      toolsUsed: [
        'Signifi locker management application',
        'Signifi hardware (locker + touch screen)',
        'ITLC (IT Link Center) physical space',
        'Excel (kiosk inventory export)',
        'Asset management system (CLEA / SAP ISP)',
        'Emergency key (physical override)',
      ],
      learnings: [
        'The 7-day expiry policy only works if actively enforced — set a recurring calendar reminder to check the Manage Deliveries screen for expiring items',
        'The Description field for multiple same-PO boxes is the only way to differentiate shipments — never add a second box to an already-open locker',
        'The emergency key unlocks ALL doors simultaneously — always close and confirm every door after using it to avoid leaving items unsecured',
      ],
    },
  },
  // ── GROUP 5: Office Infrastructure & AV Technology ──────────────
  {
    emoji: '🏢', group: 'Office Infrastructure & AV Technology',
    title: 'Enterprise Office AV Technology Build-Out Programme', subtitle: 'Meeting Rooms · Display Technologies · Teams MTR · Room Schedulers · Wolfvision',
    status: 'Live', category: 'Office AV · Infrastructure',
    description: 'End-to-end planning, procurement, installation, and commissioning of enterprise meeting room AV technology across multi-office environments — covering Microsoft Teams Rooms, display technologies (projectors, LED video walls, displays), wireless presentation systems, room schedulers, digital signage, audio systems, and AV-over-IP infrastructure. Based on real office build-out delivery from design to handover.',
    highlights: [
      'Meeting room standards: defined per room category (huddle → boardroom/VIP) — display, audio, control, booking',
      'Microsoft Teams Rooms (MTR): certified hardware deployment, one-touch meeting join, remote management',
      'Display technologies: projectors, LED video walls, interactive displays, display mounts and trolleys',
      'Wireless presentation: Wolfvision Cynap Pure — multi-user, BYOD-compatible, network-integrated',
      'Room schedulers (eDoorplates): Crestron, Evoko — Exchange/Teams integration, real-time availability',
      'Audio systems: ceiling, table boundary, gooseneck, handheld, lavalier, and headworn microphones',
      'AV over IP: signal distribution over enterprise network — scalable, low-latency AV switching',
      'Digital signage and digital flipcharts: content management and interactive display deployment',
    ],
    tags: ['MS Teams Rooms', 'Wolfvision Cynap Pure', 'AV Over IP', 'Digital Signage', 'Room Schedulers', 'Display Technologies', 'Audio Systems', 'Crestron'],
    pmDetails: {
      scope: 'Plan, procure, install, and commission all AV and meeting room technology for enterprise office environments — from requirements gathering through standards documentation to post-go-live support.',
      objectives: [
        'Define and enforce meeting room technology standards by room category',
        'Deploy Microsoft Teams Rooms across all meeting rooms for seamless video conferencing',
        'Install display technologies appropriate to each room size and use case',
        'Integrate wireless presentation and room booking systems with enterprise M365',
        'Deliver audio quality that enables clear communication in all room types',
      ],
      stakeholders: 'Facilities (build partner), IT leadership, end users (200+ across offices), AV vendors, Microsoft (Teams Rooms certification)',
      timeline: 'Ongoing — new office build-outs and room refresh cycles',
      outcomes: [
        '15 meeting rooms deployed to standard — zero AV failures at executive events',
        'All rooms Teams-certified — one-touch join from any room',
        'Wireless presentation available in all rooms — BYOD without cable dependency',
        'Room schedulers integrated with Exchange — real-time availability visible on doorplate',
        'Meeting Room Standards documentation maintained and updated for 2026',
      ],
      skillsApplied: [
        'AV Systems Design & Integration',
        'Microsoft Teams Rooms (MTR) Deployment',
        'Display Technology Selection & Installation',
        'Wireless Presentation Systems (Wolfvision)',
        'Room Scheduler Configuration (Crestron/Evoko)',
        'Audio System Design & Installation',
        'AV Over IP Architecture',
        'Digital Signage Management',
      ],
      toolsUsed: [
        'Microsoft Teams Rooms (certified hardware)',
        'Wolfvision Cynap Pure (wireless presentation)',
        'Crestron / Evoko (room schedulers)',
        'Digital Signage platforms',
        'Logitech Rally / Poly Pano (AV bars)',
        'AV Over IP distribution systems',
        'Meeting Room Checker (diagnostics)',
        'Exchange Online (room calendar integration)',
      ],
      learnings: [
        'Meeting room standards documentation is the single most important deliverable — without it every room gets configured differently and support becomes inconsistent',
        'Wolfvision Cynap Pure wireless presentation eliminates the cable dependency that causes 40% of meeting start delays — deploy universally, not just in boardrooms',
        'Room scheduler doorplates must be integrated with the calendar system before go-live — a booking panel that doesn\'t reflect real availability destroys user trust on day one',
      ],
    },
  },
  {
    emoji: '📋', group: 'Office Infrastructure & AV Technology',
    title: 'Office Build-Out: IT & AV Planning from Design to Handover', subtitle: 'Requirements → Design → Procurement → Installation → Commissioning',
    status: 'Live', category: 'Office Build-Out · Project Management',
    description: 'Full lifecycle IT and AV build-out planning for new and renovated office spaces — from floor plan review and technology requirements gathering through structured cabling, network infrastructure, AV installation, and formal site acceptance handover. Covers both inhouse IT delivery and coordination with external AV/cabling vendors.',
    highlights: [
      'Requirements gathering: floor plan review, room inventory, user count, technology needs per space',
      'Technology design: AV selection, network point layout, structured cabling specification (Cat6/fibre)',
      'Bill of Materials (BOM): full technology and cabling BOM prepared and approved before works begin',
      'Inhouse coordination: IT team handles network, MDM, and device configuration in parallel with AV vendor',
      'External vendor management: AV integrators, cabling contractors — scope, timeline, and quality control',
      'Standards compliance: every room configured to documented meeting room standards (size/type matrix)',
      'Site acceptance testing: formal sign-off checklist — AV, network, booking, wireless presentation verified',
      'Handover documentation: network diagram, AV config sheet, warranty register, support contact list',
    ],
    tags: ['Office Build-Out', 'AV Integration', 'Structured Cabling', 'Vendor Management', 'Project Management', 'Site Acceptance', 'Network Design'],
    pmDetails: {
      scope: 'Manage the complete IT and AV technology delivery for office build-out and renovation projects — from initial design through to formal handover with documentation.',
      objectives: [
        'Capture technology requirements before construction begins — no retrofitting',
        'Deliver structured cabling to professional standard (Cat6, TIA-568)',
        'Ensure Day 1 operational readiness for all technology across all spaces',
        'Manage inhouse and external delivery in parallel without blocking each other',
        'Produce complete handover documentation for ongoing support team',
      ],
      stakeholders: 'IT leadership, Facilities/Construction team, HR (headcount), AV vendor, cabling contractor, end users',
      timeline: '6–12 weeks per office build-out depending on scale',
      outcomes: [
        'Multiple office build-outs delivered — Day 1 operational in all cases',
        'Zero cabling or AV rework required post-handover',
        'All rooms meeting standard at handover — verified by site acceptance testing',
        'Full documentation handed over: network diagram, AV config, warranty register',
        'External vendors delivered on time and to specification under managed contracts',
      ],
      skillsApplied: [
        'IT Infrastructure Design',
        'AV Systems Integration',
        'Structured Cabling (Cat6/TIA-568)',
        'Vendor Management & Procurement',
        'Project Planning & Coordination',
        'Site Acceptance Testing',
        'Technical Documentation',
      ],
      toolsUsed: [
        'Floor plan tools (Visio/CAD review)',
        'SAP Ariba (procurement and BOM approval)',
        'Structured cabling (Cat6, patch panels, Cisco switches)',
        'AV integration tools (Crestron, Logitech, Poly)',
        'Network infrastructure (Cisco/Aruba)',
        'MDM tools (Intune/Jamf) for device deployment',
        'SharePoint (handover documentation)',
      ],
      learnings: [
        'IT planning must start at floor plan stage — retrofitting network points after walls are plastered costs 5× the original installation',
        'Separate the inhouse IT scope from the vendor AV scope clearly in the BOM — scope creep between the two causes project delays and budget disputes',
        'A formal site acceptance checklist signed by Facilities and IT before handover protects against "it wasn\'t working when we moved in" disputes weeks later',
      ],
    },
  },
  {
    emoji: '📊', group: 'Office Infrastructure & AV Technology',
    title: 'Meeting Room Technology Standards & Compliance Programme', subtitle: 'Standards Documentation · Room Checker · Compliance Dashboard · 2026 Standards Update',
    status: 'Live', category: 'AV Standards · Compliance',
    description: 'Designed, documented, and enforced enterprise meeting room technology standards across all office locations — defining the approved technology stack per room category, maintaining a compliance dashboard via Meeting Room Checker, coordinating the 2026 standards update, and publishing the end-user experience SharePoint site for self-service room guidance.',
    highlights: [
      'Room standards matrix: XS huddle → Small/Medium → Large → Boardroom/VIP — approved tech per category',
      'Standards documentation: AV spec sheets, cable type, mounting height, audio coverage zone per room type',
      'Meeting Room Checker: web and mobile diagnostic tool for real-time room compliance status',
      'Reports & Dashboards: room health KPIs, compliance percentage, rooms requiring attention',
      '2026 Standards Update: reviewed and updated standards for new MTR hardware generation',
      'End-user SharePoint: self-service guide for room booking, AV usage, and issue reporting',
      'OTX technology wiki: maintained documentation for all approved technology categories',
      'Proactive compliance: quarterly room audits — photo evidence, issue logging, vendor escalation',
    ],
    tags: ['Meeting Room Standards', 'MS Teams Rooms', 'Compliance Dashboard', 'Room Checker', 'SharePoint', 'AV Documentation', '2026 Standards'],
    pmDetails: {
      scope: 'Define and maintain enterprise meeting room technology standards — from initial documentation through annual review cycles, compliance monitoring, and end-user enablement.',
      objectives: [
        'Document approved technology standards for every room category',
        'Maintain real-time compliance visibility via Meeting Room Checker dashboard',
        'Complete the 2026 Standards Update for next-generation MTR hardware',
        'Publish an end-user SharePoint site for self-service room guidance',
        'Achieve and maintain 95%+ room compliance across all locations',
      ],
      stakeholders: 'IT leadership, Facilities, end users (room booking/AV support), AV vendors, Microsoft (MTR standards)',
      timeline: 'Ongoing — annual standards review cycle, quarterly compliance audits',
      outcomes: [
        'Meeting Room Standards documentation published and maintained for all room categories',
        '2026 Standards Update completed — new MTR hardware generation standardised',
        'Meeting Room Checker deployed — web and mobile compliance dashboard live',
        'End-user SharePoint published — self-service guides reduce AV helpdesk tickets',
        '5-year track record: zero AV failures at executive and board-level events',
      ],
      skillsApplied: [
        'AV Standards Documentation',
        'Meeting Room Compliance Management',
        'MS Teams Rooms Administration',
        'SharePoint Site Management',
        'Technical Writing & Knowledge Management',
        'Vendor Standards Coordination',
      ],
      toolsUsed: [
        'Meeting Room Checker (web + mobile diagnostic)',
        'Microsoft Teams Rooms Admin Centre',
        'SharePoint Online (end-user experience site)',
        'OTX Technology Wiki',
        'Power BI (room compliance dashboard)',
        'Meeting Room Standards documentation (internal)',
      ],
      learnings: [
        'Standards documentation only has value if it is actively maintained — a 2-year-old standard applied to new hardware causes misconfigurations that look like vendor defects',
        'End-user SharePoint for room guidance reduces AV helpdesk tickets by 40%+ — users who can self-serve don\'t call IT',
        'Meeting Room Checker mobile app for quarterly compliance audits is the difference between reactive (user reports broken room) and proactive (IT fixes it before anyone notices)',
      ],
    },
  },
  {
    emoji: '📦', group: 'Office Infrastructure & AV Technology',
    title: 'IT Pickup Point — Signifi Digital Locker Deployment', subtitle: 'Self-Service IT Asset Collection · Signifi Smart Locker · 24/7 Access · Automated Tracking',
    status: 'Live', category: 'IT Asset Management · Smart Locker',
    description: 'Deployed a Signifi Digital Storage Locker system as a self-service IT Pickup Point — enabling employees to collect approved IT hardware orders (laptops, phones, accessories) at any time without IT staff involvement. The locker integrates with the asset management system for automated tracking, audit trails, and real-time inventory visibility. Powered by Signifi smart locker technology with SignifiVISION™ enterprise software.',
    highlights: [
      'Self-service IT asset collection: employees collect approved hardware orders 24/7 — no IT staff required at handover',
      'Delivery status lifecycle: Pending Technician Drop-off → Pending Customer Pickup → Complete — tracked in real time',
      '7-day expiry policy: items uncollected after 7 days moved from locker to IT Link Center (ITLC) to free locker space',
      'Multi-channel pickup: locker (QR/PIN self-service) or IT Link Center (staff-assisted) — employee chooses based on item size',
      'Automated notifications: employee receives QR code + PIN by email the moment IT loads their device into the locker',
      'Kiosk Inventory Status report: real-time view of pending deliveries per site — exported to Excel for asset records',
      'Deployment readiness: site access permits, MAC whitelisting, LAN/IP setup, power verified — 11-point pre-install checklist completed',
      'Emergency key protocol: physical emergency key enables door override without resetting app status',
      '30-day Signifi warranty: all early-life failures and workmanship faults covered at no cost post-deployment',
    ],
    tags: ['Signifi Digital Locker', 'IT Pickup Point', 'Self-Service', 'Asset Management', 'Smart Locker', 'Automated Tracking', 'SignifiVISION', '24/7 Access', 'ITLC', 'Deployment Readiness'],
    pmDetails: {
      scope: 'Deploy and operate a Signifi Digital Storage Locker as a self-service IT Pickup Point — integrating with asset management workflows to enable automated, authenticated, auditable hardware collection for employees.',
      objectives: [
        'Eliminate manual IT staff handoff for standard hardware orders — 24/7 self-service collection',
        'Integrate locker with CLEA/SAP Ariba procurement flow for automated order-to-collection workflow',
        'Provide full audit trail: every collection logged with user identity, timestamp, and asset serial number',
        'Reduce IT helpdesk time spent on device handovers — reallocate to higher-value tasks',
        'Improve employee experience: collect hardware on arrival, no waiting for IT team availability',
      ],
      stakeholders: 'IT team (operations), employees (end users), IT Manager (asset accountability), Finance (procurement audit), Facilities (locker placement)',
      timeline: 'Deployment + integration: 2 weeks; ongoing daily operations',
      outcomes: [
        'IT Pickup Point live in office — employees self-collecting hardware orders daily',
        'Zero manual handoff for standard orders — IT staff freed from routine collection appointments',
        'Full audit trail: every collection event authenticated and logged in SignifiVISION',
        'Asset record in CLEA/SAP ISP updated automatically on collection — no manual data entry',
        'Employee satisfaction improved — no scheduling required for hardware collection',
      ],
      skillsApplied: [
        'Smart Locker System Deployment (Signifi)',
        'IT Asset Management Integration',
        'Self-Service IT Workflow Design',
        'SignifiVISION Enterprise Software Administration',
        'Asset Lifecycle Automation',
        'User Authentication & Access Control',
        'Audit Trail & Compliance Management',
      ],
      toolsUsed: [
        'Signifi Digital Storage Locker (hardware)',
        'SignifiVISION™ enterprise software',
        'CLEA (SAP BTP) — asset lifecycle integration',
        'SAP Ariba — procurement-to-collection workflow',
        'SAP ISP — asset record update on collection',
        'ServiceNow — fulfilment ticket linked to locker assignment',
      ],
      learnings: [
        'The locker placement matters more than the technology — lobby position with clear wayfinding signage reduced first-time user confusion to near zero',
        'Notification timing is critical: employee must receive the QR code + PIN by email before arriving — clear instructions on screen eliminate all first-use confusion',
        'The 7-day expiry policy must be communicated to employees at rollout — uncollected items clog locker slots and require manual ITLC transfer',
        'Completing the 11-point deployment readiness checklist (MAC whitelist, IP, power, site access permits) before vendor arrival prevents costly on-site abort fees',
        'Digital lockers replace the weakest link in asset distribution — an authenticated digital record is the only audit trail that survives a compliance review',
      ],
    },
  },
]

/* ── GROUPS ─────────────────────────────────────────────────────── */
const GROUPS = [
  { key: 'All',                          label: 'All Projects' },
  { key: 'Daily IT Operations',          label: '⚙️ Daily IT Operations' },
  { key: 'Built Apps & Tools',           label: '💻 Built Apps & Tools' },
  { key: 'Enterprise IT Rollouts',       label: '🏢 Enterprise IT Rollouts' },
  { key: 'IT Ticketing & ITSM',          label: '🎫 IT Ticketing & ITSM' },
  { key: 'Printer Management',                     label: '🖨️ Printer Management' },
  { key: 'AV, Events & Physical Security',         label: '🎙️ AV, Events & Security' },
  { key: 'Office Infrastructure & AV Technology',  label: '🏢 Office & AV Technology' },
]

const statusColors: Record<string, string> = {
  Live: 'bg-green-500/15 text-green-400 border-green-500/30',
  Completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'In Development': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
}

/* ── PAGE ─────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeGroup, setActiveGroup] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey) }
  }, [selected, close])

  const filtered = activeGroup === 'All' ? projects : projects.filter(p => p.group === activeGroup)
  const groupedFiltered = GROUPS.filter(g => g.key !== 'All').map(g => ({
    ...g,
    items: filtered.filter(p => p.group === g.key),
  })).filter(g => g.items.length > 0)

  const stats = [
    { v: '100+', l: 'Projects Delivered' },
    { v: '45', l: 'Showcased Here' },
    { v: '15+', l: 'Years Experience' },
    { v: '20M+', l: 'SAR Managed' },
  ]

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="flex">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-white/8 min-h-screen sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
                <FileText className="w-4 h-4 text-white"/>
              </div>
              <div>
                <p className="text-xs font-black text-white">Projects</p>
                <p className="text-[10px] text-accent-blue font-semibold">43 projects · PMP documented</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input
                placeholder="Search projects…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-dark-700 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"
              />
            </div>
          </div>
          <nav className="p-3 flex-1">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-2">Categories</p>
            {GROUPS.map(g => {
              const count = g.key === 'All' ? projects.length : projects.filter(p => p.group === g.key).length
              return (
                <button key={g.key} onClick={() => { setActiveGroup(g.key ?? 'All'); setSearchQuery('') }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-0.5 ${
                    activeGroup === (g.key ?? "") && !searchQuery
                      ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}>
                  <span>{g.key === 'All' ? 'All Projects' : (g.label ?? '').replace(/^[^\s]+\s/, '')}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeGroup === (g.key ?? "") && !searchQuery ? 'bg-accent-blue/20 text-accent-blue' : 'bg-white/5 text-gray-500'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">

          {/* Mobile pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {GROUPS.map(g => (
              <button key={g.key} onClick={() => { setActiveGroup(g.key ?? "All"); setSearchQuery('') }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeGroup === (g.key ?? "") ? 'bg-accent-blue border-accent-blue text-white' : 'bg-dark-700 border-white/10 text-gray-400'
                }`}>
                {g.key === 'All' ? 'All' : (g.label ?? '').replace(/^[^\s]+\s/, '')}
              </button>
            ))}
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white mb-1">
              {searchQuery ? `Search: "${searchQuery}"` : activeGroup === 'All' ? 'All Projects' : (GROUPS.find(g => g.key === activeGroup)?.label ?? activeGroup).replace(/^[^\s]+\s/, '')}
            </h1>
            <div className="flex flex-wrap gap-6 mt-3">
              {stats.map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-lg font-black gradient-text">{s.v}</div>
                  <div className="text-gray-500 text-[10px] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          {searchQuery ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.subtitle ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
              ).map((project, i) => (
                <button key={i} onClick={() => setSelected(project)}
                  className="glass-card p-5 flex flex-col items-start gap-3 text-left hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-accent-blue/30 transition-all duration-200 group">
                  <span className="text-3xl">{project.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-accent-blue transition-colors line-clamp-2">{project.title}</p>
                    <p className="text-gray-500 text-[10px] leading-snug line-clamp-1">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusColors[project.status]}`}>{project.status}</span>
                    <span className="text-[10px] text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity font-semibold">View →</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            groupedFiltered.map(group => (
              <div key={group.key} className="mb-10" id={group.key === 'Daily IT Operations' ? 'daily-operations' : undefined}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-black text-gray-300 uppercase tracking-widest">{(group.label ?? "").replace(/^[^\s]+\s/, "")}</h2>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{group.items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((project, i) => (
                    <button key={i} onClick={() => setSelected(project)}
                      className="glass-card p-5 flex flex-col items-start gap-3 text-left hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-accent-blue/30 transition-all duration-200 group">
                      <span className="text-3xl">{project.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-accent-blue transition-colors line-clamp-2">{project.title}</p>
                        <p className="text-gray-500 text-[10px] leading-snug line-clamp-1">{project.subtitle}</p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusColors[project.status]}`}>{project.status}</span>
                        <span className="text-[10px] text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity font-semibold">View →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}

        </main>
      </div>

      {/* ── PROJECT MODAL ─────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="w-full max-w-4xl bg-dark-800 border border-white/10 rounded-2xl shadow-2xl relative">

            {/* Modal header */}
            <div className="flex items-start gap-4 p-6 border-b border-white/8">
              <span className="text-4xl flex-shrink-0 mt-1">{selected.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{selected.title}</h2>
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold border mt-1 ${statusColors[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
                <p className="text-accent-blue font-semibold text-sm mb-1">{selected.subtitle}</p>
                <p className="text-gray-500 text-xs">{selected.category}</p>
              </div>
              <button onClick={close}
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors ml-1">
                <X className="w-4 h-4 text-gray-400"/>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-7 space-y-6">

              {/* Project Overview */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-accent-blue"/>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide">Project Overview</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.description}</p>
              </div>

              {/* PMP Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Scope */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-purple-400"/>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">Project Scope</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{selected.pmDetails.scope}</p>
                </div>

                {/* Timeline & Stakeholders */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-cyan-400"/>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">Timeline & Stakeholders</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Timeline</p>
                      <p className="text-sm text-gray-300">{selected.pmDetails.timeline}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">Stakeholders</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{selected.pmDetails.stakeholders}</p>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-green-400"/>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">Project Objectives</h3>
                  </div>
                  <div className="space-y-1.5">
                    {selected.pmDetails.objectives.map((o, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-yellow-400"/>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">Outcomes & Results</h3>
                  </div>
                  <div className="space-y-1.5">
                    {selected.pmDetails.outcomes.map((o, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5"/>
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Key Deliverables */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-accent-blue"/>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide">Key Deliverables & Highlights</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5"/>
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-column: Skills Applied / Tools Used / Key Learnings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Skills Applied */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🎯</span>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wide">Skills Applied</h3>
                  </div>
                  <div className="space-y-1.5">
                    {selected.pmDetails.skillsApplied.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0"/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Used */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🛠️</span>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wide">Tools & Technologies</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.pmDetails.toolsUsed.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Learnings */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">💡</span>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wide">Key Learnings</h3>
                  </div>
                  <div className="space-y-2">
                    {selected.pmDetails.learnings.map((l, i) => (
                      <p key={i} className="text-[11px] text-gray-400 leading-relaxed italic border-l-2 border-yellow-500/30 pl-2">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Links + CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selected.github && selected.github !== '#' && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline text-sm px-5 py-2.5 inline-flex items-center gap-2">
                    <Github className="w-4 h-4"/> GitHub
                  </a>
                )}
                {selected.demo && selected.demo !== '#' && (
                  <a href={selected.demo} target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2">
                    <ExternalLink className="w-4 h-4"/> Live Demo
                  </a>
                )}
                <Link href="/contact"
                  className="btn-outline text-sm px-5 py-2.5 inline-flex items-center gap-2 border-green-500/40 text-green-400 hover:bg-green-500/10 ml-auto">
                  Discuss This Project <ArrowRight className="w-4 h-4"/>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}