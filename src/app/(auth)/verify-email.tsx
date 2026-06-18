import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

export default function VerifyEmailScreen() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: top + 48 }]}>
      <MotiView from={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }} style={styles.content}>
        <MotiView
          from={{ rotate: '-10deg' }} animate={{ rotate: '0deg' }}
          transition={{ type: 'spring', delay: 200 }}
          style={[styles.iconWrap, { backgroundColor: colors.infoBg }]}
        >
          <Feather name="mail" size={40} color={colors.info} />
        </MotiView>
        <Text style={[styles.title, { color: colors.foreground }]}>Verify your email</Text>
        <Text style={[styles.subtitle, { color: colors.foregroundMuted }]}>
          We sent a verification link to your email. Click it to activate your account.
        </Text>
        <View style={styles.actions}>
          <Button label="Open Email App" onPress={() => {}} fullWidth size="lg" />
          <Button label="Back to Login" onPress={() => router.replace('/(auth)/login')}
            variant="ghost" fullWidth size="md" />
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  content: { alignItems: 'center', gap: 16 },
  iconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', letterSpacing: -0.3, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 24, maxWidth: 280 },
  actions: { width: '100%', gap: 8, marginTop: 16 },
});
