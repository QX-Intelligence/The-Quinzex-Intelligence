// ─────────────────────────────────────────────
// Quinzex Intelligence — AI Assistant Config
// ─────────────────────────────────────────────
// 1. Go to https://aistudio.google.com
// 2. Click "Get API Key" → Create API key (free, no billing required)
// 3. Paste it below and set enableAI to true
// ─────────────────────────────────────────────

export const aiConfig = {
  // Paste your Gemini API key here
  geminiApiKey: 'AIzaSyCZVDMmeCoajFr4twjVjGqBJCRVmhSsTmQ',

  // Set to true once you have a key. When false the bot uses smart canned responses.
  enableAI: true,

  // Model to use
  model: 'gemini-2.5-flash',

  // Bot persona name shown in the UI
  botName: 'ARIA',

  // Subtitle shown under the bot name
  botSubtitle: 'QI Assistant',
};
