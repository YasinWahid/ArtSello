import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import ScarvesProductPage from '../ProductPage/ScarvesProductPage';

const products = [
  { id: 1, name: 'Georgette Hijab – Pure White', price: 'Rs.3,800', image: require('../assets/sca1.png'), description: 'this' },
  { id: 2, name: 'Georgette Hijab – Dark Purple', price: 'Rs.3,900', image: require('../assets/sca2.png'), description: 'this' },
  { id: 3, name: 'Jersey Hijab - Emerald Green', price: 'Rs.4,500', image: require('../assets/sca3.png'), description: 'this' },
  { id: 4, name: 'Crinkle Crimps – Bundle Of 6', price: 'Rs.6,700', image: require('../assets/sca4.png'), description: 'this' },
  { id: 5, name: 'Crinkle Lawn - Navy Blue', price: 'Rs.3,200', image: require('../assets/sca5.png'), description: 'this' },
  { id: 6, name: 'Crinkle Lawn - White', price: 'Rs.1,500', image: require('../assets/sca6.png'), description: 'this' },
  { id: 7, name: 'Crinkle Lawn - Camel', price: 'Rs.1,600', image: require('../assets/sca7.png'), description: 'this' },
  { id: 8, name: 'Crinkle Lawn - Green', price: 'Rs.1,800', image: require('../assets/sca8.png'), description: 'this' },
  { id: 9, name: 'Crinkle Lawn - Sea Green', price: 'Rs.1,800', image: require('../assets/sca9.png'), description: 'this' },
  { id: 10, name: 'Crinkle Lawn', price: 'Rs.1,800', image: require('../assets/sca10.png'), description: 'this' },
];

const Scarves = ({ navigation }) => {
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
                onPress={() => navigation.navigate('ScarvesProductPage', { product: item })}
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

const ScarvesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Scarves" component={Scarves} />
    <Stack.Screen name="ScarvesProductPage" component={ScarvesProductPage} />
  </Stack.Navigator>
);

export default ScarvesStack;
