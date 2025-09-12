const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("./comp/config");
const { loadProviders } = require("./comp/providers");
const { registerCommands } = require("./comp/commands");
const { registerHandlers } = require("./comp/handlers");

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("polling_error", (err) => {
  console.error("Polling error:", err.code, err.response?.body || err.message);
});
// pass bot into modules

(async () => {
  await loadProviders();
  setInterval(loadProviders, 60000);

  registerCommands(bot);
  registerHandlers(bot);

  console.log("🤖 Telegram bot started successfully!");
})();

process.on("SIGINT", () => {
  console.log("Shutting down bot...");
  bot.stopPolling();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Shutting down bot...");
  bot.stopPolling();
  process.exit(0);
});