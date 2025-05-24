import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:food_delivery/screens/main_screen.dart';
import 'package:food_delivery/screens/restaurant_screen.dart';
import 'package:food_delivery/screens/dish_screen.dart';
import 'package:food_delivery/screens/checkout_screen.dart';

final router = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) => MainScreen(child: child),
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const HomeTab(),
        ),
        GoRoute(
          path: '/search',
          builder: (context, state) => const SearchTab(),
        ),
        GoRoute(
          path: '/orders',
          builder: (context, state) => const OrdersTab(),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const ProfileTab(),
        ),
      ],
    ),
    GoRoute(
      path: '/restaurant/:id',
      builder: (context, state) => RestaurantScreen(
        id: state.pathParameters['id']!,
      ),
    ),
    GoRoute(
      path: '/dish/:id',
      builder: (context, state) => DishScreen(
        id: state.pathParameters['id']!,
      ),
    ),
    GoRoute(
      path: '/checkout',
      builder: (context, state) => const CheckoutScreen(),
    ),
  ],
);