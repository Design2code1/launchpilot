import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: keyof typeof Feather.glyphMap;
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  const { colors } = useTheme();

  const getTrendColor = () => {
    if (trend === 'up') return colors.success;
    if (trend === 'down') return colors.destructive;
    return colors.foregroundMuted;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'trending-up';
    if (trend === 'down') return 'trending-down';
    return 'minus';
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foregroundMuted }]}>{title}</Text>
        <Feather name={icon} size={16} color={colors.foregroundSubtle} />
      </View>
      <Text style={[styles.value, { color: colors.foreground }]}>{value}</Text>
      <View style={styles.footer}>
        <Feather name={getTrendIcon()} size={14} color={getTrendColor()} />
        <Text style={[styles.change, { color: getTrendColor() }]}>{change}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12.5,
    fontFamily: 'Inter_500Medium',
  },
  value: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});
