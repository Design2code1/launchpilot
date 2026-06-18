import Constants from 'expo-constants';

/**
 * Environment configuration.
 * All values read from EXPO_PUBLIC_* environment variables.
 * Copy .env.example to .env.local and fill in your values.
 */

const extra = Constants.expoConfig?.extra ?? {};

export const ENV = {
  // Supabase
  SUPABASE_URL: (process.env.EXPO_PUBLIC_SUPABASE_URL ?? extra.supabaseUrl ?? '') as string,
  SUPABASE_ANON_KEY: (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? extra.supabaseAnonKey ?? '') as string,

  // API
  API_BASE_URL: (process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com/v1') as string,

  // AI
  AI_API_URL: (process.env.EXPO_PUBLIC_AI_API_URL ?? 'https://api.openai.com/v1') as string,

  // Payments
  RAZORPAY_KEY_ID: (process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID ?? '') as string,
  STRIPE_PUBLISHABLE_KEY: (process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '') as string,

  // App
  APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as 'development' | 'staging' | 'production',
  IS_DEV: process.env.EXPO_PUBLIC_APP_ENV !== 'production',
} as const;
