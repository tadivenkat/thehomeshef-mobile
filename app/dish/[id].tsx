import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, Heart } from 'lucide-react-native';
import { dishes } from '@/data/mockData';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { DishOption } from '@/types/restaurant';

export default function DishScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dish = dishes.find(d => d.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>({});
  const [totalPrice, setTotalPrice] = useState(dish?.price || 0);
  
  if (!dish) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Dish not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
    calculateTotalPrice(newQuantity, selectedOptions);
  };
  
  const handleOptionSelect = (option: DishOption, choiceId: string) => {
    let newSelected = { ...selectedOptions };
    
    if (option.multiple) {
      // For multiple selection options
      const currentSelections = (newSelected[option.id] as string[]) || [];
      if (currentSelections.includes(choiceId)) {
        // Remove if already selected
        newSelected[option.id] = currentSelections.filter(id => id !== choiceId);
      } else {
        // Add to selections
        newSelected[option.id] = [...currentSelections, choiceId];
      }
    } else {
      // For single selection options
      newSelected[option.id] = choiceId;
    }
    
    setSelectedOptions(newSelected);
    calculateTotalPrice(quantity, newSelected);
  };
  
  const calculateTotalPrice = (qty: number, options: Record<string, string | string[]>) => {
    let basePrice = dish.price;
    let additionalPrice = 0;
    
    // Calculate additional price from options
    if (dish.options) {
      dish.options.forEach(option => {
        const selectedChoice = options[option.id];
        
        if (selectedChoice) {
          if (Array.isArray(selectedChoice)) {
            // Multiple selections
            selectedChoice.forEach(choiceId => {
              const choice = option.choices.find(c => c.id === choiceId);
              if (choice) {
                additionalPrice += choice.price;
              }
            });
          } else {
            // Single selection
            const choice = option.choices.find(c => c.id === selectedChoice);
            if (choice) {
              additionalPrice += choice.price;
            }
          }
        }
      });
    }
    
    setTotalPrice((basePrice + additionalPrice) * qty);
  };
  
  const isOptionSelected = (optionId: string, choiceId: string) => {
    const selected = selectedOptions[optionId];
    if (Array.isArray(selected)) {
      return selected.includes(choiceId);
    }
    return selected === choiceId;
  };
  
  const addToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', {
      dish,
      quantity,
      selectedOptions,
      totalPrice
    });
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: dish.image }}
              style={styles.dishImage}
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={24} color={Colors.white} fill="transparent" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentContainer}>
            <View style={styles.dishHeader}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
            </View>
            
            <Text style={styles.dishDescription}>{dish.description}</Text>
            
            <View style={styles.quantityContainer}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                  onPress={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} color={quantity <= 1 ? Colors.neutral[400] : Colors.neutral[700]} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(1)}
                >
                  <Plus size={20} color={Colors.neutral[700]} />
                </TouchableOpacity>
              </View>
            </View>
            
            {dish.options && dish.options.length > 0 && (
              <View style={styles.optionsContainer}>
                {dish.options.map((option) => (
                  <View key={option.id} style={styles.optionSection}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>{option.name}</Text>
                      {option.required && (
                        <Text style={styles.requiredBadge}>Required</Text>
                      )}
                    </View>
                    
                    <View style={styles.choicesContainer}>
                      {option.choices.map((choice) => (
                        <TouchableOpacity
                          key={choice.id}
                          style={[
                            styles.choiceItem,
                            isOptionSelected(option.id, choice.id) && styles.selectedChoiceItem
                          ]}
                          onPress={() => handleOptionSelect(option, choice.id)}
                        >
                          <View style={styles.choiceInfo}>
                            <Text style={styles.choiceName}>{choice.name}</Text>
                            {choice.price > 0 && (
                              <Text style={styles.choicePrice}>+${choice.price.toFixed(2)}</Text>
                            )}
                          </View>
                          <View style={[
                            styles.radioButton,
                            isOptionSelected(option.id, choice.id) && styles.radioButtonSelected
                          ]}>
                            {isOptionSelected(option.id, choice.id) && (
                              <View style={styles.radioButtonInner} />
                            )}
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
          <Button 
            title="Add to Cart" 
            onPress={addToCart}
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
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  dishImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 10,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 10,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: Layout.spacing.m,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.s,
  },
  dishName: {
    ...Typography.h3,
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  dishPrice: {
    ...Typography.h4,
  },
  dishDescription: {
    ...Typography.body2,
    color: Colors.neutral[700],
    marginBottom: Layout.spacing.l,
  },
  quantityContainer: {
    marginBottom: Layout.spacing.l,
  },
  sectionTitle: {
    ...Typography.h5,
    marginBottom: Layout.spacing.s,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: Colors.neutral[100],
  },
  quantityText: {
    ...Typography.h5,
    marginHorizontal: Layout.spacing.m,
    minWidth: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: Layout.spacing.l,
  },
  optionSection: {
    marginBottom: Layout.spacing.l,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  optionTitle: {
    ...Typography.h5,
    marginRight: Layout.spacing.s,
  },
  requiredBadge: {
    ...Typography.caption,
    color: Colors.primary.default,
    backgroundColor: Colors.primary.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Layout.radius.s,
  },
  choicesContainer: {
    borderRadius: Layout.radius.m,
    overflow: 'hidden',
  },
  choiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  selectedChoiceItem: {
    backgroundColor: Colors.primary.background,
  },
  choiceInfo: {
    flex: 1,
  },
  choiceName: {
    ...Typography.body1,
  },
  choicePrice: {
    ...Typography.body2,
    color: Colors.neutral[600],
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
  footer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    padding: Layout.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 34 : Layout.spacing.m,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  totalLabel: {
    ...Typography.h5,
  },
  totalPrice: {
    ...Typography.h4,
  },
});