import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ChevronRight, CreditCard, Heart, MapPin, Settings, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import Card from '@/components/ui/Card';

export default function ProfileScreen() {
  const menuItems = [
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={20} color={Colors.neutral[700]} />,
      badge: '2 cards',
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      icon: <MapPin size={20} color={Colors.neutral[700]} />,
      badge: '3 addresses',
    },
    {
      id: 'favorites',
      title: 'Favorite Restaurants',
      icon: <Heart size={20} color={Colors.neutral[700]} />,
      badge: '5 places',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} color={Colors.neutral[700]} />,
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={Colors.neutral[700]} />,
    },
    {
      id: 'logout',
      title: 'Log Out',
      icon: <LogOut size={20} color={Colors.error.default} />,
      textColor: Colors.error.default,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[
                  styles.menuItemTitle,
                  item.textColor && { color: item.textColor }
                ]}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <Text style={styles.menuItemBadge}>{item.badge}</Text>
                )}
                {item.id !== 'logout' && (
                  <ChevronRight size={20} color={Colors.neutral[400]} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  profileCard: {
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Layout.spacing.m,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    ...Typography.h4,
    marginBottom: 2,
  },
  profileEmail: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginBottom: Layout.spacing.s,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    ...Typography.button,
    color: Colors.primary.default,
  },
  menuContainer: {
    marginHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...Typography.body1,
    marginLeft: Layout.spacing.m,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemBadge: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginRight: Layout.spacing.s,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  versionText: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
});