import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import JewelleryProductPage from '../ProductPage/JewelleryProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'ALAYA-01 (Pearl)', price: 'Rs.3,500', image: require('../assets/jew1.jpg'), description: 'this' },
  { id: 2, name: 'Hyderabadi Choker Set-15 (Pearl)', price: 'Rs.3,680', image: require('../assets/jew2.jpg'), description: 'this' },
  { id: 3, name: 'Mala-06 (Pearl)', price: 'Rs.4,500', image: require('../assets/jew3.jpg'), description: 'this' },
  { id: 4, name: 'Zircon Mala Set (Black)', price: 'Rs.7,500', image: require('../assets/jew4.jpg'), description: 'this' },
  { id: 5, name: 'Mariya (Green)', price: 'Rs.5,500', image: require('../assets/jew5.jpg'), description: 'this' },
  { id: 6, name: 'Hair Pin-35 (Pack Of 2)', price: 'Rs.4,560', image: require('../assets/jew6.jpg'), description: 'this' },
  { id: 7, name: 'FARIYA (Pearl)', price: 'Rs.4,560', image: require('../assets/jew7.jpg'), description: 'this' },
  { id: 8, name: 'Braided Kara-06 (Green)', price: 'Rs.9,600', image: require('../assets/jew8.jpg'), description: 'this' },
  { id: 9, name: 'AMYRA (Dark Green)', price: 'Rs.9,999', image: require('../assets/jew9.jpg'), description: 'this' },
  { id: 10, name: 'Locket Set-33 (Ferozi)', price: 'Rs.1,580', image: require('../assets/jew10.jpg'), description: 'this' },
];

const Jewellery = ({ navigation }) => {
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
                onPress={() => navigation.navigate('JewelleryProductPage', { product: item })}
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

const JewelleryStack = () => (
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
    <Stack.Screen name="Jewellery" component={Jewellery} />
    <Stack.Screen name="JewelleryProductPage" component={JewelleryProductPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default JewelleryStack;
