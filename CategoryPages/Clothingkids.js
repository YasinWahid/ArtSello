import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import ClothingkidsProductPage from '../ProductPage/ClothingkidsProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Malhaar - Arjumand-Kids - Kidswear', price: 'Rs.8,249', image: require('../assets/kidc1.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 2, name: 'Ruby Garnet Clothing', price: 'Rs.4,499', image: require('../assets/kidc2.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 3, name: 'Garnet Clothing', price: 'Rs.3,749', image: require('../assets/kidc3.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 4, name: 'Cheeco Chic', price: 'Rs.3,600', image: require('../assets/kidc4.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 5, name: 'Fresh birds', price: 'Rs.2,848', image: require('../assets/kidc5.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 6, name: 'Garnet Clothing', price: 'Rs.3,500', image: require('../assets/kidc6.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 7, name: 'Garnet Clothing', price: 'Rs. 3,340', image: require('../assets/kidc7.png'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 8, name: 'KASHMIRI DRESS FOR GIRLS PAKISTANI CULTURAL - BLACK', price: 'Rs.2,750.00', image: require('../assets/kidc8.jpg'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 9, name: 'PASHTO PASHTUN DRESS FOR GIRLS PAKISTANI CULTURAL - MAROON', price: 'Rs.2,750.00', image: require('../assets/kidc9.jpg'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
  { id: 10, name: 'PASHTO PUKHTOON WAIST-COAT FOR KIDS PAKISTANI CULTURAL DRESS', price: 'Rs.1,750.00', image: require('../assets/kidc10.jpg'), description: 'This adorable dress is bursting with vibrant colors! Made with soft, breathable fabric, its perfect for twirling and playing. The pretty rainbow design will make any little girl feel like a magical princess' },
];

const KidsClothing = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>{/* Header content goes here */}</View>
        <View style={styles.pageContent}>
          <View style={styles.productList}>
            {products.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productItem}
                onPress={() => navigation.navigate('ClothingkidsProductPage', { product: item })}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.productImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={[
                      styles.wishlistButton,
                      { backgroundColor: isProductInWishlist(item.id) ? 'red' : 'rgba(0, 0, 0, 0.6)' },
                    ]}
                    onPress={() => toggleWishlist(item.id)}
                  >
                    <Ionicons
                      name={isProductInWishlist(item.id) ? 'heart' : 'heart-outline'}
                      size={24}
                      color="#fff"
                      style={styles.wishlistIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FooterComponent />
      </View>
    </ScrollView>
  );
};


const Stack = createStackNavigator();

const KidsClothingStack = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#C1EA5F',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'black', 
      textAlign: 'left',
      
    },
  }}>
    <Stack.Screen name="Kid's Clothings" component={KidsClothing} />
    <Stack.Screen name="ClothingkidsProductPage" component={ClothingkidsProductPage} />
  </Stack.Navigator>
);

export default KidsClothingStack;
