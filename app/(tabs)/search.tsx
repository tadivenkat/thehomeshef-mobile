import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Platform } from 'react-native';
import { restaurants } from '@/data/mockData';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { Restaurant } from '@/types/restaurant';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.length > 2) {
      setHasSearched(true);
      const filtered = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(text.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase())) ||
        restaurant.description.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else if (text.length === 0) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const handleFilter = () => {
    // Implement filter modal or screen
    console.log('Open filter options');
  };

  const renderPopularSearches = () => (
    <View style={styles.popularSearchesContainer}>
      <Text style={styles.sectionTitle}>Popular Searches</Text>
      <View style={styles.tagsContainer}>
        {['Pizza', 'Burger', 'Sushi', 'Healthy', 'Mexican', 'Dessert'].map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>Try a different search term or browse categories</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
        </View>
        
        <SearchBar 
          value={searchQuery} 
          onChangeText={handleSearch} 
          onFilter={handleFilter}
          placeholder="Search for restaurants, cuisines, dishes..." 
        />

        {!hasSearched ? (
          renderPopularSearches()
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
            contentContainerStyle={styles.resultsContainer}
            ListEmptyComponent={renderEmptyResults}
            ListHeaderComponent={
              <Text style={styles.resultsTitle}>
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </Text>
            }
          />
        )}
      </View>
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
    marginBottom: Layout.spacing.s,
  },
  headerTitle: {
    ...Typography.h3,
  },
  popularSearchesContainer: {
    padding: Layout.spacing.m,
  },
  sectionTitle: {
    ...Typography.h5,
    marginBottom: Layout.spacing.m,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.radius.full,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  tagText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  resultsContainer: {
    padding: Layout.spacing.m,
  },
  resultsTitle: {
    ...Typography.body1,
    marginBottom: Layout.spacing.m,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  emptyTitle: {
    ...Typography.h5,
    color: Colors.neutral[700],
    marginBottom: Layout.spacing.xs,
  },
  emptySubtitle: {
    ...Typography.body2,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});