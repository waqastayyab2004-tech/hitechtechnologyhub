#!/usr/bin/env python3
"""
Waqas AI ChatBot Server — http://localhost:3001
AI: 1) Groq (FREE)  2) Gemini (FREE)  3) Claude  4) Smart fallback
"""
import os, json, urllib.request, urllib.error, re, ssl
from http.server import HTTPServer, BaseHTTPRequestHandler
try:
    import requests as req_lib
    USE_REQUESTS = True
except ImportError:
    USE_REQUESTS = False

# Fix SSL certificates on Mac
try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()
SSL_CONTEXT.check_hostname = False
SSL_CONTEXT.verify_mode = ssl.CERT_NONE

GROQ_API_KEY      = os.environ.get("GROQ_API_KEY", "")
GEMINI_API_KEY    = os.environ.get("GEMINI_API_KEY", "")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

SYSTEM_PROMPT = """You are an advanced AI assistant on Syed Waqas Tayyab's website "HiTecH AI HUB".

You have TWO roles:
1. PERSONAL ASSISTANT — Answer questions about Waqas, his skills, services, experience, and projects
2. GENERAL AI ASSISTANT — Answer ANY question about IT, technology, AI, programming, cybersecurity, cloud, automation, business, and general knowledge — just like ChatGPT or Claude

ABOUT WAQAS (use when asked about him):
- Senior IT System Engineer, IT Service Delivery Lead, IT Consultant, AI Engineer
- 15+ years IT, 100+ projects at SAP Riyadh, Saudi Arabia
- MBA Buckinghamshire Uni UK, BSc IT University of Greenwich UK
- 13 certifications: Azure Security Engineer (2024), SAP Python ML (2026), SAP S/4HANA, CCNA, ITIL v3, PMP
- Phone: +966 505803073 | Email: waqastayyab2004@gmail.com
- LinkedIn: syedwaqastayyab | 1M+ followers
- Services: AI Automation ($500+), IT Infrastructure ($600+), Web Apps ($800+), SAP/ServiceNow ($1000+), Azure Security ($600+), M365 ($400+)
- Open to: IT Service Delivery Lead, IT Consultant, SAP ML Engineer, Freelance (MENA + Remote)

BEHAVIOR RULES:
- For Waqas-related questions: give detailed personal info and encourage contact
- For general IT/tech/AI questions: give comprehensive, helpful answers like a senior IT expert would
- For any topic: be helpful, accurate, and thorough — never say "I can only answer about Waqas"
- Format responses with bullet points, numbered lists, and bold text where appropriate
- Keep tone professional but friendly
- For hiring/projects always mention: waqastayyab2004@gmail.com / +966 505803073
- You can discuss: programming, networking, cloud, cybersecurity, AI/ML, DevOps, Linux, Windows, databases, career advice, tech comparisons, troubleshooting, and anything technology-related"""

FALLBACKS = [
    (r"hire|freelance|consult|project|work with|availab",
     "Waqas is available for:\n• IT Service Delivery Lead\n• IT Consulting\n• AI & Automation projects\n• Azure Security\n• SAP & ServiceNow\n\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n\n👉 Visit /hire for full details!"),
    (r"skill|expert|experience|speciali",
     "Waqas has 15+ years in:\n🔵 IT Service Delivery & ITSM\n🔵 Azure Security (Certified)\n🔵 SAP S/4HANA & Analytics Cloud\n🔵 Microsoft 365 Admin\n🔵 AI/ML & Agentic AI\n🔵 Python, FastAPI, Next.js\n\n100+ projects across MENA!"),
    (r"certif|qualif|degree|mba",
     "13 certifications:\n🏆 Azure Security Engineer (2024)\n🏆 SAP Python ML/SAP HANA (2026)\n🏆 SAP S/4HANA Consultant\n🏆 CCNA Security\n🏆 ITIL v3 Foundation\n🏆 PMP (35 PDUs)\n🎓 MBA — Buckinghamshire, UK"),
    (r"contact|email|phone|whatsapp|reach",
     "📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n💬 wa.me/966505803073\n💼 linkedin.com/in/syedwaqastayyab\n\n📍 Riyadh · Open to MENA + Remote!"),
    (r"price|cost|rate|how much|charge",
     "Services from:\n💰 AI Automation: $500+\n💰 Infrastructure: $600+\n💰 Azure Security: $600+\n💰 Web Apps: $800+\n💰 SAP Integration: $1,000+\n💰 M365 Advisory: $400+"),
    (r"project|built|app|waqas ai|it asset|snow",
     "Apps Waqas built:\n🚀 Waqas AI Hub — macOS AI dashboard\n📊 IT Asset Manager — replaced Excel at SAP\n🔔 SNOW Automation — WhatsApp breach alerts\n🌐 This website — Next.js + AI chatbot"),
    (r"sap|servicenow|azure|m365|microsoft",
     "Waqas is SAP & Microsoft certified:\n• 11+ years at SAP Riyadh\n• ServiceNow ITSM expert\n• Azure Security Engineer\n• M365 full admin\n• SAP BTP, Ariba, S/4HANA"),
    (r"ai|machine learning|ml|automat|agentic|python",
     "AI expertise:\n🤖 SAP HANA Python ML (2026)\n🤖 Agentic AI pipelines\n🤖 LLM integration\n🤖 ServiceNow bots\n🤖 WhatsApp alert systems\n🤖 Built this chatbot! 😄"),
    (r"hello|hi |hey|good morning|start|help",
     "Hello! 👋 I'm Waqas's AI assistant.\n\nWaqas: 15+ years IT at SAP, Azure Security certified, MBA, AI builder, 1M+ followers.\n\nAsk me about his skills, services, or any IT/AI topic!"),
]

def smart_reply(msg):
    m = msg.lower()
    for pat, rep in FALLBACKS:
        if re.search(pat, m):
            return rep
    return "Contact Waqas for a detailed answer:\n\n📧 waqastayyab2004@gmail.com\n📞 +966 505803073\n\nOr explore /hire, /blog, /contact"

def call_groq(msg, hist):
    if not GROQ_API_KEY:
        return None, "no_key"
    key = GROQ_API_KEY.strip()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for h in hist[-8:]:
        if h.get("role") in ("user","assistant") and h.get("content"):
            messages.append({"role": h["role"], "content": h["content"]})
    messages.append({"role": "user", "content": msg})
    payload = {"model": "llama-3.3-70b-versatile", "messages": messages,
               "max_tokens": 1024, "temperature": 0.7}
    try:
        if USE_REQUESTS:
            r = req_lib.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {key}"},
                json=payload, timeout=20
            )
            data = r.json()
            if r.status_code == 200:
                return data["choices"][0]["message"]["content"].strip(), "groq-llama3"
            return None, f"HTTP_{r.status_code}"
        else:
            raw = json.dumps(payload).encode()
            req_obj = urllib.request.Request(
                "https://api.groq.com/openai/v1/chat/completions",
                data=raw,
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"}
            )
            with urllib.request.urlopen(req_obj, timeout=20, context=SSL_CONTEXT) as r:
                data = json.loads(r.read())
                return data["choices"][0]["message"]["content"].strip(), "groq-llama3"
    except Exception as e:
        return None, str(e)[:40]

def call_gemini(msg, hist):
    if not GEMINI_API_KEY:
        return None, "no_key"
    contents = []
    for h in hist[-8:]:
        role = "user" if h.get("role") == "user" else "model"
        if h.get("content"):
            contents.append({"role": role, "parts": [{"text": h["content"]}]})
    contents.append({"role": "user", "parts": [{"text": msg}]})
    payload = json.dumps({
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": contents,
        "generationConfig": {"maxOutputTokens": 500, "temperature": 0.7}
    }).encode()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    try:
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=20, context=SSL_CONTEXT) as r:
            data = json.loads(r.read())
            return data["candidates"][0]["content"]["parts"][0]["text"].strip(), "gemini-2.0-flash"
    except Exception as e:
        return None, str(e)[:40]

def call_claude(msg, hist):
    if not ANTHROPIC_API_KEY:
        return None, "no_key"
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        messages = []
        for h in hist[-8:]:
            if h.get("role") in ("user","assistant") and h.get("content"):
                messages.append({"role": h["role"], "content": h["content"]})
        messages.append({"role": "user", "content": msg})
        resp = client.messages.create(model="claude-haiku-4-5", max_tokens=500,
                                       system=SYSTEM_PROMPT, messages=messages)
        return resp.content[0].text, "claude-haiku-4-5"
    except Exception as e:
        return None, str(e)[:40]

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_GET(self):
        # Health check for Railway
        self._out(200, {"status": "ok", "service": "Waqas AI ChatBot"})
    def do_POST(self):
        if self.path != "/chat":
            self.send_response(404); self.end_headers(); return
        try:
            data = json.loads(self.rfile.read(int(self.headers.get("Content-Length",0))))
            msg = data.get("message","").strip()
            hist = data.get("history",[])
        except:
            self._out(400, {"error":"bad json"}); return
        if not msg:
            self._out(400, {"error":"empty"}); return

        reply, model = None, "fallback"
        if GROQ_API_KEY:
            reply, model = call_groq(msg, hist)
            if not reply:
                print(f"  ⚠️  Groq failed: {model}")
        if not reply and GEMINI_API_KEY:
            reply, model = call_gemini(msg, hist)
        if not reply and ANTHROPIC_API_KEY:
            reply, model = call_claude(msg, hist)
        if not reply:
            reply, model = smart_reply(msg), "smart-fallback"

        print(f"  [{model}] {msg[:50]}")
        self._out(200, {"reply": reply, "model": model})

    def _cors(self):
        for h,v in [("Access-Control-Allow-Origin","*"),
                    ("Access-Control-Allow-Methods","POST,OPTIONS"),
                    ("Access-Control-Allow-Headers","Content-Type")]:
            self.send_header(h,v)
    def _out(self, status, data):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type","application/json")
        self.send_header("Content-Length",str(len(body)))
        self._cors(); self.end_headers(); self.wfile.write(body)

def main():
    # Railway uses PORT env var, local uses 3001
    port = int(os.environ.get("PORT", os.environ.get("CHAT_PORT", 3001)))
    host = "0.0.0.0"  # must bind to 0.0.0.0 for Railway
    if GROQ_API_KEY:     mode = f"Groq Llama3 FREE ✅  ({GROQ_API_KEY[:8]}...)"
    elif GEMINI_API_KEY: mode = f"Gemini FREE ✅  ({GEMINI_API_KEY[:8]}...)"
    elif ANTHROPIC_API_KEY: mode = f"Claude ✅  ({ANTHROPIC_API_KEY[:8]}...)"
    else: mode = "Smart Fallback ⚡ (add GROQ_API_KEY for real AI)"
    print(f"""
╔══════════════════════════════════════════════════════════╗
║   Waqas AI ChatBot — http://localhost:{port}               ║
║   {mode:<54} ║
╠══════════════════════════════════════════════════════════╣
║  GET FREE GROQ KEY (2 min, no credit card):              ║
║  1. https://console.groq.com → Sign up free             ║
║  2. API Keys → Create API Key                           ║
║  3. export GROQ_API_KEY=gsk_... && python3 chat_api.py  ║
╚══════════════════════════════════════════════════════════╝
""")
    print(f"  Server starting on {host}:{port}")
    HTTPServer((host, port), Handler).serve_forever()

if __name__ == "__main__":
    main()
