import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { haptics } from '@/utils/haptics';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, showBack = false, rightAction }: HeaderProps) {
  const { colors } = useTheme();

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  return (
    <View style={[styles.header, { borderBottomColor: colors.borderSubtle }]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <Pressable onPress={handleBack} style={styles.backBtn} hitSlop={12}>
            <Feather name="arrow-left" size={22} color={colors.foreground} />
          </Pressable>
        )}
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      </View>
      {rightAction && <View style={styles.rightContainer}>{rightAction}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
