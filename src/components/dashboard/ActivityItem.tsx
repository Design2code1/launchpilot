import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { formatRelativeTime } from '@/utils/format';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg?: string;
  iconColor?: string;
}

export function ActivityItem({
  title,
  description,
  time,
  icon,
  iconBg,
  iconColor,
}: ActivityItemProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.borderSubtle }]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: iconBg ?? colors.surface2 },
        ]}
      >
        <Feather name={icon} size={16} color={iconColor ?? colors.foregroundMuted} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.foregroundMuted }]} numberOfLines={1}>
          {description}
        </Text>
      </View>
      <Text style={[styles.time, { color: colors.foregroundSubtle }]}>
        {formatRelativeTime(time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 13.5,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  time: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
});
