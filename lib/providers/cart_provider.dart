import 'package:flutter/foundation.dart';
import 'package:food_delivery/models/cart_item.dart';

class CartProvider extends ChangeNotifier {
  final List<CartItem> _items = [];
  double _subtotal = 0;
  double _deliveryFee = 2.99;
  double _serviceFee = 1.99;

  List<CartItem> get items => _items;
  double get subtotal => _subtotal;
  double get deliveryFee => _deliveryFee;
  double get serviceFee => _serviceFee;
  double get total => _subtotal + _deliveryFee + _serviceFee;

  void addItem(CartItem item) {
    final existingIndex = _items.indexWhere((i) => i.id == item.id);
    
    if (existingIndex >= 0) {
      _items[existingIndex] = item;
    } else {
      _items.add(item);
    }
    
    _calculateSubtotal();
    notifyListeners();
  }

  void removeItem(String id) {
    _items.removeWhere((item) => item.id == id);
    _calculateSubtotal();
    notifyListeners();
  }

  void updateQuantity(String id, int quantity) {
    final index = _items.indexWhere((item) => item.id == id);
    if (index >= 0) {
      _items[index] = _items[index].copyWith(quantity: quantity);
      _calculateSubtotal();
      notifyListeners();
    }
  }

  void _calculateSubtotal() {
    _subtotal = _items.fold(0, (sum, item) {
      final optionsPrice = item.options?.fold(
        0.0,
        (sum, option) => sum + option.price,
      ) ?? 0.0;
      return sum + ((item.price + optionsPrice) * item.quantity);
    });
  }

  void clear() {
    _items.clear();
    _subtotal = 0;
    notifyListeners();
  }
}