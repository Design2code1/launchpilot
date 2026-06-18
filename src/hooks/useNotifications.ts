import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotificationStore } from '@/store/notificationStore';

export function useNotifications() {
  const store = useNotificationStore();

  useEffect(() => {
    // Listen for incoming notifications when app is foregrounded
    const sub = Notifications.addNotificationReceivedListener((notification) => {
      store.addNotification({
        id: notification.request.identifier,
        type: 'info',
        title: notification.request.content.title ?? 'Notification',
        body: notification.request.content.body ?? '',
        read: false,
        created_at: new Date().toISOString(),
        data: notification.request.content.data as Record<string, unknown>,
      });
    });
    return () => sub.remove();
  }, []);

  return store;
}
