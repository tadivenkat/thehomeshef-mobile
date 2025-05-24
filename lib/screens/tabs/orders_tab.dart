import 'package:flutter/material.dart';
import 'package:food_delivery/config/theme.dart';
import 'package:go_router/go_router.dart';

class OrdersTab extends StatelessWidget {
  const OrdersTab({super.key});

  @override
  Widget build(BuildContext context) {
    final activeOrders = [
      {
        'id': '1',
        'restaurantName': 'Burger Palace',
        'status': 'active',
        'date': DateTime.now(),
        'items': ['Classic Cheeseburger', 'French Fries', 'Chocolate Milkshake'],
        'total': 24.97,
        'estimatedDelivery': '12:45 PM',
      },
    ];

    final pastOrders = [
      {
        'id': '2',
        'restaurantName': 'Pizza Heaven',
        'status': 'completed',
        'date': DateTime.now().subtract(const Duration(days: 1)),
        'items': ['Margherita Pizza', 'Garlic Bread'],
        'total': 22.98,
      },
    ];

    Widget buildActiveOrder(Map<String, dynamic> order) {
      return Card(
        margin: const EdgeInsets.only(bottom: 16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: AppTheme.primary,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Delivery in progress',
                        style: TextStyle(
                          color: AppTheme.primary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  Text(
                    order['estimatedDelivery'],
                    style: const TextStyle(fontWeight: FontWeight.w500),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                order['restaurantName'],
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 4),
              Text(
                (order['items'] as List).join(', '),
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.local_shipping_outlined),
                      label: const Text('Track Order'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  OutlinedButton(
                    onPressed: () {},
                    child: const Text('View Details'),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    }

    Widget buildPastOrder(Map<String, dynamic> order) {
      return Card(
        margin: const EdgeInsets.only(bottom: 16),
        child: InkWell(
          onTap: () {},
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      order['date'].toString().split(' ')[0],
                      style: TextStyle(color: Colors.grey[600]),
                    ),
                    Text(
                      '\$${order['total'].toStringAsFixed(2)}',
                      style: const TextStyle(fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  order['restaurantName'],
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 4),
                Text(
                  (order['items'] as List).join(', '),
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 12),
                OutlinedButton(
                  onPressed: () {},
                  child: const Text('Reorder'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      body: SafeArea(
        child: activeOrders.isEmpty && pastOrders.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.local_shipping_outlined,
                      size: 64,
                      color: Colors.grey[300],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'No orders yet',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Your order history will appear here',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () => context.go('/'),
                      child: const Text('Browse Restaurants'),
                    ),
                  ],
                ),
              )
            : CustomScrollView(
                slivers: [
                  SliverPadding(
                    padding: const EdgeInsets.all(16),
                    sliver: SliverToBoxAdapter(
                      child: Text(
                        'Your Orders',
                        style: Theme.of(context).textTheme.headlineMedium,
                      ),
                    ),
                  ),
                  if (activeOrders.isNotEmpty) ...[
                    SliverPadding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      sliver: SliverToBoxAdapter(
                        child: Row(
                          children: [
                            Icon(Icons.access_time, color: AppTheme.primary),
                            const SizedBox(width: 8),
                            Text(
                              'Active Orders',
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                          ],
                        ),
                      ),
                    ),
                    SliverPadding(
                      padding: const EdgeInsets.all(16),
                      sliver: SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => buildActiveOrder(activeOrders[index]),
                          childCount: activeOrders.length,
                        ),
                      ),
                    ),
                  ],
                  if (pastOrders.isNotEmpty) ...[
                    SliverPadding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      sliver: SliverToBoxAdapter(
                        child: Text(
                          'Past Orders',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ),
                    ),
                    SliverPadding(
                      padding: const EdgeInsets.all(16),
                      sliver: SliverList(
                        delegate: SliverChildBuilderDelegate(
                          (context, index) => buildPastOrder(pastOrders[index]),
                          childCount: pastOrders.length,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
      ),
    );
  }
}