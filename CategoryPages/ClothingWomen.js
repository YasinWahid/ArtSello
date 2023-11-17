import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import ClothingWomenProductPage from '../ProductPage/ClothingWomenProductPage';
import { styles } from '../styles/cat_pag_styles';

const products = [
  { id: 1, name: 'Ketifa Trendy Peach – Organza 3 Pcs Unstitched', price: 'Rs.3,500', image: require('../assets/womenc1.png'), description: 'this' },
  { id: 2, name: 'Panache Women Zoraq 3 PCs Unstitched Suit', price: '$200', image: require('../assets/womenc2.png'), description: 'this' },
  { id: 3, name: ' Panache Women Mahima 3 PCs Unstitched Suit', price: '$300', image: require('../assets/womenc3.png'), description: 'this' },
  { id: 4, name: 'Panache Women Ayzel 3 PCs Unstitched Suit', price: '$300', image: require('../assets/womenc4.png'), description: 'this' },
  { id: 5, name: 'Panache Women Mirah 3 PCs Unstitched Suit', price: '$300', image: require('../assets/womenc5.png'), description: 'this' },
  { id: 6, name: 'Panache Women Raimah 3 PCs Unstitched Suit ', price: '$300', image: require('../assets/womenc6.png'), description: 'this' },
  { id: 7, name: ' Panache Women Zimal 3 PCs Unstitched Suit', price: '$300', image: require('../assets/womenc7.png'), description: 'this' },
  { id: 8, name: 'Tania Malik Theater Studio Women Off-White Gharara Dress', price: '$300', image: require('../assets/womenc8.png'), description: 'this' },
  { id: 9, name: 'Tania Malik Theater Studio Women Black Festive Dress', price: '$300', image: require('../assets/womenc9.png'), description: 'this' },
  { id: 10, name: 'Tania Malik Theater Studio EMERALD- Women Unstitched 3 PCs Embroidered Suit', price: '$300', image: require('../assets/womenc10.png'), description: 'this' },
];

const WomensClothing = ({ navigation }) => {
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
                onPress={() => navigation.navigate('ClothingWomenProductPage', { product: item })}
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

const WomensClothingStack = () => (
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
    <Stack.Screen name="Women's Clothing" component={WomensClothing} />
    <Stack.Screen name="ClothingWomenProductPage" component={ClothingWomenProductPage} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

export default WomensClothingStack;
