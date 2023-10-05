import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import SculpturesProductPage from '../ProductPage/SculpturesProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Bird Figurine- Pink  ', price: 'Rs.3,780', image: require('../assets/scul1.jpg'), description: 'this' },
  { id: 2, name: 'Toucan Bird Figurine  ', price: 'Rs.3,650', image: require('../assets/scul2.jpg'), description: 'this' },
  { id: 3, name: 'Antique Porcelain Floor Vase with Blue Stone- Large  ', price: 'Rs.3,500', image: require('../assets/scul3.jpg'), description: 'this' },
  { id: 4, name: 'Flamingo Figurine  ', price: 'Rs.2,500', image: require('../assets/scul4.jpg'), description: 'this' },
  { id: 5, name: 'Lion With Crown Figurine – Large  ', price: 'Rs.13,500', image: require('../assets/scul5.jpg'), description: 'this' },
  { id: 6, name: 'Apollo Statue Face – Grey', price: 'Rs.23,500', image: require('../assets/scul6.jpg'), description: 'this' },
  { id: 7, name: 'Lion Figurine', price: 'Rs.31,500', image: require('../assets/scul7.jpg'), description: 'this' },
  { id: 8, name: 'Lion With Crown Figurine – Medium', price: 'Rs.32,500', image: require('../assets/scul 8.jpg'), description: 'this' },
  { id: 9, name: 'Deer Face Figurine  ', price: 'Rs.28,800', image: require('../assets/scul9.jpg'), description: 'this' },
  { id: 10, name: 'Deer Figurine – Pair', price: 'Rs.3,5000', image: require('../assets/scul10.jpg'), description: 'this' },
];

const Sculptures = ({ navigation }) => {
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
                onPress={() => navigation.navigate('ProductPage', { product: item })}
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

const SculpturesStack = () => (
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
    <Stack.Screen name="Sculptures" component={Sculptures} />
    <Stack.Screen name="SculpturesProductPage" component={SculpturesProductPage} />
  </Stack.Navigator>
);

export default SculpturesStack;
