import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { MotiView, AnimatePresence } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { ONBOARDING_SLIDES } from '@/constants';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await storage.set(STORAGE_KEYS.ONBOARDED, true);
    router.replace('/(auth)/login');
  };

  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip button */}
      <Pressable
        onPress={handleGetStarted}
        style={[styles.skip, { top: top + 16 }]}
      >
        <Text style={[styles.skipText, { color: colors.foregroundMuted }]}>Skip</Text>
      </Pressable>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(i);
        }}
        renderItem={({ item, index }) => (
          <View style={[styles.slide, { width }]}>
            <MotiView
              from={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 100 }}
            >
              <LinearGradient
                colors={item.gradient as [string, string]}
                style={styles.iconWrap}
              >
                <Feather name={item.icon as keyof typeof Feather.glyphMap} size={48} color="#FFFFFF" />
              </LinearGradient>
            </MotiView>
            <Text style={[styles.slideTitle, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.slideSubtitle, { color: colors.foregroundMuted }]}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Bottom controls */}
      <View style={[styles.controls, { paddingBottom: bottom + 24 }]}>
        {/* Dots */}
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <MotiView
              key={i}
              animate={{ width: i === activeIndex ? 24 : 8, backgroundColor: i === activeIndex ? colors.accent : colors.border }}
              transition={{ type: 'spring', damping: 20 }}
              style={styles.dot}
            />
          ))}
        </View>

        <Button
          label={isLast ? 'Get Started' : 'Next'}
          onPress={handleNext}
          fullWidth
          size="lg"
          rightIcon={<Feather name={isLast ? 'zap' : 'arrow-right'} size={18} color="#052E16" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  skip: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
  },
  skipText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
    paddingTop: 80,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  slideTitle: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 26,
  },
  controls: {
    paddingHorizontal: 24,
    gap: 20,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});
