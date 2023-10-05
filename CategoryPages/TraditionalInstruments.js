import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import TraditionalInstrumentsProductPage from '../ProductPage/TraditionalInstrumentsProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Classic Acoustic Guitar 38 Inch Blue Color with 3 Picks  ', price: 'Rs.3,500', image: require('../assets/ti1.png'), description: 'this' },
  { id: 2, name: 'Linden Wooden Violin with Case, Bow, Adjusters and Rosin  ', price: 'Rs.3,650', image: require('../assets/ti2.png'), description: 'this' },
  { id: 3, name: 'Yamaha Arius Digital Piano YDP-103 88 Key  ', price: 'Rs.2,500', image: require('../assets/ti3.png'), description: 'this' },
  { id: 4, name: 'Yamaha Digital Piano P-45 88 Keys Stage Piano  ', price: 'Rs.1,500', image: require('../assets/ti4.png'), description: 'this' },
  { id: 5, name: 'Filmi Dholak Black Sheesham Wooden Dholak with Brass Hooks  ', price: 'Rs.3,800', image: require('../assets/ti5.png'), description: 'this' },
  { id: 6, name: 'High Quality Filmi Dholak Simple Metal Hooks  ', price: 'Rs.4,500', image: require('../assets/ti6.png'), description: 'this' },
  { id: 7, name: 'Local Brand World Percussion Desi Dafli 8 Inch for Wedding Purposes  ', price: 'Rs.6,500', image: require('../assets/ti7.png'), description: 'this' },
  { id: 8, name: 'High Quality Wooden Naal with Metal Hooks  ', price: 'Rs.7,500', image: require('../assets/ti8.png'), description: 'this' },
  { id: 9, name: 'High Quality Wooden Dholki, Mehndi Dholki, Dholak With Metal Hooks  ', price: 'Rs.9,500', image: require('../assets/ti9.png'), description: 'this' },
  { id: 10, name: 'High Quality Wooden Dholki, Mehndi Dholki, Dholak With Metal Hooks  ', price: 'Rs.13,500', image: require('../assets/ti9.png'), description: 'this' },
];

const TraditionalInstruments = ({ navigation }) => {
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
                onPress={() => navigation.navigate('TraditionalInstrumentsProductPage', { product: item })}
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

const TraditionalInstrumentsStack = () => (
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
    <Stack.Screen name="Traditional Instruments" component={TraditionalInstruments} />
    <Stack.Screen name="TraditionalInstrumentsProductPage" component={TraditionalInstrumentsProductPage} />
  </Stack.Navigator>
);

export default TraditionalInstrumentsStack;
