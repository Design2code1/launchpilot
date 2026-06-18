import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { haptics } from '@/utils/haptics';

export function ThemeToggle() {
  const { isDark, toggle, colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    haptics.selection();
    scale.value = withSpring(0.85, { damping: 10, stiffness: 200 }, () => {
      scale.value = withSpring(1);
    });
    toggle();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Animated.View
        style={[
          styles.btn,
          { backgroundColor: colors.surface, borderColor: colors.border },
          animatedStyle,
        ]}
      >
        <Feather
          name={isDark ? 'moon' : 'sun'}
          size={18}
          color={isDark ? colors.accent : colors.warning}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
