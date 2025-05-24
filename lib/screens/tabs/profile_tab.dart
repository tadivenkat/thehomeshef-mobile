import 'package:flutter/material.dart';
import 'package:food_delivery/config/theme.dart';

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    final menuItems = [
      {
        'id': 'payment',
        'title': 'Payment Methods',
        'icon': Icons.credit_card,
        'badge': '2 cards',
      },
      {
        'id': 'addresses',
        'title': 'Saved Addresses',
        'icon': Icons.location_on,
        'badge': '3 addresses',
      },
      {
        'id': 'favorites',
        'title': 'Favorite Restaurants',
        'icon': Icons.favorite,
        'badge': '5 places',
      },
      {
        'id': 'settings',
        'title': 'Settings',
        'icon': Icons.settings,
      },
      {
        'id': 'help',
        'title': 'Help & Support',
        'icon': Icons.help_outline,
      },
      {
        'id': 'logout',
        'title': 'Log Out',
        'icon': Icons.logout,
        'color': AppTheme.error,
      },
    ];

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  'Profile',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
              ),
              Card(
                margin: const EdgeInsets.all(16),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 40,
                        backgroundImage: NetworkImage(
                          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'John Doe',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'john.doe@example.com',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: Colors.grey[600],
                              ),
                            ),
                            const SizedBox(height: 8),
                            TextButton(
                              onPressed: () {},
                              child: const Text('Edit Profile'),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: menuItems.length,
                itemBuilder: (context, index) {
                  final item = menuItems[index];
                  return ListTile(
                    leading: Icon(
                      item['icon'] as IconData,
                      color: item['color'] as Color? ?? Colors.grey[700],
                    ),
                    title: Text(
                      item['title'] as String,
                      style: TextStyle(
                        color: item['color'] as Color? ?? Colors.grey[900],
                      ),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (item['badge'] != null)
                          Text(
                            item['badge'] as String,
                            style: TextStyle(color: Colors.grey[600]),
                          ),
                        if (item['id'] != 'logout')
                          const Icon(Icons.chevron_right),
                      ],
                    ),
                    onTap: () {},
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: Center(
                  child: Text(
                    'Version 1.0.0',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.grey[500],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}