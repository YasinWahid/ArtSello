import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import Paintingpd from './Paintingsp';

const products = [
  { id: 1, name: 'The Abstract Series- Shift in Perception (Hir-418)', price: 'RS 3,500', image: require('../assets/intro1.png') },
  { id: 2, name: 'Product 2', price: '$200', image: require('../assets/intro1.png') },
  { id: 3, name: 'Product 3', price: '$300', image: require('../assets/intro1.png') },
   { id: 4, name: 'Product 4', price: '$300', image: require('../assets/intro1.png') },
   { id: 5, name: 'Product 5', price: '$300', image: require('../assets/intro1.png') },
   { id: 6, name: 'Product 6', price: '$300', image: require('../assets/intro1.png') },
   { id: 7, name: 'Product 7', price: '$300', image: require('../assets/intro1.png') },
   { id: 8, name: 'Product 8', price: '$300', image: require('../assets/intro1.png') },
   { id: 9, name: 'Product 9', price: '$300', image: require('../assets/intro1.png') },
   { id: 10, name: 'Product 10', price: '$300', image: require('../assets/intro1.png') },
   
  // ... add more products here
];

const Paintings = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
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
      <Text style={styles.productName}>{item.name} </Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header content goes here */}
      </View>

      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>Paintings</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </View>

      <View style={styles.footer}>
        {/* Footer content goes here */}
      </View>
      <FooterComponent/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    // Header styles
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 200,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 200,
  },
  productItem: {
    flex: 0.5,
    marginHorizontal: 8,
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
  footer: {
    // Footer styles
  },
});

export default Paintings;