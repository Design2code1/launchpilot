import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import { Avatar } from '@/components/ui/Avatar';

const MOCK_ACTIVITIES = [
  { id: '1', title: 'Plan updated to Pro', description: 'Your subscription was updated to Pro tier.', time: new Date().toISOString(), icon: 'credit-card' as const },
  { id: '2', title: 'New chat initiated', description: 'You started a conversation with AI assistant.', time: new Date(Date.now() - 3600000).toISOString(), icon: 'message-square' as const },
  { id: '3', title: 'Profile updated', description: 'Updated bio and credentials.', time: new Date(Date.now() - 7200000).toISOString(), icon: 'user' as const },
];

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const headerRight = (
    <Avatar
      uri={user?.avatar_url}
      name={user?.name ?? 'Developer'}
      size={32}
      onImagePicked={() => router.push('/profile')}
    />
  );

  return (
    <ScreenWrapper scrollable refreshing={refreshing} onRefresh={handleRefresh}>
      <Header title="Dashboard" rightAction={headerRight} />

      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: colors.foreground }]}>
            Welcome back, {user?.name?.split(' ')[0] ?? 'Builder'}!
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.foregroundMuted }]}>
            Here is your SaaS workspace overview.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.grid}>
          <StatsCard title="AI Usage" value="12 / 100" change="+12%" trend="up" icon="message-square" />
          <StatsCard title="Storage" value="0.2 GB" change="10% Limit" trend="neutral" icon="hard-drive" />
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          <QuickAction title="Chat with AI" icon="cpu" onPress={() => router.push('/(tabs)/chat')} />
          <QuickAction title="View Plans" icon="credit-card" onPress={() => router.push('/payments/plans')} />
        </View>

        {/* Recent Activity */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Updates</Text>
        <View style={[styles.activityList, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {MOCK_ACTIVITIES.map((item) => (
            <ActivityItem
              key={item.id}
              title={item.title}
              description={item.description}
              time={item.time}
              icon={item.icon}
            />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  activityList: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});
