import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  
  const getButtonStyle = () => {
    let baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[size],
    };

    if (fullWidth) {
      baseStyle = { ...baseStyle, ...styles.fullWidth };
    }

    switch (variant) {
      case 'primary':
        baseStyle = { 
          ...baseStyle, 
          ...styles.primary,
          ...(disabled && styles.primaryDisabled)
        };
        break;
      case 'secondary':
        baseStyle = { 
          ...baseStyle, 
          ...styles.secondary,
          ...(disabled && styles.secondaryDisabled)
        };
        break;
      case 'outline':
        baseStyle = { 
          ...baseStyle, 
          ...styles.outline,
          ...(disabled && styles.outlineDisabled)
        };
        break;
      case 'text':
        baseStyle = { 
          ...baseStyle, 
          ...styles.text,
          ...(disabled && styles.textDisabled)
        };
        break;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    let baseStyle: TextStyle = {
      ...Typography.button,
    };

    switch (variant) {
      case 'primary':
        baseStyle = { ...baseStyle, ...styles.primaryText };
        break;
      case 'secondary':
        baseStyle = { ...baseStyle, ...styles.secondaryText };
        break;
      case 'outline':
        baseStyle = { ...baseStyle, ...styles.outlineText };
        break;
      case 'text':
        baseStyle = { ...baseStyle, ...styles.textOnlyText };
        break;
    }

    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.disabledText };
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? Colors.white : Colors.primary.default} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon}
          <Text style={[getTextStyle(), textStyle, leftIcon && { marginLeft: 8 }, rightIcon && { marginRight: 8 }]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.radius.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: Colors.primary.default,
  },
  primaryDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  secondary: {
    backgroundColor: Colors.secondary.default,
  },
  secondaryDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary.default,
  },
  outlineDisabled: {
    borderColor: Colors.neutral[300],
  },
  text: {
    backgroundColor: 'transparent',
  },
  textDisabled: {
    backgroundColor: 'transparent',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary.default,
  },
  textOnlyText: {
    color: Colors.primary.default,
  },
  disabledText: {
    color: Colors.neutral[500],
  },
});