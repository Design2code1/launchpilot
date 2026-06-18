import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNotificationStore } from '@/store/notificationStore';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { EmptyState } from '@/components/ui/EmptyState';
import { radius } from '@/theme/spacing';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();

  const handleMarkAll = () => {
    markAllAsRead();
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'success': return { name: 'check-circle' as const, color: colors.success };
      case 'warning': return { name: 'alert-triangle' as const, color: colors.warning };
      case 'alert': return { name: 'alert-circle' as const, color: colors.destructive };
      case 'info':
      default:
        return { name: 'info' as const, color: colors.info };
    }
  };

  const markAllAction = notifications.some((n) => !n.read) ? (
    <Pressable onPress={handleMarkAll} style={styles.actionBtn}>
      <Text style={[styles.actionText, { color: colors.accent }]}>Clear All</Text>
    </Pressable>
  ) : undefined;

  return (
    <ScreenWrapper scrollable>
      <Header title="Alerts" rightAction={markAllAction} />

      <View style={styles.content}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              icon="bell-off"
              title="All caught up!"
              description="No new updates or alerts at the moment."
            />
          </View>
        ) : (
          <View style={styles.list}>
            {notifications.map((item) => {
              const iconConfig = getIconForType(item.type);
              return (
                <Pressable
                  key={item.id}
                  onPress={() => markAsRead(item.id)}
                  style={[
                    styles.item,
                    {
                      backgroundColor: colors.surface,
                      borderColor: item.read ? colors.borderSubtle : colors.accent,
                    },
                  ]}
                >
                  <View style={[styles.iconWrap, { backgroundColor: colors.surface2 }]}>
                    <Feather name={iconConfig.name} size={18} color={iconConfig.color} />
                  </View>
                  <View style={styles.itemBody}>
                    <View style={styles.itemHeader}>
                      <Text style={[styles.itemTitle, { color: colors.foreground }]}>{item.title}</Text>
                      {!item.read && <View style={[styles.dot, { backgroundColor: colors.accent }]} />}
                    </View>
                    <Text style={[styles.itemText, { color: colors.foregroundMuted }]}>{item.body}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  actionBtn: {
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  emptyContainer: {
    marginTop: 100,
  },
  list: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
});
