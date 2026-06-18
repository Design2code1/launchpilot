/**
 * LaunchPilot RN — App Constants
 */

export const APP = {
  NAME: 'LaunchPilot RN',
  VERSION: '1.0.0',
  DESCRIPTION: 'Premium React Native SaaS Starter Kit',
  BUNDLE_ID: 'com.launchpilot.rn',
  WEBSITE: 'https://launchpilot.dev',
  SUPPORT_EMAIL: 'support@launchpilot.dev',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@launchpilot/auth_token',
  REFRESH_TOKEN: '@launchpilot/refresh_token',
  USER_DATA: '@launchpilot/user_data',
  THEME_MODE: '@launchpilot/theme_mode',
  ONBOARDED: '@launchpilot/onboarded',
  PUSH_TOKEN: '@launchpilot/push_token',
  NOTIFICATIONS_ENABLED: '@launchpilot/notifications_enabled',
} as const;

export const API = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const ANIMATION = {
  FAST: 150,
  MEDIUM: 250,
  SLOW: 400,
  SPRING: { damping: 20, stiffness: 200 },
} as const;

export const ROUTES = {
  INDEX: '/',
  // Auth
  LOGIN: '/(auth)/login',
  SIGNUP: '/(auth)/signup',
  FORGOT_PASSWORD: '/(auth)/forgot-password',
  VERIFY_EMAIL: '/(auth)/verify-email',
  // Onboarding
  ONBOARDING: '/(onboarding)/welcome',
  // Tabs
  DASHBOARD: '/(tabs)/',
  CHAT: '/(tabs)/chat',
  NOTIFICATIONS: '/(tabs)/notifications',
  SETTINGS: '/(tabs)/settings',
  // Profile
  PROFILE: '/profile/',
  EDIT_PROFILE: '/profile/edit',
  // Payments
  PLANS: '/payments/plans',
  CHECKOUT: '/payments/checkout',
} as const;

export const LIMITS = {
  FREE_MESSAGES: 10,
  AVATAR_SIZE_MB: 2,
  MAX_BIO_LENGTH: 200,
  OTP_EXPIRY_SECONDS: 300,
} as const;

export const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Launch Faster',
    subtitle: 'Skip months of setup. Start with a production-ready React Native SaaS foundation.',
    icon: 'zap',
    gradient: ['#22C55E', '#16A34A'],
  },
  {
    id: '2',
    title: 'Everything Included',
    subtitle: 'Auth, payments, AI chat, notifications, dark mode — all wired up and ready to ship.',
    icon: 'box',
    gradient: ['#3B82F6', '#2563EB'],
  },
  {
    id: '3',
    title: 'Scale with Confidence',
    subtitle: 'Built on Supabase, Zustand, and Expo Router. Clean architecture that grows with you.',
    icon: 'trending-up',
    gradient: ['#8B5CF6', '#7C3AED'],
  },
] as const;
