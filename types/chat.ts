export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type AIActionType = 'switchTheme' | 'switchLanguage' | 'downloadCV' | null;

export interface AIAction {
  type: AIActionType;
  payload?: string | null;
}

export interface AIResponse {
  reply: string;
  action: AIAction;
}

export interface ChatRequestBody {
  messages?: ChatMessage[];
  locale?: string;
  colorMode?: string;
}
