'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, Lock, Star, Clock, Users,
  Award, ChevronDown, ChevronUp, Mail, Play, BookOpen,
  TrendingUp, Shield, Cloud, Server, Brain, Zap, Globe,
  Home, Library, Search, Download,
} from 'lucide-react'

/* ── DATA ─────────────────────────────────────────────────────── */

const sidebarCategories = [
  { icon: Home,     label: 'All Courses',           key: 'All' },
  { icon: Award,    label: 'Corporate IT Training',  key: 'Corporate IT Training' },
  { icon: Brain,    label: 'AI & Automation',        key: 'AI & Automation' },
  { icon: Shield,   label: 'Cybersecurity & Azure',  key: 'Cybersecurity & Azure' },
  { icon: Cloud,    label: 'Microsoft 365 & Azure',  key: 'Microsoft 365 & Azure' },
  { icon: Server,   label: 'IT Infrastructure',      key: 'IT Infrastructure' },
  { icon: BookOpen, label: 'ITSM & ServiceNow',      key: 'ITSM & ServiceNow' },
  { icon: Globe,    label: 'E-Commerce',             key: 'E-Commerce' },
  { icon: Zap,      label: 'Digital Marketing',      key: 'Digital Marketing' },
  { icon: Award,    label: 'Career & IT Foundations',key: 'Career & IT Foundations' },
]

const courses = [
  /* ── CORPORATE IT TRAINING (from SAP Litmos) ─────────────────── */
  {
    id: 101,
    title: 'IT Asset Lifecycle Management for Enterprise Support',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '1h', students: '200+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Asset Tracking', 'Hardware Lifecycle', 'SAP ISP', 'MDM Compliance', 'Inventory Management'],
    description: 'Learn how enterprise IT assets are tracked, returned, scanned, and audited across the full hardware lifecycle — from procurement to disposal. Based on real SAP IT operations.',
    topics: [
      'Hardware return workflows — in-person and remote employees',
      'Physical inventory scanning using mobile scanner tools',
      'Lost and stolen device procedures and asset recovery steps',
      'Corporate equipment policies: ordering, lifecycle, cost responsibility',
      'Asset records management in enterprise ERP (SAP ISP)',
    ],
    curriculum: [
      { module: 'Module 1 — Asset Management Fundamentals', lessons: ['What is IT asset lifecycle management?', 'Enterprise asset categories: laptops, mobiles, tablets, monitors, printers', 'Asset tagging, serial number tracking, and SAP ISP records', 'Minimum device lifespan policies and refresh cycles'] },
      { module: 'Module 2 — Hardware Return Processes', lessons: ['In-person return workflow: condition check, accessories, account sign-out', 'Remote employee return: shipping process, deadlines, and escalation', 'Handling accidental return initiation and cancellation', 'Post-return: re-imaging, redeployment, or decommission decision'] },
      { module: 'Module 3 — Physical Inventory Management', lessons: ['Annual inventory scanning using mobile scanner tools', 'Reconciling physical count vs. system records', 'Flagging inactive, missing, or unassigned assets', 'Updating asset status in ERP after scanning'] },
      { module: 'Module 4 — Lost, Stolen & Non-Returned Devices', lessons: ['Immediate steps when a device is reported lost or stolen', 'Remote wipe via MDM (Jamf / Intune)', 'Raising a security incident and disabling accounts', 'Escalation timeline for non-returned offboarding assets (21-day rule)'] },
      { module: 'Module 5 — Procurement & Cost Responsibility', lessons: ['How device requests are raised via SAP Ariba', 'Approval chain: user → IT manager → country MD', 'MENA procurement volumes and budget tracking in Power BI', 'Warranty tracking, certified disposal, and recycling'] },
    ],
  },
  {
    id: 102,
    title: 'Corporate Email Platform Administration (Exchange Online)',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '1h', students: '180+', rating: 4.8,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1596526131083-e8c633064e2e?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Exchange Online', 'Microsoft 365', 'Email Security', 'Shared Mailboxes', 'Phishing Response'],
    description: 'Administer corporate email services in Microsoft 365 — mailbox quotas, retention policies, shared mailbox management, mass mailing permissions, and phishing response.',
    topics: [
      'Mailbox storage quotas, limits, and online archive configuration',
      'Blocked attachment types and email security filtering rules',
      'Shared mailbox setup, access grants, and alias management',
      'Mass mailing permissions: temporary vs. permanent approval process',
      'Reporting phishing emails and anti-spam tools',
    ],
    curriculum: [
      { module: 'Module 1 — Mailbox Administration', lessons: ['User mailbox quota: 100 GB standard, online archive up to 1 TB', 'Setting up and enabling online archives for long-term retention', 'Configuring Outlook profile on Windows and macOS', 'Internal vs. external attachment size limits and blocked file types'] },
      { module: 'Module 2 — Shared Mailbox Management', lessons: ['Creating shared mailboxes and assigning access permissions', 'Adding/removing aliases and setting reply-from address', 'Annual cost review: when shared mailboxes require a licence', 'Retiring shared mailboxes: offboarding and data preservation'] },
      { module: 'Module 3 — Mass Mailing & Distribution Lists', lessons: ['What requires a mass mailing permission', 'Requesting temporary (28-day) vs. permanent mass mailing rights', 'Distribution list management and membership updates', 'Avoiding spam triggers when sending to large groups'] },
      { module: 'Module 4 — Email Security & Spam Management', lessons: ['Anti-spam filter: how it works and how to whitelist/blacklist senders', 'Junk mail folder configuration in Outlook', 'How to report phishing emails using the built-in reporting tool', 'What happens after a phishing report: IT response process'] },
      { module: 'Module 5 — Password & MFA for Email Accounts', lessons: ['Corporate password policy: 15-character minimum, 2-year expiry', 'Admin account requirements: 20-character minimum', 'Resetting email account password without IT (SSPR)', 'MFA methods supported: app, SMS, RSA soft token'] },
    ],
  },
  {
    id: 103,
    title: 'macOS Device Management in a Corporate Environment',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '2h', students: '150+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Jamf MDM', 'macOS', 'FileVault', 'SSO Certificates', 'Microsoft Defender', 'Self Service'],
    description: 'Configure, secure, and support Apple Mac computers in a corporate managed environment using Jamf MDM — covering provisioning, compliance, SSO, encryption, and app management.',
    topics: [
      'Mac setup and MDM profile enrolment via Jamf',
      'SSO certificate installation, renewal, and troubleshooting',
      'FileVault encryption, SIP, and endpoint compliance checks',
      'Privilege management: standard user vs. temporary admin elevation',
      'Self Service app portal for software installation and remediation',
    ],
    curriculum: [
      { module: 'Module 1 — Mac Provisioning & MDM Enrolment', lessons: ['Automated enrolment via Apple ADE (zero-touch setup)', 'Manual MDM profile installation when ADE is unavailable', 'First-boot setup: network, Apple ID, corporate account', 'Verifying MDM enrolment status in System Settings'] },
      { module: 'Module 2 — Single Sign-On & Certificate Management', lessons: ['What is Kerberos SSO and why it is required on corporate Macs', 'Installing the SSO extension certificate step by step', 'Checking certificate validity and expiry date', 'Removing and re-installing the SSO certificate when broken', 'Syncing corporate password with macOS local account'] },
      { module: 'Module 3 — Security & Compliance', lessons: ['FileVault disk encryption: enabling and verifying recovery key escrow', 'System Integrity Protection (SIP): what it is and when to check', 'macOS update policy: mandatory deadline 30 days after Apple release', 'Microsoft Defender for Endpoint on macOS: installation and status', 'Cisco Umbrella DNS security: scope on managed Macs'] },
      { module: 'Module 4 — Privilege & Application Management', lessons: ['Why standard user accounts are the security default', 'Granting temporary local admin using the Privileges app', 'Self Service portal: installing approved corporate apps without IT', 'Requesting software not in Self Service via ITSM ticket', 'Running Windows via VMware Fusion: setup and licensing'] },
      { module: 'Module 5 — VPN & Network on macOS', lessons: ['Installing Cisco Secure Client (GlobalProtect) on macOS', 'Always-on VPN: what it does and when it connects automatically', 'Connecting to corporate Wi-Fi (802.1X): certificate-based auth', 'Printer installation on macOS via VPN and Self Service', 'Troubleshooting: Mac not connecting to corporate network'] },
    ],
  },
  {
    id: 104,
    title: 'Meeting Room Technology & AV Support',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '1h', students: '120+', rating: 4.8,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Microsoft Teams Rooms', 'Crestron', 'AV Support', 'Room Booking', 'Surface Hub'],
    description: 'Support and manage corporate meeting room technology — room categories, booking systems, AV hardware, Microsoft Teams Rooms, and diagnostic tools.',
    topics: [
      'Meeting room categories from huddle rooms to boardrooms/VIP rooms',
      'Room booking via calendar, add-in tool, and dedicated booking app',
      'AV diagnostic tools: web portal and mobile app usage',
      'Digital door panel configuration and IT handling procedures',
      'Surface Hub management and reactive support procedures',
    ],
    curriculum: [
      { module: 'Module 1 — Room Categories & Standards', lessons: ['XS huddle rooms (1–4 people): basic screen + wireless presentation', 'Small/medium rooms (5–10 people): Teams MTR bar setup', 'Large rooms (10–20 people): Logitech Rally or Poly Pano system', 'Boardroom/VIP (20+): Crestron control panel + multi-screen', 'Room naming conventions and technology classification labels'] },
      { module: 'Module 2 — Room Booking Systems', lessons: ['Booking via Outlook calendar: adding room as a resource', 'Evoko / Crestron booking panel: check-in, ad-hoc booking, release', 'Room auto-release: no check-in within 10 minutes = room freed', 'Maximum booking window: 180 days, maximum duration: 24 hours', 'Adding the room booking Outlook add-in for mobile users'] },
      { module: 'Module 3 — AV Diagnostics & Support Tools', lessons: ['Meeting Room Checker: web dashboard for room health status', 'Mobile app for AV diagnostics: checking camera, audio, display', 'QR code support stickers: how users report AV issues instantly', 'Updating room compliance status after a physical check', 'Escalation path for hardware failures: on-site vs. vendor call-out'] },
      { module: 'Module 4 — Teams Rooms & Surface Hub', lessons: ['Microsoft Teams Rooms: one-touch meeting join from any room', 'Teams Rooms nightly health check: what to look for', 'Surface Hub Gen 1 vs. Gen 2: key differences for IT support', 'Firmware update process and maintenance window scheduling', 'Common Teams Rooms issues and on-site remediation steps'] },
      { module: 'Module 5 — Wireless Presentation & Reactive Support', lessons: ['Wolfvision Cynap Pure: pairing a laptop for wireless presentation', 'HDMI and USB-C switching on Crestron and standard switchers', 'Reactive support: user calls AV hotline — what IT does on arrival', 'Pre-event AV check protocol: 3-hour setup rule for VIP events', 'Documenting room issues and updating the compliance dashboard'] },
    ],
  },
  {
    id: 105,
    title: 'Corporate Network & VPN Support for IT Engineers',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '1h', students: '160+', rating: 4.9,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['VPN', 'Cisco', 'Aruba Wireless', '802.1X', 'DNS Security', 'Network Troubleshooting'],
    description: 'Understand corporate network types, configure VPN remote access, connect managed devices to wireless, and apply DNS-layer security — based on real SAP MENA infrastructure.',
    topics: [
      'Corporate Wi-Fi tiers: managed corporate, guest, and IoT networks',
      'Connecting Windows and macOS devices to 802.1X wireless',
      'VPN client setup: GlobalProtect and F5 BIG-IP on Windows and macOS',
      'Always-on seamless VPN installation and gateway configuration',
      'DNS-layer security scope for managed endpoints and mobile devices',
    ],
    curriculum: [
      { module: 'Module 1 — Corporate Network Architecture', lessons: ['Three Wi-Fi tiers: corporate managed, guest, and IoT — policies per tier', 'Wired LAN: VLAN segmentation and access port assignments', 'Cisco switches: port configuration basics for IT support', 'Aruba wireless: AP coverage zones and SSID mapping', 'Network monitoring: how IT detects connectivity issues proactively'] },
      { module: 'Module 2 — 802.1X Wireless Authentication', lessons: ['What is 802.1X and why password-based Wi-Fi is not used corporately', 'Certificate-based authentication: how the trust chain works', 'Connecting a managed Windows device to corporate Wi-Fi', 'Connecting a managed Mac to corporate Wi-Fi (SSO certificate required)', 'Troubleshooting: device not authenticating on corporate wireless'] },
      { module: 'Module 3 — VPN Remote Access', lessons: ['GlobalProtect (Palo Alto) VPN: install, connect, and disconnect', 'F5 BIG-IP VPN: install, connect, and disconnect on Windows and macOS', 'Always-on VPN: automatic tunnel on non-corporate networks', 'Split tunnelling vs. full tunnel: what goes through VPN and what does not', 'VPN troubleshooting: certificate errors, gateway unreachable, slow tunnel'] },
      { module: 'Module 4 — Guest Wi-Fi & Visitor Onboarding', lessons: ['Guest Wi-Fi policy: what is allowed and what is blocked', 'Sponsor-based guest Wi-Fi onboarding: step-by-step for IT and hosts', 'Time-limited guest access: maximum session and renewal process', 'IoT network: which devices connect and how they are isolated', 'Security implications of guest and IoT network separation'] },
      { module: 'Module 5 — DNS Security & NAC', lessons: ['Cisco Umbrella DNS security: what it blocks and why', 'Scope: applies to managed endpoints and enrolled mobile devices', 'ForeScout NAC: how non-compliant devices are quarantined', 'IP addressing basics: DHCP, static IPs, and gateway/DNS for support', 'ISP failover: dual-path design and how IT tests it quarterly'] },
    ],
  },
  {
    id: 106,
    title: 'IT Onboarding & Offboarding Processes',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '1h', students: '200+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Azure AD', 'MFA Setup', 'Intune Autopilot', 'TAP', 'DocuSign', 'CLEA App'],
    description: 'Master the end-to-end IT workflows for employee onboarding and offboarding — account provisioning, device assignment, MFA setup, and secure hardware return.',
    topics: [
      'Lifecycle management app: overview and HR system integrations',
      'Temporary Access Pass (TAP): when and how to issue for MFA bootstrapping',
      'New employee account setup, password reset, and MFA configuration',
      'Offboarding hardware return: in-person and remote procedures',
      'Account sign-out checklist and device decommission steps',
    ],
    curriculum: [
      { module: 'Module 1 — Onboarding IT Workflow Overview', lessons: ['T-14 day trigger: how HR triggers IT provisioning before Day 1', 'CLEA lifecycle app: what it tracks and how IT engineers use it', 'Checklist: account → device → apps → MFA → network access', 'Executive onboarding: white-glove process and pre-staging requirements', 'Day 1 readiness target: fully operational in under 30 minutes'] },
      { module: 'Module 2 — Account Provisioning & Azure AD', lessons: ['Azure AD account creation: licences, groups, and Conditional Access', 'New Employee Password Reset tool: step-by-step for first login', 'Setting the initial password and forcing change on first sign-in', 'Assigning Microsoft 365 licences: E3 vs. E5 and what each includes', 'Shared drive and SharePoint access provisioning'] },
      { module: 'Module 3 — MFA Setup for New Employees', lessons: ['Temporary Access Pass (TAP): what it is and when to issue one', 'Step-by-step: issuing a TAP in Azure AD admin centre', 'Employee self-registers Microsoft Authenticator using TAP', 'Backup MFA methods: phone number, hardware key (FIDO2)', 'Troubleshooting: employee locked out on Day 1 — what to do'] },
      { module: 'Module 4 — Device Assignment & Autopilot', lessons: ['Pre-staging a Windows device: Autopilot registration and user assignment', 'Jamf pre-staging for macOS: enrolment profile pushed before arrival', 'Mobile device assignment: corporate iOS via ADE or BYOD Intune', 'DocuSign: digital asset assignment form — how to send and track', 'Handing over the device: what to explain and demonstrate to the user'] },
      { module: 'Module 5 — Offboarding IT Process', lessons: ['Offboarding trigger: HR confirms last day → IT raises ticket', 'Account disable sequence: M365 → Azure AD → SAP systems → SNOW', 'Data backup: OneDrive contents transferred to manager before wipe', 'Device return: in-person checklist or remote return shipping process', 'SLA target: full offboarding completed within 2 hours of last day'] },
    ],
  },
  {
    id: 107,
    title: 'Enterprise Print Services Management',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '1h', students: '100+', rating: 4.7,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['HP MFP', 'Badge Printing', 'Cloud Print', 'Toner Management', 'Print Troubleshooting'],
    description: 'Manage enterprise print infrastructure — badge-based secure printing, toner lifecycle, printer commissioning, cloud/mobile printing, and print spooler troubleshooting.',
    topics: [
      'Toner lifecycle: automated threshold alerts, replacement, and recycling',
      'Badge-based secure pull-printing: user registration and print release',
      'Scan-to-email feature setup and configuration',
      'Cloud/mobile printing: setup and usage from smartphones and tablets',
      'Printer relocation, commissioning, decommissioning, and spooler fixes',
    ],
    curriculum: [
      { module: 'Module 1 — Enterprise Print Infrastructure', lessons: ['HP MFP fleet overview: device types, locations, and naming conventions', 'WebJet Admin: fleet monitoring dashboard and alert configuration', 'Print server architecture: how jobs are routed to the correct device', 'SIPORT badge reader integration: authentication flow', 'Global Print Services (GPS) support model and escalation path'] },
      { module: 'Module 2 — Toner & Consumables Management', lessons: ['Automated toner alerts: thresholds at 15%, 5%, 2%, 1%, 0%', 'Auto-delivery trigger at 5%: how the vendor ordering process works', 'Physical replacement at 1%: step-by-step cartridge swap procedure', 'Empty cartridge return programme: annual collection (Oct/Nov)', 'Drum unit lifecycle vs. toner cartridge — how to tell them apart'] },
      { module: 'Module 3 — Badge-Based Secure Printing', lessons: ['What is pull-printing and why it is more secure than direct print', 'Registering a new employee badge on the HP card reader', 'User flow: print from PC → walk to printer → tap badge → collect', 'Auto-delete: uncollected jobs removed after 24 hours', 'Troubleshooting: badge not recognised — re-register vs. escalate'] },
      { module: 'Module 4 — Cloud & Mobile Printing', lessons: ['Email-to-print: send document to corporate print email address', 'Mobile printing from iOS and Android via the print app', 'Cloud print setup: adding the cloud print queue on Windows and macOS', 'Printing while on VPN from a remote location', 'Scan-to-email: configuring the MFP SMTP settings and testing'] },
      { module: 'Module 5 — Printer Support & Troubleshooting', lessons: ['Printer not showing in Windows: driver reinstall vs. queue fix', 'Print spooler stuck: stop, clear spool folder, restart sequence', 'Printer offline: network connectivity check and IP re-confirmation', 'Relocating a printer: coordination with GPS and cabling team', 'New printer commissioning: unboxing, network join, and test page'] },
    ],
  },
  {
    id: 108,
    title: 'Mobile Device Management: iOS & Android in the Enterprise',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '1h 30m', students: '170+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Jamf', 'Microsoft Intune', 'iOS MDM', 'Android MDM', 'BYOD', 'Azure AD'],
    description: 'Enrol, secure, and support corporate iOS and Android devices — covering MDM compliance, SSO, corporate app distribution, BYOD enrolment, and lost device procedures.',
    topics: [
      'iOS enrolment via Apple ADE (zero-touch) and manual methods',
      'Android BYOD enrolment via Intune Company Portal',
      'MDM compliance: OS version, encryption, and corporate app requirements',
      'Mobile SSO certificate configuration and troubleshooting',
      'Lost/stolen device procedures and remote wipe workflow',
    ],
    curriculum: [
      { module: 'Module 1 — iOS Device Enrolment', lessons: ['Apple ADE (Automated Device Enrolment): zero-touch supervised setup', 'Manual enrolment: download profile → install → verify in Jamf', 'Managed Apple ID: migration from personal Apple ID', 'Self Service mobile app: installing corporate apps post-enrolment', 'Verifying enrolment: compliance check app status and MDM profile'] },
      { module: 'Module 2 — Android Device Enrolment (BYOD & Corporate)', lessons: ['Corporate Android: fully managed enrolment via Intune', 'BYOD Android: work profile enrolment — personal data stays separate', 'Microsoft Intune Company Portal: installation and setup steps', 'Minimum Android compliance: OS patch not older than 6 months', 'Microsoft Defender for Android: deployment via Intune app policy'] },
      { module: 'Module 3 — Mobile Compliance & Security', lessons: ['MDM compliance requirements: OS version, encryption, corporate app', 'What happens when a device is non-compliant: notification cadence', 'Cisco Security Connector / Umbrella on mobile: scope and behaviour', 'Azure AD device registration: verifying in Entra ID portal', 'Mobile SSO certificate: 3-month validity, auto-renewal via Jamf'] },
      { module: 'Module 4 — MFA & Corporate App Setup', lessons: ['Issuing a Temporary Access Pass (TAP) for mobile MFA bootstrapping', 'Microsoft Authenticator setup on iOS and Android', 'RSA SecurID soft token migration to a new device', 'Wi-Fi TLS certificate setup on mobile for 802.1X corporate Wi-Fi', 'GlobalProtect VPN client on iOS and Android: install and connect'] },
      { module: 'Module 5 — Device Decommission & Lost Device', lessons: ['Find My disabled before MDM removal (iOS requirement)', 'Remote wipe via Jamf (iOS) and Intune (Android): when to use', 'MDM unenrollment and factory reset process', 'Updating asset record in ERP after device decommission', 'Lost/stolen: MDM wipe + account disable + security incident within 1 hour'] },
    ],
  },
  {
    id: 109,
    title: 'Information Security Awareness for Enterprise Staff',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '30m', students: '500+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Phishing Awareness', 'Social Engineering', 'Mobile Security', 'Data Protection', 'Incident Response'],
    description: 'Essential security awareness training for all enterprise employees — covering phishing, social engineering, secure mobile use, and data protection responsibilities.',
    topics: [
      'Social engineering: how attackers manipulate people and how to recognise it',
      'Advanced phishing techniques: identifying and reporting suspicious emails',
      'Secure mobile device practices for corporate data protection',
      'Employee responsibilities during a security incident',
      'General security hygiene and data privacy best practices',
    ],
    curriculum: [
      { module: 'Module 1 — Social Engineering Fundamentals', lessons: ['What is social engineering and why it targets people, not systems', 'Common attack types: pretexting, baiting, quid pro quo, tailgating', 'Real-world examples: fake IT support calls, CEO fraud, invoice scams', 'Red flags: urgency, authority, unusual requests, out-of-band contact', 'What to do when you suspect a social engineering attempt'] },
      { module: 'Module 2 — Phishing Detection & Response', lessons: ['Email phishing: how to inspect sender, headers, and links safely', 'Spear phishing: targeted attacks using your personal information', 'Smishing (SMS) and vishing (voice call) phishing variations', 'How to report phishing in Outlook using the built-in report button', 'What IT does after a phishing report — and how to stay safe meanwhile'] },
      { module: 'Module 3 — Secure Mobile Device Practices', lessons: ['Corporate data on personal devices: what is and is not allowed', 'Enabling screen lock, PIN, and biometric authentication', 'Public Wi-Fi risks and when to always use VPN', 'App permissions: what to allow and what to deny for corporate safety', 'What to do if your corporate mobile device is lost or stolen'] },
      { module: 'Module 4 — Data Protection & Privacy', lessons: ['What counts as personal data under GDPR and SAP data policy', 'Data classification: public, internal, confidential, restricted', 'Safe file sharing: approved platforms only (SharePoint, OneDrive)', 'Printing confidential documents: secure pull-printing rules', 'Your responsibility: what you are liable for under the data protection policy'] },
      { module: 'Module 5 — Incident Response for Employees', lessons: ['What is a security incident and when must you report it', 'How to report: who to contact, what information to include', 'First steps if your account is compromised: password reset + MFA review', 'DLP alerts: what they mean and how to respond if you triggered one', 'After an incident: what IT investigates and what the employee does'] },
    ],
  },
  {
    id: 110,
    title: 'Self-Service Password Reset & MFA Account Recovery',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '30m', students: '300+', rating: 4.8,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['SSPR', 'Azure AD', 'MFA', 'Password Management', 'Account Recovery'],
    description: 'Learn how to independently reset domain passwords and recover accounts using Self-Service Password Reset (SSPR) — no helpdesk needed. Covers Windows, macOS, and web-based reset.',
    topics: [
      'What SSPR is and prerequisites: MFA must be registered first',
      'Step-by-step account unlock and password reset via web browser',
      'Corporate password complexity requirements and length policy',
      'Windows and macOS password reset compatibility',
      'When to escalate to the helpdesk and how to raise a ticket',
    ],
    curriculum: [
      { module: 'Module 1 — Understanding SSPR', lessons: ['What Self-Service Password Reset is and who it applies to', 'SSPR prerequisite: MFA must be registered before SSPR works', 'Why SSPR reduces helpdesk load: no more waiting for IT to reset', 'Supported devices: Windows 11, macOS, mobile browser, any web browser', 'When SSPR is NOT available and IT must assist instead'] },
      { module: 'Module 2 — Resetting Your Password', lessons: ['Navigate to the SSPR web portal from any device', 'Identity verification step: authenticator app push or SMS code', 'Entering and confirming the new password (complexity rules)', 'Syncing the new password to Windows / macOS local account', 'Testing the new password: sign-in verification checklist'] },
      { module: 'Module 3 — Unlocking a Locked Account', lessons: ['Difference between account lock and forgotten password', 'Account auto-locks after 10 incorrect attempts (configurable)', 'Unlock without password change via SSPR portal', 'What triggers a lock vs. what triggers a disable — key distinction', 'Admin unlock request: when only IT can restore access'] },
      { module: 'Module 4 — Password Policy & Best Practices', lessons: ['Minimum 15 characters for standard users; 20 for admin accounts', 'Password expiry: every 2 years — notification sent 30 days before', 'What makes a strong password: passphrases vs. complex strings', 'Password manager options approved for corporate use', 'Never share your password — even with IT: why and what to do instead'] },
      { module: 'Module 5 — MFA Recovery Scenarios', lessons: ['Lost authenticator device: how to recover using backup method', 'New phone: transfer Microsoft Authenticator to new device', 'Temporary Access Pass (TAP): when IT issues one and how to use it', 'Hardware FIDO2 key as backup: setup and usage', 'Getting help: how to raise a helpdesk ticket for account recovery'] },
    ],
  },
  {
    id: 111,
    title: 'IT Link Center (ITLC) Walk-up Kiosk & Queue Monitor Setup',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '1h 30m', students: '80+', rating: 4.9,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Jamf MDM', 'ServiceNow Walk-up', 'Digital Signage', 'Apple ADE', 'Microsoft Intune', 'Queue Management', 'PassVault'],
    description: 'Learn how to set up and manage the ITLC Walk-up Kiosk and Queuing Monitor system — the ServiceNow-integrated iPad check-in and digital queue display used at IT Link Centers to manage in-person IT support queues.',
    topics: [
      'iPad kiosk setup via Jamf MDM and Apple ADE enrolment',
      'ServiceNow Walk-up portal configuration and service account login',
      'JAMF ITLC Extension Attribute setup for kiosk mode',
      'Digital Signage machine imaging with Intune and portal configuration',
      'Queue monitor playlist, URL, and screen orientation setup',
    ],
    curriculum: [
      { module: 'Module 1 — What is ITLC & System Architecture', lessons: ['What is an IT Link Center (ITLC) and its role in enterprise IT support', 'Two-component system: iPad Check-in Kiosk + Queuing Monitor display', 'ServiceNow Walk-up module: how it improves queue management', 'Network requirements: SAP-Guest Wi-Fi for setup, SAP-Corporate for operation', 'Prerequisites: iPad 10"+ with iPadOS 15+, Jamf Cloud ADE enrolment'] },
      { module: 'Module 2 — iPad Kiosk Setup & MDM Enrolment', lessons: ['Out-of-box iPad setup: language, region, manual setup selection', 'Connect to SAP-Guest Wi-Fi and begin Jamf ADE enrolment', 'Naming convention: ITLC-[building code] — why it matters', 'Required settings: brightness max, sound off, Bluetooth off, Light mode', 'Connecting to SAP-Corporate Wi-Fi and saving the Walk-up portal URL in Safari'] },
      { module: 'Module 3 — Jamf ITLC Extension Attribute Configuration', lessons: ['What is the ITLC Extension Attribute in Jamf and why it is needed', 'Accessing the Jamf Admin Console: Inventory → Extension Attributes', 'Setting the ITLC iPad attribute to 1: step-by-step', 'What happens after the attribute is set: Safari auto-launches in kiosk mode', 'iPad OS update procedure: remove attribute → update → re-add attribute'] },
      { module: 'Module 4 — Service Account Login via PassVault', lessons: ['Two Walk-up service accounts: walkup_english and walkup_french', 'SAP PassVault: what it is and how to access it for the first time', 'Retrieving the Walk-up account password from PassVault step by step', 'Logging into the ServiceNow Walk-up portal and selecting your location', 'Security note: always retrieve passwords from PassVault — not from stored documents'] },
      { module: 'Module 5 — Queuing Monitor Setup & Digital Signage Configuration', lessons: ['Imaging the Digital Signage machine using Intune DS image', 'Registering the DS machine in the Digital Signage portal', 'Creating the ITLC queue playlist with the ServiceNow queue URL', 'Setting display duration to 900 seconds and browser to Chrome', 'Configuring screen orientation (landscape/portrait) in the portal settings'] },
    ],
  },
  {
    id: 112,
    title: 'Corporate Cybersecurity in Practice: Policies, Tools & Real Implementations',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '4h', students: '90+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Zero Trust', 'Azure AD', 'Defender', 'BitLocker', 'Conditional Access', 'MFA', 'Password Policy', 'Python Security Tools', 'DLP', 'Incident Response'],
    description: 'A comprehensive corporate cybersecurity course built from 15+ years of real enterprise IT — covering Zero Trust, endpoint security, IAM, password policy, DLP, and incident response. Learn through 5 real tools and implementations including a Python Password Generator app built by the instructor.',
    topics: [
      'Zero Trust architecture and Conditional Access policy design',
      'Endpoint security: Defender, BitLocker, CyberArk, Intune compliance',
      'Password policy + build a Python Password Generator (Strong/Medium/Memorable)',
      'DLP policies: blocking data leakage in email, SharePoint, and OneDrive',
      'Security incident response playbook from real enterprise experience',
    ],
    curriculum: [
      { module: 'Module 1 — Corporate Cybersecurity Foundations', lessons: ['The enterprise threat landscape: phishing, social engineering, insider threats', 'Zero Trust principle: never trust, always verify — applied to corporate IT', 'Microsoft Secure Score: benchmark and improve your security posture', 'Security posture case study: Secure Score 41% → 78% in 12 months', 'Cybersecurity policy framework: password, device, data, and access policies'] },
      { module: 'Module 2 — Identity & Access Management (IAM)', lessons: ['Azure AD / Entra ID: users, groups, roles, and licences', 'Conditional Access policy design: compliant device + MFA + named location', 'MFA methods: Authenticator app, SMS, FIDO2, Windows Hello', 'Privileged Identity Management (PIM): no permanent admin accounts', 'Temporary Access Pass (TAP): bootstrapping MFA for new employees', 'Blocking legacy authentication: eliminates 99% of password spray attacks'] },
      { module: 'Module 3 — Password Security & the Password Generator App', lessons: ['Enterprise password policy: 15-char minimum, complexity, 2-year expiry', 'Password entropy: brute-force time for 8 vs 15 vs 20 chars', 'Passphrase design: combining unrelated words for strength and memorability', 'Build: Python 3 Password Generator (Strong / Medium / Memorable modes)', 'Code walkthrough: Tkinter GUI, character pools, random.choice(), SQLite history', 'Deploy: packaging as a standalone macOS .app with PyInstaller', 'SSPR: reducing helpdesk password tickets to zero'] },
      { module: 'Module 4 — Endpoint Security & Compliance', lessons: ['Endpoint security stack: Trellix/McAfee + Microsoft Defender for Endpoint', 'BitLocker XTS-AES 256-bit encryption: enforcing and escrowing recovery keys', 'CyberArk EPAM: removing local admin without blocking work', 'Intune compliance policies: what triggers non-compliance and device blocking', 'DLP policies: blocking sensitive data in email, SharePoint, and OneDrive'] },
      { module: 'Module 5 — Network Security & Zero Trust Architecture', lessons: ['802.1X wireless: certificate-based auth, no shared PSK', 'ForeScout NAC: quarantining non-compliant devices at network level', 'Cisco Umbrella DNS security: blocking malicious domains before connection', 'VPN security: GlobalProtect always-on, split vs full tunnel tradeoffs', 'VLAN segmentation: corporate, guest, and IoT isolation'] },
      { module: 'Module 6 — Security Monitoring & Automated Alerting', lessons: ['Microsoft Sentinel SIEM: log ingestion, alert rules, incident creation', 'Defender for M365 EDR: alert triage — investigate vs suppress', 'SLA breach monitoring with Python: real daemon checking ServiceNow every 5 min', 'WhatsApp alerting via Twilio: code walkthrough of the SLA alert bot', 'PowerBI security dashboard: Secure Score, compliance %, open incidents'] },
      { module: 'Module 7 — Data Loss Prevention & Information Protection', lessons: ['Data classification: public, internal, confidential, restricted — labelling in M365', 'DLP policy design: what triggers it, what it blocks, tuning false positives', 'SharePoint and OneDrive external sharing governance', 'Email DLP: blocking credit card numbers, national IDs, sensitive keywords', 'Compliance Manager: mapping M365 controls to GDPR and ISO 27001'] },
      { module: 'Module 8 — Security Incident Response', lessons: ['Incident classification: P1 (account compromise) → P4 (policy violation)', 'First response playbook: what to do in the first 60 minutes of a breach', 'Account compromise: disable → investigate → reset → MFA re-enrol → audit', 'Device compromise: MDM wipe, endpoint isolation, Defender investigation', 'Post-incident: root cause analysis, policy update, awareness communication'] },
    ],
  },
  {
    id: 113,
    title: 'Build a Social Media Manager App with Python & Facebook API',
    category: 'Digital Marketing',
    level: 'Intermediate', duration: '3h', students: '60+', rating: 4.9,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Python', 'Flask', 'Facebook Graph API', 'OAuth 2.0', 'SQLite', 'Content Calendar', 'HTML/CSS Image Generation'],
    description: 'Build a full-stack social media management app from scratch — featuring a content calendar, AI post generator, affiliate link tracker, and Facebook Graph API integration. Based on a real app built by the instructor to manage the HiTecH Technology HUB Facebook page (1M+ community).',
    topics: [
      'Flask app architecture: routes, templates, SQLite database design',
      'Content calendar: CRUD operations, post status tracking, scheduling',
      'Facebook Graph API: OAuth 2.0, page tokens, posting content',
      'Affiliate link tracker: add links, record clicks, track revenue',
      'HTML/CSS-to-image rendering: generate branded social media graphics',
    ],
    curriculum: [
      { module: 'Module 1 — App Architecture & Database Design', lessons: ['Flask project structure: routes, templates, static files, config', 'SQLite database design: posts table, affiliates table, config store', 'Row factory pattern for dictionary-style query results', 'Init DB on startup: CREATE TABLE IF NOT EXISTS pattern', 'Config persistence: reading and writing JSON config file'] },
      { module: 'Module 2 — Content Calendar', lessons: ['Building the calendar view: list posts by date with status badges', 'New post form: title, caption, image URL, scheduled date, platform', 'Edit and delete post with confirmation', 'Mark post as posted: status update and timestamp recording', 'Filtering posts by status: draft, scheduled, posted'] },
      { module: 'Module 3 — Facebook Graph API Integration', lessons: ['Facebook App setup: create app, get App ID and App Secret', 'OAuth 2.0 flow: redirect to Facebook, handle callback, store token', 'List pages the user manages via Graph API', 'Post text content to a page using the /feed endpoint', 'Refreshing long-lived page tokens to avoid expiry'] },
      { module: 'Module 4 — AI Post Generator & Image Creator', lessons: ['AI post generation: calling an API to generate captions from a topic', 'HTML template design for branded post images', 'Base64-encoding a logo/mascot image for HTML embedding', 'Rendering HTML to PNG using a headless subprocess call', 'Serving generated images as downloadable files from Flask'] },
      { module: 'Module 5 — Affiliate Link Tracker', lessons: ['Affiliate link data model: name, URL, description, click count, revenue', 'Recording a click: redirect route that logs before forwarding', 'Displaying click analytics per link on the dashboard', 'Update affiliate link details and revenue attribution', 'Export affiliate data to CSV for reporting'] },
    ],
  },
  {
    id: 114,
    title: 'Build a Password Generator App with Python — From Zero to macOS .app',
    category: 'Corporate IT Training',
    level: 'Beginner', duration: '2h', students: '70+', rating: 4.9,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Python 3', 'Tkinter', 'SQLite3', 'PyInstaller', 'Password Policy', 'macOS App Packaging'],
    description: 'Build a fully functional Password Generator desktop app with Python from scratch — Tkinter GUI, three generation modes (Strong, Medium, Memorable), local SQLite history, one-click clipboard copy, and packaged as a standalone macOS .app that runs without Python installed. The exact app built and shipped by the instructor.',
    topics: [
      'Python project setup: Tkinter, SQLite3 — no pip installs needed',
      'GUI design: window, labels, entry field, dropdown, checkboxes, buttons',
      'Password generation logic: character pools, random.choice(), three modes',
      'SQLite history: store every generated password with timestamp',
      'Package as a double-click macOS .app using PyInstaller',
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
  {
    id: 115,
    title: 'CLEA App: SAP IT Asset Lifecycle Management — Daily Operations',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '2h', students: '110+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['CLEA App', 'SAP BTP', 'QR Asset Scanning', 'SAP ISP', 'Power BI', 'IT Asset Lifecycle', 'On/Offboarding'],
    description: 'Learn how to use the CLEA (Client Lifecycle Enterprise Application) SAP BTP app for daily IT asset operations — monthly pool stock QR scanning, device assignment for new hires (on-boarding), equipment recovery from leavers (off-boarding), goods receipt, and Power BI KPI reporting. Based on real daily operations managing 89+ devices across 6 categories in Riyadh.',
    topics: [
      'CLEA app architecture: 3 modules — On-Boarding, Asset Operations, Off-Boarding',
      'Monthly IT Storage Room scan: mobile app + camera/QR scanning 89 devices',
      'On-boarding workflow: assign pre-staged devices, link to ServiceNow and SAP ISP',
      'Off-boarding workflow: calendar-driven equipment recovery, return receipt, pool restock',
      'Power BI global inventory reporting: KPIs, missing data flags, 18+ countries',
    ],
    curriculum: [
      { module: 'Module 1 — CLEA App Overview & Architecture', lessons: [
        'What is CLEA — Client Lifecycle Enterprise Application on SAP BTP',
        'Three main modules: On-Boarding, Asset Management Operations, Off-Boarding',
        'How CLEA connects to SAP ISP, ServiceNow ITSM, SAP Ariba, and Power BI',
        'Web app vs. mobile app: when to use each',
        'ABC asset classification: S (Standard), N (New), R (Repair/Return) — why it matters',
        'Navigating the IT Operational Dashboard: live KPIs and pending actions',
      ]},
      { module: 'Module 2 — Monthly Pool Stock Scan (IT Storage Room Inventory)', lessons: [
        'What is IT Storage Room Inventory and why monthly scanning is mandatory',
        'Opening the mobile CLEA app: select Country → Location → IT Storage Room Inventory',
        'Scanning devices with the camera: QR code vs. barcode, what each looks like on SAP labels',
        'Device categories to scan: laptops, MacBooks, iPhones, iPads, Android, monitors',
        '"Show Missing Devices" button: how to identify unscanned assets and resolve gaps',
        'Closing the inventory cycle: verifying all 89 devices scanned, submitting the cycle',
        'What happens in the backend: SAP ISP records updated, Power BI reflects new data',
      ]},
      { module: 'Module 3 — On-Boarding: Device Assignment for New Joiners', lessons: [
        'On-Boarding Calendar: how HR-triggered events appear in CLEA for IT planning',
        'New joiner on-boarding flow: select user → assign pre-staged device from pool stock',
        'Hardware Shipping module: how to initiate device shipping for remote employees',
        'Mass Hardware Pre-assignment: bulk assign devices to multiple joiners before Day 1',
        'Linking the CLEA assignment to the ServiceNow on-boarding ticket',
        'User Event logging: recording Day 1 handover with timestamp and device serial',
        'Verifying the assignment appears in SAP ISP asset record',
      ]},
      { module: 'Module 4 — Goods Receipt & Off-Boarding', lessons: [
        'Goods Receipt: receiving new hardware from SAP Ariba PO — step-by-step in CLEA',
        'Registering received devices: model, serial number, ABC classification, storage location',
        'Goods Receipt History: audit trail for all procurement intake — what to verify',
        'Off-Boarding Calendar: how leaver events from HR appear for IT action',
        'Equipment recovery workflow: contact user → collect device → process Return Receipt',
        'Return Receipt: recording the physical condition, accessories checklist, sign-off',
        'Device back to pool: update CLEA status → device appears in next scan cycle',
      ]},
      { module: 'Module 5 — Power BI Asset Reporting & KPI Tracking', lessons: [
        'Equipment Report Overview: total by category — laptops, desktops, phones, tablets, monitors',
        'Missing Data report: how to identify assets with incomplete SAP ISP records',
        'Select Region slicer: filtering Power BI by country or office location',
        'Inventory Status KPI tiles: reading colour-coded status (green/gold/red/blue)',
        'Inventory cycle tracking: open vs. next cycle, cycle number history (1727–1797)',
        'Global scope: reviewing 18+ country data in a single Power BI view',
        'Sharing the Power BI report with IT management for monthly asset review',
      ]},
    ],
  },
  {
    id: 116,
    title: 'ServiceNow CSM/FSM Workspace & HCSM AI Copilot for IT Support',
    category: 'Corporate IT Training',
    level: 'Intermediate', duration: '2h 30m', students: '95+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ServiceNow CSM/FSM', 'HCSM AI Copilot', 'Walk-up Queue', 'Interaction Management', 'Catalog Tasks', 'SLA IRT/MPT', 'ITIL v3'],
    description: 'Master the ServiceNow CSM/FSM Configurable Workspace for daily IT support operations — managing interactions, catalog tasks, incidents, walk-up queue, and using the HCSM AI Copilot for faster resolution. Based on real daily operations handling 1,300+ interactions and 65+ catalog tasks per month.',
    topics: [
      'CSM/FSM Configurable Workspace: navigation, custom lists, and live KPI dashboard',
      'Interaction management: walk-up, phone/chat, and appointment channels',
      'Catalog task lifecycle: SCTASK creation, assignment, hardware lifecycle, onboarding tasks',
      'HCSM AI Copilot: triggering it, reading suggestions, applying use cases in tickets',
      'SLA monitoring: IRT/MPT dashboard — reading breached, in-danger, and resolved KPIs',
    ],
    curriculum: [
      { module: 'Module 1 — CSM/FSM Workspace Overview', lessons: [
        'What is CSM/FSM Configurable Workspace and how it differs from standard SNOW lists',
        'Navigating the workspace: default lists vs. my lists, creating custom lists',
        'The "Happening Now" KPI dashboard: IRT/MPT Breached, In Danger, Resolved, Open',
        'Understanding SC Tasks vs. Interactions vs. Incidents — when to use each ticket type',
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
        'Triggering AI Copilot: the button inside every interaction and task',
        'How Copilot searches use cases: reading the "Search use case" panel',
        'Applying a Copilot suggestion: using the suggested resolution in your ticket notes',
        'When Copilot helps most: complex technical issues vs. simple requests',
        'KB article integration: Copilot surfaces relevant KBAs — how to attach them to the ticket',
        'Feedback loop: how good ticket descriptions improve Copilot suggestion quality',
      ]},
      { module: 'Module 5 — SLA Monitoring, Knowledge & Service Portfolio', lessons: [
        'IRT vs. MPT SLA: what each measures and the difference in breach consequences',
        'Reading the SLA KPI dashboard: Breached (red), In Danger (amber), Safe (green)',
        'My SLAs Work list: filtering to see only your tickets approaching breach',
        'Knowledge management: Frequently used KBAs, creating and publishing articles',
        'Problem management: My Open, Preventive Measures — proactive problem resolution',
        'Service Portfolio Management: Outages — how to check active outages before troubleshooting',
        'Requested Items: My Groups Awaiting Info — clearing the backlog daily',
      ]},
    ],
  },
  {
    id: 1,
    title: 'IT Career Roadmap: From L1 to Senior Engineer',
    category: 'Career & IT Foundations',
    level: 'Beginner', duration: '3h', students: '500+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Career Planning', 'Certifications', 'MENA IT Market'],
    description: 'Build a 15-year IT career — certifications, salary progression, and how to move from helpdesk to senior engineer at a multinational.',
    topics: ['IT career paths: helpdesk → L2/L3 → senior engineer', 'Which certifications to get (and in what order)', 'How to land roles at multinationals in MENA', 'Real salary benchmarks by role and region'],
  },
  {
    id: 2,
    title: 'AI Tools for IT Professionals: Practical Guide',
    category: 'AI & Automation',
    level: 'Beginner', duration: '2h 30m', students: '800+', rating: 5.0,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ChatGPT', 'Claude AI', 'M365 Copilot', 'Prompt Engineering'],
    description: 'Practical AI adoption for IT professionals — use ChatGPT, Claude, Copilot in daily IT work with real enterprise examples.',
    topics: ['AI tools overview: ChatGPT, Claude, Copilot, Gemini', 'Writing scripts and automations with AI', 'AI-powered troubleshooting workflows'],
  },
  {
    id: 3,
    title: 'ServiceNow Basics: Your First ITSM Dashboard',
    category: 'ITSM & ServiceNow',
    level: 'Beginner', duration: '2h', students: '350+', rating: 4.8,
    isFree: true, isPopular: false,
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ServiceNow', 'ITSM', 'SLA Management', 'KB Articles'],
    description: 'Get up and running with ServiceNow — ticket lifecycle, SLA setup, knowledge base creation, and dashboard reporting.',
    topics: ['Navigating the ServiceNow interface', 'Creating and managing incidents', 'Setting up SLA rules and targets'],
  },
  {
    id: 4,
    title: 'E-Commerce: Learn Amazon & Start Selling Online',
    category: 'E-Commerce',
    level: 'Beginner', duration: '6h', students: '300+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Amazon FBA', 'Product Research', 'Listing Optimisation', 'PPC Ads'],
    description: 'Launch on Amazon and grow your e-business — FBA setup, product research, listings, and first sales. Covers MENA and international sellers.',
    topics: ['Amazon Seller Central account setup', 'Product research tools and strategies', 'FBA vs FBM — which model to choose', 'Creating optimised product listings'],
  },
  {
    id: 5,
    title: 'Digital Marketing: Social Media, SEO & Online Growth',
    category: 'Digital Marketing',
    level: 'Beginner', duration: '8h', students: '400+', rating: 4.9,
    isFree: true, isPopular: true,
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['LinkedIn', 'Instagram', 'SEO', 'Google Ads', 'Email Marketing'],
    description: 'Grow your brand using social media, SEO, email, and paid ads. Perfect for IT professionals building an online presence.',
    topics: ['Social media: LinkedIn, Instagram, Facebook, TikTok', 'SEO basics: get found on Google', 'Email marketing and list building'],
  },
  {
    id: 6,
    title: 'Microsoft 365 Administration Masterclass',
    category: 'Microsoft 365 & Azure',
    level: 'Intermediate', duration: '12h', students: '200+', rating: 4.9,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Exchange Online', 'Teams Admin', 'Intune MDM', 'SharePoint', 'Conditional Access'],
    description: 'Complete M365 administration — Exchange Online, Teams governance, SharePoint, Intune MDM, and M365 Copilot from real enterprise experience.',
    topics: ['Exchange Online: mailboxes, mail flow, quarantine', 'Teams admin: policies, governance, MTR setup', 'Intune / Autopilot: zero-touch provisioning', 'Conditional Access and MFA deployment'],
    certificate: true,
  },
  {
    id: 7,
    title: 'Azure Security Engineer: Zero Trust Implementation',
    category: 'Cybersecurity & Azure',
    level: 'Advanced', duration: '16h', students: '150+', rating: 5.0,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Zero Trust', 'Azure AD', 'Defender for M365', 'PIM', 'Sentinel'],
    description: 'Design and deploy Zero Trust in a real enterprise — Conditional Access, Defender, Intune compliance, PIM, and Azure Sentinel.',
    topics: ['Zero Trust architecture design', 'Conditional Access policy design and testing', 'Defender for M365: EDR, SIEM integration', 'Secure Score from 41% → 78% case study'],
    certificate: true,
  },
  {
    id: 8,
    title: 'Python Automation for IT Engineers',
    category: 'AI & Automation',
    level: 'Intermediate', duration: '14h', students: '180+', rating: 4.9,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Python', 'REST APIs', 'ServiceNow API', 'Microsoft Graph API', 'Automation'],
    description: 'Build real automation tools — ServiceNow automation, email agents, WhatsApp alerts, PowerBI pipelines. Every script used in production.',
    topics: ['Python fundamentals for IT professionals', 'ServiceNow API: read/write tickets via Python', 'Microsoft Graph API: email and calendar automation', 'WhatsApp SLA alerts via Twilio'],
    certificate: true,
  },
  {
    id: 9,
    title: 'ServiceNow ITSM: Enterprise Configuration',
    category: 'ITSM & ServiceNow',
    level: 'Intermediate', duration: '10h', students: '120+', rating: 4.8,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['ServiceNow', 'SLA Design', 'Business Rules', 'KB Strategy', 'PowerBI'],
    description: 'Build a production-ready ServiceNow environment — SLA frameworks, business rules, workflow automation, and KB strategy from 1,500+ tickets/year experience.',
    topics: ['SLA framework design (P1–P4)', 'Auto-assignment rules and routing', 'Business rules and client scripts', 'REST API integration'],
    certificate: true,
  },
  {
    id: 10,
    title: 'IT Infrastructure for Corporates: Enterprise Setup',
    category: 'IT Infrastructure',
    level: 'Intermediate', duration: '18h', students: '90+', rating: 4.9,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Cisco', 'HP Servers', 'Intune', 'Active Directory', 'Teams MTR'],
    description: 'Complete enterprise IT infrastructure — Cisco networking, HP server setup, MDM deployment and meeting room AV from 15 years at a global multinational.',
    topics: ['Enterprise network design: Cisco, Aruba', 'HP server room setup and management', 'SCCM / Intune: device management at scale', 'Meeting room AV: Teams MTR, Logitech'],
    certificate: true,
  },
  {
    id: 11,
    title: 'E-Commerce: Master Amazon, eBay, Noon, Shopify & More',
    category: 'E-Commerce',
    level: 'Intermediate', duration: '14h', students: '150+', rating: 4.8,
    isFree: false, isPopular: true,
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Amazon', 'eBay', 'Noon', 'Shopify', 'Etsy', 'Cross-listing'],
    description: 'Sell across all major platforms — Amazon, eBay, Noon, Shopify, Etsy, AliExpress. Cross-listing tools, inventory sync, and scaling to $10K/month.',
    topics: ['Amazon: advanced FBA, brand registry', 'eBay: listing and Global Shipping', 'Noon MENA marketplace setup', 'Shopify store connected to all platforms'],
    certificate: true,
  },
  {
    id: 12,
    title: 'Advanced Digital Marketing & Growth Strategy',
    category: 'Digital Marketing',
    level: 'Intermediate', duration: '16h', students: '180+', rating: 4.9,
    isFree: false, isPopular: false,
    img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&q=80&auto=format&fit=crop',
    instructor: 'Syed Waqas Tayyab',
    skills: ['Google Ads', 'Meta Ads', 'SEO', 'Marketing Automation', 'Funnels'],
    description: 'Advanced SEO, paid media, marketing automation, funnel building, and data-driven growth. Tools used by top marketing teams at global brands.',
    topics: ['Advanced SEO: technical, backlinks, schema', 'Google Ads and Meta Ads management', 'Marketing automation: HubSpot, Mailchimp', 'Sales funnel design: awareness → conversion'],
    certificate: true,
  },
]

const featuredTracks = [
  { title: 'IT Infrastructure & Security', icon: '🛡️', courses: 3, color: 'from-blue-600/30 to-blue-900/20', border: 'border-blue-500/20', skills: ['Azure Security', 'Zero Trust', 'Cisco Networking', 'Intune'] },
  { title: 'AI & Automation Engineer', icon: '🤖', courses: 2, color: 'from-purple-600/30 to-purple-900/20', border: 'border-purple-500/20', skills: ['Python', 'AI Tools', 'ServiceNow API', 'Power Automate'] },
  { title: 'E-Commerce & Digital Business', icon: '🛒', courses: 4, color: 'from-amber-600/30 to-amber-900/20', border: 'border-amber-500/20', skills: ['Amazon FBA', 'Shopify', 'Digital Marketing', 'SEO'] },
  { title: 'Microsoft 365 Expert', icon: '☁️', courses: 2, color: 'from-sky-600/30 to-sky-900/20', border: 'border-sky-500/20', skills: ['Exchange Online', 'Teams Admin', 'Intune', 'Copilot'] },
]

/* ── COURSE CARD ──────────────────────────────────────────────── */
function CourseCard({ course, size = 'normal' }: { course: typeof courses[0], size?: 'normal' | 'small' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 group">
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${size === 'small' ? 'h-32' : 'h-44'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.img} alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"/>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-dark-900/90 text-white">
          {course.duration}
        </span>
        {/* Free / Inquire badge */}
        <span className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black ${
          course.isFree ? 'bg-green-500/20 border border-green-500/40 text-green-300' : 'bg-accent-blue/20 border border-accent-blue/40 text-accent-blue'
        }`}>
          {course.isFree ? '🎁 Free' : '$ Inquire'}
        </span>
        {/* Popular */}
        {course.isPopular && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
            Popular
          </span>
        )}
        {/* Play button overlay — pointer-events-none so it doesn't block card buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white ml-0.5"/>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-widest mb-1">{course.category}</p>
        <h3 className="font-bold text-white text-sm leading-snug mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-500 text-xs mb-1">By {course.instructor}</p>

        {/* Rating + students */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>
            <span className="text-xs font-bold text-yellow-400">{course.rating}</span>
          </div>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-xs text-gray-500">{course.students} students</span>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.skills.slice(0, 3).map(s => (
            <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-dark-700 border border-white/8 text-gray-400">{s}</span>
          ))}
        </div>

        {/* View course button — links to detail page if curriculum exists */}
        {(course as any).curriculum ? (
          <Link
            href={`/training/${course.id}`}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-accent-blue mb-2 px-3 py-2 rounded-lg bg-accent-blue/8 border border-accent-blue/20 hover:bg-accent-blue/15 transition-colors w-full"
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            View Course Structure ({(course as any).curriculum.length} modules)
          </Link>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
            className="flex items-center gap-1.5 text-xs font-semibold text-accent-blue mb-2 px-3 py-2 rounded-lg bg-accent-blue/8 border border-accent-blue/20 hover:bg-accent-blue/15 transition-colors w-full"
          >
            {open
              ? <><ChevronUp className="w-3.5 h-3.5 flex-shrink-0" />Hide topics</>
              : <><ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />What you&apos;ll learn</>
            }
          </button>
        )}

        {/* Topics fallback for non-curriculum courses */}
        {!(course as any).curriculum && open && (
          <div className="mb-3 space-y-1.5">
            {course.topics.map(t => (
              <div key={t} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                <CheckCircle className="w-3 h-3 text-accent-blue flex-shrink-0 mt-0.5" />
                {t}
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2 pt-3 border-t border-white/5 mt-auto">
          <a href="#inquiry" className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${
            course.isFree
              ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
              : 'bg-accent-blue text-white hover:bg-blue-500'
          }`}>
            {course.isFree ? <><Play className="w-3 h-3"/>Enroll Free</> : <><BookOpen className="w-3 h-3"/>Inquire & Enroll</>}
          </a>
          {(course as any).certificate && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-dark-700 border border-white/8 text-[10px] text-yellow-400">
              <Award className="w-3 h-3"/>Cert
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── PAGE ─────────────────────────────────────────────────────── */
export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [submitted, setSubmitted] = useState(false)

  const filtered = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory)
  const free = filtered.filter(c => c.isFree)
  const paid = filtered.filter(c => !c.isFree)
  const popular = courses.filter(c => c.isPopular).slice(0, 5)

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="flex">

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-white/8 min-h-screen sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white"/>
              </div>
              <div>
                <p className="text-xs font-black text-white">HiTecH</p>
                <p className="text-[10px] text-accent-blue font-semibold">IT Learning</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input placeholder="Search courses…"
                className="w-full bg-dark-700 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
            </div>
          </div>

          <nav className="p-3 flex-1">
            {/* Library */}
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mb-2">Library</p>
            {sidebarCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-0.5 ${
                  activeCategory === cat.key
                    ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}>
                <cat.icon className="w-4 h-4 flex-shrink-0"/>
                {cat.label}
              </button>
            ))}

            {/* Trending */}
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold px-2 mt-5 mb-2">Trending Topics</p>
            {['AI & Machine Learning', 'Cybersecurity', 'Cloud & Azure', 'E-Commerce', 'Digital Marketing'].map(t => (
              <button key={t} onClick={() => setActiveCategory(t.includes('AI') ? 'AI & Automation' : t.includes('Cyber') ? 'Cybersecurity & Azure' : t.includes('Cloud') ? 'Microsoft 365 & Azure' : t.includes('E-Com') ? 'E-Commerce' : 'Digital Marketing')}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-0.5">
                {t}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">

          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {sidebarCategories.map(cat => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.key ? 'bg-accent-blue border-accent-blue text-white' : 'bg-dark-700 border-white/10 text-gray-400'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── CATEGORY HEADER ──────────────────────────────── */}
          <div className="mb-8">
            {activeCategory === 'All' ? (
              <div>
                <h1 className="text-2xl font-black text-white mb-1">All Courses</h1>
                <p className="text-gray-400 text-sm">{courses.length} courses · Free &amp; Professional · IT, AI, Cloud, Security, E-Commerce</p>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-black text-white mb-1">{activeCategory}</h1>
                <p className="text-gray-400 text-sm">{filtered.length} course{filtered.length !== 1 ? 's' : ''} available</p>
              </div>
            )}
          </div>

          {/* ── FREE RESOURCES — CV Templates ────────────────── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-dark-800/60 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-green-500/15">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎁</span>
                    <div>
                      <h2 className="text-base font-black text-white">Free Downloads — Professional CV Templates</h2>
                      <p className="text-xs text-gray-500">Industry-specific Word templates built by a senior IT practitioner.</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black bg-green-500/15 border border-green-500/30 text-green-400 uppercase tracking-widest">100% Free · No Sign-up</span>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[
                    { file: 'CV-IT-Support-Engineer-L1-L2.docx', title: 'IT Support Engineer', level: 'L1 / L2', icon: '🖥️', color: 'text-sky-400 border-sky-500/25 bg-sky-500/8', desc: 'Perfect for your first IT role or moving from L1 to L2. Includes ServiceNow, M365, AD skills.', exp: 'Entry Level · 0–3 years' },
                    { file: 'CV-Senior-IT-Engineer.docx', title: 'Senior IT Engineer', level: 'Senior / Lead', icon: '🔧', color: 'text-blue-400 border-blue-500/25 bg-blue-500/8', desc: 'For senior engineers targeting IT manager or specialist roles at multinationals.', exp: 'Senior Level · 8+ years' },
                    { file: 'CV-Azure-Security-Engineer.docx', title: 'Azure Security Engineer', level: 'Security / Cloud', icon: '🛡️', color: 'text-red-400 border-red-500/25 bg-red-500/8', desc: 'Optimised for Azure Security Engineer roles. Highlights Zero Trust, Defender, Conditional Access.', exp: 'Mid–Senior · 5+ years' },
                    { file: 'CV-IT-Consultant.docx', title: 'IT Consultant', level: 'Consulting / ITSM', icon: '💼', color: 'text-purple-400 border-purple-500/25 bg-purple-500/8', desc: 'For freelance IT consultants and contract roles. Strong on ITSM, ServiceNow, client management.', exp: 'All Levels' },
                    { file: 'CV-Career-Change-Into-IT.docx', title: 'Career Change into IT', level: 'Beginner / Switcher', icon: '🚀', color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/8', desc: 'Structured for career changers — highlights transferable skills and IT certifications.', exp: 'Career Switcher' },
                  ].map(t => (
                    <a key={t.file} href={`/cv-templates/${t.file}`} download
                      className={`flex flex-col gap-3 p-4 rounded-xl border ${t.color} hover:-translate-y-0.5 transition-all duration-200 group`}>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{t.icon}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${t.color}`}>{t.level}</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs mb-1 group-hover:underline">{t.title}</p>
                        <p className="text-gray-500 text-[10px] leading-snug mb-2">{t.desc}</p>
                        <p className="text-[9px] text-gray-600">{t.exp}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold mt-auto" style={{color: 'inherit'}}>
                        <Download className="w-3 h-3"/> Download .docx
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Learning Paths ────────────────────────────────── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <h2 className="text-lg font-black text-white mb-1">Learning Paths</h2>
              <p className="text-gray-500 text-sm mb-5">Curated paths for IT professionals, entrepreneurs, and career changers.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {featuredTracks.map((track, i) => (
                  <div key={i} className={`rounded-xl border ${track.border} bg-gradient-to-br ${track.color} p-5 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer`}>
                    <span className="text-3xl mb-3 block">{track.icon}</span>
                    <h3 className="font-black text-white text-sm mb-1">{track.title}</h3>
                    <p className="text-gray-400 text-[11px] mb-3">{track.courses} courses</p>
                    <div className="flex flex-wrap gap-1">
                      {track.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-gray-300">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── COURSE GRID ───────────────────────────────────── */}
          {/* Corporate IT Training — shown first when active, or as a pinned section on All */}
          {(activeCategory === 'Corporate IT Training' || activeCategory === 'All') && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">⚙️</span>
                <h2 className="text-base font-black text-white">Corporate IT Training</h2>
                <span className="text-xs bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 px-2.5 py-0.5 rounded-full font-bold">
                  {courses.filter(c => c.category === 'Corporate IT Training').length} courses · Free
                </span>
                {activeCategory === 'All' && (
                  <button onClick={() => setActiveCategory('Corporate IT Training')}
                    className="ml-auto text-xs text-accent-blue hover:underline flex-shrink-0">
                    View all →
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(activeCategory === 'All'
                  ? courses.filter(c => c.category === 'Corporate IT Training').slice(0, 8)
                  : courses.filter(c => c.category === 'Corporate IT Training')
                ).map(c => <CourseCard key={c.id} course={c} />)}
              </div>
              {activeCategory === 'All' && courses.filter(c => c.category === 'Corporate IT Training').length > 8 && (
                <div className="mt-4 text-center">
                  <button onClick={() => setActiveCategory('Corporate IT Training')}
                    className="btn-outline px-6 py-2 text-sm inline-flex items-center gap-2">
                    View all {courses.filter(c => c.category === 'Corporate IT Training').length} Corporate IT courses <ArrowRight className="w-4 h-4"/>
                  </button>
                </div>
              )}
            </section>
          )}

          {/* All other categories */}
          {activeCategory !== 'Corporate IT Training' && filtered.filter(c => c.category !== 'Corporate IT Training').length > 0 && (
            <>
              {/* Group by category when All is selected */}
              {activeCategory === 'All' ? (
                ['AI & Automation', 'Cybersecurity & Azure', 'Microsoft 365 & Azure', 'IT Infrastructure', 'ITSM & ServiceNow', 'Career & IT Foundations', 'E-Commerce', 'Digital Marketing'].map(cat => {
                  const catCourses = courses.filter(c => c.category === cat)
                  if (!catCourses.length) return null
                  return (
                    <section key={cat} className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-base font-black text-white">{cat}</h2>
                        <span className="text-xs text-gray-500">{catCourses.length} courses</span>
                        <button onClick={() => setActiveCategory(cat)} className="ml-auto text-xs text-accent-blue hover:underline flex-shrink-0">View all →</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {catCourses.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
                      </div>
                    </section>
                  )
                })
              ) : (
                <section className="mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.filter(c => c.category !== 'Corporate IT Training').map(c => <CourseCard key={c.id} course={c} />)}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ── Professional Credentials ── */}
          {activeCategory === 'All' && (
            <section className="mb-10">
              <div className="glass-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="text-lg font-black text-white mb-2">Prepare, Earn &amp; Maintain Professional Credentials</h2>
                  <p className="text-gray-400 text-sm mb-4">All paid courses include a signed certificate of completion — recognised for your CV, LinkedIn, and client proposals.</p>
                  <a href="#inquiry" className="btn-primary inline-flex text-sm px-6 py-2.5">
                    Explore Certification Programmes <ArrowRight className="w-4 h-4"/>
                  </a>
                </div>
                <div className="flex-shrink-0 w-40 h-28 rounded-xl border border-white/10 bg-dark-700 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Award className="w-10 h-10 text-accent-blue mx-auto mb-2"/>
                    <p className="text-[10px] text-gray-400 font-semibold">HiTecH Technology HUB</p>
                    <p className="text-[9px] text-gray-600">Certificate of Completion</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Course Inquiry Form ── */}
          <section id="inquiry" className="mb-10">
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:border-r border-white/8">
                  <h2 className="text-xl font-black text-white mb-2">Course Inquiry</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">Interested in a course? Want corporate training for your team? Our team responds within 24 hours.</p>
                  <div className="space-y-4 mb-6">
                    {[
                      { n: '1', t: 'Tell us which course interests you', sub: 'Or what skill you want to develop' },
                      { n: '2', t: 'We confirm availability and session dates', sub: 'Online self-paced or live cohort' },
                      { n: '3', t: 'You enrol and get instant access', sub: 'All materials, exercises, and certificate' },
                    ].map(s => (
                      <div key={s.n} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</span>
                        <div>
                          <p className="text-gray-200 text-sm font-medium">{s.t}</p>
                          <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-4 border-t border-white/8">
                    <a href="https://wa.me/966505803073" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors text-sm">
                      <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </div>
                      WhatsApp: +966 505 803 073
                    </a>
                    <a href="mailto:waqastayyab2004@gmail.com"
                      className="flex items-center gap-3 text-accent-blue hover:text-cyan-400 transition-colors text-sm">
                      <div className="w-8 h-8 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5"/>
                      </div>
                      waqastayyab2004@gmail.com
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                      <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-green-400"/>
                      </div>
                      <h3 className="text-lg font-black text-white">Inquiry Sent!</h3>
                      <p className="text-gray-400 text-sm max-w-xs">Our team will respond within 24 hours with course details and next steps.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-outline text-sm px-5 py-2">Send Another</button>
                    </div>
                  ) : (
                    <form className="space-y-3" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name *</label>
                          <input type="text" placeholder="Your name" required
                            className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Email *</label>
                          <input type="email" placeholder="you@email.com" required
                            className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Phone / WhatsApp</label>
                        <input type="tel" placeholder="+966 5xx xxx xxxx"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Course Interested In *</label>
                        <select required className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-accent-blue/50">
                          <option value="">Select a course…</option>
                          {courses.map(c => (
                            <option key={c.id} value={c.title}>{c.isFree ? '🎁 Free — ' : '🎓 Paid — '}{c.title}</option>
                          ))}
                          <option value="corporate">Corporate / Team Training (custom)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Current Role</label>
                        <input type="text" placeholder="e.g. IT Support, 2 years experience"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Message</label>
                        <textarea rows={2} placeholder="Any questions or specific goals?"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 resize-none"/>
                      </div>
                      <button type="submit" className="w-full bg-accent-blue hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                        Send Inquiry <ArrowRight className="w-4 h-4"/>
                      </button>
                      <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3"/> Your details are kept private.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
