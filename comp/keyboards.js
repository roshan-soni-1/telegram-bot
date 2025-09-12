// keyboards.js
const { escapeMarkdown, logEvent } = require("./utils");

// send provider list
function sendProviderKeyboard(bot, chatId, providers, userHistory, selectedProvider = null) {
  let keyboard = [];
  let message = "";

  if (!selectedProvider) {
    // Show providers
    message = "🔧 *Select AI Provider:*";
    keyboard = Object.entries(providers).map(([key, providerData]) => {
      let text = providerData.name || key;
      if (userHistory[chatId]?.selectedProvider === key) text += " ✅";
      return [{ text, callback_data: `provider_${key}` }];
    });

    if (keyboard.length === 0) {
      bot.sendMessage(chatId, "❌ No providers available. Please check the backend connection.");
      return;
    }
  } else {
    // Show models for selected provider
    const providerData = providers[selectedProvider];
    if (!providerData) {
      bot.sendMessage(chatId, "❌ Provider not found. Please try again.");
      return;
    }

    message = `🤖 *Models for ${providerData.name || selectedProvider}:*`;
    const models = providerData.models || [];
    keyboard = models.map(model => {
      let text = model;
      if (userHistory[chatId]?.selectedModel === model) text += " ✅";
      return [{ text, callback_data: `model_${selectedProvider}::${model}` }];
    });

    // Back button
    keyboard.push([{ text: "← Back to Providers", callback_data: "back_to_providers" }]);
  }

  bot.sendMessage(chatId, escapeMarkdown(message), {
    reply_markup: { inline_keyboard: keyboard },
    parse_mode: "Markdown"
  });
}

// handle button clicks
function handleModelSelection(bot, query, providers, userHistory) {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "back_to_providers") {
    sendProviderKeyboard(bot, chatId, providers, userHistory);
  } else if (data.startsWith("provider_")) {
    const provider = data.replace("provider_", "");
    userHistory[chatId].selectedProvider = provider;
    sendProviderKeyboard(bot, chatId, providers, userHistory, provider);
  } else if (data.startsWith("model_")) {
    const [, providerAndModel] = data.split("model_");
    const [provider, model] = providerAndModel.split("::");

    userHistory[chatId].selectedProvider = provider;
    userHistory[chatId].selectedModel = model;

    const successMessage = `✅ *Model Updated*\n\nProvider: ${provider}\nModel: ${model}`;
    bot.sendMessage(chatId, escapeMarkdown(successMessage), { parse_mode: "Markdown" });
    logEvent("MODEL_CHANGE", chatId, `${provider} -> ${model}`);
  }

  bot.answerCallbackQuery(query.id);
}

module.exports = { sendProviderKeyboard, handleModelSelection };