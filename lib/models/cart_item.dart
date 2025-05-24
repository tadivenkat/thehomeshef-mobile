class CartItemOption {
  final String name;
  final String choice;
  final double price;

  const CartItemOption({
    required this.name,
    required this.choice,
    required this.price,
  });
}

class CartItem {
  final String id;
  final String dishId;
  final String name;
  final double price;
  final int quantity;
  final List<CartItemOption>? options;

  const CartItem({
    required this.id,
    required this.dishId,
    required this.name,
    required this.price,
    required this.quantity,
    this.options,
  });

  CartItem copyWith({
    String? id,
    String? dishId,
    String? name,
    double? price,
    int? quantity,
    List<CartItemOption>? options,
  }) {
    return CartItem(
      id: id ?? this.id,
      dishId: dishId ?? this.dishId,
      name: name ?? this.name,
      price: price ?? this.price,
      quantity: quantity ?? this.quantity,
      options: options ?? this.options,
    );
  }
}