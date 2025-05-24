import 'package:flutter/material.dart';
import 'package:food_delivery/data/mock_data.dart';
import 'package:food_delivery/widgets/restaurant_card.dart';
import 'package:food_delivery/widgets/search_bar.dart';
import 'package:food_delivery/config/theme.dart';

class SearchTab extends StatefulWidget {
  const SearchTab({super.key});

  @override
  State<SearchTab> createState() => _SearchTabState();
}

class _SearchTabState extends State<SearchTab> {
  String searchQuery = '';
  List<Restaurant> searchResults = [];
  bool hasSearched = false;

  void _handleSearch(String query) {
    setState(() {
      searchQuery = query;
      if (query.length > 2) {
        hasSearched = true;
        searchResults = restaurants.where((restaurant) {
          return restaurant.name.toLowerCase().contains(query.toLowerCase()) ||
              restaurant.tags.any((tag) => tag.toLowerCase().contains(query.toLowerCase())) ||
              restaurant.description.toLowerCase().contains(query.toLowerCase());
        }).toList();
      } else if (query.isEmpty) {
        hasSearched = false;
        searchResults = [];
      }
    });
  }

  Widget _buildPopularSearches() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Popular Searches',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              'Pizza',
              'Burger',
              'Sushi',
              'Healthy',
              'Mexican',
              'Dessert',
            ].map((tag) => ActionChip(
              label: Text(tag),
              onPressed: () => _handleSearch(tag),
            )).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyResults() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'No results found',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          Text(
            'Try a different search term or browse categories',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(
                left: 16,
                right: 16,
                top: 16,
                bottom: 8,
              ),
              child: Text(
                'Search',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
            SearchBar(
              value: searchQuery,
              onChanged: _handleSearch,
              placeholder: 'Search for restaurants, cuisines, dishes...',
            ),
            Expanded(
              child: !hasSearched
                ? _buildPopularSearches()
                : searchResults.isEmpty
                  ? _buildEmptyResults()
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: searchResults.length + 1,
                      itemBuilder: (context, index) {
                        if (index == 0) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: Text(
                              '${searchResults.length} ${searchResults.length == 1 ? 'result' : 'results'} for "$searchQuery"',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          );
                        }
                        return RestaurantCard(
                          restaurant: searchResults[index - 1],
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}