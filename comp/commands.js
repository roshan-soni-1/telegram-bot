const { sendProviderKeyboard } = require("./keyboards");
const { logEvent } = require("./utils");
const { initializeUser, userHistory } = require("./state");
const { getProviders } = require("./providers");

function registerCommands(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    initializeUser(chatId, getProviders(), msg.from?.username || msg.from?.first_name);
    logEvent("COMMAND", chatId, "/start invoked");

    const welcomeMessage = `
🤖 *AI Chat Bot*

Welcome! I can help you chat with various AI models.

*Available commands:*
• Send any message to chat with AI
• /model - Choose AI model/provider  
• /clear - Clear conversation history
• /status - Show current model and stats
• /help - Show this help message

*Current model:* ${userHistory[chatId].selectedModel}
    `.trim();

    bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
  });

  bot.onText(/\/model/, (msg) => {
    const chatId = msg.chat.id;
    initializeUser(chatId, getProviders(), msg.from?.username || msg.from?.first_name);
    logEvent("COMMAND", chatId, "/model invoked");

    sendProviderKeyboard(bot, chatId, getProviders(), userHistory);
  });

  bot.onText(/\/test/, (msg) => {
    let message= "*hello*"
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `${message} !`,{ parse_mode: "Markdown" });
  });
  
  bot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    initializeUser(chatId, getProviders(), msg.from?.username || msg.from?.first_name);
    logEvent("COMMAND", chatId, "/status invoked");

    const history = userHistory[chatId];
    const statusMessage = `
*Current Status*

*Provider:* ${history.selectedProvider || "Not selected"}
*Model:* ${history.selectedModel}
*Messages in history:* ${history.messages.length}
*Available providers:* ${Object.keys(getProviders()).length}
    `.trim();

    bot.sendMessage(chatId, statusMessage, { parse_mode: "Markdown" });
  });

  bot.onText(/\/clear/, (msg) => {
    const chatId = msg.chat.id;
    logEvent("COMMAND", chatId, "/clear invoked");

    if (userHistory[chatId]) {
      userHistory[chatId].messages = [];
    } else {
      initializeUser(chatId, getProviders(), msg.from?.username || msg.from?.first_name);
    }

    bot.sendMessage(chatId, "✅ Chat history cleared!");
  });

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    logEvent("COMMAND", chatId, "/help invoked");

    const helpMessage = `
*AI Chat Bot Help*

*Commands:*
• /start - Welcome message
• /model - Select AI model/provider
• /clear - Clear conversation history  
• /status - Show current settings
• /help - Show this help

*Tips:*
• Conversation history is maintained per chat
• History is limited
• Use /clear if you want to start fresh
• Different models have different capabilities
    `.trim();

    bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
  });
}

module.exports = { registerCommands };