import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { restaurants, categories } from '@/data/mockData';
import SearchBar from '@/components/SearchBar';
import CategoryScroll from '@/components/CategoryScroll';
import RestaurantCard from '@/components/RestaurantCard';
import PromotionBanner from '@/components/PromotionBanner';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { Restaurant } from '@/types/restaurant';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  useEffect(() => {
    let filtered = restaurants;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategoryId) {
      const category = categories.find(c => c.id === selectedCategoryId);
      if (category) {
        filtered = filtered.filter(restaurant => 
          restaurant.tags.some(tag => tag.toLowerCase() === category.name.toLowerCase())
        );
      }
    }
    
    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategoryId]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const handleFilter = () => {
    // Implement filter modal or screen
    console.log('Open filter options');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.deliverTo}>Deliver to</Text>
            <View style={styles.addressRow}>
              <MapPin size={16} color={Colors.primary.default} />
              <Text style={styles.address}>123 Main Street, Anytown</Text>
            </View>
          </View>
        </View>

        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          onFilter={handleFilter} 
        />

        <PromotionBanner />

        <CategoryScroll 
          categories={categories} 
          onSelectCategory={handleCategorySelect}
          selectedCategoryId={selectedCategoryId}
        />

        <View style={styles.restaurantsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategoryId 
              ? `${categories.find(c => c.id === selectedCategoryId)?.name} Restaurants` 
              : 'Featured Restaurants'}
          </Text>
          
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No restaurants found</Text>
              <Text style={styles.noResultsSubtext}>Try adjusting your filters or search term</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Layout.spacing.m,
  },
  locationContainer: {
    marginBottom: Layout.spacing.s,
  },
  deliverTo: {
    ...Typography.caption,
    color: Colors.neutral[600],
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    ...Typography.subtitle1,
    marginLeft: 4,
  },
  restaurantsSection: {
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Layout.spacing.m,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  noResultsText: {
    ...Typography.h5,
    color: Colors.neutral[700],
    marginBottom: Layout.spacing.xs,
  },
  noResultsSubtext: {
    ...Typography.body2,
    color: Colors.neutral[500],
  },
});