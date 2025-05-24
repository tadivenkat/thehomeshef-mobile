import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, Clock, Sparkles } from 'lucide-react-native';
import Card from './ui/Card';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.container}
    >
      <Card elevation="medium" padding="none" style={styles.card}>
        <Image
          source={{ uri: restaurant.coverImage }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {restaurant.promoted && (
          <View style={styles.promotedBadge}>
            <Sparkles size={12} color={Colors.white} />
            <Text style={styles.promotedText}>Promoted</Text>
          </View>
        )}
        
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.ratingContainer}>
              <Star size={14} color={restaurant.rating >= 4.5 ? Colors.primary.default : Colors.neutral[600]} fill={Colors.primary.default} />
              <Text style={styles.rating}>{restaurant.rating}</Text>
              <Text style={styles.ratingCount}>({restaurant.reviewCount})</Text>
            </View>
            
            <View style={styles.deliveryContainer}>
              <Clock size={14} color={Colors.neutral[600]} />
              <Text style={styles.deliveryTime}>{restaurant.deliveryTime} min</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {restaurant.tags.length > 3 && (
              <Text style={styles.moreTag}>+{restaurant.tags.length - 3}</Text>
            )}
          </View>
          
          {restaurant.freeDelivery && (
            <View style={styles.freeDeliveryContainer}>
              <Text style={styles.freeDeliveryText}>Free Delivery</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.m,
    width: '100%',
  },
  card: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  promotedBadge: {
    position: 'absolute',
    top: Layout.spacing.s,
    right: Layout.spacing.s,
    backgroundColor: Colors.primary.default,
    borderRadius: Layout.radius.s,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotedText: {
    ...Typography.caption,
    color: Colors.white,
    marginLeft: 4,
  },
  content: {
    padding: Layout.spacing.m,
  },
  name: {
    ...Typography.h5,
    marginBottom: Layout.spacing.xs,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  rating: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  ratingCount: {
    ...Typography.caption,
    color: Colors.neutral[500],
    marginLeft: 2,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    ...Typography.body2,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.radius.s,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    marginRight: Layout.spacing.xs,
    marginBottom: Layout.spacing.xs,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.neutral[700],
  },
  moreTag: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginLeft: 4,
    alignSelf: 'center',
  },
  freeDeliveryContainer: {
    marginTop: Layout.spacing.xs,
  },
  freeDeliveryText: {
    ...Typography.caption,
    color: Colors.success.default,
    fontFamily: 'Poppins-Medium',
  },
});