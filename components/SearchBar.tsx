import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onFilter,
  placeholder = 'Search for restaurants or dishes' 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.neutral[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[500]}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
        <Sliders size={20} color={Colors.primary.default} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    marginVertical: Layout.spacing.m,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: Layout.radius.m,
    paddingHorizontal: Layout.spacing.m,
    height: 48,
  },
  searchIcon: {
    marginRight: Layout.spacing.s,
  },
  input: {
    flex: 1,
    height: '100%',
    ...Typography.body2,
    color: Colors.neutral[900],
  },
  filterButton: {
    marginLeft: Layout.spacing.m,
    width: 48,
    height: 48,
    borderRadius: Layout.radius.m,
    backgroundColor: Colors.primary.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});