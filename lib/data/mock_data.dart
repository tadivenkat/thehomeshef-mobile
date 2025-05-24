import 'package:food_delivery/models/restaurant.dart';
import 'package:food_delivery/models/dish.dart';

final restaurants = [
  Restaurant(
    id: '1',
    name: 'Burger Palace',
    coverImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    rating: 4.7,
    reviewCount: 342,
    deliveryTime: 25,
    tags: ['Burgers', 'American', 'Fast Food'],
    freeDelivery: true,
    promoted: true,
    distance: 1.2,
    priceLevel: 2,
    address: '123 Main St, Anytown, USA',
    description: 'Serving the juiciest burgers in town with fresh ingredients and homemade sauces.',
  ),
  // Add more restaurants here...
];

final categories = [
  Category(
    id: '1',
    name: 'Fast Food',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
  ),
  // Add more categories here...
];

final dishes = [
  Dish(
    id: '1',
    restaurantId: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce on a brioche bun.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    popular: true,
    category: 'Burgers',
  ),
  // Add more dishes here...
];