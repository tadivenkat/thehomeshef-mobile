class DishOption {
  final String id;
  final String name;
  final List<DishChoice> choices;
  final bool required;
  final bool multiple;

  const DishOption({
    required this.id,
    required this.name,
    required this.choices,
    required this.required,
    required this.multiple,
  });
}

class DishChoice {
  final String id;
  final String name;
  final double price;

  const DishChoice({
    required this.id,
    required this.name,
    required this.price,
  });
}

class Dish {
  final String id;
  final String restaurantId;
  final String name;
  final String description;
  final double price;
  final String image;
  final bool popular;
  final String category;
  final List<DishOption>? options;

  const Dish({
    required this.id,
    required this.restaurantId,
    required this.name,
    required this.description,
    required this.price,
    required this.image,
    required this.popular,
    required this.category,
    this.options,
  });
}