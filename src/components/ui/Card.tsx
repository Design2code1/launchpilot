import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { radius } from '@/theme/spacing';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'surface2' | 'outline';
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', onPress, style }: CardProps) {
  const { colors, shadow } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'surface2':
        return {
          backgroundColor: colors.surface2,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          ...shadow.sm,
        };
    }
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.card, getVariantStyles(), style]}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, getVariantStyles(), style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: 16,
    overflow: 'hidden',
  },
});
