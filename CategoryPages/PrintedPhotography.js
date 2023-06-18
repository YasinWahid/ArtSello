import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import PrintedPhotographyProductPage from '../ProductPage/PrintedPhotographyProductPage';

const products = [
  { id: 1, name: 'The Abstract Series- Shift in Perception (Hir-418)', price: 'Rs.3,500', image: require('../assets/intro1.png'), description: 'this' },
  { id: 2, name: 'Product 2', price: '$200', image: require('../assets/intro1.png'), description: 'this' },
  { id: 3, name: 'Product 3', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 4, name: 'Product 4', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 5, name: 'Product 5', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 6, name: 'Product 6', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 7, name: 'Product 7', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 8, name: 'Product 8', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 9, name: 'Product 9', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
  { id: 10, name: 'Product 10', price: '$300', image: require('../assets/intro1.png'), description: 'this' },
];

const PrintedPhotography = ({ navigation }) => {
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
                onPress={() => navigation.navigate('PrintedPhotographyProductPage', { product: item })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCFBED',
  },
  header: {
    // Header styles
  },
  pageContent: {
    flex: 1,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: '100%',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    borderColor: '#ccc',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 160,
  },
  wishlistButton: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  wishlistIcon: {
    color: '#fff',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
});

const Stack = createStackNavigator();

const PrintedPhotographyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Printed Photography" component={PrintedPhotography} />
    <Stack.Screen name="PrintedPhotographyProductPage" component={PrintedPhotographyProductPage} />
  </Stack.Navigator>
);

export default PrintedPhotographyStack;
