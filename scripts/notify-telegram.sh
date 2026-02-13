#!/bin/sh

# Default variable values (can be overridden by environment)
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN:-""}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID:-""}

# Try to load from .env if variables are empty
if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  if [ -f .env ]; then
    # Load .env variables, ignoring comments and empty lines
    export $(grep -v '^#' .env | xargs)
  fi
fi

if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo "::warning::TELEGRAM_BOT_TOKEN is missing. Skipping notification."
  exit 0
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo "::warning::TELEGRAM_CHAT_ID is missing. Skipping notification."
  exit 0
fi

# Get commit info
COMMIT_MSG=$(git log -1 --pretty=%B)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
AUTHOR=$(git log -1 --pretty=%an)
SHA=$(git log -1 --pretty=%h)

# Get stats
FILES_CHANGED=$(git diff-tree --no-commit-id --name-only -r HEAD | wc -l | xargs)
ADDITIONS=$(git show --stat HEAD | tail -1 | grep -oE '[0-9]+ insertion' | grep -oE '[0-9]+' || echo "0")
DELETIONS=$(git show --stat HEAD | tail -1 | grep -oE '[0-9]+ deletion' | grep -oE '[0-9]+' || echo "0")

# Truncate commit message
if [ ${#COMMIT_MSG} -gt 100 ]; then
  COMMIT_MSG="${COMMIT_MSG:0:100}..."
fi

# Build message
MESSAGE=$(printf "🚀 *BuildPCBs EDA Update*\n\n\`%s\`\n\n🌿 \`%s\` • 👤 %s\n📊 %s files • +%s -%s" \
  "$COMMIT_MSG" \
  "$BRANCH" \
  "$AUTHOR" \
  "$FILES_CHANGED" \
  "$ADDITIONS" \
  "$DELETIONS")

KEYBOARD='{"inline_keyboard":[[{"text":"📝 View Commit","url":"https://github.com/BuildPCBs/buildpcbs-eda/commit/'$SHA'"},{"text":"📂 Repository","url":"https://github.com/BuildPCBs/buildpcbs-eda"}]]}'

# JSON Escape (imperfect but works for most cases without jq dependency)
# Using python if available for safer escaping, else raw string
if command -v python3 >/dev/null 2>&1; then
  ESCAPED_MESSAGE=$(python3 -c "import json, sys; print(json.dumps(sys.argv[1]))" "$MESSAGE")
else
  # Fallback: basic escaping for double quotes
  ESCAPED_MESSAGE="\"${MESSAGE//\"/\\\"}\""
fi

# Send to Telegram
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\":\"${TELEGRAM_CHAT_ID}\",\"text\":${ESCAPED_MESSAGE},\"parse_mode\":\"Markdown\",\"reply_markup\":${KEYBOARD},\"disable_web_page_preview\":true}"

echo "✅ Telegram notification sent!"
