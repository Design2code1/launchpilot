import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type BadgeVariant = 'success' | 'warning' | 'destructive' | 'info' | 'accent' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'muted' }: BadgeProps) {
  const { colors } = useTheme();

  const getStyles = () => {
    switch (variant) {
      case 'success':
        return { text: colors.success, bg: colors.successBg };
      case 'warning':
        return { text: colors.warning, bg: colors.warningBg };
      case 'destructive':
        return { text: colors.destructive, bg: colors.destructiveBg };
      case 'info':
        return { text: colors.info, bg: colors.infoBg };
      case 'accent':
        return { text: colors.accent, bg: colors.accentForeground };
      case 'muted':
      default:
        return { text: colors.foregroundMuted, bg: colors.surface };
    }
  };

  const styleConfig = getStyles();

  return (
    <View style={[styles.badge, { backgroundColor: styleConfig.bg }]}>
      <Text style={[styles.text, { color: styleConfig.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
});
