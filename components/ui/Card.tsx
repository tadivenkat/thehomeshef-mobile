import { StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({
  children,
  style,
  elevation = 'small',
  padding = 'medium',
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevation !== 'none' && Layout.shadow[elevation],
        padding !== 'none' && styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radius.m,
    overflow: 'hidden',
  },
  paddingSmall: {
    padding: Layout.spacing.s,
  },
  paddingMedium: {
    padding: Layout.spacing.m,
  },
  paddingLarge: {
    padding: Layout.spacing.l,
  },
});