#!/bin/bash
# ╔══════════════════════════════════════════════════════════════╗
# ║       Waqas AI ChatBot Server — One-Click Launcher           ║
# ╚══════════════════════════════════════════════════════════════╝
#
# SETUP (one time):
# 1. Go to https://console.anthropic.com  → sign up FREE
# 2. Click "API Keys" → Create Key → Copy it
# 3. Paste your key below between the quotes on line 15
# 4. Save this file → double-click to start
#
# FREE TIER: $5 credit = ~500,000 chatbot messages with claude-haiku-4-5
# ──────────────────────────────────────────────────────────────────────

export ANTHROPIC_API_KEY=""

# ──────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$ANTHROPIC_API_KEY" ]; then
  osascript <<'EOF'
display dialog "⚙️ First-Time Setup Required

To activate your AI ChatBot:

1️⃣  Go to: https://console.anthropic.com
2️⃣  Sign up FREE (takes 2 minutes)
3️⃣  Click API Keys → Create Key
4️⃣  Copy your key (starts with sk-ant-...)
5️⃣  Open this file in TextEdit
6️⃣  Paste key on line 15 between the \"\"
7️⃣  Save → double-click again

FREE tier gives $5 credit ≈ 500,000 messages!" buttons {"Open Console", "Cancel"} default button "Open Console" with title "Waqas AI ChatBot Setup"
EOF
  open "https://console.anthropic.com"
  exit 0
fi

# Kill any existing chat server
lsof -ti :3001 | xargs kill -9 2>/dev/null
sleep 1

# Start the server in background
cd "$SCRIPT_DIR"
python3 chat_api.py &
SERVER_PID=$!

# Wait for server to be ready
for i in {1..5}; do
  sleep 1
  if curl -s http://localhost:3001/chat -X POST \
    -H "Content-Type: application/json" \
    -d '{"message":"ping","history":[]}' | grep -q "reply"; then
    break
  fi
done

# Show status
STATUS=$(curl -s http://localhost:3001/chat -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"ping","history":[]}' 2>/dev/null | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('model','unknown'))" 2>/dev/null)

if [[ "$STATUS" == "claude"* ]]; then
  osascript -e 'display notification "✅ Waqas AI ChatBot is ONLINE\nPowered by Claude AI 🤖" with title "ChatBot Running"'
  echo "✅ ChatBot online — Model: $STATUS"
else
  osascript -e 'display notification "⚠️ ChatBot started but check your API key" with title "ChatBot Warning"'
  echo "⚠️  ChatBot started — Status: $STATUS"
fi

echo "Server PID: $SERVER_PID"
echo "Open: http://localhost:3000 → click the chatbot icon"
echo "Press Ctrl+C to stop"

wait $SERVER_PID
