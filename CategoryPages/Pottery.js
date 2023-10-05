import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import PotteryProductPage from '../ProductPage/PotteryProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Handmade concave blue pottery mug with lid', price: 'Rs.989', image: require('../assets/pot1.jpg'), description: 'this' },
  { id: 2, name: 'Clay Pottery Valuables & Daily Essentials Pot  ', price: 'Rs.4,670', image: require('../assets/pot2.jpg'), description: 'this' },
  { id: 3, name: 'Blue Pottery Flower Vase  ', price: 'Rs. 6,780', image: require('../assets/pot3.jpg'), description: 'this' },
  { id: 4, name: 'Blue Pottery Wall Hanging Rectangle  ', price: 'Rs.1,280', image: require('../assets/pot4.jpg'), description: 'this' },
  { id: 5, name: 'Bismillah Blue Pottery Plate  ', price: 'Rs.7,560', image: require('../assets/pot5.jpg'), description: 'this' },
  { id: 6, name: 'Blue Pottery Birds Nest  ', price: 'Rs.1,480', image: require('../assets/pot6.jpg'), description: 'this' },
  { id: 7, name: 'Gava Arabian Tea Set  ', price: 'Rs.1,350', image: require('../assets/pot7.jpg'), description: 'this' },
  { id: 8, name: 'Blue Pottery pomegranate handmade  ', price: 'Rs.1,450', image: require('../assets/pot8.jpg'), description: 'this' },
  { id: 9, name: 'Floor Pottery Vase  ', price: 'Rs.1,280', image: require('../assets/pot9.jpg'), description: 'this' },
  { id: 10, name: 'Lapis Lazuli Floor Blue Pottery Vase  ', price: 'Rs.3,580', image: require('../assets/pot10.jpg'), description: 'this' },
];

const Pottery = ({ navigation }) => {
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
                onPress={() => navigation.navigate('PotteryProductPage', { product: item })}
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

const PotteryStack = () => (
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
    <Stack.Screen name="Pottery" component={Pottery} />
    <Stack.Screen name="PotteryProductPage" component={PotteryProductPage} />
  </Stack.Navigator>
);

export default PotteryStack;
