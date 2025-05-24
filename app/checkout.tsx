import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, CreditCard, Clock, Plus, Minus, X } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { CartItem } from '@/types/restaurant';

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: '1',
    dishId: '1',
    name: 'Classic Cheeseburger',
    price: 12.99,
    quantity: 1,
  },
  {
    id: '2',
    dishId: '4',
    name: 'French Fries',
    price: 4.99,
    quantity: 1,
  },
  {
    id: '3',
    dishId: '6',
    name: 'Chocolate Milkshake',
    price: 6.99,
    quantity: 1,
    options: [
      {
        name: 'Size',
        choice: 'Large',
        price: 1.00,
      }
    ]
  }
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  
  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemOptionsPrice = item.options?.reduce((total, option) => total + option.price, 0) || 0;
      return sum + (item.price + itemOptionsPrice) * item.quantity;
    }, 0);
  };
  
  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee + serviceFee;
  
  const placeOrder = () => {
    // Implement order placement logic
    console.log('Order placed!');
    router.push('/');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Details</Text>
            <Card style={styles.deliveryCard}>
              <View style={styles.deliveryOptions}>
                <TouchableOpacity 
                  style={[
                    styles.deliveryOption,
                    deliveryOption === 'delivery' && styles.selectedDeliveryOption
                  ]}
                  onPress={() => setDeliveryOption('delivery')}
                >
                  <Text style={[
                    styles.deliveryOptionText,
                    deliveryOption === 'delivery' && styles.selectedDeliveryOptionText
                  ]}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.deliveryOption,
                    deliveryOption === 'pickup' && styles.selectedDeliveryOption
                  ]}
                  onPress={() => setDeliveryOption('pickup')}
                >
                  <Text style={[
                    styles.deliveryOptionText,
                    deliveryOption === 'pickup' && styles.selectedDeliveryOptionText
                  ]}>Pickup</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.addressContainer}>
                <MapPin size={20} color={Colors.neutral[700]} />
                <View style={styles.addressTextContainer}>
                  <Text style={styles.addressTitle}>Home</Text>
                  <Text style={styles.addressText}>123 Main Street, Anytown, USA</Text>
                </View>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.deliveryTimeContainer}>
                <Clock size={20} color={Colors.neutral[700]} />
                <View style={styles.deliveryTimeTextContainer}>
                  <Text style={styles.deliveryTimeTitle}>Delivery Time</Text>
                  <Text style={styles.deliveryTimeText}>ASAP (25-35 min)</Text>
                </View>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Card style={styles.paymentCard}>
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'card' && styles.selectedPaymentOption
                ]}
                onPress={() => setPaymentMethod('card')}
              >
                <View style={styles.paymentOptionLeft}>
                  <CreditCard size={20} color={Colors.neutral[700]} />
                  <Text style={styles.paymentOptionText}>Credit Card</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  paymentMethod === 'card' && styles.radioButtonSelected
                ]}>
                  {paymentMethod === 'card' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'cash' && styles.selectedPaymentOption,
                  { borderBottomWidth: 0 }
                ]}
                onPress={() => setPaymentMethod('cash')}
              >
                <View style={styles.paymentOptionLeft}>
                  <Text style={[styles.cashIcon, { fontFamily: 'Poppins-Medium' }]}>$</Text>
                  <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  paymentMethod === 'cash' && styles.radioButtonSelected
                ]}>
                  {paymentMethod === 'cash' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <Card style={styles.orderSummaryCard}>
              <Text style={styles.restaurantName}>Burger Palace</Text>
              
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemLeft}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} color={Colors.neutral[700]} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} color={Colors.neutral[700]} />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      {item.options && item.options.map((option, index) => (
                        <Text key={index} style={styles.cartItemOption}>
                          {option.name}: {option.choice} (+${option.price.toFixed(2)})
                        </Text>
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.cartItemRight}>
                    <Text style={styles.cartItemPrice}>
                      ${((item.price + (item.options?.reduce((sum, opt) => sum + opt.price, 0) || 0)) * item.quantity).toFixed(2)}
                    </Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <X size={16} color={Colors.neutral[500]} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              <TouchableOpacity style={styles.addMoreButton}>
                <Plus size={16} color={Colors.primary.default} />
                <Text style={styles.addMoreText}>Add more items</Text>
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Fee</Text>
                <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button 
            title={`Place Order • $${total.toFixed(2)}`} 
            onPress={placeOrder}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Platform.OS === 'android' ? 40 : Layout.spacing.m,
    paddingBottom: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    ...Typography.h4,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: Layout.spacing.l,
  },
  sectionTitle: {
    ...Typography.h5,
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
    marginTop: Layout.spacing.m,
  },
  deliveryCard: {
    marginHorizontal: Layout.spacing.m,
  },
  deliveryOptions: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  deliveryOption: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedDeliveryOption: {
    borderBottomColor: Colors.primary.default,
  },
  deliveryOptionText: {
    ...Typography.body1,
    color: Colors.neutral[600],
  },
  selectedDeliveryOptionText: {
    color: Colors.primary.default,
    fontFamily: 'Poppins-Medium',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  addressTitle: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
  },
  addressText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  changeButton: {
    paddingHorizontal: Layout.spacing.s,
  },
  changeButtonText: {
    ...Typography.button,
    color: Colors.primary.default,
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
  },
  deliveryTimeTextContainer: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  deliveryTimeTitle: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
  },
  deliveryTimeText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  paymentCard: {
    marginHorizontal: Layout.spacing.m,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  selectedPaymentOption: {
    backgroundColor: Colors.neutral[50],
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    ...Typography.body1,
    marginLeft: Layout.spacing.m,
  },
  cashIcon: {
    fontSize: 20,
    width: 20,
    height: 20,
    textAlign: 'center',
    color: Colors.neutral[700],
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.primary.default,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary.default,
  },
  orderSummaryCard: {
    marginHorizontal: Layout.spacing.m,
  },
  restaurantName: {
    ...Typography.h5,
    marginBottom: Layout.spacing.m,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  cartItemLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 8,
    minWidth: 16,
    textAlign: 'center',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    ...Typography.body1,
  },
  cartItemOption: {
    ...Typography.caption,
    color: Colors.neutral[600],
  },
  cartItemRight: {
    alignItems: 'flex-end',
  },
  cartItemPrice: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  removeButton: {
    padding: 4,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  addMoreText: {
    ...Typography.body2,
    color: Colors.primary.default,
    marginLeft: Layout.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Layout.spacing.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  summaryLabel: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  summaryValue: {
    ...Typography.body2,
  },
  totalRow: {
    marginTop: Layout.spacing.s,
  },
  totalLabel: {
    ...Typography.h5,
  },
  totalValue: {
    ...Typography.h5,
  },
  footer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    padding: Layout.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 34 : Layout.spacing.m,
  },
});