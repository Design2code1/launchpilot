import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { haptics } from '@/utils/haptics';
import { radius } from '@/theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 20, stiffness: 300 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
  };
  const handlePress = () => {
    haptics.light();
    onPress();
  };

  const isDisabled = disabled || isLoading;

  const containerStyle: ViewStyle = {
    ...styles.base,
    ...sizeStyles[size],
    ...getVariantStyle(variant, colors),
    ...(fullWidth && styles.fullWidth),
    ...(isDisabled && styles.disabled),
    ...style,
  };

  const labelStyle: TextStyle = {
    ...styles.label,
    ...labelSizeStyles[size],
    ...getLabelVariantStyle(variant, colors),
    ...textStyle,
  };

  return (
    <AnimatedPressable
      style={[containerStyle, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' ? '#FFFFFF' : colors.accent
          }
        />
      ) : (
        <>
          {leftIcon}
          <Text style={labelStyle}>{label}</Text>
          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
}

function getVariantStyle(variant: ButtonVariant, colors: ReturnType<typeof useTheme>['colors']): ViewStyle {
  switch (variant) {
    case 'primary':
      return { backgroundColor: colors.accent };
    case 'secondary':
      return { backgroundColor: colors.surface };
    case 'ghost':
      return { backgroundColor: 'transparent' };
    case 'destructive':
      return { backgroundColor: colors.destructive };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      };
  }
}

function getLabelVariantStyle(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>['colors']
): TextStyle {
  switch (variant) {
    case 'primary':
      return { color: '#FFFFFF' };
    case 'secondary':
      return { color: colors.foreground };
    case 'ghost':
      return { color: colors.accent };
    case 'destructive':
      return { color: '#FFFFFF' };
    case 'outline':
      return { color: colors.foreground };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    gap: 8,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  label: {
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.1,
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: 8, paddingHorizontal: 14, minHeight: 36 },
  md: { paddingVertical: 13, paddingHorizontal: 20, minHeight: 48 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, minHeight: 56 },
};

const labelSizeStyles: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 16 },
};
