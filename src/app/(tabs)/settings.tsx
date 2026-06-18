import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { radius } from '@/theme/spacing';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const getPlanBadgeVariant = (plan: string) => {
    if (plan === 'pro') return 'accent' as const;
    if (plan === 'team') return 'success' as const;
    return 'muted' as const;
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Settings" />

      <View style={styles.content}>
        {/* Profile Card */}
        <Card style={styles.profileCard} onPress={() => router.push('/profile')}>
          <Avatar uri={user?.avatar_url} name={user?.name ?? 'Builder'} size={56} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground }]}>
              {user?.name ?? 'SaaS Developer'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.foregroundMuted }]}>
              {user?.email ?? 'dev@launchpilot.dev'}
            </Text>
            <View style={styles.badgeWrap}>
              <Badge label={user?.plan ?? 'free'} variant={getPlanBadgeVariant(user?.plan ?? 'free')} />
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={colors.foregroundSubtle} />
        </Card>

        {/* Section: Customization */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Preferences</Text>
        <Card style={styles.menuCard}>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="sliders" size={18} color={colors.foregroundSubtle} />
              <Text style={[styles.menuText, { color: colors.foreground }]}>Appearance</Text>
            </View>
            <ThemeToggle />
          </View>
        </Card>

        {/* Section: Account Actions */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Account</Text>
        <Card style={styles.menuCard}>
          <Pressable style={styles.menuItem} onPress={() => router.push('/profile/edit')}>
            <View style={styles.menuItemLeft}>
              <Feather name="edit-2" size={18} color={colors.foregroundSubtle} />
              <Text style={[styles.menuText, { color: colors.foreground }]}>Edit Profile</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.foregroundSubtle} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => router.push('/payments/plans')}>
            <View style={styles.menuItemLeft}>
              <Feather name="credit-card" size={18} color={colors.foregroundSubtle} />
              <Text style={[styles.menuText, { color: colors.foreground }]}>Subscription Plans</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.foregroundSubtle} />
          </Pressable>
        </Card>

        {/* Logout Button */}
        <Pressable
          style={[styles.logoutBtn, { backgroundColor: colors.surface2, borderColor: colors.borderSubtle }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Log Out</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  badgeWrap: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    marginBottom: 24,
    paddingVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
});
