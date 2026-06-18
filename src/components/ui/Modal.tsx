import React from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { radius } from '@/theme/spacing';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Modal({ visible, onClose, title, children, style }: ModalProps) {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {visible && (
        <View style={styles.overlay}>
          {/* Backdrop */}
          <AnimatedPressable
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={[styles.backdrop, { backgroundColor: colors.overlay }]}
            onPress={onClose}
            accessibilityLabel="Close modal"
          />

          {/* Bottom Sheet Sheet */}
          <Animated.View
            entering={SlideInDown.springify().damping(25).stiffness(250)}
            exiting={SlideOutDown.duration(200)}
            style={[
              styles.sheet,
              {
                backgroundColor: colors.background,
                borderTopColor: colors.borderSubtle,
                paddingBottom: bottom + 24,
              },
              style,
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              {title ? (
                <Text style={[styles.title, { color: colors.foreground }]}>
                  {title}
                </Text>
              ) : (
                <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />
              )}
              <Pressable
                onPress={onClose}
                style={[styles.closeBtn, { backgroundColor: colors.surface }]}
                accessibilityLabel="Close"
              >
                <Feather name="x" size={18} color={colors.foreground} />
              </Pressable>
            </View>

            {/* Content */}
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      )}
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    borderTopWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    minHeight: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.2,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    position: 'absolute',
    left: '50%',
    marginLeft: -18,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexShrink: 1,
  },
});
