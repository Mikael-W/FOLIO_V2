export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type AIActionType = 'switchTheme' | 'switchLanguage' | 'downloadCV';

export type AIAction = {
  type: AIActionType;
  payload?: string;
};

export type AIResponse = {
  reply?: string;
  action?: AIAction;
};
