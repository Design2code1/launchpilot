import { supabase } from '@/lib/supabase';
import { LoginPayload, SignupPayload, User } from '@/types/auth.types';

/**
 * Authentication service — Supabase-powered.
 */
export const authService = {
  async login({ email, password }: LoginPayload) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  },

  async signup({ name, email, password }: SignupPayload) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  async forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'launchpilot://reset-password',
    });
    if (error) throw new Error(error.message);
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  },

  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    const u = data.user;
    return {
      id: u.id,
      email: u.email ?? '',
      name: (u.user_metadata?.name as string) ?? '',
      avatar_url: u.user_metadata?.avatar_url as string | undefined,
      bio: u.user_metadata?.bio as string | undefined,
      plan: 'free',
      created_at: u.created_at,
      updated_at: u.updated_at ?? u.created_at,
      email_verified: !!u.email_confirmed_at,
    };
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'launchpilot://callback' },
    });
    if (error) throw new Error(error.message);
    return data;
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
