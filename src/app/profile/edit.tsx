import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Controller } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useForm } from '@/hooks/useForm';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { updateProfileSchema, UpdateProfileFormData } from '@/utils/validation';
import { useToast } from '@/components/ui/Toast';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [avatarUri, setAvatarUri] = useState<string | undefined>(user?.avatar_url);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateProfileFormData>(
    updateProfileSchema,
    {
      defaultValues: {
        name: user?.name ?? '',
        bio: user?.bio ?? '',
      },
    }
  );

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      updateUser({ ...data, avatar_url: avatarUri });
      showToast('Profile updated successfully!', 'success');
      router.back();
    } catch (e) {
      showToast('Failed to update profile.', 'error');
    }
  };

  return (
    <ScreenWrapper>
      <Header title="Edit Profile" showBack />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarSection}>
          <Avatar
            uri={avatarUri}
            name={user?.name ?? 'Builder'}
            size={88}
            editable
            onImagePicked={setAvatarUri}
          />
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Display Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Bio"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.bio?.message}
              multiline
              numberOfLines={3}
              style={styles.bioInput}
            />
          )}
        />

        <Button
          label="Save Changes"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          style={styles.btn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  btn: {
    marginTop: 16,
  },
});
