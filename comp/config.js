
module.exports = {
  TOKEN: process.env.TOKEN,
  API_URL: (process.env.MODE=="development")?"http://localhost:3000/chat":`${process.env.API_URL}/chat`,
  DEFAULT_MODEL: process.env.DEFAULT_MODEL,
  MAX_HISTORY_LENGTH: 30
};