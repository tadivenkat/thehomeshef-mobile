import 'package:flutter/material.dart';
import 'package:food_delivery/widgets/category_scroll.dart';
import 'package:food_delivery/widgets/promotion_banner.dart';
import 'package:food_delivery/widgets/restaurant_card.dart';
import 'package:food_delivery/widgets/search_bar.dart';
import 'package:food_delivery/data/mock_data.dart';

class HomeTab extends StatefulWidget {
  const HomeTab({super.key});

  @override
  State<HomeTab> createState() => _HomeTabState();
}

class _HomeTabState extends State<HomeTab> {
  String searchQuery = '';
  String? selectedCategoryId;
  List<Restaurant> filteredRestaurants = restaurants;

  void _filterRestaurants() {
    setState(() {
      filteredRestaurants = restaurants.where((restaurant) {
        bool matchesSearch = searchQuery.isEmpty ||
            restaurant.name.toLowerCase().contains(searchQuery.toLowerCase()) ||
            restaurant.tags.any((tag) =>
                tag.toLowerCase().contains(searchQuery.toLowerCase()));

        bool matchesCategory = selectedCategoryId == null ||
            restaurant.tags.any((tag) =>
                tag.toLowerCase() ==
                categories
                    .firstWhere((c) => c.id == selectedCategoryId)
                    .name
                    .toLowerCase());

        return matchesSearch && matchesCategory;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.location_on, color: AppTheme.primary),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Deliver to',
                              style: Theme.of(context).textTheme.bodySmall,
                            ),
                            Text(
                              '123 Main Street, Anytown',
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: SearchBar(
                value: searchQuery,
                onChanged: (value) {
                  setState(() {
                    searchQuery = value;
                    _filterRestaurants();
                  });
                },
              ),
            ),
            const SliverToBoxAdapter(
              child: PromotionBanner(),
            ),
            SliverToBoxAdapter(
              child: CategoryScroll(
                categories: categories,
                selectedCategoryId: selectedCategoryId,
                onCategorySelected: (categoryId) {
                  setState(() {
                    selectedCategoryId = categoryId;
                    _filterRestaurants();
                  });
                },
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    return RestaurantCard(
                      restaurant: filteredRestaurants[index],
                    );
                  },
                  childCount: filteredRestaurants.length,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}