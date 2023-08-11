import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import PaintingsProductPage from '../ProductPage/PaintingsProductPage';

const products = [
  { id: 1, name: 'Double panel abstract boxart', price: 'Rs.3,500', image: require('../assets/pan1.jpg'), description: 'this' },
  { id: 2, name: 'The Abstract Series- Be Your Own Pilot (Hir-397)', price: 'Rs.4,500', image: require('../assets/pan2.jpg'), description: 'this' },
  { id: 3, name: 'Horse Portrait Sketch', price: 'Rs.1,875', image: require('../assets/pan3.jpg'), description: 'this' },
  { id: 4, name: 'Old lahore', price: 'Rs.2,580', image: require('../assets/pan4.jpg'), description: 'this' },
  { id: 5, name: 'The Beginning', price: 'Rs.4,567', image: require('../assets/pan5.jpg'), description: 'this' },
  { id: 6, name: '3rd Kalma Tamjeed Abstract Calligraphy Painting', price: 'Rs.1,111', image: require('../assets/pan6.jpg'), description: 'this' },
  { id: 7, name: 'Allah Hu Samad Calligraphy Painting', price: 'Rs.1,780', image: require('../assets/pan7.jpg'), description: 'this' },
  { id: 8, name: 'Time flies', price: 'Rs.1,999', image: require('../assets/pan8.jpg'), description: 'this' },
  { id: 9, name: 'The Solitary House', price: 'Rs.1,111', image: require('../assets/pan9.jpg'), description: 'this' },
  { id: 10, name: 'Seascape Acrylic Painting', price: 'Rs.1,234', image: require('../assets/pan10.jpg'), description: 'this' },
];

const Paintings = ({ navigation }) => {
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
                onPress={() => navigation.navigate('PaintingsProductPage', { product: item })}
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
    backgroundColor: '#E5FAFE',
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

const PaintingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Painting" component={Paintings} />
    <Stack.Screen name="PaintingsProductPage" component={PaintingsProductPage} />
  </Stack.Navigator>
);

export default PaintingsStack;
