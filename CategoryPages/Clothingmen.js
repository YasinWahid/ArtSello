import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import ClothingmenProductPage from '../ProductPage/ClothingmenProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Embroidered Modal Satin Off White Men Sherwani With Dupatta', price: 'Rs.9999', image: require('../assets/menc1.png'), description: 'this' },
  { id: 2, name: 'Art Silk Black Party Wear Men Sherwani With Stone Embroidery', price: 'Rs.11999', image: require('../assets/menc2.png'), description: 'this' },
  { id: 3, name: 'Dark Beige Brocade Embroidered Men Sherwani With Dupatta', price: 'Rs.8900', image: require('../assets/menc3.png'), description: 'this' },
  { id: 4, name: 'Mint Green Dupion Silk Embroidered Men Kurta Pajama', price: 'Rs.3200', image: require('../assets/menc4.png'), description: 'this' },
  { id: 5, name: 'Grey Four Piece Suit Online For Men', price: 'Rs.7600', image: require('../assets/menc5.png'), description: 'this' },
  { id: 6, name: 'Pistachio Green Jacquard Straight Cut Men', price: 'Rs.6500', image: require('../assets/menc6.png'), description: 'this' },
  { id: 7, name: 'Navy Blue Art Silk Men Kurta Pajama With Jacket', price: 'Rs.4870', image: require('../assets/menc7.png'), description: 'this' },
  { id: 8, name: 'Black Cotton Silk Straight Cut Men Kurta Pajama', price: 'Rs.3500', image: require('../assets/menc8.png'), description: 'this' },
  { id: 9, name: 'Off White Cotton Silk Embroidered Men Kurta Pajama', price: 'Rs.2470', image: require('../assets/menc9.png'), description: 'this' },
  { id: 10, name: 'Beige Art Silk Men Sherwani For Sangeet With Thread Embroidery', price: 'Rs.1940', image: require('../assets/menc10.png'), description: 'this' },
];

const MensClothing = ({ navigation }) => {
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
                onPress={() => navigation.navigate('ClothingmenProductPage', { product: item })}
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

const  MensClothingStack = () => (
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
    <Stack.Screen name=" Men's Clothing" component={MensClothing} />
    <Stack.Screen name="ClothingmenProductPage" component={ClothingmenProductPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default MensClothingStack;
