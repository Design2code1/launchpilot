import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <Header title="Profile" showBack />

      <View style={styles.content}>
        {/* Profile Card */}
        <View style={styles.avatarWrap}>
          <Avatar uri={user?.avatar_url} name={user?.name ?? 'Builder'} size={96} />
          <Text style={[styles.name, { color: colors.foreground }]}>{user?.name ?? 'Developer'}</Text>
          <Text style={[styles.email, { color: colors.foregroundMuted }]}>{user?.email ?? 'dev@launchpilot.dev'}</Text>
        </View>

        {/* Bio */}
        <Card style={styles.card}>
          <Text style={[styles.title, { color: colors.foreground }]}>Biography</Text>
          <Text style={[styles.bioText, { color: colors.foregroundMuted }]}>
            {user?.bio ?? 'No bio provided. Write a short snippet in edit profile.'}
          </Text>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            label="Edit Profile"
            onPress={() => router.push('/profile/edit')}
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
    marginTop: 16,
  },
  email: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  card: {
    width: '100%',
    marginBottom: 32,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 13.5,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  actions: {
    width: '100%',
  },
});
