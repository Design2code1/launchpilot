import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { radius, shadow } from '@/theme/spacing';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: top + 12 }]} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </View>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const { colors } = useTheme();

  const getStyleForType = () => {
    switch (toast.type) {
      case 'success':
        return { icon: 'check-circle' as const, color: colors.success, bg: colors.successBg };
      case 'error':
        return { icon: 'alert-circle' as const, color: colors.destructive, bg: colors.destructiveBg };
      case 'warning':
        return { icon: 'alert-triangle' as const, color: colors.warning, bg: colors.warningBg };
      case 'info':
      default:
        return { icon: 'info' as const, color: colors.info, bg: colors.infoBg };
    }
  };

  const config = getStyleForType();

  return (
    <Animated.View
      entering={FadeInUp.springify().damping(20)}
      exiting={FadeOutUp}
      style={[
        styles.toast,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={[styles.iconBadge, { backgroundColor: config.bg }]}>
        <Feather name={config.icon} size={16} color={config.color} />
      </View>
      <Text style={[styles.text, { color: colors.foreground }]} numberOfLines={2}>
        {toast.message}
      </Text>
      <Pressable onPress={onDismiss} style={styles.closeBtn} hitSlop={8}>
        <Feather name="x" size={14} color={colors.foregroundSubtle} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
    gap: 8,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    width: '100%',
    maxWidth: 400,
    ...shadow.md,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 13.5,
    fontFamily: 'Inter_500Medium',
    lineHeight: 18,
  },
  closeBtn: {
    marginLeft: 8,
  },
});
