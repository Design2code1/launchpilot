import axios from 'axios';
import { ENV } from '@/config/env';
import { ChatMessage } from '@/types/chat.types';
import { generateId } from '@/utils/format';

/**
 * AI Chat Service — OpenAI-compatible.
 * Replace EXPO_PUBLIC_AI_API_URL and add your API key to use any provider.
 */

const MOCK_RESPONSES = [
  "That's a great question! Based on your requirements, I'd recommend starting with a modular architecture that separates concerns clearly.",
  "Absolutely! Here's how you can approach this: First, define your data models, then build your service layer, and finally connect it to your UI.",
  "I've analyzed your request. The best approach would be to use Zustand for state management combined with React Query for server state.",
  "Great idea! For a SaaS application, I'd suggest implementing a subscription-based model with tiered features.",
  "Based on industry best practices, you should prioritize user experience, security, and scalability from the beginning.",
];

export const aiService = {
  async sendMessage(
    messages: ChatMessage[],
    useMock = true
  ): Promise<ChatMessage> {
    // Mock mode — returns a realistic response without requiring API key
    if (useMock || !ENV.AI_API_URL) {
      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
      return {
        id: generateId(),
        role: 'assistant',
        content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
        created_at: new Date().toISOString(),
      };
    }

    // Real mode — OpenAI-compatible API
    try {
      const { data } = await axios.post(
        `${ENV.AI_API_URL}/chat/completions`,
        {
          model: 'gpt-3.5-turbo',
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );
      const choice = data.choices[0];
      return {
        id: generateId(),
        role: 'assistant',
        content: choice.message.content,
        created_at: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error('AI service unavailable. Please try again.');
    }
  },
};
