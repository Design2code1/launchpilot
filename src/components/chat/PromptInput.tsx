import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { haptics } from '@/utils/haptics';

interface PromptInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PromptInput({ onSend, placeholder = 'Type message...', isLoading = false }: PromptInputProps) {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const [text, setText] = useState('');

  const scale = useSharedValue(1);

  const handleSend = () => {
    if (!text.trim() || isLoading) return;
    haptics.success();
    onSend(text.trim());
    setText('');
  };

  const handlePressIn = () => {
    if (text.trim().length > 0 && !isLoading) {
      scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const sendAnim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const canSend = text.trim().length > 0 && !isLoading;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.borderSubtle,
          paddingBottom: bottom + 8,
        },
      ]}
    >
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.foreground }]}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          multiline
          maxLength={2000}
          returnKeyType="default"
        />
        <AnimatedPressable
          onPress={handleSend}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!canSend}
          style={[
            styles.sendBtn,
            { backgroundColor: canSend ? colors.accent : colors.surface2 },
            sendAnim,
          ]}
          accessibilityLabel="Send message"
        >
          <Feather
            name="send"
            size={16}
            color={canSend ? '#052E16' : colors.foregroundSubtle}
          />
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderRadius: 18,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    maxHeight: 120,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    maxHeight: 100,
    paddingVertical: Platform.OS === 'ios' ? 6 : 2,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
