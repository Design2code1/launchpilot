import { create } from 'zustand';
import { AppNotification, NotificationState } from '@/types/notification.types';
import { notificationService } from '@/services/notificationService';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';

interface NotificationStore extends NotificationState {
  initialize: () => Promise<void>;
  requestPermissions: () => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: AppNotification) => void;
  clearAll: () => void;
}

// Mock notifications for demo
const DEMO_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Welcome to LaunchPilot!',
    body: 'Your account is all set up and ready to go.',
    read: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '2',
    type: 'info',
    title: 'New feature available',
    body: 'Check out the new AI Chat feature in your dashboard.',
    read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    type: 'promo',
    title: 'Upgrade to Pro',
    body: 'Get unlimited AI messages and priority support.',
    read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: DEMO_NOTIFICATIONS,
  unread_count: DEMO_NOTIFICATIONS.filter((n) => !n.read).length,
  push_token: null,
  permissions_granted: false,
  is_loading: false,

  initialize: async () => {
    set({ is_loading: true });
    notificationService.configureAndroid();
    const granted = await notificationService.requestPermissions();
    if (granted) {
      const token = await notificationService.getExpoPushToken();
      await storage.set(STORAGE_KEYS.PUSH_TOKEN, token);
      set({ push_token: token, permissions_granted: true });
    }
    set({ is_loading: false });
  },

  requestPermissions: async () => {
    const granted = await notificationService.requestPermissions();
    set({ permissions_granted: granted });
    return granted;
  },

  markAsRead: (id) => {
    set((s) => ({
      notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
      unread_count: Math.max(0, s.unread_count - 1),
    }));
  },

  markAllAsRead: () => {
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unread_count: 0,
    }));
  },

  addNotification: (notification) => {
    set((s) => ({
      notifications: [notification, ...s.notifications],
      unread_count: s.unread_count + (notification.read ? 0 : 1),
    }));
  },

  clearAll: () => set({ notifications: [], unread_count: 0 }),
}));
