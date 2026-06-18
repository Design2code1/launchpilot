import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { formatDate } from '@/utils/format';
import { radius } from '@/theme/spacing';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
  const { colors } = useTheme();
  const isUser = role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userRow : styles.aiRow]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.accent, borderBottomRightRadius: radius.sm }
            : { backgroundColor: colors.surface, borderBottomLeftRadius: radius.sm },
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? { color: '#052E16' } : { color: colors.foreground },
          ]}
        >
          {content}
        </Text>
      </View>
      <Text style={[styles.timestamp, { color: colors.foregroundSubtle }]}>
        {formatDate(timestamp, { hour: '2-digit', minute: '2-digit' } as any)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    maxWidth: '80%',
  },
  userRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  aiRow: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.lg,
  },
  text: {
    fontSize: 14.5,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 4,
  },
});
