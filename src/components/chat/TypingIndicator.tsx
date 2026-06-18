import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

export function TypingIndicator() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Dot index={0} color={colors.foregroundSubtle} />
      <Dot index={1} color={colors.foregroundSubtle} />
      <Dot index={2} color={colors.foregroundSubtle} />
    </View>
  );
}

function Dot({ index, color }: { index: number; color: string }) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withDelay(
      index * 150,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return <Animated.View style={[styles.dot, { backgroundColor: color }, animStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginVertical: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
