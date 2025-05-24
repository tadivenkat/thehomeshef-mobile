import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Clock, Package } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import Card from '@/components/ui/Card';

// Mock data for orders
const orders = [
  {
    id: '1',
    restaurantName: 'Burger Palace',
    status: 'active',
    date: '2025-05-15T12:30:00',
    items: ['Classic Cheeseburger', 'French Fries', 'Chocolate Milkshake'],
    total: 24.97,
    estimatedDelivery: '12:45 PM',
  },
  {
    id: '2',
    restaurantName: 'Pizza Heaven',
    status: 'completed',
    date: '2025-05-14T19:15:00',
    items: ['Margherita Pizza', 'Garlic Bread'],
    total: 22.98,
    estimatedDelivery: '7:45 PM',
  },
  {
    id: '3',
    restaurantName: 'Sushi Express',
    status: 'completed',
    date: '2025-05-12T13:00:00',
    items: ['California Roll', 'Miso Soup', 'Edamame'],
    total: 32.97,
    estimatedDelivery: '1:40 PM',
  },
];

export default function OrdersScreen() {
  const activeOrders = orders.filter(order => order.status === 'active');
  const pastOrders = orders.filter(order => order.status === 'completed');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderActiveOrder = ({ item }) => (
    <Card style={styles.activeOrderCard} elevation="medium">
      <View style={styles.activeOrderHeader}>
        <View style={styles.deliveryStatusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.deliveryStatus}>Delivery in progress</Text>
        </View>
        <Text style={styles.estimatedTime}>{item.estimatedDelivery}</Text>
      </View>
      
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.itemsPreview}>
          {item.items.slice(0, 2).join(', ')}
          {item.items.length > 2 ? ` +${item.items.length - 2} more` : ''}
        </Text>
      </View>
      
      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.trackButton}>
          <Package size={16} color={Colors.white} />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderPastOrder = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7}>
      <Card style={styles.pastOrderCard}>
        <View style={styles.pastOrderHeader}>
          <Text style={styles.pastOrderDate}>{formatDate(item.date)}</Text>
          <Text style={styles.pastOrderTotal}>${item.total.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.pastOrderRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.pastOrderItems} numberOfLines={1}>
          {item.items.join(', ')}
        </Text>
        
        <View style={styles.reorderContainer}>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Orders</Text>
        </View>
        
        <FlatList
          data={[...activeOrders, ...pastOrders]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            item.status === 'active' ? renderActiveOrder({ item }) : renderPastOrder({ item })
          }
          ListHeaderComponent={() => (
            <>
              {activeOrders.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Clock size={18} color={Colors.primary.default} />
                  <Text style={styles.sectionTitle}>Active Orders</Text>
                </View>
              )}
            </>
          )}
          ListFooterComponent={() => (
            <>
              {pastOrders.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Past Orders</Text>
                </View>
              )}
            </>
          )}
          contentContainerStyle={styles.listContent}
          stickyHeaderIndices={activeOrders.length > 0 ? [0] : []}
        />
        
        {orders.length === 0 && (
          <View style={styles.emptyContainer}>
            <Package size={64} color={Colors.neutral[300]} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.m,
    paddingTop: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  headerTitle: {
    ...Typography.h3,
  },
  listContent: {
    padding: Layout.spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
    backgroundColor: Colors.white,
    paddingVertical: Layout.spacing.xs,
  },
  sectionTitle: {
    ...Typography.h5,
    marginLeft: Layout.spacing.xs,
  },
  activeOrderCard: {
    marginBottom: Layout.spacing.m,
  },
  activeOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  deliveryStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.default,
    marginRight: 6,
  },
  deliveryStatus: {
    ...Typography.caption,
    color: Colors.primary.default,
    fontFamily: 'Poppins-Medium',
  },
  estimatedTime: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
  },
  restaurantInfo: {
    marginBottom: Layout.spacing.m,
  },
  restaurantName: {
    ...Typography.h5,
    marginBottom: 2,
  },
  itemsPreview: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    backgroundColor: Colors.primary.default,
    borderRadius: Layout.radius.m,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  trackButtonText: {
    ...Typography.button,
    color: Colors.white,
    marginLeft: Layout.spacing.xs,
  },
  viewDetailsButton: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Layout.radius.m,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    ...Typography.button,
    color: Colors.neutral[700],
  },
  pastOrderCard: {
    marginBottom: Layout.spacing.m,
  },
  pastOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.xs,
  },
  pastOrderDate: {
    ...Typography.caption,
    color: Colors.neutral[600],
  },
  pastOrderTotal: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
  },
  pastOrderRestaurant: {
    ...Typography.h6,
    marginBottom: 2,
  },
  pastOrderItems: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.s,
  },
  reorderContainer: {
    alignItems: 'flex-start',
  },
  reorderButton: {
    borderWidth: 1,
    borderColor: Colors.primary.default,
    borderRadius: Layout.radius.m,
    paddingVertical: 6,
    paddingHorizontal: Layout.spacing.m,
  },
  reorderText: {
    ...Typography.caption,
    color: Colors.primary.default,
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emptyTitle: {
    ...Typography.h4,
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.xs,
  },
  emptySubtitle: {
    ...Typography.body2,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
  },
  browseButton: {
    backgroundColor: Colors.primary.default,
    borderRadius: Layout.radius.m,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.l,
  },
  browseButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});