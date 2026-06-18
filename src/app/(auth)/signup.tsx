import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useForm } from '@/hooks/useForm';
import { signupSchema, SignupFormData } from '@/utils/validation';
import { useToast } from '@/components/ui/Toast';

export default function SignupScreen() {
  const { colors } = useTheme();
  const { signup, isLoading } = useAuth();
  const { showToast } = useToast();
  const { top } = useSafeAreaInsets();
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>(signupSchema);

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      showToast('Account created! Check your email to verify.', 'success');
      router.replace('/(auth)/verify-email');
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Signup failed', 'error');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: top + 20 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring' }}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colors.foreground }]}>Create account</Text>
          <Text style={[styles.subtitle, { color: colors.foregroundMuted }]}>
            Join thousands of builders using LaunchPilot
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 100 }}
          style={styles.form}
        >
          <Controller control={control} name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Full Name" placeholder="John Doe" leftIcon="user"
                value={value} onChangeText={onChange} onBlur={onBlur}
                error={errors.name?.message} />
            )} />

          <Controller control={control} name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Email" placeholder="you@example.com" keyboardType="email-address"
                autoCapitalize="none" leftIcon="mail" value={value}
                onChangeText={onChange} onBlur={onBlur} error={errors.email?.message} />
            )} />

          <Controller control={control} name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Password" placeholder="Min 8 chars" leftIcon="lock"
                isPassword value={value} onChangeText={onChange} onBlur={onBlur}
                error={errors.password?.message} />
            )} />

          <Controller control={control} name="confirm_password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Confirm Password" placeholder="Repeat password" leftIcon="lock"
                isPassword value={value} onChangeText={onChange} onBlur={onBlur}
                error={errors.confirm_password?.message} />
            )} />

          <Button label="Create Account" onPress={handleSubmit(onSubmit)}
            isLoading={isLoading} fullWidth size="lg" />
        </MotiView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.foregroundMuted }]}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable><Text style={[styles.footerLink, { color: colors.accent }]}>Sign in</Text></Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  backBtn: { marginBottom: 24, width: 40, height: 40, justifyContent: 'center' },
  header: { gap: 8, marginBottom: 32 },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular' },
  form: { gap: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  footerLink: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
