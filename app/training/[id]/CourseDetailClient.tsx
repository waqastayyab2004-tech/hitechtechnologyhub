'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Clock, Users, Star, Award, CheckCircle,
  Play, ChevronDown, ChevronUp, BookOpen, Shield,
  Briefcase, Globe, Mail,
} from 'lucide-react'

const courses = [
  { id: 101, title: 'IT Asset Lifecycle Management for Enterprise Support', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h', students: '200+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop', skills: ['Asset Tracking', 'Hardware Lifecycle', 'SAP ISP', 'MDM Compliance', 'Inventory Management'], description: 'Learn how enterprise IT assets are tracked, returned, scanned, and audited across the full hardware lifecycle — from procurement to disposal. Based on real SAP IT operations.', whatYouLearn: ['Track and manage enterprise hardware from procurement to disposal', 'Process in-person and remote device returns with full compliance', 'Conduct physical inventory scans using mobile scanner tools', 'Handle lost/stolen device incidents including MDM wipe and security escalation', 'Raise and approve device procurement via SAP Ariba'], curriculum: [{ module: 'Module 1 — Asset Management Fundamentals', lessons: ['What is IT asset lifecycle management?', 'Enterprise asset categories: laptops, mobiles, tablets, monitors, printers', 'Asset tagging, serial number tracking, and SAP ISP records', 'Minimum device lifespan policies and refresh cycles'] }, { module: 'Module 2 — Hardware Return Processes', lessons: ['In-person return workflow: condition check, accessories, account sign-out', 'Remote employee return: shipping process, deadlines, and escalation', 'Handling accidental return initiation and cancellation', 'Post-return: re-imaging, redeployment, or decommission decision'] }, { module: 'Module 3 — Physical Inventory Management', lessons: ['Annual inventory scanning using mobile scanner tools', 'Reconciling physical count vs. system records', 'Flagging inactive, missing, or unassigned assets', 'Updating asset status in ERP after scanning'] }, { module: 'Module 4 — Lost, Stolen & Non-Returned Devices', lessons: ['Immediate steps when a device is reported lost or stolen', 'Remote wipe via MDM (Jamf / Intune)', 'Raising a security incident and disabling accounts', 'Escalation timeline for non-returned offboarding assets (21-day rule)'] }, { module: 'Module 5 — Procurement & Cost Responsibility', lessons: ['How device requests are raised via SAP Ariba', 'Approval chain: user → IT manager → country MD', 'MENA procurement volumes and budget tracking in Power BI', 'Warranty tracking, certified disposal, and recycling'] }] },
  { id: 102, title: 'Corporate Email Platform Administration (Exchange Online)', category: 'Corporate IT Training', level: 'Intermediate', duration: '1h', students: '180+', rating: 4.8, isFree: true, img: 'https://images.unsplash.com/photo-1596526131083-e8c633064e2e?w=800&q=80&auto=format&fit=crop', skills: ['Exchange Online', 'Microsoft 365', 'Email Security', 'Shared Mailboxes', 'Phishing Response'], description: 'Administer corporate email services in Microsoft 365 — mailbox quotas, retention policies, shared mailbox management, mass mailing permissions, and phishing response.', whatYouLearn: ['Manage mailbox quotas, archives, and retention policies', 'Create and administer shared mailboxes and distribution lists', 'Process mass mailing permission requests securely', 'Configure anti-spam and respond to phishing reports', 'Apply corporate password and MFA policies for email accounts'], curriculum: [{ module: 'Module 1 — Mailbox Administration', lessons: ['User mailbox quota: 100 GB standard, online archive up to 1 TB', 'Setting up and enabling online archives for long-term retention', 'Configuring Outlook profile on Windows and macOS', 'Internal vs. external attachment size limits and blocked file types'] }, { module: 'Module 2 — Shared Mailbox Management', lessons: ['Creating shared mailboxes and assigning access permissions', 'Adding/removing aliases and setting reply-from address', 'Annual cost review: when shared mailboxes require a licence', 'Retiring shared mailboxes: offboarding and data preservation'] }, { module: 'Module 3 — Mass Mailing & Distribution Lists', lessons: ['What requires a mass mailing permission', 'Requesting temporary (28-day) vs. permanent mass mailing rights', 'Distribution list management and membership updates', 'Avoiding spam triggers when sending to large groups'] }, { module: 'Module 4 — Email Security & Spam Management', lessons: ['Anti-spam filter: how it works and how to whitelist/blacklist senders', 'Junk mail folder configuration in Outlook', 'How to report phishing emails using the built-in reporting tool', 'What happens after a phishing report: IT response process'] }, { module: 'Module 5 — Password & MFA for Email Accounts', lessons: ['Corporate password policy: 15-character minimum, 2-year expiry', 'Admin account requirements: 20-character minimum', 'Resetting email account password without IT (SSPR)', 'MFA methods supported: app, SMS, RSA soft token'] }] },
  { id: 103, title: 'macOS Device Management in a Corporate Environment', category: 'Corporate IT Training', level: 'Intermediate', duration: '2h', students: '150+', rating: 4.9, isFree: true, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop', skills: ['Jamf MDM', 'macOS', 'FileVault', 'SSO Certificates', 'Microsoft Defender', 'Self Service'], description: 'Configure, secure, and support Apple Mac computers in a corporate managed environment using Jamf MDM — covering provisioning, compliance, SSO, encryption, and app management.', whatYouLearn: ['Enrol corporate Macs via Jamf MDM using Apple ADE', 'Install, renew, and troubleshoot SSO certificates', 'Enforce FileVault encryption and verify compliance', 'Grant temporary admin rights using the Privileges app', 'Use Self Service portal for software installation'], curriculum: [{ module: 'Module 1 — Mac Provisioning & MDM Enrolment', lessons: ['Automated enrolment via Apple ADE (zero-touch setup)', 'Manual MDM profile installation when ADE is unavailable', 'First-boot setup: network, Apple ID, corporate account', 'Verifying MDM enrolment status in System Settings'] }, { module: 'Module 2 — Single Sign-On & Certificate Management', lessons: ['What is Kerberos SSO and why it is required on corporate Macs', 'Installing the SSO extension certificate step by step', 'Checking certificate validity and expiry date', 'Removing and re-installing the SSO certificate when broken', 'Syncing corporate password with macOS local account'] }, { module: 'Module 3 — Security & Compliance', lessons: ['FileVault disk encryption: enabling and verifying recovery key escrow', 'System Integrity Protection (SIP): what it is and when to check', 'macOS update policy: mandatory deadline 30 days after Apple release', 'Microsoft Defender for Endpoint on macOS: installation and status', 'Cisco Umbrella DNS security: scope on managed Macs'] }, { module: 'Module 4 — Privilege & Application Management', lessons: ['Why standard user accounts are the security default', 'Granting temporary local admin using the Privileges app', 'Self Service portal: installing approved corporate apps without IT', 'Requesting software not in Self Service via ITSM ticket', 'Running Windows via VMware Fusion: setup and licensing'] }, { module: 'Module 5 — VPN & Network on macOS', lessons: ['Installing Cisco Secure Client (GlobalProtect) on macOS', 'Always-on VPN: what it does and when it connects automatically', 'Connecting to corporate Wi-Fi (802.1X): certificate-based auth', 'Printer installation on macOS via VPN and Self Service', 'Troubleshooting: Mac not connecting to corporate network'] }] },
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
]

const levelColor: Record<string, string> = {
  Beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
  Intermediate: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Advanced: 'bg-red-500/15 text-red-400 border-red-500/30',
}

function ModuleAccordion({ mod, index }: { mod: { module: string; lessons: string[] }; index: number }) {
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.img} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-5" />
              <div className="text-2xl font-black text-white mb-1">{course.isFree ? 'Free' : '$ Inquire'}</div>
              <p className="text-gray-400 text-xs mb-5">{course.isFree ? 'No sign-up required · Enrol instantly' : 'Contact for pricing and schedule'}</p>
              <a href={`mailto:waqastayyab2004@gmail.com?subject=Enrol: ${course.title}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-accent-blue text-white hover:bg-blue-500 transition-colors mb-3">
                <Mail className="w-4 h-4" />{course.isFree ? 'Enrol Now — Free' : 'Inquire & Enrol'}
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">Ask a Question</Link>
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
