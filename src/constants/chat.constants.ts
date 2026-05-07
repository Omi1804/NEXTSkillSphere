export const MAX_MESSAGE_LENGTH = 200;
export const MAX_OUTPUT_TOKENS = 350;
export const TOKEN_BUDGET_PER_HOUR = 5000;
export const TOKEN_WINDOW_SECONDS = 60 * 60;
export const STREAM_CHUNK_DELAY_MS = Number(process.env.CHAT_STREAM_DELAY_MS || 25);
