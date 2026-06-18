import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { radius } from '@/theme/spacing';

interface SkeletonProps {
  width: number | string;
  height: number;
  circle?: boolean;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width,
  height,
  circle = false,
  borderRadius,
  style,
}: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const skeletonStyle: ViewStyle = {
    width: width as any,
    height,
    borderRadius: circle
      ? typeof width === 'number'
        ? width / 2
        : height / 2
      : borderRadius ?? radius.sm,
    backgroundColor: colors.skeleton,
    ...style,
  };

  return <Animated.View style={[skeletonStyle, animatedStyle]} />;
}
