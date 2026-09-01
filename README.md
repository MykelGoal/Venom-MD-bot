# VENOM MD

> **Real commands. No hidden remote-code loader.**

VENOM MD is distributed here as one local, minified runtime bundle. This keeps this public deployment repository compact while the readable development source is maintained separately. The bundle does **not** download or execute remote JavaScript.

## Deploy in minutes

1. Get your session ID from the official VENOM MD pairing page.
2. Deploy this repository on Render or your preferred Node.js host.
3. Set these two environment variables:

| Variable | Required | Example |
|---|---:|---|
| `SESSION_ID` | Yes | `VENOM-XXXX-XXXX` |
| `OWNER_NUMBER` | Yes | `2348012345678` |

The bot needs Node.js 20+ and starts with `npm start`.

## Local setup

```bash
git clone <YOUR-PUBLIC-REPOSITORY-URL>
cd Venom-MD-Public
cp .env.example .env
# Set SESSION_ID and OWNER_NUMBER in .env
npm install
npm start
```

## Verify before deploying

```bash
npm install
npm run validate:bundle
```

This confirms the local bundle loads its complete command registry without opening a WhatsApp connection.

## Links

- Source and updates: https://github.com/MykelGoal/Venom-MD-bot
- YouTube: https://youtube.com/@venommdbot
- WhatsApp channel: https://whatsapp.com/channel/0029Vb8bQew4dTnRwa7hlw2V

Use a secondary WhatsApp number and follow WhatsApp’s terms. Do not commit session files or API keys.
