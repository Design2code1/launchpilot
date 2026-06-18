import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { getInitials } from '@/utils/format';
import { haptics } from '@/utils/haptics';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  editable?: boolean;
  onImagePicked?: (uri: string) => void;
}

export function Avatar({
  uri,
  name = '',
  size = 64,
  editable = false,
  onImagePicked,
}: AvatarProps) {
  const { colors } = useTheme();

  const handlePickImage = async () => {
    if (!editable || !onImagePicked) return;
    haptics.light();

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Photo access permission required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onImagePicked(result.assets[0].uri);
    }
  };

  const renderContent = () => {
    if (uri) {
      return (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      );
    }

    const initials = getInitials(name);
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.surface2,
          },
        ]}
      >
        <Text
          style={[
            styles.fallbackText,
            {
              fontSize: size * 0.35,
              color: colors.foreground,
            },
          ]}
        >
          {initials}
        </Text>
      </View>
    );
  };

  if (editable) {
    return (
      <Pressable onPress={handlePickImage} style={styles.editableContainer}>
        {renderContent()}
        <View
          style={[
            styles.editBadge,
            {
              backgroundColor: colors.accent,
              borderColor: colors.background,
              right: -2,
              bottom: -2,
            },
          ]}
        >
          <Feather name="camera" size={12} color="#052E16" />
        </View>
      </Pressable>
    );
  }

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  editableContainer: {
    position: 'relative',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontFamily: 'Inter_600SemiBold',
  },
  editBadge: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
