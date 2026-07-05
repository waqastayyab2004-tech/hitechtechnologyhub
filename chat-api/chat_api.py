#!/usr/bin/env python3
"""
HiTecH AI HUB — Claude Chat API
Runs on http://localhost:3001
Connect your ANTHROPIC_API_KEY to get real AI responses in the chatbot.
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False
    print("⚠  anthropic package not installed. Run: pip3 install anthropic")

SYSTEM_PROMPT = """You are NEXUS-W1, the AI assistant for Syed Waqas Tayyab's personal brand website 'HiTecH AI HUB'.

## About Waqas
- Name: Syed Waqas Tayyab
- Role: Senior IT System Engineer, IT Service Delivery Lead, IT Consultant, AI Engineer
- Company: SAP, Riyadh, Saudi Arabia
- Experience: 15+ years in IT, 100+ projects delivered
- Education: MBA (Buckinghamshire New University, UK), BSc IT (University of Greenwich, UK)
- 13 certifications including: Azure Security Engineer Associate, SAP Python ML/SAP HANA (May 2026), SAP S/4HANA Admin, SAP Analytics Cloud, CCNA Security, ITIL v3, PMP
- Languages: English + Arabic (both fluent)
- Iqama: Transferable
- Phone: +966 505803073
- Email: waqastayyab2004@gmail.com
- LinkedIn: linkedin.com/in/syedwaqastayyab
- Facebook: HiTech Technology HUB
- 1M+ followers across social platforms

## Waqas's Expertise
- IT Service Delivery & ITSM (ServiceNow, SLA/KPI management, ITIL v3)
- Azure Security (Microsoft Certified Azure Security Engineer Associate)
- SAP Operations (S/4HANA, Analytics Cloud, BTP, Ariba)
- Microsoft 365 Admin (Exchange Online, Teams, SharePoint, OneDrive, Intune)
- IT Infrastructure (HP Servers, Cisco/Aruba networking, LAN/WAN)
- AI & ML (Python ML for SAP HANA, Agentic AI, Claude AI, LLMs, MLOps)
- Cybersecurity (Zero Trust, Endpoint Security, MFA, Conditional Access)
- Development (Python, FastAPI, Flask, Next.js, TypeScript, PowerShell)

## Projects Built
- IT Asset Manager (Flask + SQLite web app replacing Excel at SAP)
- Waqas AI Hub (FastAPI + Swift macOS dashboard integrating SAP O365, Gmail, ServiceNow, WhatsApp)
- SNOW Automation Scripts (Python automation for ServiceNow ticket monitoring + SLA alerts)
- HiTecH AI HUB website (this website — Next.js + Tailwind CSS)

## Freelance Services & Pricing
- AI & ML Automation Solutions: From $500
- IT Infrastructure Consulting: From $600
- Office Technology Expert (M365): From $400
- Web App & Dashboard Development: From $800
- SAP & ServiceNow Integration: From $1,000
- Azure Security & Zero Trust: From $600
- IT Service Delivery Management: From $500
- Cloud & M365 Advisory: From $400
- IT Leadership & AI Training: On Request

## Open to These Opportunities
- IT Service Delivery Lead (top priority)
- IT Consultant (top priority)
- SAP ML Engineer
- IT Manager / Team Lead
- AI & Automation Consultant
- Freelance Projects

## Your Role
Be helpful, professional, and concise. Help visitors understand Waqas's skills, experience, and services.
If someone wants to hire Waqas or discuss a project, guide them to contact him at waqastayyab2004@gmail.com or +966 505803073.
Keep responses focused and practical — 2-4 sentences for simple questions, longer for complex ones.
You can also discuss general IT topics, AI, automation, and technology since this is a tech blog/hub."""

API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# ── Free alternative: Hugging Face Inference API ──────────────────
# Sign up free at https://huggingface.co → Settings → Access Tokens
HF_TOKEN = os.environ.get("HF_TOKEN", "")
HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3"

def call_huggingface(message: str, history: list) -> str:
    """Free fallback using Hugging Face Inference API."""
    try:
        import urllib.request
        # Build conversation string
        conv = f"<s>[INST] {SYSTEM_PROMPT}\n\nUser: {message} [/INST]"
        payload = json.dumps({
            "inputs": conv,
            "parameters": {"max_new_tokens": 300, "temperature": 0.7, "return_full_text": False}
        }).encode()
        headers = {"Content-Type": "application/json"}
        if HF_TOKEN:
            headers["Authorization"] = f"Bearer {HF_TOKEN}"
        req = urllib.request.Request(
            f"https://api-inference.huggingface.co/models/{HF_MODEL}",
            data=payload, headers=headers
        )
        with urllib.request.urlopen(req, timeout=15) as r:
            result = json.loads(r.read())[0].get("generated_text", "")
            return result.strip() or "I couldn't generate a response. Please try again."
    except Exception as e:
        return f"Free AI service temporarily unavailable. Please contact Waqas directly:\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073"


class ChatHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress default access logs, print cleaner ones
        print(f"  [{self.command}] {self.path} → {args[1] if len(args) > 1 else '...'}")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path != "/chat":
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        try:
            data = json.loads(body)
            message = data.get("message", "").strip()
            history = data.get("history", [])  # [{role, content}, ...]
        except Exception:
            self._json_response(400, {"error": "Invalid JSON"})
            return

        if not message:
            self._json_response(400, {"error": "No message"})
            return

        if not API_KEY:
            # Try free HuggingFace fallback
            if HF_TOKEN or True:  # always try HF (works without token, rate limited)
                reply = call_huggingface(message, history)
                self._json_response(200, {"reply": reply, "model": "huggingface-free"})
            else:
                self._json_response(200, {
                    "reply": "⚠️ No API key set.\n\nSet ANTHROPIC_API_KEY for Claude AI\nor HF_TOKEN for free HuggingFace AI.\n\nGet Claude free tier at:\nhttps://console.anthropic.com",
                    "model": "offline"
                })
            return

        if not ANTHROPIC_AVAILABLE:
            self._json_response(200, {
                "reply": "⚠️ anthropic package not installed.\n\nRun: pip3 install anthropic\nThen restart the chat server.",
                "model": "offline"
            })
            return

        try:
            client = anthropic.Anthropic(api_key=API_KEY)

            # Build messages array from history + current message
            messages = []
            for h in history[-10:]:  # keep last 10 turns for context
                if h.get("role") in ("user", "assistant") and h.get("content"):
                    messages.append({"role": h["role"], "content": h["content"]})
            messages.append({"role": "user", "content": message})

            response = client.messages.create(
                model="claude-haiku-4-5",
                max_tokens=512,
                system=SYSTEM_PROMPT,
                messages=messages,
            )

            reply = response.content[0].text if response.content else "I couldn't generate a response."

            self._json_response(200, {
                "reply": reply,
                "model": response.model,
                "tokens": response.usage.output_tokens,
            })

        except anthropic.AuthenticationError:
            self._json_response(200, {"reply": "❌ Invalid API key. Check your ANTHROPIC_API_KEY.", "model": "error"})
        except anthropic.RateLimitError:
            self._json_response(200, {"reply": "⏳ Rate limited — please try again in a moment.", "model": "error"})
        except Exception as e:
            self._json_response(200, {"reply": f"⚠️ Error: {str(e)[:100]}", "model": "error"})

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json_response(self, status: int, data: dict):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(os.environ.get("CHAT_PORT", 3001))

    if API_KEY:
        ai_mode = f"Claude claude-haiku-4-5 ✅ (key: {API_KEY[:8]}...)"
    elif HF_TOKEN:
        ai_mode = f"HuggingFace Free ✅ (token: {HF_TOKEN[:8]}...)"
    else:
        ai_mode = "HuggingFace Free (no token — rate limited)"

    print(f"""
╔══════════════════════════════════════════════════════════════╗
║          Waqas AI ChatBot Server — HiTecH AI HUB             ║
╠══════════════════════════════════════════════════════════════╣
║  URL:    http://localhost:{port}/chat                          ║
║  AI:     {ai_mode:<52} ║
╚══════════════════════════════════════════════════════════════╝

Option 1 — Claude AI (BEST quality, $5 free credit):
  export ANTHROPIC_API_KEY=sk-ant-...
  Get key: https://console.anthropic.com

Option 2 — HuggingFace (FREE, no signup needed):
  Works automatically — just start the server
  For higher limits: https://huggingface.co → Settings → Tokens
  export HF_TOKEN=hf_...

Open http://localhost:3000 and click the chatbot! 🤖
Press Ctrl+C to stop.
""")

    server = HTTPServer(("localhost", port), ChatHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\nChat server stopped.")


if __name__ == "__main__":
    main()
