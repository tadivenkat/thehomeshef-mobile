import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

export default function PromotionBanner() {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>50% OFF</Text>
          <Text style={styles.subtitle}>Your first order</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Use code</Text>
            <Text style={styles.code}>WELCOME50</Text>
          </View>
        </View>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.spacing.m,
    marginVertical: Layout.spacing.m,
    borderRadius: Layout.radius.m,
    overflow: 'hidden',
    backgroundColor: Colors.primary.background,
    height: 140,
  },
  content: {
    flexDirection: 'row',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    padding: Layout.spacing.m,
    justifyContent: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.primary.default,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[800],
    marginBottom: Layout.spacing.s,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginRight: 4,
  },
  code: {
    ...Typography.body2,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.dark,
  },
  image: {
    width: 140,
    height: '100%',
  },
});