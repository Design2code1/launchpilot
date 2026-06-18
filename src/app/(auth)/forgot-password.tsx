import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useForm } from '@/hooks/useForm';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/validation';
import { useToast } from '@/components/ui/Toast';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const { forgotPassword, isLoading } = useAuth();
  const { showToast } = useToast();
  const { top } = useSafeAreaInsets();
  const [sent, setSent] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>(forgotPasswordSchema);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);
      setSent(true);
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Failed to send reset email', 'error');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: top + 20 }]}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Feather name="arrow-left" size={22} color={colors.foreground} />
      </Pressable>

      {!sent ? (
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring' }} style={styles.content}>
          <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
            <Feather name="mail" size={32} color={colors.accent} />
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>Forgot password?</Text>
          <Text style={[styles.subtitle, { color: colors.foregroundMuted }]}>
            Enter your email and we'll send you a reset link.
          </Text>
          <Controller control={control} name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Email" placeholder="you@example.com" keyboardType="email-address"
                autoCapitalize="none" leftIcon="mail" value={value}
                onChangeText={onChange} onBlur={onBlur} error={errors.email?.message}
                containerStyle={{ marginTop: 8 }} />
            )} />
          <Button label="Send Reset Link" onPress={handleSubmit(onSubmit)}
            isLoading={isLoading} fullWidth size="lg" style={{ marginTop: 8 }} />
        </MotiView>
      ) : (
        <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }} style={styles.content}>
          <View style={[styles.iconWrap, { backgroundColor: colors.successBg }]}>
            <Feather name="check-circle" size={32} color={colors.success} />
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>Check your inbox</Text>
          <Text style={[styles.subtitle, { color: colors.foregroundMuted }]}>
            We've sent a password reset link to your email address.
          </Text>
          <Button label="Back to Login" onPress={() => router.replace('/(auth)/login')}
            variant="outline" fullWidth size="lg" style={{ marginTop: 16 }} />
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  backBtn: { marginBottom: 32, width: 40, height: 40, justifyContent: 'center' },
  content: { gap: 16, alignItems: 'center' },
  iconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', letterSpacing: -0.3, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 24 },
});
