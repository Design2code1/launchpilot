export type NotificationType = 'info' | 'success' | 'warning' | 'alert' | 'promo';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
  data?: Record<string, unknown>;
  action_url?: string;
}

export interface NotificationState {
  notifications: AppNotification[];
  unread_count: number;
  push_token: string | null;
  permissions_granted: boolean;
  is_loading: boolean;
}
