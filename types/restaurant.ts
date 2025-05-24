export interface Restaurant {
  id: string;
  name: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  tags: string[];
  freeDelivery: boolean;
  promoted: boolean;
  distance: number;
  priceLevel: 1 | 2 | 3; // 1 = $, 2 = $$, 3 = $$$
  address: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular: boolean;
  category: string;
  options?: DishOption[];
}

export interface DishOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
  multiple: boolean;
}

export interface CartItem {
  id: string;
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  options?: {
    name: string;
    choice: string;
    price: number;
  }[];
}