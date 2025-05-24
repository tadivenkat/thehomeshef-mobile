import { Restaurant, Category, Dish } from '@/types/restaurant';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fast Food',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'Sushi',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    name: 'Healthy',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    name: 'Desserts',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '6',
    name: 'Breakfast',
    image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '7',
    name: 'Asian',
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '8',
    name: 'Mexican',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    coverImage: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviewCount: 342,
    deliveryTime: 25,
    tags: ['Burgers', 'American', 'Fast Food'],
    freeDelivery: true,
    promoted: true,
    distance: 1.2,
    priceLevel: 2,
    address: '123 Main St, Anytown, USA',
    description: 'Serving the juiciest burgers in town with fresh ingredients and homemade sauces.'
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    coverImage: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviewCount: 287,
    deliveryTime: 35,
    tags: ['Pizza', 'Italian', 'Pasta'],
    freeDelivery: false,
    promoted: false,
    distance: 2.5,
    priceLevel: 2,
    address: '456 Oak Ave, Anytown, USA',
    description: 'Authentic Italian pizzas made in a wood-fired oven with imported ingredients.'
  },
  {
    id: '3',
    name: 'Sushi Express',
    coverImage: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 412,
    deliveryTime: 40,
    tags: ['Japanese', 'Sushi', 'Asian'],
    freeDelivery: true,
    promoted: true,
    distance: 3.1,
    priceLevel: 3,
    address: '789 Maple Dr, Anytown, USA',
    description: 'Premium sushi and Japanese cuisine made with the freshest fish and authentic techniques.'
  },
  {
    id: '4',
    name: 'Green Bowl',
    coverImage: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviewCount: 198,
    deliveryTime: 20,
    tags: ['Healthy', 'Salads', 'Bowls'],
    freeDelivery: false,
    promoted: false,
    distance: 1.8,
    priceLevel: 2,
    address: '321 Pine St, Anytown, USA',
    description: 'Nutritious and delicious salads, grain bowls, and smoothies for the health-conscious.'
  },
  {
    id: '5',
    name: 'Taco Fiesta',
    coverImage: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    reviewCount: 256,
    deliveryTime: 30,
    tags: ['Mexican', 'Tacos', 'Burritos'],
    freeDelivery: true,
    promoted: false,
    distance: 2.2,
    priceLevel: 1,
    address: '567 Elm St, Anytown, USA',
    description: 'Authentic Mexican street food with homemade salsas and fresh ingredients.'
  },
  {
    id: '6',
    name: 'Sweet Treats',
    coverImage: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 176,
    deliveryTime: 25,
    tags: ['Desserts', 'Bakery', 'Ice Cream'],
    freeDelivery: false,
    promoted: true,
    distance: 3.5,
    priceLevel: 2,
    address: '890 Cherry Ln, Anytown, USA',
    description: 'Indulgent desserts, pastries, and ice cream made fresh daily with premium ingredients.'
  }
];

export const dishes: Dish[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce on a brioche bun.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Burgers'
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Bacon Deluxe Burger',
    description: 'Beef patty topped with crispy bacon, American cheese, caramelized onions, and BBQ sauce.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Burgers'
  },
  {
    id: '3',
    restaurantId: '1',
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado, sprouts, tomato, and vegan mayo on a whole grain bun.',
    price: 13.99,
    image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: false,
    category: 'Burgers'
  },
  {
    id: '4',
    restaurantId: '1',
    name: 'French Fries',
    description: 'Crispy golden fries seasoned with sea salt.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Sides'
  },
  {
    id: '5',
    restaurantId: '1',
    name: 'Onion Rings',
    description: 'Thick-cut onion rings in a crispy beer batter.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: false,
    category: 'Sides'
  },
  {
    id: '6',
    restaurantId: '1',
    name: 'Chocolate Milkshake',
    description: 'Creamy chocolate shake topped with whipped cream and a cherry.',
    price: 6.99,
    image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Drinks'
  },
  {
    id: '7',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Pizzas',
    options: [
      {
        id: '1',
        name: 'Size',
        choices: [
          { id: '1', name: 'Small (10")', price: 0 },
          { id: '2', name: 'Medium (12")', price: 2 },
          { id: '3', name: 'Large (14")', price: 4 }
        ],
        required: true,
        multiple: false
      },
      {
        id: '2',
        name: 'Crust',
        choices: [
          { id: '1', name: 'Thin', price: 0 },
          { id: '2', name: 'Regular', price: 0 },
          { id: '3', name: 'Thick', price: 1 }
        ],
        required: true,
        multiple: false
      }
    ]
  },
  {
    id: '8',
    restaurantId: '2',
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella, and pepperoni on a classic crust.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600',
    popular: true,
    category: 'Pizzas',
    options: [
      {
        id: '1',
        name: 'Size',
        choices: [
          { id: '1', name: 'Small (10")', price: 0 },
          { id: '2', name: 'Medium (12")', price: 2 },
          { id: '3', name: 'Large (14")', price: 4 }
        ],
        required: true,
        multiple: false
      },
      {
        id: '2',
        name: 'Crust',
        choices: [
          { id: '1', name: 'Thin', price: 0 },
          { id: '2', name: 'Regular', price: 0 },
          { id: '3', name: 'Thick', price: 1 }
        ],
        required: true,
        multiple: false
      }
    ]
  }
];