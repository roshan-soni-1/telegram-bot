const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { escapeMarkdown, logEvent } = require("./utils");
const { userHistory, initializeUser, trimHistory } = require("./state");
const { DEFAULT_MODEL } = require("./config");
const { getProviders } = require("./providers");
const { handleModelSelection } = require("./keyboards");

function registerHandlers(bot) {
  // Handle model selection (inline keyboard callback)
  bot.on("callback_query", (query) => {
    handleModelSelection(bot, query, getProviders(), userHistory);
  });

  // Handle user messages
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text?.startsWith("/") || !msg.text?.trim()) return;

    const username = msg.from?.username || msg.from?.first_name || "unknown";
    initializeUser(chatId, getProviders(), username);
    userHistory[chatId].username = username;

    const userMessage = msg.text.trim();
    logEvent("USER_MESSAGE", chatId, userMessage, username);

    bot.sendChatAction(chatId, "typing");

    try {
      trimHistory(chatId);
      const history = userHistory[chatId];
      history.messages.push({ role: "user", content: userMessage });

      const model = history.selectedModel || DEFAULT_MODEL;

      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: history.messages }),
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);

      const aiResponse = await response.text();

      const safeResponse = escapeMarkdown(aiResponse);
      await bot.sendMessage(chatId, safeResponse, { parse_mode: "Markdown" });

      logEvent("AI_RESPONSE", chatId, aiResponse.substring(0, 100) + "...", username);
      history.messages.push({ role: "assistant", content: aiResponse });
    } catch (err) {
      console.error("Error processing message:", err);
      bot.sendMessage(chatId, "⚠️ Sorry, something went wrong.");
      logEvent("ERROR", chatId, err.message, username);
    }
  });
}

module.exports = { registerHandlers };