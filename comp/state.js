const { DEFAULT_MODEL, MAX_HISTORY_LENGTH } = require("./config");

const userHistory = {}; // chatId → { messages, selectedModel, selectedProvider, username }

function initializeUser(chatId, providers, username = "unknown") {
  if (!userHistory[chatId]) {
    userHistory[chatId] = {
      messages: [],
      selectedModel: DEFAULT_MODEL,
      selectedProvider: Object.keys(providers)[0] || null,
      username
    };
  }
}

function trimHistory(chatId) {
  const history = userHistory[chatId];
  if (history && history.messages.length > MAX_HISTORY_LENGTH) {
    history.messages = history.messages.slice(-MAX_HISTORY_LENGTH);
  }
}

module.exports = { userHistory, initializeUser, trimHistory };