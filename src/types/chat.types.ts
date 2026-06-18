export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  created_at: string;
  isStreaming?: boolean;
  error?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
}
