import 'package:food_delivery/models/dish.dart';

class Restaurant {
  final String id;
  final String name;
  final String coverImage;
  final double rating;
  final int reviewCount;
  final int deliveryTime;
  final List<String> tags;
  final bool freeDelivery;
  final bool promoted;
  final double distance;
  final int priceLevel;
  final String address;
  final String description;

  const Restaurant({
    required this.id,
    required this.name,
    required this.coverImage,
    required this.rating,
    required this.reviewCount,
    required this.deliveryTime,
    required this.tags,
    required this.freeDelivery,
    required this.promoted,
    required this.distance,
    required this.priceLevel,
    required this.address,
    required this.description,
  });
}