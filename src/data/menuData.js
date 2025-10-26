export const menuData = {
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      icon: '🥟',
      items: [
        {
          id: 'app-1',
          name: 'Crispy Spring Rolls',
          description: 'Golden fried rolls with vegetables and sweet chili sauce',
          price: 149,
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '10 mins'
        },
        {
          id: 'app-2',
          name: 'Stuffed Mushrooms',
          description: 'Baked mushroom caps with cheese, breadcrumbs and herbs',
          price: 179,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '12 mins'
        },
        {
          id: 'app-3',
          name: 'Chicken Wings Platter',
          description: 'Spicy glazed wings served with ranch dip',
          price: 249,
          image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400',
          isVeg: false,
          isPopular: true,
          prepTime: '15 mins'
        },
        {
          id: 'app-4',
          name: 'Mozzarella Sticks',
          description: 'Crispy fried cheese sticks with marinara sauce',
          price: 169,
          image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '10 mins'
        }
      ]
    },
    {
      id: 'main-course',
      name: 'Main Course',
      icon: '🍛',
      items: [
        {
          id: 'main-1',
          name: 'Grilled Salmon',
          description: 'Fresh salmon fillet with quinoa and seasonal vegetables',
          price: 449,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
          isVeg: false,
          isPopular: true,
          prepTime: '20 mins'
        },
        {
          id: 'main-2',
          name: 'Paneer Tikka Masala',
          description: 'Cottage cheese in rich tomato gravy with butter naan',
          price: 299,
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '18 mins'
        },
        {
          id: 'main-3',
          name: 'Butter Chicken',
          description: 'Tender chicken in creamy tomato sauce with rice',
          price: 349,
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
          isVeg: false,
          isPopular: true,
          prepTime: '22 mins'
        },
        {
          id: 'main-4',
          name: 'Vegetable Biryani',
          description: 'Fragrant basmati rice with mixed vegetables and raita',
          price: 249,
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '25 mins'
        },
        {
          id: 'main-5',
          name: 'Margherita Pizza',
          description: 'Classic pizza with mozzarella, basil and tomato sauce',
          price: 329,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '15 mins'
        },
        {
          id: 'main-6',
          name: 'Pasta Alfredo',
          description: 'Creamy fettuccine with parmesan and garlic bread',
          price: 279,
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '16 mins'
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: '🍰',
      items: [
        {
          id: 'des-1',
          name: 'Chocolate Lava Cake',
          description: 'Warm molten chocolate cake with vanilla ice cream',
          price: 179,
          image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '12 mins'
        },
        {
          id: 'des-2',
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee and mascarpone',
          price: 199,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '8 mins'
        },
        {
          id: 'des-3',
          name: 'Chocolate Mousse',
          description: 'Rich chocolate mousse with hazelnuts and cream',
          price: 159,
          image: 'https://images.unsplash.com/photo-1541636890-a1fa994dc8f8?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '10 mins'
        },
        {
          id: 'des-4',
          name: 'Ice Cream Sundae',
          description: 'Three scoops with toppings and chocolate sauce',
          price: 139,
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '5 mins'
        }
      ]
    },
    {
      id: 'beverages',
      name: 'Beverages',
      icon: '☕',
      items: [
        {
          id: 'bev-1',
          name: 'Fresh Lime Soda',
          description: 'Refreshing lime juice with sparkling water',
          price: 79,
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '3 mins'
        },
        {
          id: 'bev-2',
          name: 'Mango Lassi',
          description: 'Thick yogurt smoothie with fresh mango pulp',
          price: 99,
          image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '4 mins'
        },
        {
          id: 'bev-3',
          name: 'Filter Coffee',
          description: 'South Indian style strong filter coffee',
          price: 69,
          image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '5 mins'
        },
        {
          id: 'bev-4',
          name: 'Virgin Mojito',
          description: 'Mint, lime and soda - refreshing mocktail',
          price: 119,
          image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
          isVeg: true,
          isPopular: true,
          prepTime: '4 mins'
        },
        {
          id: 'bev-5',
          name: 'Masala Chai',
          description: 'Traditional Indian tea with aromatic spices',
          price: 49,
          image: 'https://images.unsplash.com/photo-1597318130721-f48c0201db81?w=400',
          isVeg: true,
          isPopular: false,
          prepTime: '5 mins'
        }
      ]
    }
  ],
  
  restaurantInfo: {
    name: 'Mystery Dine-In',
    tagline: 'Delicious Moments, Delivered to Your Table',
    cuisines: ['Indian', 'Continental', 'Italian', 'Chinese'],
    openTime: '11:00 AM',
    closeTime: '11:00 PM',
    phone: '+91 98765 43210',
    email: 'hello@mysterydine.com'
  }
};

// Helper functions
export const getCategoryById = (categoryId) => {
  return menuData.categories.find(cat => cat.id === categoryId);
};

export const getItemById = (itemId) => {
  for (const category of menuData.categories) {
    const item = category.items.find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
};

export const getPopularItems = () => {
  const popular = [];
  menuData.categories.forEach(category => {
    const popularInCategory = category.items.filter(item => item.isPopular);
    popular.push(...popularInCategory);
  });
  return popular;
};
