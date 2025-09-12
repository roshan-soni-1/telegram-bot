const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "chat.log");

function escapeMarkdown(text) {
  if (!text) return "";
   return text
//   return text
//     .replace(/\*/g, "\\*")
//     .replace(/_/g, "\\_")
//     .replace(/\[/g, "\\[")
//     .replace(/\]/g, "\\]")
//     .replace(/\(/g, "\\(")
//     .replace(/\)/g, "\\)");
}

function logEvent(type, chatId, content, username = "unknown") {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${type}] [Chat:${chatId}] [User:${username}] ${content}\n`;

  fs.appendFile(logFile, logLine, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}

module.exports = { escapeMarkdown, logEvent };