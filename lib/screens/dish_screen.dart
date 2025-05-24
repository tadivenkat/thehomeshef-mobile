import 'package:flutter/material.dart';
import 'package:food_delivery/config/theme.dart';
import 'package:food_delivery/data/mock_data.dart';
import 'package:food_delivery/models/cart_item.dart';
import 'package:food_delivery/providers/cart_provider.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class DishScreen extends StatefulWidget {
  final String id;

  const DishScreen({super.key, required this.id});

  @override
  State<DishScreen> createState() => _DishScreenState();
}

class _DishScreenState extends State<DishScreen> {
  int quantity = 1;
  Map<String, String> selectedOptions = {};
  Map<String, List<String>> selectedMultipleOptions = {};

  @override
  void initState() {
    super.initState();
    final dish = dishes.firstWhere((d) => d.id == widget.id);
    if (dish.options != null) {
      for (final option in dish.options!) {
        if (option.required && !option.multiple) {
          selectedOptions[option.id] = option.choices.first.id;
        }
      }
    }
  }

  double calculateTotalPrice() {
    final dish = dishes.firstWhere((d) => d.id == widget.id);
    double total = dish.price * quantity;

    if (dish.options != null) {
      for (final option in dish.options!) {
        if (option.multiple) {
          final selectedChoices = selectedMultipleOptions[option.id] ?? [];
          for (final choiceId in selectedChoices) {
            final choice = option.choices.firstWhere((c) => c.id == choiceId);
            total += choice.price * quantity;
          }
        } else {
          final selectedChoice = selectedOptions[option.id];
          if (selectedChoice != null) {
            final choice = option.choices.firstWhere((c) => c.id == selectedChoice);
            total += choice.price * quantity;
          }
        }
      }
    }

    return total;
  }

  void addToCart() {
    final dish = dishes.firstWhere((d) => d.id == widget.id);
    final cartProvider = context.read<CartProvider>();

    final options = <CartItemOption>[];
    if (dish.options != null) {
      for (final option in dish.options!) {
        if (option.multiple) {
          final selectedChoices = selectedMultipleOptions[option.id] ?? [];
          for (final choiceId in selectedChoices) {
            final choice = option.choices.firstWhere((c) => c.id == choiceId);
            options.add(CartItemOption(
              name: option.name,
              choice: choice.name,
              price: choice.price,
            ));
          }
        } else {
          final selectedChoice = selectedOptions[option.id];
          if (selectedChoice != null) {
            final choice = option.choices.firstWhere((c) => c.id == selectedChoice);
            options.add(CartItemOption(
              name: option.name,
              choice: choice.name,
              price: choice.price,
            ));
          }
        }
      }
    }

    final cartItem = CartItem(
      id: DateTime.now().toString(),
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: quantity,
      options: options.isNotEmpty ? options : null,
    );

    cartProvider.addItem(cartItem);
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    final dish = dishes.firstWhere((d) => d.id == widget.id);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 250,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    dish.image,
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withOpacity(0.7),
                          Colors.transparent,
                          Colors.black.withOpacity(0.7),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => context.pop(),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.favorite_border),
                onPressed: () {},
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          dish.name,
                          style: Theme.of(context).textTheme.headlineMedium,
                        ),
                      ),
                      Text(
                        '\$${dish.price.toStringAsFixed(2)}',
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    dish.description,
                    style: TextStyle(
                      color: Colors.grey[600],
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'Quantity',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () {
                          if (quantity > 1) {
                            setState(() => quantity--);
                          }
                        },
                        icon: const Icon(Icons.remove),
                        style: IconButton.styleFrom(
                          backgroundColor: Colors.grey[200],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: Text(
                          quantity.toString(),
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () {
                          setState(() => quantity++);
                        },
                        icon: const Icon(Icons.add),
                        style: IconButton.styleFrom(
                          backgroundColor: Colors.grey[200],
                        ),
                      ),
                    ],
                  ),
                  if (dish.options != null) ...[
                    const SizedBox(height: 24),
                    ...dish.options!.map((option) => Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              option.name,
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                            if (option.required)
                              Container(
                                margin: const EdgeInsets.only(left: 8),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: AppTheme.primary.withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  'Required',
                                  style: TextStyle(
                                    color: AppTheme.primary,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        ...option.choices.map((choice) {
                          final isSelected = option.multiple
                              ? (selectedMultipleOptions[option.id] ?? []).contains(choice.id)
                              : selectedOptions[option.id] == choice.id;

                          return InkWell(
                            onTap: () {
                              setState(() {
                                if (option.multiple) {
                                  final currentSelected = selectedMultipleOptions[option.id] ?? [];
                                  if (currentSelected.contains(choice.id)) {
                                    currentSelected.remove(choice.id);
                                  } else {
                                    currentSelected.add(choice.id);
                                  }
                                  selectedMultipleOptions[option.id] = currentSelected;
                                } else {
                                  selectedOptions[option.id] = choice.id;
                                }
                              });
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 12,
                              ),
                              margin: const EdgeInsets.only(bottom: 8),
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? AppTheme.primary.withOpacity(0.1)
                                    : Colors.white,
                                border: Border.all(
                                  color: isSelected
                                      ? AppTheme.primary
                                      : Colors.grey[300]!,
                                ),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        choice.name,
                                        style: TextStyle(
                                          fontWeight: isSelected
                                              ? FontWeight.w500
                                              : FontWeight.normal,
                                        ),
                                      ),
                                      if (choice.price > 0)
                                        Text(
                                          '+\$${choice.price.toStringAsFixed(2)}',
                                          style: TextStyle(
                                            color: Colors.grey[600],
                                            fontSize: 14,
                                          ),
                                        ),
                                    ],
                                  ),
                                  Container(
                                    width: 24,
                                    height: 24,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                        color: isSelected
                                            ? AppTheme.primary
                                            : Colors.grey[400]!,
                                        width: 2,
                                      ),
                                    ),
                                    child: isSelected
                                        ? Center(
                                            child: Container(
                                              width: 12,
                                              height: 12,
                                              decoration: BoxDecoration(
                                                shape: BoxShape.circle,
                                                color: AppTheme.primary,
                                              ),
                                            ),
                                          )
                                        : null,
                                  ),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                        const SizedBox(height: 16),
                      ],
                    )).toList(),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Total',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    '\$${calculateTotalPrice().toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: addToCart,
                child: const Text('Add to Cart'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}