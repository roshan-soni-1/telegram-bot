# 🤖✨ Telegram AI Model Selector Bot

![Node.js](https://img.shields.io/badge/Node.js-v18-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)


A Node.js Telegram bot that lets users choose AI providers and models via inline buttons, and also responds to messages like greetings.

---
## Table of Contents

- [features](#features)
- [requirement](#requirement)
- [installation](#installation)
- [file overview](#file-overview)
- [debugging](#debugging)
---


# 🚀 Features

🏁 /start — Welcome message.

🧩 /model — Select AI providers and models.

🎛️ Inline buttons for providers and models.

💬 Responds to messages like "hii" or "hi".

📝 Console logs all interactions for debugging.

---

> 🛠️ Requirements

 ⚡ Node.js >= 18

 📦 npm

---

# 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/roshan-soni-1/telegram-bot
```
```bash
cd telegram-bot
```
2. Install dependencies:
```bash
npm install node-telegram-bot-api
```

3. Create a bot via `BotFather` and get your bot token.

4. Update your token in .env:

```bash
const TOKEN = 'YOUR_FULL_BOT_TOKEN';
```

---
# env file setup
```txt
const TOKEN = 'YOUR_FULL_BOT_TOKEN';
MODE=development
API_URL=https://yourapiurl
DEFAULT_MODEL=llama-3.1-8b-instant
```

## install backend 

To run this bot you need to install [this repository](https://github.com/roshan-soni-1/chatbot-backend).

1. clone backend repository
```bash
git clone https://github.com/roshan-soni-1/chatbot-backend
```
2. start backend server 
```bash
npm start
```


🏃 Usage

Run the bot:

node index.js

In Telegram:

1. Send `/start` to the bot.

2. Use `/model` to pick a provider.

3. Click inline buttons to select a model.

4. Say "hii" or "hi" and the bot will reply.

---

# 📂 file-overview

cbot.js — Main bot logic

package.json — Dependencies

---

* 🔍 Debugging

Logs all user messages and callback queries.

Tracks chat IDs, selected providers, and models.

---

💡 Notes

✅ Selected provider shows a checkmark automatically.

model_ prefix is used for model buttons to handle callbacks correctly.

> Ensure your bot token is valid to avoid *ETELEGRAM: 404 Not Found*.

---

📜 License

MIT License

---

👤 Author

Roshan Soni

📨 Contact: Telegram handle or email if needed