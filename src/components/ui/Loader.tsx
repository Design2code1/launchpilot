import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoaderProps {
  fullScreen?: boolean;
  label?: string;
  size?: 'small' | 'large';
}

export function Loader({ fullScreen = false, label, size = 'large' }: LoaderProps) {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={colors.accent} />
        {label && <Text style={[styles.label, { color: colors.foregroundMuted }]}>{label}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size={size} color={colors.accent} />
      {label && <Text style={[styles.label, { color: colors.foregroundMuted }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  inline: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
