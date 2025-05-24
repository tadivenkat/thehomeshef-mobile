import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, Clock, MapPin, Heart, Search } from 'lucide-react-native';
import { restaurants, dishes } from '@/data/mockData';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { Dish } from '@/types/restaurant';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const restaurant = restaurants.find(r => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [restaurantDishes, setRestaurantDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (restaurant) {
      const filteredDishes = dishes.filter(dish => dish.restaurantId === restaurant.id);
      setRestaurantDishes(filteredDishes);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(filteredDishes.map(dish => dish.category))];
      setCategories(uniqueCategories);
      
      // Set first category as selected by default
      if (uniqueCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(uniqueCategories[0]);
      }
    }
  }, [restaurant, id]);
  
  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Restaurant not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const filteredDishes = selectedCategory 
    ? restaurantDishes.filter(dish => dish.category === selectedCategory)
    : restaurantDishes;
  
  const handleDishPress = (dishId: string) => {
    router.push(`/dish/${dishId}`);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
        <View style={styles.coverImageContainer}>
          <Image 
            source={{ uri: restaurant.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={24} color={Colors.white} fill="transparent" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerContainer}>
          <View style={styles.restaurantInfoContainer}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            
            <View style={styles.tagsContainer}>
              {restaurant.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}{index < restaurant.tags.length - 1 ? ' • ' : ''}
                </Text>
              ))}
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={16} color={Colors.primary.default} fill={Colors.primary.default} />
                <Text style={styles.statText}>{restaurant.rating}</Text>
                <Text style={styles.statSubtext}>({restaurant.reviewCount})</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Clock size={16} color={Colors.neutral[600]} />
                <Text style={styles.statText}>{restaurant.deliveryTime} min</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <MapPin size={16} color={Colors.neutral[600]} />
                <Text style={styles.statText}>{restaurant.distance} mi</Text>
              </View>
            </View>
            
            <Text style={styles.description}>{restaurant.description}</Text>
          </View>
          
          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContent}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategoryButton
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text 
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.selectedCategoryButtonText
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.searchContainer}>
            <Search size={20} color={Colors.neutral[500]} />
            <Text style={styles.searchPlaceholder}>Search menu items</Text>
          </TouchableOpacity>
          
          {filteredDishes.map((dish) => (
            <TouchableOpacity 
              key={dish.id} 
              style={styles.dishCard}
              onPress={() => handleDishPress(dish.id)}
            >
              <View style={styles.dishInfo}>
                <View>
                  {dish.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishDescription} numberOfLines={2}>
                    {dish.description}
                  </Text>
                  <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
                </View>
                {dish.options && (
                  <View style={styles.customizableBadge}>
                    <Text style={styles.customizableText}>Customizable</Text>
                  </View>
                )}
              </View>
              <Image 
                source={{ uri: dish.image }}
                style={styles.dishImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="View Cart" 
          onPress={() => router.push('/checkout')}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  coverImageContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 10,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 10,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingBottom: Layout.spacing.s,
  },
  restaurantInfoContainer: {
    padding: Layout.spacing.m,
  },
  restaurantName: {
    ...Typography.h3,
    marginBottom: Layout.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.s,
  },
  tag: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  statSubtext: {
    ...Typography.caption,
    color: Colors.neutral[500],
    marginLeft: 2,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: Layout.spacing.m,
  },
  description: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  categoriesContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  categoriesScrollContent: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
  },
  categoryButton: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    marginRight: Layout.spacing.s,
    borderRadius: Layout.radius.full,
    backgroundColor: Colors.neutral[100],
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary.default,
  },
  categoryButtonText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  selectedCategoryButtonText: {
    color: Colors.white,
  },
  menuContainer: {
    padding: Layout.spacing.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.radius.m,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    marginBottom: Layout.spacing.m,
  },
  searchPlaceholder: {
    ...Typography.body2,
    color: Colors.neutral[500],
    marginLeft: Layout.spacing.s,
  },
  dishCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    paddingVertical: Layout.spacing.m,
  },
  dishInfo: {
    flex: 1,
    marginRight: Layout.spacing.m,
    justifyContent: 'space-between',
  },
  popularBadge: {
    backgroundColor: Colors.primary.background,
    borderRadius: Layout.radius.s,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  popularText: {
    ...Typography.caption,
    color: Colors.primary.default,
    fontFamily: 'Poppins-Medium',
  },
  dishName: {
    ...Typography.h6,
    marginBottom: 4,
  },
  dishDescription: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.s,
  },
  dishPrice: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
  },
  customizableBadge: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Layout.radius.s,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: Layout.spacing.xs,
  },
  customizableText: {
    ...Typography.caption,
    color: Colors.neutral[600],
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: Layout.radius.m,
  },
  footer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    padding: Layout.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 34 : Layout.spacing.m,
  },
});