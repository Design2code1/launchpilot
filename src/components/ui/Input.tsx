import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { radius } from '@/theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Feather.glyphMap;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      isPassword = false,
      containerStyle,
      inputStyle,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [focused, setFocused] = useState(false);
    const [secureText, setSecureText] = useState(isPassword);

    const handleFocus = (e: any) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setFocused(false);
      onBlur?.(e);
    };

    const toggleSecureText = () => {
      setSecureText((prev) => !prev);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={[styles.label, { color: colors.foregroundMuted }]}>{label}</Text>}
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.surface,
              borderColor: error
                ? colors.destructive
                : focused
                ? colors.accent
                : colors.border,
            },
          ]}
        >
          {leftIcon && (
            <Feather
              name={leftIcon}
              size={18}
              color={focused ? colors.accent : colors.foregroundSubtle}
              style={styles.leftIcon}
            />
          )}
          <TextInput
            ref={ref}
            secureTextEntry={secureText}
            style={[styles.input, { color: colors.foreground }, inputStyle]}
            placeholderTextColor={colors.placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {isPassword ? (
            <Pressable onPress={toggleSecureText} style={styles.rightIcon} hitSlop={8}>
              <Feather
                name={secureText ? 'eye-off' : 'eye'}
                size={18}
                color={colors.foregroundSubtle}
              />
            </Pressable>
          ) : rightIcon ? (
            <Pressable onPress={onRightIconPress} style={styles.rightIcon} disabled={!onRightIconPress}>
              <Feather name={rightIcon} size={18} color={colors.foregroundSubtle} />
            </Pressable>
          ) : null}
        </View>
        {error && <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    height: 48,
    paddingHorizontal: 12,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    paddingVertical: 0,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});
