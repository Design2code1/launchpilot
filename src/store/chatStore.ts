import { create } from 'zustand';
import { ChatMessage, ChatSession } from '@/types/chat.types';
import { aiService } from '@/services/aiService';
import { generateId } from '@/utils/format';

interface ChatState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  isTyping: boolean;
  error: string | null;
  // Actions
  startNewSession: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearSession: () => void;
  clearError: () => void;
}

function createSession(): ChatSession {
  return {
    id: generateId(),
    title: 'New Conversation',
    messages: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  activeSession: null,
  isTyping: false,
  error: null,

  startNewSession: () => {
    const session = createSession();
    set((s) => ({
      sessions: [session, ...s.sessions],
      activeSession: session,
    }));
  },

  sendMessage: async (content) => {
    let { activeSession } = get();
    if (!activeSession) {
      const session = createSession();
      set((s) => ({ sessions: [session, ...s.sessions], activeSession: session }));
      activeSession = session;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    // Add user message immediately
    set((s) => ({
      activeSession: s.activeSession
        ? { ...s.activeSession, messages: [...s.activeSession.messages, userMessage] }
        : null,
      isTyping: true,
      error: null,
    }));

    try {
      const allMessages = [...(get().activeSession?.messages ?? []), userMessage];
      const aiResponse = await aiService.sendMessage(allMessages, true);

      set((s) => ({
        activeSession: s.activeSession
          ? { ...s.activeSession, messages: [...s.activeSession.messages, aiResponse] }
          : null,
        isTyping: false,
      }));
    } catch (error) {
      set({
        isTyping: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  },

  clearSession: () => set({ activeSession: null }),
  clearError: () => set({ error: null }),
}));
