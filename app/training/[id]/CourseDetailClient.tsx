'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Clock, Users, Star, Award, CheckCircle,
  Play, ChevronDown, ChevronUp, BookOpen, Shield,
  Briefcase, Globe, Mail, Brain, Trophy, RotateCcw,
} from 'lucide-react'

const courses = [
  { id: 3, title: 'ServiceNow Basics: Your First ITSM Dashboard', category: 'IT Ticketing & ITSM', level: 'Beginner', duration: '2h', students: '350+', rating: 4.8, isFree: true, img: '/snow-logo.png', skills: ['ServiceNow', 'ITSM', 'SLA Management', 'KB Articles', 'Incident Management', 'ITIL v3'], description: 'Get up and running with ServiceNow from zero — navigate the interface, create and manage incidents, set up SLA rules, build your first knowledge base articles, and configure a live dashboard. Based on real daily operations handling 1,300+ interactions and 65+ catalog tasks per month.', whatYouLearn: ['Navigate the ServiceNow interface, lists, forms, and workspaces', 'Create and manage incidents with priority matrix and escalation rules', 'Read SLA IRT/MPT timers and act before breach using the dashboard', 'Build knowledge base articles from resolved tickets', 'Configure a live KPI dashboard with your key metrics'], curriculum: [{ module: 'Module 1 — Getting Started with ServiceNow', lessons: ['What is ServiceNow and how it fits in enterprise ITSM', 'The ServiceNow interface: Navigator, application menu, and workspaces', 'Lists and forms: reading, filtering, sorting, and saving views', 'Default lists vs. custom lists — creating your own filtered queue', 'The CSM/FSM Configurable Workspace: overview for IT support agents', 'Agent availability status: SAP IT, Chat, Calls, Walk-up — setting your channel'] }, { module: 'Module 2 — Incident Management', lessons: ['What is an Incident and when to raise one vs. a Service Request', 'Creating an incident: required fields, category, subcategory, CI', 'Priority matrix: P1 (Critical) → P4 (Low) — response and resolution times', 'Assignment rules: auto-routing vs. manual assignment to groups', 'Escalating an incident: when and how to escalate to a higher group', 'Resolving and closing an incident: resolution notes and closure codes', 'My Incidents list: filtering active, assigned, and group incidents'] }, { module: 'Module 3 — SLA Rules & Targets', lessons: ['What is an SLA in ServiceNow: IRT (Initial Response) vs. MPT (Max Processing)', 'Reading SLA timers on a ticket: time remaining, breached, in-danger status', 'SLA KPI dashboard tiles: Breached, In Danger, Resolved — what each means', 'My SLAs Work list: finding tickets about to breach before they do', 'SLA pause conditions: when the clock stops (e.g. awaiting user response)', 'Best practice: act at 70% SLA consumed — not at 100%'] }, { module: 'Module 4 — Knowledge Base & Self-Service', lessons: ['What is a Knowledge Base article and why it reduces repeat tickets', 'KB article structure: symptom → cause → resolution → escalation path', 'Creating your first KB article from a resolved ticket', 'Publishing and unpublishing articles: draft → review → live', 'Linking a KB article to a ticket: how to attach during resolution', 'Frequently used KBAs list: managing your personal KB shortcut list', 'Self-service portal: how users find KB articles before raising tickets'] }, { module: 'Module 5 — Dashboard & Reporting', lessons: ['The "Happening Now" dashboard: building your live KPI view', 'Adding KPI tiles: Incidents Resolved, Open Tasks, Breached SLAs', 'Creating a saved list: filter → save as "My Assigned Incidents"', 'Performance reports: tickets by category, volume by week, SLA % compliance', 'Sharing a report or dashboard with your manager', 'Setting your dashboard as the landing page for faster daily startup'] }] },
  { id: 9, title: 'ServiceNow ITSM: Enterprise Configuration', category: 'IT Ticketing & ITSM', level: 'Intermediate', duration: '10h', students: '120+', rating: 4.8, isFree: false, img: '/snow-csm-banner.jpg', skills: ['ServiceNow', 'SLA Design', 'Business Rules', 'KB Strategy', 'PowerBI', 'Auto-Assignment', 'Workflow Automation'], description: 'Build a production-ready ServiceNow environment from scratch — SLA frameworks (P1–P4), auto-assignment rules, business rules, KB architecture, workflow automation, and REST API integration. Based on 1,500+ tickets/year real operations experience with CSM/FSM Workspace and HCSM AI Copilot.', whatYouLearn: ['Design a P1–P4 SLA framework with IRT/MPT targets and breach notifications', 'Build auto-assignment rules routing by category, subcategory, and location', 'Write business rules and client scripts for automated field updates', 'Create an 80+ article KB strategy with quality standards and FCR tracking', 'Integrate ServiceNow with Python and PowerBI for automated reporting'], curriculum: [{ module: 'Module 1 — ITSM Architecture & Process Design', lessons: ['ServiceNow ITSM architecture: CMDB, Incidents, Problems, Changes, Requests', 'ITIL v3 alignment: Incident → Problem → Change lifecycle in ServiceNow', 'Designing your service catalogue: categories, subcategories, offering hierarchy', 'Assignment group design: naming conventions, membership, escalation paths', 'SLA contract structure: IES_IRT&MPT — reading and applying contract SLAs', 'CSM/FSM Configurable Workspace setup: custom lists, KPI tiles, landing page'] }, { module: 'Module 2 — SLA Framework Design (P1–P4)', lessons: ['SLA record structure: target, condition, pause, reset, breach actions', 'Designing the P1–P4 priority matrix: response times, resolution targets', 'IRT (Initial Response Time) vs MPT (Maximum Processing Time) — configuring both', 'SLA breach notifications: email alerts at 50%, 75%, 100% consumed', 'Executive override rules: P1 auto-escalation to management on breach', 'SLA dashboard: Breached, In Danger, Resolved KPI tiles — configuration', 'Testing SLA rules: using test incidents to verify timers fire correctly'] }, { module: 'Module 3 — Auto-Assignment Rules & Routing', lessons: ['Assignment rules: condition builder — category + subcategory + location logic', 'Routing by location: EMEA, MENA, KSA — regional routing configuration', 'Routing by service offering: Meeting Room, Hardware, Mobile — separate queues', 'Fallback assignment: what happens when no rule matches', 'Testing assignment rules: dry-run with test tickets before go-live', 'Auto-assignment in CSM/FSM Walk-up: how walk-up interactions get routed', 'Monitoring misrouted tickets: report + corrective action workflow'] }, { module: 'Module 4 — Business Rules, KB & Workflow Automation', lessons: ['Business rules: when/then logic — auto-populate fields on ticket creation', 'Client scripts: onChange, onLoad — dynamic form behaviour for agents', 'Notification rules: email templates for assignment, SLA breach, closure', 'KB architecture: 80+ article strategy — symptom/cause/resolution template', 'FCR improvement through KB: from <50% to 75%+ first contact resolution', 'Quarterly KB review cycle: identifying stale articles, publishing updates', 'Closing templates: standardised messages with satisfaction survey links'] }, { module: 'Module 5 — REST API, Reporting & PowerBI Integration', lessons: ['ServiceNow REST API: Table API — GET incidents by assignment group', 'Authentication: session cookies vs. OAuth token for API access', 'Python integration: polling ServiceNow every 5 minutes for SLA-at-risk tickets', 'WhatsApp alert bot: Twilio + ServiceNow API — breach alert delivery', 'PowerBI integration: connecting ServiceNow data to live KPI dashboards', 'Monthly SLA report: automated generation — zero manual effort', 'Metrics that matter: FCR %, SLA compliance %, ticket volume by category'] }] },
  { id: 101, title: 'IT Asset Lifecycle Management for Enterprise Support', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h', students: '200+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop', skills: ['Asset Tracking', 'Hardware Lifecycle', 'SAP ISP', 'MDM Compliance', 'Inventory Management'], description: 'Learn how enterprise IT assets are tracked, returned, scanned, and audited across the full hardware lifecycle — from procurement to disposal. Based on real SAP IT operations.', whatYouLearn: ['Track and manage enterprise hardware from procurement to disposal', 'Process in-person and remote device returns with full compliance', 'Conduct physical inventory scans using mobile scanner tools', 'Handle lost/stolen device incidents including MDM wipe and security escalation', 'Raise and approve device procurement via SAP Ariba'], curriculum: [{ module: 'Module 1 — Asset Management Fundamentals', lessons: ['What is IT asset lifecycle management?', 'Enterprise asset categories: laptops, mobiles, tablets, monitors, printers', 'Asset tagging, serial number tracking, and SAP ISP records', 'Minimum device lifespan policies and refresh cycles'] }, { module: 'Module 2 — Hardware Return Processes', lessons: ['In-person return workflow: condition check, accessories, account sign-out', 'Remote employee return: shipping process, deadlines, and escalation', 'Handling accidental return initiation and cancellation', 'Post-return: re-imaging, redeployment, or decommission decision'] }, { module: 'Module 3 — Physical Inventory Management', lessons: ['Annual inventory scanning using mobile scanner tools', 'Reconciling physical count vs. system records', 'Flagging inactive, missing, or unassigned assets', 'Updating asset status in ERP after scanning'] }, { module: 'Module 4 — Lost, Stolen & Non-Returned Devices', lessons: ['Immediate steps when a device is reported lost or stolen', 'Remote wipe via MDM (Jamf / Intune)', 'Raising a security incident and disabling accounts', 'Escalation timeline for non-returned offboarding assets (21-day rule)'] }, { module: 'Module 5 — Procurement & Cost Responsibility', lessons: ['How device requests are raised via SAP Ariba', 'Approval chain: user → IT manager → country MD', 'MENA procurement volumes and budget tracking in Power BI', 'Warranty tracking, certified disposal, and recycling'] }] },
  { id: 102, title: 'Corporate Email Platform Administration (Exchange Online)', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h', students: '180+', rating: 4.8, isFree: true, img: 'https://images.unsplash.com/photo-1596526131083-e8c633064e2e?w=800&q=80&auto=format&fit=crop', skills: ['Exchange Online', 'Microsoft 365', 'Email Security', 'Shared Mailboxes', 'Phishing Response'], description: 'Administer corporate email services in Microsoft 365 — mailbox quotas, retention policies, shared mailbox management, mass mailing permissions, and phishing response.', whatYouLearn: ['Manage mailbox quotas, archives, and retention policies', 'Create and administer shared mailboxes and distribution lists', 'Process mass mailing permission requests securely', 'Configure anti-spam and respond to phishing reports', 'Apply corporate password and MFA policies for email accounts'], curriculum: [{ module: 'Module 1 — Mailbox Administration', lessons: ['User mailbox quota: 100 GB standard, online archive up to 1 TB', 'Setting up and enabling online archives for long-term retention', 'Configuring Outlook profile on Windows and macOS', 'Internal vs. external attachment size limits and blocked file types'] }, { module: 'Module 2 — Shared Mailbox Management', lessons: ['Creating shared mailboxes and assigning access permissions', 'Adding/removing aliases and setting reply-from address', 'Annual cost review: when shared mailboxes require a licence', 'Retiring shared mailboxes: offboarding and data preservation'] }, { module: 'Module 3 — Mass Mailing & Distribution Lists', lessons: ['What requires a mass mailing permission', 'Requesting temporary (28-day) vs. permanent mass mailing rights', 'Distribution list management and membership updates', 'Avoiding spam triggers when sending to large groups'] }, { module: 'Module 4 — Email Security & Spam Management', lessons: ['Anti-spam filter: how it works and how to whitelist/blacklist senders', 'Junk mail folder configuration in Outlook', 'How to report phishing emails using the built-in reporting tool', 'What happens after a phishing report: IT response process'] }, { module: 'Module 5 — Password & MFA for Email Accounts', lessons: ['Corporate password policy: 15-character minimum, 2-year expiry', 'Admin account requirements: 20-character minimum', 'Resetting email account password without IT (SSPR)', 'MFA methods supported: app, SMS, RSA soft token'] }] },
  { id: 103, title: 'macOS Device Management in a Corporate Environment', category: 'Corporate IT Training', level: 'Intermediate', duration: '2h', students: '150+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop', skills: ['Jamf MDM', 'macOS', 'FileVault', 'SSO Certificates', 'Microsoft Defender', 'Self Service'], description: 'Configure, enrol, and support corporate Macs using Jamf Pro — covering ADE (Automated Device Enrolment) for zero-touch setup, manual DE for exceptions, Setup Assistant configuration, FileVault encryption, Kerberos SSO, VPN and Conditional Access registration, Self Service portal, and Recovery Mode troubleshooting.', whatYouLearn: ['Execute ADE zero-touch Mac enrolment and manual DE enrolment for exception cases', 'Configure Setup Assistant correctly: account name, corporate password, MFA/TAP pre-requisite', 'Complete post-setup: GlobalProtect VPN, M365, and Conditional Access registration', 'Enforce FileVault and Kerberos SSO via Jamf — troubleshoot common certificate and password sync issues', 'Use Recovery Mode to reinstall macOS on failed upgrades — including T2-chip Mac procedures'], curriculum: [{ module: 'Module 1 — Corporate Mac Enrolment: ADE vs. DE', lessons: ['What is Jamf Pro and how it manages the corporate Mac fleet', 'ADE (~95% of Macs): auto-enrolled at first boot via serial number pre-registration', 'DE manual enrolment (~5%): exception cases — step-by-step manual profile install', 'BYOD personal Macs: NOT permitted — corporate-owned only', 'Pre-requisite: MFA configured OR Temporary Access Pass (TAP) issued before setup begins', 'ADE process: power on → Wi-Fi → Setup Assistant → MDM profile auto-installed → Jamf policies push'] }, { module: 'Module 2 — Single Sign-On & Certificate Management', lessons: ['What is Kerberos SSO and why it is required on corporate Macs', 'Installing the SSO extension certificate step by step', 'Checking certificate validity and expiry date', 'Removing and re-installing the SSO certificate when broken', 'Syncing corporate password with macOS local account'] }, { module: 'Module 3 — Security & Compliance', lessons: ['FileVault disk encryption: enabling and verifying recovery key escrow', 'System Integrity Protection (SIP): what it is and when to check', 'macOS update policy: mandatory deadline 30 days after Apple release', 'Microsoft Defender for Endpoint on macOS: installation and status', 'Cisco Umbrella DNS security: scope on managed Macs'] }, { module: 'Module 4 — Privilege & Application Management', lessons: ['Why standard user accounts are the security default', 'Granting temporary local admin using the Privileges app', 'Self Service portal: installing approved corporate apps without IT', 'Requesting software not in Self Service via ITSM ticket', 'Running Windows via VMware Fusion: setup and licensing'] }, { module: 'Module 5 — VPN & Network on macOS', lessons: ['Installing Cisco Secure Client (GlobalProtect) on macOS', 'Always-on VPN: what it does and when it connects automatically', 'Connecting to corporate Wi-Fi (802.1X): certificate-based auth', 'Printer installation on macOS via VPN and Self Service', 'Troubleshooting: Mac not connecting to corporate network'] }] },
  { id: 104, title: 'Meeting Room Technology & AV Support', category: 'Corporate IT Training', level: 'Beginner', duration: '1h', students: '120+', rating: 4.8, isFree: true, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop', skills: ['Microsoft Teams Rooms', 'Crestron', 'AV Support', 'Room Booking', 'Surface Hub'], description: 'Support and manage corporate meeting room technology — room categories, booking systems, AV hardware, Microsoft Teams Rooms, and diagnostic tools.', whatYouLearn: ['Identify meeting room categories and their technology standards', 'Book and manage rooms via calendar and booking panels', 'Use AV diagnostic tools to check room health', 'Support Teams Rooms and Surface Hub devices', 'Handle reactive AV support using hotline and QR codes'], curriculum: [{ module: 'Module 1 — Room Categories & Standards', lessons: ['XS huddle rooms (1–4 people): basic screen + wireless presentation', 'Small/medium rooms (5–10 people): Teams MTR bar setup', 'Large rooms (10–20 people): Logitech Rally or Poly Pano system', 'Boardroom/VIP (20+): Crestron control panel + multi-screen', 'Room naming conventions and technology classification labels'] }, { module: 'Module 2 — Room Booking Systems', lessons: ['Booking via Outlook calendar: adding room as a resource', 'Evoko / Crestron booking panel: check-in, ad-hoc booking, release', 'Room auto-release: no check-in within 10 minutes = room freed', 'Maximum booking window: 180 days, maximum duration: 24 hours', 'Adding the room booking Outlook add-in for mobile users'] }, { module: 'Module 3 — AV Diagnostics & Support Tools', lessons: ['Meeting Room Checker: web dashboard for room health status', 'Mobile app for AV diagnostics: checking camera, audio, display', 'QR code support stickers: how users report AV issues instantly', 'Updating room compliance status after a physical check', 'Escalation path for hardware failures: on-site vs. vendor call-out'] }, { module: 'Module 4 — Teams Rooms & Surface Hub', lessons: ['Microsoft Teams Rooms: one-touch meeting join from any room', 'Teams Rooms nightly health check: what to look for', 'Surface Hub Gen 1 vs. Gen 2: key differences for IT support', 'Firmware update process and maintenance window scheduling', 'Common Teams Rooms issues and on-site remediation steps'] }, { module: 'Module 5 — Wireless Presentation & Reactive Support', lessons: ['Wolfvision Cynap Pure: pairing a laptop for wireless presentation', 'HDMI and USB-C switching on Crestron and standard switchers', 'Reactive support: user calls AV hotline — what IT does on arrival', 'Pre-event AV check protocol: 3-hour setup rule for VIP events', 'Documenting room issues and updating the compliance dashboard'] }] },
  { id: 105, title: 'Corporate Network & VPN Support for IT Engineers', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h', students: '160+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop', skills: ['VPN', 'Cisco', 'Aruba Wireless', '802.1X', 'DNS Security', 'Network Troubleshooting'], description: 'Understand corporate network types, configure VPN remote access, connect managed devices to wireless, and apply DNS-layer security — based on real SAP MENA infrastructure.', whatYouLearn: ['Explain corporate Wi-Fi tiers and their access policies', 'Connect managed Windows and Mac devices to 802.1X wireless', 'Install and configure GlobalProtect and F5 VPN clients', 'Handle guest Wi-Fi onboarding for visitors', 'Understand DNS-layer security and NAC quarantine behaviour'], curriculum: [{ module: 'Module 1 — Corporate Network Architecture', lessons: ['Three Wi-Fi tiers: corporate managed, guest, and IoT — policies per tier', 'Wired LAN: VLAN segmentation and access port assignments', 'Cisco switches: port configuration basics for IT support', 'Aruba wireless: AP coverage zones and SSID mapping', 'Network monitoring: how IT detects connectivity issues proactively'] }, { module: 'Module 2 — 802.1X Wireless Authentication', lessons: ['What is 802.1X and why password-based Wi-Fi is not used corporately', 'Certificate-based authentication: how the trust chain works', 'Connecting a managed Windows device to corporate Wi-Fi', 'Connecting a managed Mac to corporate Wi-Fi (SSO certificate required)', 'Troubleshooting: device not authenticating on corporate wireless'] }, { module: 'Module 3 — VPN Remote Access', lessons: ['GlobalProtect (Palo Alto) VPN: install, connect, and disconnect', 'F5 BIG-IP VPN: install, connect, and disconnect on Windows and macOS', 'Always-on VPN: automatic tunnel on non-corporate networks', 'Split tunnelling vs. full tunnel: what goes through VPN and what does not', 'VPN troubleshooting: certificate errors, gateway unreachable, slow tunnel'] }, { module: 'Module 4 — Guest Wi-Fi & Visitor Onboarding', lessons: ['Guest Wi-Fi policy: what is allowed and what is blocked', 'Sponsor-based guest Wi-Fi onboarding: step-by-step for IT and hosts', 'Time-limited guest access: maximum session and renewal process', 'IoT network: which devices connect and how they are isolated', 'Security implications of guest and IoT network separation'] }, { module: 'Module 5 — DNS Security & NAC', lessons: ['Cisco Umbrella DNS security: what it blocks and why', 'Scope: applies to managed endpoints and enrolled mobile devices', 'ForeScout NAC: how non-compliant devices are quarantined', 'IP addressing basics: DHCP, static IPs, and gateway/DNS for support', 'ISP failover: dual-path design and how IT tests it quarterly'] }] },
  { id: 106, title: 'IT Onboarding & Offboarding Processes', category: 'Corporate IT Training', level: 'Beginner', duration: '1h', students: '200+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop', skills: ['Azure AD', 'MFA Setup', 'Intune Autopilot', 'TAP', 'DocuSign', 'CLEA App'], description: 'Master the end-to-end IT workflows for employee onboarding and offboarding — account provisioning, device assignment, MFA setup, and secure hardware return.', whatYouLearn: ['Trigger IT provisioning using the CLEA lifecycle app', 'Provision Azure AD accounts and assign M365 licences', 'Issue Temporary Access Passes (TAP) for MFA bootstrapping', 'Pre-stage devices with Autopilot and Jamf for Day 1 readiness', 'Complete offboarding within SLA: account disable, wipe, and return'], curriculum: [{ module: 'Module 1 — Onboarding IT Workflow Overview', lessons: ['T-14 day trigger: how HR triggers IT provisioning before Day 1', 'CLEA lifecycle app: what it tracks and how IT engineers use it', 'Checklist: account → device → apps → MFA → network access', 'Executive onboarding: white-glove process and pre-staging requirements', 'Day 1 readiness target: fully operational in under 30 minutes'] }, { module: 'Module 2 — Account Provisioning & Azure AD', lessons: ['Azure AD account creation: licences, groups, and Conditional Access', 'New Employee Password Reset tool: step-by-step for first login', 'Setting the initial password and forcing change on first sign-in', 'Assigning Microsoft 365 licences: E3 vs. E5 and what each includes', 'Shared drive and SharePoint access provisioning'] }, { module: 'Module 3 — MFA Setup for New Employees', lessons: ['Temporary Access Pass (TAP): what it is and when to issue one', 'Step-by-step: issuing a TAP in Azure AD admin centre', 'Employee self-registers Microsoft Authenticator using TAP', 'Backup MFA methods: phone number, hardware key (FIDO2)', 'Troubleshooting: employee locked out on Day 1 — what to do'] }, { module: 'Module 4 — Device Assignment & Autopilot', lessons: ['Pre-staging a Windows device: Autopilot registration and user assignment', 'Jamf pre-staging for macOS: enrolment profile pushed before arrival', 'Mobile device assignment: corporate iOS via ADE or BYOD Intune', 'DocuSign: digital asset assignment form — how to send and track', 'Handing over the device: what to explain and demonstrate to the user'] }, { module: 'Module 5 — Offboarding IT Process', lessons: ['Offboarding trigger: HR confirms last day → IT raises ticket', 'Account disable sequence: M365 → Azure AD → SAP systems → SNOW', 'Data backup: OneDrive contents transferred to manager before wipe', 'Device return: in-person checklist or remote return shipping process', 'SLA target: full offboarding completed within 2 hours of last day'] }] },
  { id: 107, title: 'Enterprise Print Services Management', category: 'Corporate IT Training', level: 'Beginner', duration: '1h', students: '100+', rating: 4.7, isFree: true, img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80&auto=format&fit=crop', skills: ['HP MFP', 'Badge Printing', 'Cloud Print', 'Toner Management', 'Print Troubleshooting'], description: 'Manage enterprise print infrastructure — badge-based secure printing, toner lifecycle, printer commissioning, cloud/mobile printing, and print spooler troubleshooting.', whatYouLearn: ['Monitor and replace toner using automated threshold alerts', 'Register employee badges for secure pull-printing', 'Configure scan-to-email on HP MFP devices', 'Set up cloud and mobile printing for remote users', 'Troubleshoot printer offline, spooler, and driver issues'], curriculum: [{ module: 'Module 1 — Enterprise Print Infrastructure', lessons: ['HP MFP fleet overview: device types, locations, and naming conventions', 'WebJet Admin: fleet monitoring dashboard and alert configuration', 'Print server architecture: how jobs are routed to the correct device', 'SIPORT badge reader integration: authentication flow', 'Global Print Services (GPS) support model and escalation path'] }, { module: 'Module 2 — Toner & Consumables Management', lessons: ['Automated toner alerts: thresholds at 15%, 5%, 2%, 1%, 0%', 'Auto-delivery trigger at 5%: how the vendor ordering process works', 'Physical replacement at 1%: step-by-step cartridge swap procedure', 'Empty cartridge return programme: annual collection (Oct/Nov)', 'Drum unit lifecycle vs. toner cartridge — how to tell them apart'] }, { module: 'Module 3 — Badge-Based Secure Printing', lessons: ['What is pull-printing and why it is more secure than direct print', 'Registering a new employee badge on the HP card reader', 'User flow: print from PC → walk to printer → tap badge → collect', 'Auto-delete: uncollected jobs removed after 24 hours', 'Troubleshooting: badge not recognised — re-register vs. escalate'] }, { module: 'Module 4 — Cloud & Mobile Printing', lessons: ['Email-to-print: send document to corporate print email address', 'Mobile printing from iOS and Android via the print app', 'Cloud print setup: adding the cloud print queue on Windows and macOS', 'Printing while on VPN from a remote location', 'Scan-to-email: configuring the MFP SMTP settings and testing'] }, { module: 'Module 5 — Printer Support & Troubleshooting', lessons: ['Printer not showing in Windows: driver reinstall vs. queue fix', 'Print spooler stuck: stop, clear spool folder, restart sequence', 'Printer offline: network connectivity check and IP re-confirmation', 'Relocating a printer: coordination with GPS and cabling team', 'New printer commissioning: unboxing, network join, and test page'] }] },
  { id: 108, title: 'Mobile Device Management: iOS & Android in the Enterprise', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h 30m', students: '170+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop', skills: ['Jamf', 'Microsoft Intune', 'iOS MDM', 'Android MDM', 'BYOD', 'Azure AD'], description: 'Enrol, secure, and support corporate iOS and Android devices — covering MDM compliance, SSO, corporate app distribution, BYOD enrolment, and lost device procedures.', whatYouLearn: ['Enrol iOS devices via Apple ADE zero-touch and manual methods', 'Enrol Android BYOD devices via Intune Company Portal', 'Verify MDM compliance: OS version, encryption, corporate apps', 'Configure mobile SSO certificates and VPN clients', 'Handle lost/stolen device: remote wipe and security incident'], curriculum: [{ module: 'Module 1 — iOS Device Enrolment', lessons: ['Apple ADE (Automated Device Enrolment): zero-touch supervised setup', 'Manual enrolment: download profile → install → verify in Jamf', 'Managed Apple ID: migration from personal Apple ID', 'Self Service mobile app: installing corporate apps post-enrolment', 'Verifying enrolment: compliance check app status and MDM profile'] }, { module: 'Module 2 — Android Device Enrolment (BYOD & Corporate)', lessons: ['Corporate Android: fully managed enrolment via Intune', 'BYOD Android: work profile enrolment — personal data stays separate', 'Microsoft Intune Company Portal: installation and setup steps', 'Minimum Android compliance: OS patch not older than 6 months', 'Microsoft Defender for Android: deployment via Intune app policy'] }, { module: 'Module 3 — Mobile Compliance & Security', lessons: ['MDM compliance requirements: OS version, encryption, corporate app', 'What happens when a device is non-compliant: notification cadence', 'Cisco Security Connector / Umbrella on mobile: scope and behaviour', 'Azure AD device registration: verifying in Entra ID portal', 'Mobile SSO certificate: 3-month validity, auto-renewal via Jamf'] }, { module: 'Module 4 — MFA & Corporate App Setup', lessons: ['Issuing a Temporary Access Pass (TAP) for mobile MFA bootstrapping', 'Microsoft Authenticator setup on iOS and Android', 'RSA SecurID soft token migration to a new device', 'Wi-Fi TLS certificate setup on mobile for 802.1X corporate Wi-Fi', 'GlobalProtect VPN client on iOS and Android: install and connect'] }, { module: 'Module 5 — Device Decommission & Lost Device', lessons: ['Find My disabled before MDM removal (iOS requirement)', 'Remote wipe via Jamf (iOS) and Intune (Android): when to use', 'MDM unenrollment and factory reset process', 'Updating asset record in ERP after device decommission', 'Lost/stolen: MDM wipe + account disable + security incident within 1 hour'] }] },
  { id: 109, title: 'Information Security Awareness for Enterprise Staff', category: 'Corporate IT Training', level: 'Beginner', duration: '30m', students: '500+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop', skills: ['Phishing Awareness', 'Social Engineering', 'Mobile Security', 'Data Protection', 'Incident Response'], description: 'Essential security awareness training for all enterprise employees — covering phishing, social engineering, secure mobile use, and data protection responsibilities.', whatYouLearn: ['Recognise social engineering tactics and red flags', 'Identify and report phishing, smishing, and vishing attacks', 'Apply secure mobile device practices for corporate data', 'Understand data classification and safe file sharing rules', 'Respond correctly when you suspect a security incident'], curriculum: [{ module: 'Module 1 — Social Engineering Fundamentals', lessons: ['What is social engineering and why it targets people, not systems', 'Common attack types: pretexting, baiting, quid pro quo, tailgating', 'Real-world examples: fake IT support calls, CEO fraud, invoice scams', 'Red flags: urgency, authority, unusual requests, out-of-band contact', 'What to do when you suspect a social engineering attempt'] }, { module: 'Module 2 — Phishing Detection & Response', lessons: ['Email phishing: how to inspect sender, headers, and links safely', 'Spear phishing: targeted attacks using your personal information', 'Smishing (SMS) and vishing (voice call) phishing variations', 'How to report phishing in Outlook using the built-in report button', 'What IT does after a phishing report — and how to stay safe meanwhile'] }, { module: 'Module 3 — Secure Mobile Device Practices', lessons: ['Corporate data on personal devices: what is and is not allowed', 'Enabling screen lock, PIN, and biometric authentication', 'Public Wi-Fi risks and when to always use VPN', 'App permissions: what to allow and what to deny for corporate safety', 'What to do if your corporate mobile device is lost or stolen'] }, { module: 'Module 4 — Data Protection & Privacy', lessons: ['What counts as personal data under GDPR and SAP data policy', 'Data classification: public, internal, confidential, restricted', 'Safe file sharing: approved platforms only (SharePoint, OneDrive)', 'Printing confidential documents: secure pull-printing rules', 'Your responsibility: what you are liable for under the data protection policy'] }, { module: 'Module 5 — Incident Response for Employees', lessons: ['What is a security incident and when must you report it', 'How to report: who to contact, what information to include', 'First steps if your account is compromised: password reset + MFA review', 'DLP alerts: what they mean and how to respond if you triggered one', 'After an incident: what IT investigates and what the employee does'] }] },
  { id: 110, title: 'Self-Service Password Reset & MFA Account Recovery', category: 'Corporate IT Training', level: 'Beginner', duration: '30m', students: '300+', rating: 4.8, isFree: true, img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop', skills: ['SSPR', 'Azure AD', 'MFA', 'Password Management', 'Account Recovery'], description: 'Learn how to independently reset domain passwords and recover accounts using Self-Service Password Reset (SSPR) — no helpdesk needed. Covers Windows, macOS, and web-based reset.', whatYouLearn: ['Use the SSPR web portal to reset your own password', 'Unlock a locked account without calling the helpdesk', 'Understand corporate password complexity requirements', 'Recover MFA access when your authenticator device is lost', 'Know when to escalate to IT and how to raise a ticket'], curriculum: [{ module: 'Module 1 — Understanding SSPR', lessons: ['What Self-Service Password Reset is and who it applies to', 'SSPR prerequisite: MFA must be registered before SSPR works', 'Why SSPR reduces helpdesk load: no more waiting for IT to reset', 'Supported devices: Windows 11, macOS, mobile browser, any web browser', 'When SSPR is NOT available and IT must assist instead'] }, { module: 'Module 2 — Resetting Your Password', lessons: ['Navigate to the SSPR web portal from any device', 'Identity verification step: authenticator app push or SMS code', 'Entering and confirming the new password (complexity rules)', 'Syncing the new password to Windows / macOS local account', 'Testing the new password: sign-in verification checklist'] }, { module: 'Module 3 — Unlocking a Locked Account', lessons: ['Difference between account lock and forgotten password', 'Account auto-locks after 10 incorrect attempts (configurable)', 'Unlock without password change via SSPR portal', 'What triggers a lock vs. what triggers a disable — key distinction', 'Admin unlock request: when only IT can restore access'] }, { module: 'Module 4 — Password Policy & Best Practices', lessons: ['Minimum 15 characters for standard users; 20 for admin accounts', 'Password expiry: every 2 years — notification sent 30 days before', 'What makes a strong password: passphrases vs. complex strings', 'Password manager options approved for corporate use', 'Never share your password — even with IT: why and what to do instead'] }, { module: 'Module 5 — MFA Recovery Scenarios', lessons: ['Lost authenticator device: how to recover using backup method', 'New phone: transfer Microsoft Authenticator to new device', 'Temporary Access Pass (TAP): when IT issues one and how to use it', 'Hardware FIDO2 key as backup: setup and usage', 'Getting help: how to raise a helpdesk ticket for account recovery'] }] },
  { id: 111, title: 'IT Link Center (ITLC) Walk-up Kiosk & Queue Monitor Setup', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h 30m', students: '80+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop', skills: ['Jamf MDM', 'ServiceNow Walk-up', 'Digital Signage', 'Apple ADE', 'Microsoft Intune', 'Queue Management', 'PassVault'], description: 'Learn how to set up and manage the ITLC Walk-up Kiosk and Queuing Monitor — the ServiceNow-integrated iPad check-in and digital queue display used at IT Link Centers to manage in-person IT support queues.', whatYouLearn: ['Set up an iPad kiosk using Jamf MDM and Apple ADE from out-of-box', 'Configure the ITLC Extension Attribute in the Jamf Admin Console', 'Retrieve service account credentials securely from a corporate password vault', 'Log into the ServiceNow Walk-up portal and configure the kiosk location', 'Set up the Queuing Monitor using a Digital Signage machine and portal'], curriculum: [{ module: 'Module 1 — What is ITLC & System Architecture', lessons: ['What is an IT Link Center (ITLC) and its role in enterprise IT support', 'Two-component system: iPad Check-in Kiosk + Queuing Monitor display', 'ServiceNow Walk-up module: how it improves queue management', 'Network requirements: SAP-Guest Wi-Fi for setup, SAP-Corporate for operation', 'Prerequisites: iPad 10"+ with iPadOS 15+, Jamf Cloud ADE enrolment'] }, { module: 'Module 2 — iPad Kiosk Setup & MDM Enrolment', lessons: ['Out-of-box iPad setup: language, region, manual setup selection', 'Connect to guest Wi-Fi and begin Jamf ADE enrolment with corporate email', 'Naming convention: ITLC-[building code] — why it matters', 'Required settings: brightness max, sound off, Bluetooth off, Light mode', 'Connecting to corporate Wi-Fi and saving the Walk-up portal URL in Safari'] }, { module: 'Module 3 — Jamf ITLC Extension Attribute Configuration', lessons: ['What is the ITLC Extension Attribute in Jamf and why it is needed', 'Accessing the Jamf Admin Console: Inventory → Extension Attributes', 'Setting the ITLC iPad attribute to 1: step-by-step', 'What happens after the attribute is set: Safari auto-launches in kiosk mode', 'iPad OS update procedure: remove attribute → update → re-add attribute'] }, { module: 'Module 4 — Service Account Login via Password Vault', lessons: ['Two Walk-up service accounts: walkup_english and walkup_french', 'Corporate PassVault: what it is and how to access it for the first time', 'Retrieving the Walk-up account password from PassVault step by step', 'Logging into the ServiceNow Walk-up portal and selecting your location', 'Security note: always retrieve passwords from PassVault — never from stored documents'] }, { module: 'Module 5 — Queuing Monitor Setup & Digital Signage Configuration', lessons: ['Imaging the Digital Signage machine using the Intune DS image', 'Registering the DS machine in the Digital Signage portal by computer name', 'Creating the ITLC queue playlist with the ServiceNow queue URL', 'Setting display duration to 900 seconds (15 min) and browser to Chrome', 'Configuring screen orientation (landscape/portrait) in the portal settings'] }] },
  { id: 112,
    title: 'Corporate Cybersecurity in Practice: Policies, Tools & Real Implementations',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '4h', students: '90+', rating: 4.9, isFree: true,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop',
    skills: ['Zero Trust', 'Azure AD', 'Microsoft Defender', 'BitLocker', 'Conditional Access', 'MFA & SSPR', 'Password Policy', 'Python Security Tools', 'Intune Compliance', 'CyberArk EPAM', 'DLP', 'Incident Response'],
    description: 'A hands-on corporate cybersecurity course built from 15+ years of real enterprise IT at SAP — covering Zero Trust architecture, endpoint security, identity & access management, password policy, DLP, and incident response. Learn through 5 real tools and implementations deployed in production, including a Python Password Generator app built and shipped by the instructor.',
    whatYouLearn: [
      'Design and implement Zero Trust architecture with Conditional Access policies',
      'Deploy endpoint security: Defender, BitLocker, CyberArk, Intune compliance',
      'Build a cybersecurity-compliant Python password generator from scratch',
      'Enforce SSPR and MFA policies that eliminate helpdesk password calls',
      'Implement DLP policies to prevent data leakage via email and SharePoint',
      'Monitor SLA breach risks with automated Python alerting (real production tool)',
      'Apply Microsoft Secure Score to track and improve security posture',
      'Respond to security incidents: playbook, escalation, and post-incident steps',
    ],
    curriculum: [
      { module: 'Module 1 — Corporate Cybersecurity Foundations', lessons: [
        'The enterprise threat landscape: phishing, social engineering, insider threats',
        'Zero Trust principle: never trust, always verify — applied to corporate IT',
        'Microsoft Secure Score: what it measures and how to use it as a benchmark',
        'Security posture case study: Secure Score 41% → 78% in 12 months',
        'Cybersecurity policy framework: password, device, data, and access policies',
        'ITIL v3 alignment: Change Management for security deployments',
      ]},
      { module: 'Module 2 — Identity & Access Management (IAM)', lessons: [
        'Azure AD / Entra ID: users, groups, roles, and licences',
        'Conditional Access policy design: compliant device + MFA + named location',
        'MFA methods: Authenticator app, SMS, FIDO2 hardware key, Windows Hello',
        'Privileged Identity Management (PIM): no permanent admin accounts',
        'Temporary Access Pass (TAP): bootstrapping MFA for new employees',
        'Blocking legacy authentication: why it eliminates 99% of password spray attacks',
      ]},
      { module: 'Module 3 — Password Security & the Password Generator App', lessons: [
        'Enterprise password policy: 15-char minimum, complexity, 2-year expiry',
        'Password entropy explained: brute-force time for 8 vs 15 vs 20 chars',
        'Passphrase design: combining unrelated words for strength and memorability',
        'Build: Python 3 Password Generator (Strong / Medium / Memorable modes)',
        'Code walkthrough: Tkinter GUI, character pools, random.choice(), SQLite history',
        'Deploy: packaging as a standalone macOS .app with PyInstaller — no Python needed',
        'Self-Service Password Reset (SSPR): reducing helpdesk password tickets to zero',
      ]},
      { module: 'Module 4 — Endpoint Security & Compliance', lessons: [
        'Endpoint security stack: Trellix/McAfee + Microsoft Defender for Endpoint (EDR)',
        'BitLocker XTS-AES 256-bit encryption: enforcing and escrow-ing recovery keys',
        'CyberArk Endpoint Privilege Manager (EPAM): removing local admin without blocking work',
        'Intune compliance policies: what triggers non-compliance and how devices get blocked',
        'Conditional Access: non-compliant device = no corporate resource access',
        'Microsoft Defender Secure Score: weekly improvement tracking',
        'DLP policies: blocking sensitive data in email, SharePoint, and OneDrive',
      ]},
      { module: 'Module 5 — Network Security & Zero Trust Architecture', lessons: [
        '802.1X wireless authentication: certificate-based, no shared PSK',
        'ForeScout NAC: quarantining non-compliant devices at the network level',
        'Cisco Umbrella DNS security: blocking malicious domains before connection',
        'VPN security: GlobalProtect always-on, split tunnel vs full tunnel tradeoffs',
        'VLAN segmentation: corporate, guest, and IoT network isolation',
        'Firewall migration: legacy Windows firewall → platform-native firewall (phased)',
      ]},
      { module: 'Module 6 — Security Monitoring & Automated Alerting', lessons: [
        'Microsoft Sentinel SIEM: log ingestion, alert rules, incident creation',
        'Defender for M365: EDR alert triage — what to investigate and what to suppress',
        'SLA breach monitoring with Python: real production daemon checking ServiceNow every 5 min',
        'WhatsApp alerting via Twilio: code walkthrough of the SLA alert bot',
        'PowerBI security dashboard: Secure Score, compliance %, open incidents at-a-glance',
        'Audit logs: Azure AD sign-in logs, Conditional Access failures, privilege escalations',
      ]},
      { module: 'Module 7 — Data Loss Prevention & Information Protection', lessons: [
        'Data classification: public, internal, confidential, restricted — labelling in M365',
        'DLP policy design: what triggers it, what it blocks, and how to tune false positives',
        'SharePoint and OneDrive external sharing governance: approved vs blocked domains',
        'Email DLP: blocking credit card numbers, national IDs, and sensitive keywords',
        'Insider threat scenarios: how DLP catches accidental and intentional data leakage',
        'Compliance Manager: mapping M365 controls to GDPR and ISO 27001',
      ]},
      { module: 'Module 8 — Security Incident Response', lessons: [
        'Incident classification: P1 (account compromise) → P4 (policy violation)',
        'First response playbook: what to do in the first 60 minutes of a breach',
        'Account compromise: disable → investigate → reset → MFA re-enrol → audit',
        'Device compromise: MDM wipe, endpoint isolation, Defender investigation',
        'Phishing response: report → IT triage → block sender → user notification',
        'Post-incident: root cause analysis, policy update, awareness communication',
        'Lessons from real incidents: what works and what fails in enterprise response',
      ]},
    ],
  },
  { id: 113,
    title: 'Build a Social Media Manager App with Python & Facebook API',
    category: 'Digital Marketing',
    level: 'Intermediate', duration: '3h', students: '60+', rating: 4.9, isFree: true,
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop',
    skills: ['Python', 'Flask', 'Facebook Graph API', 'OAuth 2.0', 'SQLite', 'Content Calendar', 'HTML/CSS Image Generation'],
    description: 'Build a full-stack social media management app from scratch — featuring a content calendar, AI post generator, affiliate link tracker, and Facebook Graph API integration. Based on a real app built by the instructor to manage the HiTecH Technology HUB Facebook page (1M+ community).',
    whatYouLearn: [
      'Design and build a Flask app with SQLite for content management',
      'Implement a content calendar with full CRUD and status tracking',
      'Integrate Facebook Graph API with OAuth 2.0 for page management',
      'Build an affiliate link tracker with click analytics',
      'Generate branded social media images using HTML/CSS rendering',
    ],
    curriculum: [
      { module: 'Module 1 — App Architecture & Database Design', lessons: ['Flask project structure: routes, templates, static files, config', 'SQLite database design: posts table, affiliates table, config store', 'Row factory pattern for dictionary-style query results', 'Init DB on startup: CREATE TABLE IF NOT EXISTS pattern', 'Config persistence: reading and writing a JSON config file'] },
      { module: 'Module 2 — Content Calendar', lessons: ['Building the calendar view: list posts by date with status badges', 'New post form: title, caption, image URL, scheduled date, platform', 'Edit and delete post with confirmation dialog', 'Mark post as posted: status update and timestamp recording', 'Filtering posts by status: draft, scheduled, posted'] },
      { module: 'Module 3 — Facebook Graph API Integration', lessons: ['Facebook App setup: create app, get App ID and App Secret in Meta Developer Portal', 'OAuth 2.0 flow: redirect to Facebook, handle callback, store access token', 'List pages the user manages via /me/accounts Graph API endpoint', 'Post text content to a page using the /{page-id}/feed endpoint', 'Refreshing long-lived page tokens to avoid expiry (60-day tokens)'] },
      { module: 'Module 4 — AI Post Generator & Image Creator', lessons: ['AI post generation: calling an API to generate captions from a topic prompt', 'HTML template design for branded post images with logo and colour scheme', 'Base64-encoding a mascot/logo image for inline HTML embedding', 'Rendering HTML to PNG using a headless subprocess call', 'Serving generated images as downloadable files from a Flask route'] },
      { module: 'Module 5 — Affiliate Link Tracker', lessons: ['Affiliate link data model: name, URL, description, click count, revenue', 'Recording a click: redirect route that logs before forwarding the user', 'Displaying click analytics per link on the dashboard', 'Update affiliate link details and revenue attribution in SQLite', 'Export affiliate data to CSV for performance reporting'] },
    ],
  },
  { id: 114,
    title: 'Build a Password Generator App with Python — From Zero to macOS .app',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '2h', students: '70+', rating: 4.9, isFree: true,
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop',
    skills: ['Python 3', 'Tkinter', 'SQLite3', 'PyInstaller', 'Password Policy', 'macOS App Packaging'],
    description: 'Build a fully functional Password Generator desktop app with Python from scratch — Tkinter GUI, three generation modes (Strong, Medium, Memorable), local SQLite history, one-click clipboard copy, and packaged as a standalone macOS .app. The exact app built and shipped by the instructor.',
    whatYouLearn: [
      'Build a Tkinter GUI app with labels, entries, dropdowns, checkboxes, and buttons',
      'Generate passwords in three modes: Strong, Medium, and Memorable passphrase',
      'Store password history in SQLite using ~/Library/Application Support',
      'Copy generated passwords to the clipboard with one click',
      'Package the app as a standalone macOS .app using PyInstaller — no Python needed',
    ],
    curriculum: [
      { module: 'Module 1 — Project Setup & GUI Skeleton', lessons: [
        'Why Tkinter: built into Python, no dependencies, works on macOS/Windows',
        'Creating the main window: title, size (450×450), resizable settings',
        'Adding widgets: Label, Entry, OptionMenu, Checkbutton, Button',
        'StringVar and BooleanVar: connecting widgets to Python variables',
        'Basic layout with .pack() and .grid() — when to use each',
      ]},
      { module: 'Module 2 — Password Generation Logic', lessons: [
        'Building the character pool: string.ascii_letters + digits + punctuation',
        'Toggle digits: checkbox adds/removes string.digits from the pool',
        'Toggle symbols: checkbox adds/removes string.punctuation from the pool',
        'Strong mode: full character pool + random.choice() in a generator expression',
        'Medium mode: letters and digits only — same logic, smaller pool',
        'Memorable mode: picking random words from a word list and joining them',
        'Input validation: check length_entry is a valid integer, show error if not',
      ]},
      { module: 'Module 3 — Clipboard Copy & Error Handling', lessons: [
        'Reading the generated password from the StringVar result field',
        'clipboard_clear() + clipboard_append(): writing to the macOS clipboard',
        'messagebox.showinfo(): confirming "Password copied!" to the user',
        'messagebox.showerror(): showing "Enter valid length" on bad input',
        'Preventing copy when no password has been generated yet',
      ]},
      { module: 'Module 4 — SQLite History', lessons: [
        'Database path: os.path.expanduser("~/Library/Application Support/PasswordGenerator/")',
        'Why ~/Library/Application Support — survives app relocation and updates',
        'makedirs(exist_ok=True): creating the directory safely on first run',
        'Schema: id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT, created_at TEXT',
        'INSERT on every generation: storing password + str(datetime.now())',
        'History view: SELECT ORDER BY id DESC, display in a Text widget',
      ]},
      { module: 'Module 5 — Package as macOS .app with PyInstaller', lessons: [
        'Installing PyInstaller: pip install pyinstaller',
        'First build: pyinstaller --onefile --windowed password_generator_gui.py',
        'What --onefile and --windowed do — and why both are needed for a .app',
        'Adding an icon: --icon=icon.icns for a professional macOS app appearance',
        'Testing the .app bundle: double-click, verify clipboard, verify SQLite path',
        'Distribution: zipping the .app or wrapping in a .dmg for sharing',
      ]},
    ],
  },
  { id: 115,
    title: 'CLEA App: SAP IT Asset Lifecycle Management — Daily Operations',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '2h', students: '110+', rating: 4.9, isFree: true,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop',
    skills: ['CLEA App', 'SAP BTP', 'QR Asset Scanning', 'SAP ISP', 'Power BI', 'IT Asset Lifecycle', 'On/Offboarding'],
    description: 'Learn how to use the CLEA (Client Lifecycle Enterprise Application) SAP BTP app for daily IT asset operations — monthly pool stock QR scanning, device assignment for new hires (on-boarding), equipment recovery from leavers (off-boarding), goods receipt, and Power BI KPI reporting. Based on real daily operations managing 89+ devices across 6 categories in Riyadh.',
    whatYouLearn: [
      'Navigate all three CLEA modules: On-Boarding, Asset Operations, and Off-Boarding',
      'Run a monthly IT Storage Room inventory scan using the mobile CLEA app + QR scanner',
      'Assign pre-staged devices to new joiners and link to ServiceNow and SAP ISP records',
      'Process equipment returns and restock pool inventory after off-boarding',
      'Read and action Power BI global asset KPI reports across 18+ countries',
    ],
    curriculum: [
      { module: 'Module 1 — CLEA App Overview & Architecture', lessons: [
        'What is CLEA — Client Lifecycle Enterprise Application on SAP BTP',
        'Three main modules: On-Boarding, Asset Management Operations, Off-Boarding',
        'How CLEA connects to SAP ISP, ServiceNow ITSM, SAP Ariba, and Power BI',
        'Web app vs. mobile app: when to use each',
        'ABC asset classification: S (Standard), N (New), R (Repair/Return)',
        'Navigating the IT Operational Dashboard: live KPIs and pending actions',
      ]},
      { module: 'Module 2 — Monthly Pool Stock Scan (IT Storage Room Inventory)', lessons: [
        'What is IT Storage Room Inventory and why monthly scanning is mandatory',
        'Opening the mobile CLEA app: select Country → Location → IT Storage Room Inventory',
        'Scanning devices with the camera: QR code vs. barcode on SAP asset labels',
        'Device categories to scan: laptops, MacBooks, iPhones, iPads, Android, monitors',
        '"Show Missing Devices" button: identify unscanned assets and resolve gaps',
        'Closing the inventory cycle: verifying all 89 devices scanned and submitting',
        'What happens in the backend: SAP ISP records updated, Power BI reflects new data',
      ]},
      { module: 'Module 3 — On-Boarding: Device Assignment for New Joiners', lessons: [
        'On-Boarding Calendar: how HR-triggered events appear in CLEA for IT planning',
        'New joiner on-boarding: select user → assign pre-staged device from pool stock',
        'Hardware Shipping module: initiating device shipping for remote employees',
        'Mass Hardware Pre-assignment: bulk assign devices to multiple joiners before Day 1',
        'Linking the CLEA assignment to the ServiceNow on-boarding ticket',
        'User Event logging: recording Day 1 handover with timestamp and serial number',
        'Verifying the assignment appears in SAP ISP asset record',
      ]},
      { module: 'Module 4 — Goods Receipt & Off-Boarding', lessons: [
        'Goods Receipt: receiving new hardware from SAP Ariba PO — step-by-step in CLEA',
        'Registering received devices: model, serial number, ABC classification, storage location',
        'Goods Receipt History: audit trail for all procurement intake — what to verify',
        'Off-Boarding Calendar: how leaver events from HR appear for IT action',
        'Equipment recovery workflow: contact user → collect device → process Return Receipt',
        'Return Receipt: recording physical condition, accessories checklist, sign-off',
        'Device back to pool: update CLEA status → device appears in next scan cycle',
      ]},
      { module: 'Module 5 — Power BI Asset Reporting & KPI Tracking', lessons: [
        'Equipment Report Overview: total by category — laptops, desktops, phones, tablets, monitors',
        'Missing Data report: identifying assets with incomplete SAP ISP records',
        'Select Region slicer: filtering Power BI by country or office location',
        'Inventory Status KPI tiles: reading colour-coded status (green/gold/red/blue)',
        'Inventory cycle tracking: open vs. next cycle, cycle number history (e.g. 1727–1797)',
        'Global scope: reviewing 18+ country data in a single Power BI view',
        'Sharing the Power BI report with IT management for monthly asset review',
      ]},
    ],
  },
  { id: 116,
    title: 'ServiceNow CSM/FSM Workspace & HCSM AI Copilot for IT Support',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '2h 30m', students: '95+', rating: 4.9, isFree: true,
    img: '/snow-ticketing-banner.jpg',
    skills: ['ServiceNow CSM/FSM', 'HCSM AI Copilot', 'Walk-up Queue', 'Interaction Management', 'Catalog Tasks', 'SLA IRT/MPT', 'ITIL v3'],
    description: 'Master the ServiceNow CSM/FSM Configurable Workspace for daily IT support operations — managing interactions, catalog tasks, incidents, walk-up queue, and using the HCSM AI Copilot for faster resolution. Based on real daily operations handling 1,300+ interactions and 65+ catalog tasks per month.',
    whatYouLearn: [
      'Navigate the CSM/FSM Configurable Workspace and its custom list structure',
      'Manage walk-up interactions from queue assignment to Closed Complete',
      'Process catalog tasks (SCTASK) for hardware lifecycle, onboarding, and maintenance',
      'Use HCSM AI Copilot to surface use cases and KB articles inside every ticket',
      'Monitor IRT/MPT SLA KPIs and act before breach using the live dashboard',
    ],
    curriculum: [
      { module: 'Module 1 — CSM/FSM Workspace Overview', lessons: [
        'What is CSM/FSM Configurable Workspace and how it differs from standard SNOW lists',
        'Navigating the workspace: default lists vs. my lists, creating custom filtered lists',
        'The "Happening Now" KPI dashboard: IRT/MPT Breached, In Danger, Resolved, Open tasks',
        'Understanding SC Tasks vs. Interactions vs. Incidents — when each ticket type applies',
        'Agent availability status: SAP IT, Chat, Calls, Walk-up — setting and switching channels',
        'Creating new records: Interaction, Service Request, Problem, Incident, ProdSec Vulnerability',
      ]},
      { module: 'Module 2 — Interaction & Walk-up Queue Management', lessons: [
        'Interaction types: Walk-up, Phone/Chat — how they arrive and how to accept them',
        'Walk-up queue: how the ITLC kiosk creates an interaction and routes it to the agent',
        'Processing a walk-up interaction: open → assign → work → close complete',
        'Visit reasons and service offerings: selecting the right category for accurate reporting',
        'Walk-up Appointments: scheduling and managing pre-booked IT support sessions',
        'User Interactions history: viewing a user\'s full interaction history before starting work',
        'Closing an interaction: state → Closed Complete, posting external info with closing template',
      ]},
      { module: 'Module 3 — Catalog Tasks (SCTASK) Daily Operations', lessons: [
        'What is a Catalog Task (SCTASK) and how it differs from an Incident',
        'Hardware lifecycle tasks: device return assistance (iPhone, MacBook, iPad, Android)',
        'New hire IT onboarding catalog tasks: device provisioning, account setup Day 1',
        'Hardware maintenance tasks: processing repair and replacement requests',
        'Reading the SCTASK list: filtering by "With Life Cycle app", "My Work", assignment group',
        'Task SLAs tab: reading IRT/MPT timers and taking action before breach',
        'Closing a catalog task: standardised closing template with satisfaction survey link',
      ]},
      { module: 'Module 4 — HCSM AI Copilot in Daily Operations', lessons: [
        'What is HCSM AI Copilot and where it lives in the CSM/FSM workspace',
        'Triggering AI Copilot inside an interaction or catalog task',
        'How Copilot searches use cases: reading the "Search use case" panel results',
        'Applying a Copilot suggestion: using the suggested resolution in your ticket notes',
        'When Copilot helps most: complex technical issues vs. simple requests',
        'KB article integration: Copilot surfaces relevant KBAs — how to attach them to the ticket',
        'Feedback loop: how good ticket descriptions improve Copilot suggestion quality',
      ]},
      { module: 'Module 5 — SLA Monitoring, Knowledge & Service Portfolio', lessons: [
        'IRT vs. MPT SLA: what each measures and the difference in breach consequences',
        'Reading the SLA KPI dashboard: Breached (red), In Danger (amber), Safe (green)',
        'My SLAs Work list: filtering to see only your tickets approaching breach',
        'Knowledge management: Frequently used KBAs, publishing and unpublishing articles',
        'Problem management: My Open, Preventive Measures — proactive problem resolution',
        'Service Portfolio Management: Outages — checking active outages before troubleshooting',
        'Requested Items: My Groups Awaiting Info — clearing the backlog daily',
      ]},
    ],
  },
  { id: 117, title: 'Office AV Technology: Plan, Install & Commission Meeting Room Tech', category: 'Office & AV Technology', level: 'Intermediate', duration: '3h', students: '75+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop', skills: ['MS Teams Rooms', 'AV Over IP', 'Room Schedulers', 'Wolfvision Cynap Pure', 'Digital Signage', 'Display Technologies', 'Audio Systems', 'Office Build-Out'], description: 'Learn how to plan, install, configure, and commission enterprise office AV technology — meeting room standards, Microsoft Teams Rooms, display technologies, wireless presentation, room schedulers, audio systems, AV-over-IP, and digital signage. Based on real delivery managing 15+ meeting rooms.', whatYouLearn: ['Define meeting room technology standards by room category', 'Deploy and configure Microsoft Teams Rooms hardware', 'Select and install display technologies and audio systems', 'Set up Wolfvision Cynap Pure wireless presentation for BYOD use', 'Commission room schedulers with Exchange/Teams integration and deliver formal site acceptance'], curriculum: [{ module: 'Module 1 — Meeting Room Standards & Technology Selection', lessons: ['Meeting room categories: XS huddle (1-4), Small/Med (5-10), Large (10-20), Boardroom/VIP (20+)', 'Technology matrix: approved AV stack per room category', 'Microsoft Teams Rooms certified hardware: bars, cameras, audio, compute units', 'Display selection: screen size formula, throw ratio for projectors', 'AV Over IP vs. traditional HDMI: when to use each', 'Building a Bill of Materials (BOM) before procurement'] }, { module: 'Module 2 — Microsoft Teams Rooms Deployment', lessons: ['Teams Rooms hardware setup: unboxing, mounting, cable management', 'Initial configuration: Teams Rooms Pro licence, account setup, domain join', 'One-touch meeting join: verifying calendar integration with Exchange/M365', 'Teams Rooms Admin Centre: monitoring room health and peripheral status', 'Nightly health check: actioning amber/red status', 'Common Teams Rooms issues and on-site remediation'] }, { module: 'Module 3 — Display & Audio Technologies', lessons: ['Display types: LCD panels, interactive flat panels, LED video walls, projectors', 'Display mounts and trolleys: fixed wall, flush, motorised, and mobile', 'Digital flipcharts: interactive whiteboard setup and network integration', 'Audio design: ceiling mic coverage zones, table boundary mics, gooseneck placement', 'Handheld and lavalier microphones: wireless frequency management', 'Loud speaker placement: coverage calculation, feedback prevention', 'AV calibration: audio levels, display brightness standardisation'] }, { module: 'Module 4 — Wireless Presentation & Room Schedulers', lessons: ['Wolfvision Cynap Pure: what it is and why it replaces HDMI cables', 'Cynap Pure installation: network connection, vSolution Link Pro portal', 'BYOD wireless presentation: Windows, macOS, iOS, Android without cables', 'Cynap Pure troubleshooting: connectivity, firmware updates, factory reset', 'Room schedulers (eDoorplates): Crestron vs. Evoko comparison', 'Doorplate setup: network join, Exchange/Teams calendar binding', 'Booking panel behaviour: check-in, ad-hoc booking, auto-release after 10 min'] }, { module: 'Module 5 — Digital Signage, Build-Out & Handover', lessons: ['Digital signage architecture: content management, display network, scheduling', 'Digital Signage portal: registering screens, playlists, display duration', 'AV Over IP: encoder/decoder setup, VLAN requirements', 'Office build-out checklist: floor plan review to site acceptance sign-off', 'Vendor management: scoping AV contractor work, quality checks', 'Site acceptance testing: AV, network, booking, wireless — formal sign-off', 'Handover documentation: network diagram, AV config sheet, warranty register'] }] },
  { id: 118, title: 'IT Pickup Point: Deploy & Manage Smart Lockers for Self-Service IT Asset Collection', category: 'Office & AV Technology', level: 'Intermediate', duration: '2h', students: '55+', rating: 4.9, isFree: true, img: '/it-pickup-locker-2.jpg', skills: ['Signifi Digital Locker', 'Smart Locker Management', 'IT Asset Automation', 'SignifiVISION', 'Self-Service IT', 'Audit Trail', 'ITAM Integration', 'Deployment Readiness'], description: 'Learn to deploy and operate a Signifi Digital Storage Locker IT Pickup Point — from the 11-point pre-installation readiness checklist through to daily operations. Covers the complete delivery status lifecycle, step-by-step locker and ITLC pickup procedures, 7-day expiry policy, kiosk inventory reporting, emergency key protocol, and deployment cost management. Based on a real production deployment.', whatYouLearn: ['Execute the complete locker pickup workflow: app entry → technician drop-off → employee QR/PIN collection', 'Manage the IT Link Center (ITLC) as an overflow pickup channel for oversized items', 'Apply the 7-day expiry policy: identify uncollected items and move to ITLC correctly', 'Generate and interpret kiosk inventory and delivery reports in Excel', 'Complete the 11-point Signifi deployment readiness checklist to avoid costly on-site abort fees'], curriculum: [{ module: 'Module 1 — Smart Locker Fundamentals & Delivery Workflow', lessons: ['What is a Signifi digital storage locker and how it replaces manual IT asset handoff', 'Delivery status lifecycle: Pending Technician Drop-off → Pending Customer Pickup → Complete', 'Two pickup channels: Smart Locker (self-service QR/PIN) vs. IT Link Center (staff-assisted)', 'When to use ITLC instead of locker: item too large, employee requested it, or locker unavailable', 'Signifi at scale: 350M+ transactions/year, 45+ countries, 85+ API integrations', 'Compliance advantage: authenticated digital audit trail eliminates sign-out sheets permanently'] }, { module: 'Module 2 — Deployment Planning & Installation', lessons: ['Placement strategy: lobby vs. IT room vs. floor — what drives the decision', 'Physical requirements: floor space, power supply, network connectivity (LAN/Wi-Fi)', 'Compartment size planning: small (phones/accessories), medium (tablets), large (laptops/MacBooks)', 'Branding and signage: "IT Pickup Point" label, wayfinding, QR code instructions on-screen', 'Network configuration: locker IP assignment, firewall rules for SignifiVISION cloud connectivity', 'First-time setup: physical commissioning, screen boot, admin login, locker ID registration'] }, { module: 'Module 3 — SignifiVISION Software Administration', lessons: ['SignifiVISION dashboard: real-time locker status, compartment occupancy', 'User management: adding employees, assigning access levels, linking to corporate directory', 'Compartment assignment: assigning a specific locker slot to a user or order', 'Notification configuration: email/SMS templates for "your item is ready to collect"', 'Personalised alerts: locker full, item not collected after X hours, access failure', 'Reporting: transaction history, user access log, asset dwell time, utilisation rate'] }, { module: 'Module 4 — Asset Management Integration', lessons: ['End-to-end workflow: SAP Ariba order approved → IT loads locker → employee notified → collects → CLEA updated', 'ServiceNow integration: fulfilment ticket automatically linked to locker assignment number', 'CLEA/SAP ISP update on collection: asset status changes from "In Stock" to "Assigned" automatically', 'Return workflow: employee deposits device → locker records return → ticket auto-raised', 'API integration: Signifi 85+ API integrations — connecting to SAP, ServiceNow, and MDM tools', 'Audit trail: every collection event — user ID, timestamp, compartment, asset serial — stored in SignifiVISION'] }, { module: 'Module 5 — Daily Operations & Troubleshooting', lessons: ['Daily checklist: load approved orders, verify compartment availability, check notification queue', 'Employee experience: receive notification → arrive at locker → authenticate → collect', 'Authentication methods: PIN code, QR code, badge tap, biometric (model dependent)', 'Common issues: compartment stuck, employee locked out, notification not received — resolution steps', 'UV sanitisation cycle: when to run, how to verify completion, compliance logging', 'Escalation path: locker hardware fault → Signifi support → temporary manual handoff protocol', 'Monthly maintenance: clean touch screen, check connections, review access logs'] }] },
  { id: 119, title: 'Zebra ZT411R RFID Printer: Full Setup, Calibration & Asset Tag Printing', category: 'Printer Management', level: 'Intermediate', duration: '2h', students: '40+', rating: 4.9, isFree: true, isPopular: true, img: '/zebra-zt411-rfid-calibration-complete.webp', skills: ['Zebra ZT411R', 'RFID Configuration', 'ZebraNet Print Server', 'Label Media Loading', 'EU RED Compliance', 'Zebra Setup Utilities', 'Network Printing', 'CLEA App', 'IT Asset Management'], description: 'Complete end-to-end course on deploying and operating the Zebra ZT411R industrial RFID printer — from unboxing through manual media calibration, RFID calibration, EU RED security activation via Zebra Setup Utilities, wired network registration, ZebraNet print server configuration, CLEA integration, and daily asset tag operations. Based on a real production deployment.', whatYouLearn: ['Unbox and install the Zebra ZT411R correctly — including placement for RFID accuracy', 'Load RFID inlay media and thermal transfer ribbon without causing void tags', 'Perform manual media calibration (Pause + Cancel) and verify single-label feed', 'Run RFID calibration with correct regional settings — full 5-minute cycle', 'Activate EU RED compliance by sending a Security Setup File via Zebra Setup Utilities', 'Register the printer on the corporate network and obtain a stable DHCP reservation', 'Configure ZebraNet print server and verify via the printer web interface', 'Integrate with CLEA for real-time RFID asset record updates', 'Diagnose and fix VOID labels, label gaps, QR code offsets, and scanner issues'], curriculum: [{ module: 'Module 1 — RFID Printer Fundamentals & Hardware Overview', lessons: ['What is RFID and why enterprise IT uses it for asset tracking', 'Zebra ZT411R hardware tour: print engine, RFID encoder, ZebraNet print server, media path, ports', 'Thermal transfer vs. direct thermal printing — why thermal transfer for durable RFID asset tags', 'RFID inlay types: UHF vs. HF — enterprise IT standard is UHF (ISO 18000-6C / EPC Gen2)', 'RFID label specification: 60×25mm Synthetic RFID Coated Acrylic, 400 labels/roll', 'Unboxing checklist and placement guidelines: clearance, ventilation, away from UHF emitters'] }, { module: 'Module 2 — Hardware Installation & Media Loading', lessons: ['Ribbon loading: threading the ribbon path correctly, attaching to take-up spindle', 'Why ribbon width must match label width — printhead wear and print edge quality', 'Loading RFID inlay label rolls: positioning the inlay directly over the RFID antenna window', 'Media guide adjustment: push firmly against label edges — loose guides cause calibration failures', 'Power-on sequence and initial test print to confirm mechanical setup', 'Reference videos: Ribbon and Label Position, Sensor label Adjust, Where the Sensor must light'] }, { module: 'Module 3 — Manual Media Calibration', lessons: ['Why manual calibration is required after every label roll change', 'Step-by-step: Press and hold Pause + Cancel to enter manual calibration mode', 'Why the ribbon must be removed during calibration — sensor reads label backing only', 'Verifying calibration: press Feed and confirm exactly one label advances', 'What causes multi-label feeds and how to repeat the calibration correctly', 'Reference: Printer Calibration document and sensor adjustment video'] }, { module: 'Module 4 — RFID Calibration & Encoder Setup', lessons: ['Why RFID calibration is separate from media calibration — inlay position varies per roll', 'Front panel navigation: Menu → RFID Icon → RFID Calibrate → Start Calibration', 'Selecting the correct country/region code — this affects RF output compliance', 'Understanding calibration time: a full successful cycle takes more than 5 minutes', 'If calibration finishes quickly — why this means it failed and how to retry', 'Verify after calibration: print a test label and confirm RFID data reads back correctly'] }, { module: 'Module 5 — EU RED Security Activation via Zebra Setup Utilities', lessons: ['What EU RED is and why all RF-emitting equipment requires compliance activation', 'Why this requires Zebra Setup Utilities + Windows PC — not the front panel alone', 'Download and install Zebra Printer Setup Utilities for Windows from zebra.com/support', 'Connect the printer to your computer via USB Type-A to Type-B cable', 'Select the printer in Zebra Setup Utilities and open Open Communication With Printer', 'Paste the Security Setup File contents into the Direct Communication window and click Send to Printer', 'Reading the response window: what a successful activation response looks like', 'Set Head Close Action to No Motion to prevent label waste on printhead open/close'] }, { module: 'Module 6 — Network Registration & Print Server Setup', lessons: ['Disable Power Save / Energy Star before network connection — prevents port deactivation', 'Connect via Ethernet (DHCP) — how to find the assigned IP address on the printer display', 'Contact the Printer Team: provide MAC address and current IP for hostname and DHCP reservation', 'Why print queues must wait until DHCP reservation is confirmed — silent IP change breaks all queues', 'Accessing the ZebraNet print server web interface: Status READY, RFID READY, link status check', 'Print server pages: View/Modify Settings, RFID Log, Alert Setup, Directory Listing, Printer Controls', 'SNMP alert configuration: Cold Start broadcast for network monitoring'] }, { module: 'Module 7 — CLEA Integration, Daily Operations & Troubleshooting', lessons: ['How RFID tags printed by the ZT411R feed into the CLEA asset lifecycle management system', 'Daily tagging workflow: asset record → print → verify RFID → apply → update system', 'Label quality check before applying: scan every tag — catch void tags before they reach a device', 'Troubleshooting: VOID message — RFID calibration not completed correctly, repeat calibration', 'Troubleshooting: label gap between prints — sensor position issue, run manual calibration', 'Troubleshooting: QR code / barcode offset — adjust fine-tuning in the label template code', 'Troubleshooting: scanner cannot scan anything — set keyboard mode in Desktop123 software', 'Ordering replacement labels: LABEL SYNTHETIC 60×25MM RFID COATED ACRYLIC 76.2MM 400/R'] }] },
  { id: 121, title: 'Claude Code 101', category: 'AI & Automation', level: 'Beginner', duration: '2h', students: '0+', rating: 5.0, isFree: false, img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop', skills: ['Claude Code CLI', 'AI-Assisted Coding', 'CLAUDE.md', 'MCP Servers', 'Subagents', 'Skills', 'Hooks', 'Daily Workflow'], description: 'The complete beginner course for Claude Code — Anthropic\'s agentic coding tool that understands your codebase, edits files, runs commands, and integrates with your developer tools. Based on the official Anthropic Skilljar curriculum. Available in terminal, VS Code, Claude Desktop, and JetBrains.', whatYouLearn: ['Understand what Claude Code is and how it differs from Claude.ai', 'Install Claude Code and write your first prompt in minutes', 'Apply the daily explore → plan → code → commit workflow', 'Manage context effectively in large codebases', 'Customise Claude Code with CLAUDE.md, Subagents, Skills, MCP, and Hooks'], curriculum: [{ module: 'What is Claude Code?', lessons: ['What is Claude Code? — agentic coding tool overview', 'How Claude Code works — files, commands, and self-correction'] }, { module: 'Your first prompt', lessons: ['Installing Claude Code', 'Your first prompt'] }, { module: 'Daily workflows', lessons: ['The explore → plan → code → commit workflow', 'Context management', 'Code review'] }, { module: 'Customizing Claude Code', lessons: ['The CLAUDE.md file', 'Subagents', 'Skills', 'MCP', 'Hooks'] }, { module: 'Quiz', lessons: ['Course quiz'] }] },
  { id: 123, title: 'Nexthink Amplify: Real-Time Endpoint Visibility for IT Support', category: 'AI & Emerging Tech', level: 'Intermediate', duration: '2h', students: '65+', rating: 4.9, isFree: false, isPopular: true, img: '/nexthink-logo.png', skills: ['Nexthink Amplify', 'Endpoint Analytics', 'Remote Actions', 'ITSM Integration', 'FCR Improvement', 'Proactive IT', 'MTTR Reduction', 'Digital Workplace'], description: 'Nexthink Amplify is a browser-based plugin that integrates real-time endpoint telemetry, AI diagnostics, and one-click remote actions directly into your ITSM ticketing tool. This course covers the full Amplify workflow — from understanding the architecture to using remote actions, interpreting telemetry, and improving First Contact Resolution at the service desk.', whatYouLearn: ['Understand how Nexthink Amplify integrates with your ITSM platform and surfaces endpoint data inside tickets', 'Interpret real-time device telemetry: CPU, memory, crashes, boot time, network, compliance', 'Use one-click remote actions to resolve common issues without remote desktop', 'Apply guided diagnostics to improve First Contact Resolution at L1', 'Identify proactive signals — crash spikes, compliance drift — before users raise tickets'], curriculum: [
    { module: 'Module 1 — What is Nexthink Amplify?', lessons: [
      'The problem Nexthink solves: why traditional IT support is reactive and slow',
      'What Nexthink Amplify is — browser extension + ITSM integration explained',
      'Nexthink architecture: Collector → Infinity Platform → Amplify extension',
      'How Amplify reads the ticket and pulls device data automatically',
      'Nexthink vs. traditional endpoint management tools — key differences',
      'Installing and activating the Amplify browser extension in your ITSM environment',
    ]},
    { module: 'Module 2 — Real-Time Endpoint Telemetry', lessons: [
      'Device health dashboard: what you see the moment a ticket opens',
      'CPU & memory: reading live utilisation vs. historical trend',
      'Boot & login time: identifying slow startup and what causes it',
      'App crash count: 7-day history and how to identify unstable applications',
      'Network latency & Wi-Fi signal: distinguishing device vs. connectivity issues',
      'Disk space, patch status, and compliance state — all in one view',
      'BitLocker & encryption status: security compliance check without calling the user',
    ]},
    { module: 'Module 3 — One-Click Remote Actions', lessons: [
      'What remote actions are and how they work without opening a remote desktop session',
      'Clear application cache: resolving Teams, browser, and app performance issues',
      'Restart background services: fixing stuck processes remotely',
      'Collect diagnostic logs: attach logs to ticket automatically',
      'Check Wi-Fi signal strength remotely and interpret the result',
      'Trigger compliance remediation via MDM integration',
      'Audit trail: how all remote actions are automatically logged against the ticket',
    ]},
    { module: 'Module 4 — Guided Diagnostics & FCR Improvement', lessons: [
      'What is First Contact Resolution (FCR) and why it is the key IT support metric',
      'How guided diagnostic checklists remove inconsistency from L1 support',
      'Slow laptop workflow: use CPU/process data to identify root cause without user input',
      'Teams call drop workflow: Wi-Fi telemetry → wired recommendation or AP fault',
      'Post-re-image compliance check: verify MDM enrolment state via Amplify',
      'Recurring app crash workflow: escalate with pre-captured 7-day crash data',
      'When to escalate vs. resolve: reading the data to make the right call',
    ]},
    { module: 'Module 5 — Proactive IT & Advanced Scenarios', lessons: [
      'Proactive vs. reactive IT support: why waiting for tickets is inefficient',
      'Detecting crash spikes across a device cohort after a software update',
      'Login time degradation trends: identifying hardware model issues proactively',
      'Compliance drift detection: flagging devices that have fallen out of policy',
      'Network instability patterns: location-based AP fault identification',
      'Building a proactive IT workflow: daily telemetry review and threshold alerts',
    ]},
    { module: 'Assessment — Test Your Nexthink Amplify Knowledge', lessons: [
      'Assessment: Nexthink Amplify for IT Support',
    ]},
  ]},
  { id: 122, title: 'Microsoft Defender for Endpoint: Enterprise Deployment & Support', category: 'Cybersecurity', level: 'Intermediate', duration: '3h', students: '80+', rating: 4.9, isFree: false, isPopular: true, img: '/mde-logo.png', skills: ['Microsoft Defender for Endpoint', 'EDR', 'Endpoint Security', 'Microsoft Intune', 'Tamper Protection', 'Performance Tuning', 'mdatp CLI', 'PowerShell', 'Exclusion Management', 'L3 Escalation'], description: 'Microsoft Defender for Endpoint is an enterprise-grade endpoint security platform built into the Windows operating system designed to help protect businesses against sophisticated cyber threats. It offers comprehensive protection, detection, and response capabilities, including next-generation antivirus, endpoint detection and response (EDR), threat and vulnerability management, and attack surface reduction. Microsoft Defender for Endpoint is a unified solution that can help organizations simplify their security stack and enhance their overall security posture.', whatYouLearn: ['Understand how MDE is deployed and managed centrally via MDM (Intune) and why Tamper Protection prevents local changes', 'Apply enterprise-standard performance tuning: CPU throttling, scan scheduling, and network drive exclusions', 'Handle developer exclusion requests end-to-end — from ticket creation through policy sync', 'Diagnose and resolve high-CPU MDE issues on macOS using mdatp CLI diagnostics', 'Capture and analyse Windows MpPerformanceRecording (.etl) files to identify top scanned files', 'Escalate unresolved MDE issues to L3 with the correct diagnostic artefact package'], curriculum: [
    { module: 'Module 1 — MDE Architecture & Enterprise Management', lessons: [
      'What is Microsoft Defender for Endpoint — EDR, antivirus, and threat intelligence in one platform',
      'MDE deployment models: standalone vs. MDM-managed (Intune) vs. SCCM co-managed',
      'Why centralised management via MDM is the enterprise standard — consistency, auditability, no local override',
      'Tamper Protection: what it blocks, why it is enabled by default, and why users cannot change it',
      'Policy sync lifecycle: how MDM pushes MDE config to enrolled devices and the expected propagation delay',
      'MDE licensing: Plan 1 vs. Plan 2 feature differences — EDR, auto-investigation, threat analytics',
    ]},
    { module: 'Module 2 — Enterprise Performance Tuning', lessons: [
      'Why MDE can cause high CPU: real-time scanning, signature updates, and cloud telemetry behaviour',
      'CPU throttling: ScanAvgCPULoadFactor setting — recommended range and how it limits scan impact',
      'Scan type selection: Quick Scan vs. Full Scan — enterprise default and scheduling best practice',
      'Disabling scan-after-update: why this is standard in large estates and the compliance trade-off',
      'Network drive exclusions: SMB/UNC paths — why real-time scanning over network file shares creates latency',
      'Default developer directory exclusions: what is typically excluded and why (build tools, IDEs, VMs)',
      'Verifying applied exclusions on macOS: mdatp exclusion list command output and what to look for',
    ]},
    { module: 'Module 3 — Developer Exclusion Request Workflow', lessons: [
      'Why developers need additional exclusions: compilation, code scanning, and container workloads',
      'Common exclusion types: IDE processes, file extensions, Docker/container runtimes, hypervisor processes',
      'Tamper Protection and the ticket requirement: why users cannot self-serve exclusions',
      'What to include in an exclusion request ticket: device hostname, user role/team, specific paths or processes',
      'IT support role: gathering the right information, routing the ticket to the security/MDM team',
      'Policy group assignment: how the backend team applies developer exclusion profiles via MDM',
      'Timelines: typical policy propagation time after approval and how to confirm the exclusion is active',
    ]},
    { module: 'Module 4 — Troubleshooting MDE: macOS & Windows', lessons: [
      'macOS: identifying wdavdaemon high-CPU in Activity Monitor and confirming it is MDE',
      'macOS: mdatp health — checking sensor status, real-time protection state, and cloud connectivity',
      'macOS: mdatp exclusion list — confirming expected paths are listed',
      'macOS: real-time scan monitoring — using eslogger to identify which files are being scanned',
      'Windows: MpPerformanceRecording — capturing an .etl recording of scan activity',
      'Windows: Get-MpPerformanceReport — reading the top-files output and identifying scan hot-spots',
      'Windows: common PowerShell commands for MDE health and event log review',
      'Device re-onboarding after hardware repair: why motherboard/logic board replacement requires re-onboarding and how to do it via MDM',
    ]},
    { module: 'Module 5 — L3 Escalation & Advanced Scenarios', lessons: [
      'When to escalate: defining the boundary between L1/L2 resolution and L3 backend security team involvement',
      'MDE Analyzer: running the built-in diagnostic tool and collecting the output bundle',
      'Procmon for MDE: capturing process activity to identify scanning conflicts with third-party software',
      'Combining artefacts: MDE Analyzer + Procmon log + .etl recording — the full L3 escalation package',
      'MDE not appearing active on device: sensor health check, Intune compliance status, onboarding script re-run',
      'Post-escalation: what happens at L3 — cloud policy review, exclusion backend change, firmware-level EDR issues',
    ]},
    { module: 'Assessment — Test Your MDE Knowledge', lessons: [
      'Assessment: Microsoft Defender for Endpoint Enterprise Support',
    ]},
  ]},
  { id: 120, title: 'Zebra GX430t: QR Code Asset Tag Printing for Enterprise IT', category: 'Printer Management', level: 'Beginner', duration: '1h', students: '60+', rating: 4.8, isFree: true, img: '/zebra-gx430t-printer.jpg', skills: ['Zebra GX430t', 'QR Code Label Printing', 'Asset Tagging Workflow', 'CLEA App Scanning', 'IT Asset Management'], description: 'Learn to set up and operate the Zebra GX430t desktop label printer for enterprise IT asset tagging. Based on a real 3-year SAP IT production deployment.', whatYouLearn: ['Set up the Zebra GX430t printer and install drivers', 'Load label media and run auto-calibration', 'Design and print QR code asset tag templates', 'Apply tags to all IT device types correctly', 'Scan with CLEA mobile app and hand scanners for real-time asset updates'], curriculum: [{ module: 'Module 1 — Zebra GX430t Overview & Setup', lessons: ['GX430t hardware tour: direct thermal printing, no ribbon required', 'Unboxing and placement: USB connection, ventilation, desk positioning', 'Driver installation via Zebra Setup Utilities on Windows', 'Printer self-test: running a configuration label to verify setup', 'Connecting to the network: shared printer vs. direct USB configuration'] }, { module: 'Module 2 — Label Media Loading & Calibration', lessons: ['Opening the media compartment: correct label threading path', 'Loading the label roll: aligning guides to label width exactly', 'Running auto-calibration: press feed button, printer detects label size', 'Verifying calibration: test print confirms correct label positioning', 'Common loading errors: roll shift, misaligned guides, incorrect media type'] }, { module: 'Module 3 — QR Code Label Template Design', lessons: ['ZPL basics for IT asset labels', 'Designing the SAP asset tag: Equipment No. + Serial No. + QR code', 'QR code data structure: encoding SAP number and serial in one code', 'Label size and font selection for maximum scan reliability', 'Testing the template: print and verify QR code scans correctly before going live'] }, { module: 'Module 4 — Asset Tagging Workflow', lessons: ['When to print: every device gets a tag before it leaves the IT desk', 'Surface preparation: alcohol wipe, correct positioning by device type', 'Label placement standards: laptops, phones, tablets, APs, network devices', 'QR code verification after application: scan before handing over', 'Handling server room equipment: rack units, switches, patch panels, APs'] }, { module: 'Module 5 — CLEA App & Scanner Integration', lessons: ['CLEA mobile app: point camera at QR code to open asset record instantly', 'Updating asset status via CLEA: Stock → Assigned in one scan', 'Hand scanner for bulk stock takes: scanning 50+ items in minutes', 'Troubleshooting failed scans: faded print, partial damage, wrong orientation', 'Monthly maintenance: printhead cleaning to prevent gradual quality degradation'] }] },
]

const levelColor: Record<string, string> = {
  Beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
  Intermediate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Advanced: 'bg-red-500/15 text-red-400 border-red-500/30',
}

const MDE_QUESTIONS = [
  {
    q: 'A developer reports their laptop is extremely slow whenever they run a build. You check mdatp exclusion list on macOS and the build output directory is not listed. What is the correct next action?',
    options: [
      'Ask the user to disable Tamper Protection and add the exclusion themselves',
      'Raise an IT support ticket requesting the device be assigned to the developer exclusion policy group',
      'Uninstall MDE temporarily to confirm it is the cause',
      'Add the exclusion directly via the mdatp CLI on the device',
    ],
    answer: 1,
    explanation: 'Tamper Protection prevents local changes to MDE settings. The correct path is an IT ticket routed to the MDM/security team who can assign the device to the developer policy group.',
  },
  {
    q: 'After a motherboard replacement on a managed Windows laptop, the user\'s device no longer appears active in the endpoint security portal. What should you do?',
    options: [
      'Re-install the OS from scratch',
      'Raise a P1 security incident immediately',
      'Re-apply the MDM onboarding profile — trigger a device sync or re-run the onboarding script',
      'Wait 48 hours for the portal to auto-detect the device',
    ],
    answer: 2,
    explanation: 'Hardware identity changes after a motherboard swap can invalidate the MDE onboarding state. Re-pushing the MDM profile re-onboards the device and restores portal visibility.',
  },
  {
    q: 'You are capturing a Windows performance recording to identify what MDE is scanning. Which PowerShell command starts the recording?',
    options: [
      'Get-MpComputerStatus -RecordTo C:\\recording.etl',
      'Start-MpScan -ScanType Performance',
      'New-MpPerformanceRecording -RecordTo C:\\recording.etl',
      'mdatp health --record C:\\recording.etl',
    ],
    answer: 2,
    explanation: 'New-MpPerformanceRecording captures an .etl recording of Defender scan activity. You then analyse it with Get-MpPerformanceReport to find top scanned files.',
  },
  {
    q: 'A user insists they need to add their own MDE exclusion immediately and does not want to raise a ticket. How do you explain why this is not possible?',
    options: [
      'Local admin rights are required and IT can grant them temporarily',
      'Tamper Protection is enabled centrally via MDM — no local override is permitted for any user or admin',
      'MDE exclusions require a reboot and the user should wait until end of day',
      'The user can use Windows Defender Security Centre to add exclusions directly',
    ],
    answer: 1,
    explanation: 'In an MDM-managed enterprise deployment, Tamper Protection blocks all local changes to MDE settings — including exclusions. All changes must flow through the policy management team via an IT ticket.',
  },
  {
    q: 'You need to escalate an MDE issue to the L3 backend security team. Which combination of artefacts should you include?',
    options: [
      'A screenshot of Activity Monitor and the user\'s email describing the problem',
      'MDE Analyzer logs + Procmon log + MpPerformanceRecording .etl file',
      'mdatp health output only — the security team will request anything else they need',
      'Event Viewer export and a list of installed applications',
    ],
    answer: 1,
    explanation: 'A complete L3 escalation package includes MDE Analyzer logs (built-in diagnostic), a Procmon capture (process activity), and the .etl performance recording. Submitting all three prevents the ticket being returned for more information.',
  },
]

function AssessmentModule({ index }: { index: number }) {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(MDE_QUESTIONS.length).fill(null))
  const [showResult, setShowResult] = useState(false)

  const q = MDE_QUESTIONS[current]
  const score = answers.filter((a, i) => a === MDE_QUESTIONS[i].answer).length

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    const updated = [...answers]
    updated[current] = i
    setAnswers(updated)
  }

  function handleNext() {
    if (current < MDE_QUESTIONS.length - 1) {
      setCurrent(current + 1)
      setSelected(answers[current + 1])
    } else {
      setShowResult(true)
    }
  }

  function handleReset() {
    setCurrent(0)
    setSelected(null)
    setAnswers(Array(MDE_QUESTIONS.length).fill(null))
    setShowResult(false)
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="border border-purple-500/30 rounded-xl overflow-hidden">
        <div className="w-full flex items-center gap-3 px-5 py-4 bg-purple-900/20">
          <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-purple-400" />
          </span>
          <span className="flex-1 text-white font-bold text-sm leading-snug">Assessment — Test Your MDE Knowledge</span>
          <span className="text-gray-500 text-xs mr-2 flex-shrink-0">{MDE_QUESTIONS.length} questions</span>
        </div>
        <div className="bg-dark-900/40 border-t border-white/5 px-5 py-5">
          <p className="text-gray-300 text-sm mb-4">Test what you've learned in this course with {MDE_QUESTIONS.length} scenario-based questions covering MDE policy management, performance troubleshooting, exclusion workflows, and escalation procedures.</p>
          <button onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors">
            <Brain className="w-4 h-4" /> Start Assessment
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    const pct = Math.round((score / MDE_QUESTIONS.length) * 100)
    const passed = pct >= 80
    return (
      <div className="border border-purple-500/30 rounded-xl overflow-hidden">
        <div className="w-full flex items-center gap-3 px-5 py-4 bg-purple-900/20">
          <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-4 h-4 text-purple-400" />
          </span>
          <span className="flex-1 text-white font-bold text-sm">Assessment Complete</span>
        </div>
        <div className="bg-dark-900/40 border-t border-white/5 px-5 py-6 text-center">
          <div className={`text-5xl font-black mb-2 ${passed ? 'text-green-400' : 'text-yellow-400'}`}>{pct}%</div>
          <p className="text-white font-bold text-base mb-1">{passed ? 'Passed — well done!' : 'Keep studying'}</p>
          <p className="text-gray-400 text-sm mb-5">{score} of {MDE_QUESTIONS.length} correct</p>
          <div className="space-y-3 text-left mb-5">
            {MDE_QUESTIONS.map((item, i) => {
              const correct = answers[i] === item.answer
              return (
                <div key={i} className={`rounded-lg p-3 border text-sm ${correct ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                  <p className={`font-semibold mb-1 ${correct ? 'text-green-400' : 'text-red-400'}`}>{correct ? '✓' : '✗'} Q{i + 1}: {item.q.slice(0, 80)}…</p>
                  {!correct && <p className="text-gray-400 text-xs">{item.explanation}</p>}
                </div>
              )
            })}
          </div>
          <button onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-700 hover:bg-dark-600 border border-white/10 text-white font-bold text-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> Retake Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-purple-500/30 rounded-xl overflow-hidden">
      <div className="w-full flex items-center gap-3 px-5 py-4 bg-purple-900/20">
        <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-purple-400" />
        </span>
        <span className="flex-1 text-white font-bold text-sm">Question {current + 1} of {MDE_QUESTIONS.length}</span>
        <span className="text-gray-500 text-xs mr-2">{Math.round(((current) / MDE_QUESTIONS.length) * 100)}% done</span>
      </div>
      <div className="bg-dark-900/40 border-t border-white/5 px-5 py-5">
        <p className="text-white font-semibold text-sm leading-relaxed mb-4">{q.q}</p>
        <div className="space-y-2 mb-5">
          {q.options.map((opt, i) => {
            let cls = 'border border-white/10 text-gray-300 bg-dark-800/60 hover:bg-dark-700/60'
            if (selected !== null) {
              if (i === q.answer) cls = 'border-green-500/50 bg-green-500/10 text-green-300'
              else if (i === selected) cls = 'border-red-500/50 bg-red-500/10 text-red-300'
              else cls = 'border-white/5 text-gray-500 bg-dark-800/40'
            }
            return (
              <button key={i} onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${cls}`}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <p className="text-gray-400 text-xs mb-4 italic">{q.explanation}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-xs">{answers.filter(a => a !== null).length} answered</span>
          <button onClick={handleNext} disabled={selected === null}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors">
            {current < MDE_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ModuleAccordion({ mod, index }: { mod: { module: string; lessons: string[] }; index: number }) {
  const isAssessment = mod.module.toLowerCase().startsWith('assessment')
  if (isAssessment) return <AssessmentModule index={index} />

  const [open, setOpen] = useState(index === 0)
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-dark-800/60 hover:bg-dark-700/60 transition-colors text-left">
        <span className="w-7 h-7 rounded-lg bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-xs font-black text-accent-blue flex-shrink-0">{index + 1}</span>
        <span className="flex-1 text-white font-bold text-sm leading-snug">{mod.module}</span>
        <span className="text-gray-500 text-xs mr-2 flex-shrink-0">{mod.lessons.length} lessons</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="bg-dark-900/40 border-t border-white/5">
          {mod.lessons.map((lesson, li) => (
            <div key={li} className="flex items-start gap-3 px-5 py-3 border-b border-white/4 last:border-0">
              <Play className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm leading-relaxed">{lesson}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CourseDetailClient({ id }: { id: number }) {
  const course = courses.find(c => c.id === id)
  if (!course) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white text-xl font-bold mb-4">Course not found</p>
        <Link href="/training" className="btn-primary px-6 py-2.5 text-sm">Back to Learning</Link>
      </div>
    </div>
  )

  const totalLessons = course.curriculum.reduce((s, m) => s + m.lessons.length, 0)

  return (
    <div className="min-h-screen bg-dark-900 pt-20">

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8"
        style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #0f1629 60%, #080d1c 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <Link href="/training" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Courses
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full">{course.category}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${levelColor[course.level] ?? ''}`}>{course.level}</span>
                {course.isFree && <span className="text-xs font-black px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">🎁 Free</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">{course.title}</h1>
              <p className="text-gray-300 text-base leading-relaxed mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-yellow-400 font-bold">{course.rating}</span></span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.students} enrolled</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.curriculum.length} modules · {totalLessons} lessons</span>
              </div>
            </div>
            {/* Enrol card */}
            <div className="glass-card p-6 border border-white/10 sticky top-24">
              {/* Logo for Claude Code 101 */}
              {course.id === 121 ? (
                <div className="w-full h-40 rounded-xl mb-5 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] border border-orange-500/20 flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" rx="20" fill="#D97757"/>
                      <path d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15ZM50 25C63.81 25 75 36.19 75 50C75 63.81 63.81 75 50 75C36.19 75 25 63.81 25 50C25 36.19 36.19 25 50 25Z" fill="white" fillOpacity="0.9"/>
                      <circle cx="50" cy="50" r="12" fill="white"/>
                    </svg>
                    <span className="text-white font-black text-lg tracking-tight">Claude Code</span>
                  </div>
                  <span className="text-orange-300 text-xs font-semibold tracking-widest uppercase">by Anthropic</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={course.img} alt={course.title} className={`w-full h-40 rounded-xl mb-5 ${course.img.startsWith('/mde') ? 'object-contain bg-white p-4' : 'object-cover'}`} />
              )}
              <div className="text-2xl font-black text-white mb-1">{course.isFree ? 'Free' : '$'}</div>
              <p className="text-gray-400 text-xs mb-5">{course.isFree ? 'No sign-up required · Enrol instantly' : 'Contact for pricing and schedule'}</p>
              {course.id === 121 ? (
                <div className="space-y-3 mb-3">
                  <a href="https://wa.me/966505803073?text=Hi%20Waqas%2C%20I'm%20interested%20in%20the%20Claude%20Code%20101%20course"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-green-600 hover:bg-green-500 text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  <a href="mailto:waqastayyab2004@gmail.com?subject=Claude Code 101 Course Enquiry"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-accent-blue hover:bg-blue-500 text-white transition-colors">
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                </div>
              ) : (
                <a href={`mailto:waqastayyab2004@gmail.com?subject=Enrol: ${course.title}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-accent-blue text-white hover:bg-blue-500 transition-colors mb-3">
                  <Mail className="w-4 h-4" />{course.isFree ? 'Enrol Now — Free' : 'Inquire & Enrol'}
                </a>
              )}
              {course.id !== 121 && (
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">Ask a Question</Link>
              )}
              <div className="mt-5 space-y-2">
                {[{ icon: Clock, text: `${course.duration} total` }, { icon: BookOpen, text: `${course.curriculum.length} modules, ${totalLessons} lessons` }, { icon: Globe, text: 'Available in English' }, { icon: Award, text: 'Certificate on completion' }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-400"><Icon className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />{text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* What you will learn */}
            <section>
              <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> What You Will Learn
              </h2>
              <div className="glass-card p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Claude Code visual demo — only for course 121 */}
            {course.id === 121 && (
              <section>
                <h2 className="text-xl font-black text-white mb-5">See Claude Code in Action</h2>
                <div className="space-y-4">

                  {/* Terminal window 1 */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-white/10">
                      <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
                      <span className="ml-3 text-xs text-gray-500 font-mono">terminal — claude</span>
                    </div>
                    <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed">
<span className="text-gray-500">~/my-project $</span> <span className="text-green-400">claude</span>{'\n'}
<span className="text-orange-300">✻</span> <span className="text-white">Claude Code</span> <span className="text-gray-500">v2.1.181 · claude-sonnet-latest</span>{'\n'}
<span className="text-gray-500">  ~/my-project</span>{'\n\n'}
<span className="text-blue-400">{'>'}</span> <span className="text-white">Build a Flask IT asset tracker with SQLite and a dark UI</span>{'\n\n'}
<span className="text-orange-300">●</span> <span className="text-gray-300">I&apos;ll create a complete Flask IT asset tracker. Let me plan the structure first...</span>{'\n\n'}
<span className="text-gray-500">  ✔ Created app.py</span>{'\n'}
<span className="text-gray-500">  ✔ Created templates/index.html</span>{'\n'}
<span className="text-gray-500">  ✔ Created static/style.css</span>{'\n'}
<span className="text-gray-500">  ✔ Initialised SQLite database</span>{'\n\n'}
<span className="text-green-400">✓</span> <span className="text-white">Done. Run: python3 app.py → http://127.0.0.1:5000</span>
                    </pre>
                  </div>

                  {/* Terminal window 2 — CLAUDE.md */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-white/10">
                      <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
                      <span className="ml-3 text-xs text-gray-500 font-mono">CLAUDE.md — project instructions</span>
                    </div>
                    <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed">
<span className="text-orange-300"># My Project</span>{'\n\n'}
<span className="text-blue-400">## Stack</span>{'\n'}
<span className="text-gray-300">- Python Flask + SQLite</span>{'\n'}
<span className="text-gray-300">- Dark theme: #1e3a5f sidebar, #2563eb accent</span>{'\n'}
<span className="text-gray-300">- No TypeScript — plain JS only</span>{'\n\n'}
<span className="text-blue-400">## Rules</span>{'\n'}
<span className="text-gray-300">- Always write comments in English</span>{'\n'}
<span className="text-gray-300">- Never use print() for logging — use logger</span>{'\n'}
<span className="text-gray-300">- Run tests before committing</span>{'\n\n'}
<span className="text-gray-500"># Claude reads this at every session start.</span>{'\n'}
<span className="text-gray-500"># It never forgets your rules.</span>
                    </pre>
                  </div>

                  {/* Feature pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Terminal', icon: '⌨', desc: 'Works in any terminal' },
                      { label: 'VS Code', icon: '🔵', desc: 'IDE extension' },
                      { label: 'JetBrains', icon: '🟠', desc: 'IntelliJ + friends' },
                      { label: 'Claude Desktop', icon: '🤖', desc: 'Desktop app' },
                    ].map(f => (
                      <div key={f.label} className="bg-white/4 border border-white/10 rounded-xl p-3 text-center">
                        <div className="text-xl mb-1">{f.icon}</div>
                        <p className="text-xs font-bold text-white">{f.label}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* Skills */}
            <section>
              <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" /> Skills Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-dark-700 border border-white/10 text-gray-200">{s}</span>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent-blue" /> Course Curriculum
              </h2>
              <p className="text-gray-400 text-sm mb-5">{course.curriculum.length} modules · {totalLessons} lessons · {course.duration} total</p>
              <div className="space-y-3">
                {course.curriculum.map((mod, i) => <ModuleAccordion key={i} mod={mod} index={i} />)}
              </div>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" /> Your Instructor
              </h2>
              <div className="glass-card p-6 flex gap-5 items-start">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent-blue/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/waqas-avatar.jpg" alt="Syed Waqas Tayyab" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-black text-base mb-1">Syed Waqas Tayyab</h3>
                  <p className="text-accent-blue text-xs font-semibold mb-2">Senior IT System Engineer · SAP Saudi Arabia · 15+ Years</p>
                  <p className="text-gray-400 text-sm leading-relaxed">Azure Security Certified IT engineer with 15+ years at SAP managing enterprise infrastructure across MENA. All course content is drawn from real daily operations — no theory, no filler.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-5">
              <h3 className="text-white font-black text-sm mb-4">More Corporate IT Courses</h3>
              <div className="space-y-3">
                {courses.filter(c => c.id !== id).slice(0, 6).map(c => (
                  <Link key={c.id} href={`/training/${c.id}`} className="flex gap-3 items-start hover:bg-white/4 rounded-lg p-2 transition-colors group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.title} className="w-14 h-10 object-cover rounded-lg flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold leading-snug group-hover:text-accent-blue transition-colors line-clamp-2">{c.title}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{c.duration} · {c.level}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/training" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
                View All Courses →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
