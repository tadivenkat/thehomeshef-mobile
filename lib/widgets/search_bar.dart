import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  final String value;
  final ValueChanged<String> onChanged;
  final VoidCallback? onFilter;
  final String? placeholder;

  const SearchBar({
    super.key,
    required this.value,
    required this.onChanged,
    this.onFilter,
    this.placeholder,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12),
              ),
              child: TextField(
                onChanged: onChanged,
                decoration: InputDecoration(
                  hintText: placeholder ?? 'Search for restaurants or dishes',
                  border: InputBorder.none,
                  prefixIcon: const Icon(Icons.search),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Container(
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: IconButton(
              onPressed: onFilter,
              icon: Icon(
                Icons.tune,
                color: AppTheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}