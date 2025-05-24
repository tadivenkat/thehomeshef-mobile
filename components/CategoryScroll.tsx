import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Category } from '@/types/restaurant';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface CategoryScrollProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

export default function CategoryScroll({ 
  categories, 
  onSelectCategory, 
  selectedCategoryId 
}: CategoryScrollProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategoryId === null && styles.selectedCategory
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <View style={styles.categoryImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
          </View>
          <Text style={[
            styles.categoryName,
            selectedCategoryId === null && styles.selectedCategoryText
          ]}>All</Text>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategoryId === category.id && styles.selectedCategory
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={styles.categoryImageContainer}>
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <Text style={[
              styles.categoryName,
              selectedCategoryId === category.id && styles.selectedCategoryText
            ]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.m,
  },
  title: {
    ...Typography.h5,
    marginBottom: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.m,
    paddingBottom: Layout.spacing.s,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    width: 80,
  },
  categoryImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: Layout.spacing.xs,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    ...Typography.caption,
    textAlign: 'center',
  },
  selectedCategory: {
    opacity: 1,
  },
  selectedCategoryText: {
    color: Colors.primary.default,
    fontFamily: 'Poppins-Medium',
  },
});