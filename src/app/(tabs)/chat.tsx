import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useChatStore } from '@/store/chatStore';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { PromptInput } from '@/components/chat/PromptInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ChatScreen() {
  const { colors } = useTheme();
  const { activeSession, sendMessage, isTyping, startNewSession } = useChatStore();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!activeSession) {
      startNewSession();
    }
  }, []);

  const handleSend = async (text: string) => {
    await sendMessage(text);
  };

  const messages = activeSession?.messages ?? [];

  return (
    <ScreenWrapper>
      <Header title="AI Chat" />

      <View style={styles.container}>
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              icon="cpu"
              title="Say Hello to LaunchPilot AI"
              description="Ask questions about your project, analyze code segments, or map architectures."
            />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageBubble
                content={item.content}
                role={item.role === 'assistant' ? 'assistant' : 'user'}
                timestamp={item.created_at}
              />
            )}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        {isTyping && (
          <View style={styles.indicatorContainer}>
            <TypingIndicator />
          </View>
        )}

        <PromptInput onSend={handleSend} isLoading={isTyping} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  indicatorContainer: {
    paddingLeft: 16,
    paddingBottom: 4,
  },
});
